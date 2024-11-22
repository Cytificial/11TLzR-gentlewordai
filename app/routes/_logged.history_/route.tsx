import {
  Typography,
  Input,
  Card,
  List,
  Space,
  Button,
  Modal,
  Empty,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ChatHistoryPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch conversations with messages included
  const {
    data: conversations,
    isLoading,
    refetch,
  } = Api.conversation.findMany.useQuery({
    where: {
      userId: user?.id,
    },
    include: {
      messages: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  // Delete mutation
  const { mutateAsync: deleteConversation } =
    Api.conversation.delete.useMutation()

  // Delete all mutation
  const { mutateAsync: deleteAllConversations } =
    Api.conversation.deleteMany.useMutation()

  // Filter conversations based on search term
  const filteredConversations = conversations?.filter(
    conv =>
      conv.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.messages?.some(msg =>
        msg.content?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  // Handle single conversation deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteConversation({ where: { id } })
      refetch()
    } catch (error) {
      Modal.error({ title: 'Error', content: 'Failed to delete conversation' })
    }
  }

  // Handle all conversations deletion
  const handleDeleteAll = () => {
    Modal.confirm({
      title: 'Delete All Conversations',
      content:
        'Are you sure you want to delete all your conversations? This action cannot be undone.',
      okText: 'Yes, delete all',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteAllConversations({ where: { userId: user?.id } })
          refetch()
        } catch (error) {
          Modal.error({
            title: 'Error',
            content: 'Failed to delete all conversations',
          })
        }
      },
    })
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>
              <i className="las la-history" /> Chat History
            </Title>
            <Text type="secondary">
              View and manage your past conversations
            </Text>
          </div>

          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Search
              placeholder="Search conversations..."
              allowClear
              style={{ width: 300 }}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {conversations?.length ? (
              <Button
                danger
                onClick={handleDeleteAll}
                icon={<i className="las la-trash-alt" />}
              >
                Delete All
              </Button>
            ) : null}
          </Space>

          {isLoading ? (
            <Card loading />
          ) : filteredConversations?.length ? (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 3,
              }}
              dataSource={filteredConversations}
              renderItem={conversation => (
                <List.Item>
                  <Card
                    title={
                      <Space>
                        <i className="las la-comments" />
                        {conversation.title || 'Untitled Conversation'}
                      </Space>
                    }
                    extra={
                      <Space>
                        <Button
                          type="text"
                          danger
                          onClick={() => handleDelete(conversation.id)}
                          icon={<i className="las la-trash" />}
                        />
                        <Button
                          type="text"
                          onClick={() => navigate(`/chat/${conversation.id}`)}
                          icon={<i className="las la-arrow-right" />}
                        />
                      </Space>
                    }
                  >
                    <Text type="secondary">
                      {dayjs(conversation.createdAt).format(
                        'MMM D, YYYY h:mm A',
                      )}
                    </Text>
                    <br />
                    <Text>{conversation.messages?.length || 0} messages</Text>
                  </Card>
                </List.Item>
              )}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No conversations found"
            />
          )}
        </Space>
      </div>
    </PageLayout>
  )
}
