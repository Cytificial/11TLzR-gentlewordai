import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Button, Card, Input, List, Spin, Typography, message } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography

export default function HomePage() {
  const { user, checkRole } = useUserContext()
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Fetch user's conversations
  const { data: conversations, refetch: refetchConversations } =
    Api.conversation.findMany.useQuery({
      where: { userId: user?.id },
      include: { messages: true },
      orderBy: { createdAt: 'desc' },
    })

  // Fetch user's subscription
  const { data: subscription, refetch: refetchSubscription } = Api.subscription.findFirst.useQuery({
    where: { userId: user?.id },
    include: { plan: true },
  })

  // Mutations
  const createConversation = Api.conversation.create.useMutation()
  const createMessage = Api.message.create.useMutation()
  const generateText = Api.ai.generateText.useMutation()
  const updateSubscription = Api.subscription.update.useMutation()

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      message.error('Please enter a prompt')
      return
    }

    if (!checkRole('ADMIN') && (subscription?.plan?.credits || 3) <= 0) {
      message.error('You have no credits left. Please upgrade your plan.')
      return
    }

    setIsGenerating(true)
    try {
      // Create new conversation
      const conversation = await createConversation.mutateAsync({
        data: {
          userId: user?.id,
          status: 'active',
          title: prompt.substring(0, 50) + '...',
        },
      })

      // Save user's message
      await createMessage.mutateAsync({
        data: {
          conversationId: conversation.id,
          content: prompt,
          role: 'user',
          creditsUsed: checkRole('ADMIN') ? 0 : 1,
        },
      })

      // Generate AI response
      const response = await generateText.mutateAsync({ prompt })

      // Save AI's response
      await createMessage.mutateAsync({
        data: {
          conversationId: conversation.id,
          content: response.answer,
          role: 'assistant',
          creditsUsed: 0,
        },
      })

      // Update subscription credits
      if (!checkRole('ADMIN')) {
        await updateSubscription.mutateAsync({
          where: { id: subscription.id },
          data: { 
            plan: {
              update: {
                credits: (subscription?.plan?.credits || 3) - 1
              }
            }
          }
        })
        await refetchSubscription()
      }

      setPrompt('')
      refetchConversations()
      message.success('Response generated successfully')
    } catch (error) {
      message.error('Failed to generate response')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-robot" /> AI Chat Assistant
        </Title>
        <Paragraph>
          Interact with our AI assistant to generate creative prompts and get
          helpful responses.
        </Paragraph>

        {/* Credits Display */}
        {!checkRole('ADMIN') && (
          <Card style={{ marginBottom: 20 }}>
            <Text>
              <i className="las la-coins" /> Available Credits:{' '}
              <Text strong>{subscription?.plan?.credits || 3}</Text>
            </Text>
          </Card>
        )}

        {/* Chat Input */}
        <Card style={{ marginBottom: 20 }}>
          <Input.TextArea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows={4}
            style={{ marginBottom: 16 }}
          />
          <Button
            type="primary"
            onClick={handleSendPrompt}
            loading={isGenerating}
            disabled={!checkRole('ADMIN') && (subscription?.plan?.credits || 3) <= 0}
            icon={<i className="las la-paper-plane" />}
          >
            {!checkRole('ADMIN') && (subscription?.plan?.credits || 3) <= 0 ? 'No Credits Left' : 'Send'}
          </Button>
        </Card>

        {/* Conversation History */}
        <Title level={3}>
          <i className="las la-history" /> Conversation History
        </Title>
        {conversations ? (
          <List
            dataSource={conversations}
            renderItem={conversation => (
              <Card 
                style={{ marginBottom: 16 }}
                hoverable
                extra={
                  <Text type="secondary">
                    <i className="las la-clock" />{' '}
                    {dayjs(conversation.createdAt).format('MMMM D, YYYY h:mm A')}
                  </Text>
                }
              >
                <Title level={4} style={{ marginBottom: 16 }}>
                  <i className="las la-comment" /> {conversation.title}
                </Title>
                <List
                  style={{ marginTop: 16 }}
                  dataSource={conversation.messages}
                  renderItem={message => (
                    <List.Item style={{ padding: '8px 0' }}>
                      <Card
                        style={{
                          width: '100%',
                          backgroundColor: message.role === 'user' ? '#000' : '#1a1a1a',
                          color: '#fff',
                          borderRadius: '10px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                          <i className={`las ${message.role === 'user' ? 'la-user' : 'la-robot'}`} style={{ marginRight: 8 }} />
                          <Text strong style={{ color: '#fff' }}>
                            {message.role === 'user' ? 'You' : 'AI'}
                          </Text>
                          <Text type="secondary" style={{ marginLeft: 'auto', fontSize: '0.9em', color: '#bbb' }}>
                            {dayjs(message.createdAt).format('h:mm A')}
                          </Text>
                        </div>
                        <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                          {message.content}
                        </Paragraph>
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
            )}
          />
        ) : (
          <Spin size="large" />
        )}
      </div>
    </PageLayout>
  )
}
