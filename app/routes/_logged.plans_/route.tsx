import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import {
  Badge,
  Button,
  Card,
  Col,
  Row,
  Space,
  Spin,
  Typography,
  message,
} from 'antd'
import dayjs from 'dayjs'
const { Title, Text, Paragraph } = Typography

export default function PlansPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()

  const { data: plans, isLoading: isLoadingPlans } = Api.plan.findMany.useQuery(
    {
      where: { status: 'ACTIVE' },
    },
  )

  const { data: subscription, isLoading: isLoadingSubscription } =
    Api.subscription.findFirst.useQuery({
      where: { userId: user?.id },
      include: { plan: true },
      orderBy: { createdAt: 'desc' },
    })

  const { mutateAsync: createPaymentLink, isLoading: isCreatingPayment } =
    Api.billing.createPaymentLink.useMutation()

  const handleSubscribe = async (planId: string) => {
    try {
      const paymentLink = await createPaymentLink({ productId: planId })
      if (typeof paymentLink === 'string') {
        window.location.href = paymentLink
      }
    } catch (error) {
      message.error('Failed to create payment link. Please try again.')
    }
  }

  const isSubscriptionActive =
    subscription &&
    subscription.status === 'ACTIVE' &&
    dayjs(subscription.endDate).isAfter(dayjs())

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>
              <i className="las la-crown" style={{ marginRight: 8 }}></i>
              Subscription Plans
            </Title>
            <Paragraph>
              Choose the perfect plan to enhance your experience with more
              credits
            </Paragraph>
          </div>

          {isLoadingSubscription ? (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <Spin size="large" />
            </div>
          ) : isSubscriptionActive ? (
            <Card>
              <Space align="center">
                <i
                  className="las la-check-circle"
                  style={{ color: '#52c41a', fontSize: 24 }}
                ></i>
                <div>
                  <Text strong>Current Subscription:</Text>
                  <Text> {subscription?.plan?.name}</Text>
                  <br />
                  <Text type="secondary">
                    Valid until:{' '}
                    {dayjs(subscription?.endDate).format('MMMM D, YYYY')}
                  </Text>
                </div>
              </Space>
            </Card>
          ) : null}

          {isLoadingPlans ? (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[24, 24]} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    backgroundColor: '#000',
                    color: '#fff',
                  }}
                  actions={[
                    <Button
                      key="subscribe"
                      type="primary"
                      onClick={() => handleSubscribe('basic-plan-id')}
                      loading={isCreatingPayment}
                    >
                      Subscribe for $9.99/month
                    </Button>,
                  ]}
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                  >
                    <Title level={3} style={{ marginBottom: 0, color: '#fff' }}>
                      Basic Plan
                    </Title>
                    <Badge
                      count="100 Credits"
                      style={{ backgroundColor: '#52c41a' }}
                    />
                    <Paragraph style={{ color: '#fff' }}>
                      Perfect for getting started with basic AI responses
                    </Paragraph>
                    <Text strong style={{ fontSize: '24px', color: '#fff' }}>
                      $9.99/month
                    </Text>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    backgroundColor: '#000',
                    color: '#fff',
                  }}
                  actions={[
                    <Button
                      key="subscribe"
                      type="primary"
                      onClick={() => handleSubscribe('pro-plan-id')}
                      loading={isCreatingPayment}
                    >
                      Subscribe for $19.99/month
                    </Button>,
                  ]}
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                  >
                    <Title level={3} style={{ marginBottom: 0, color: '#fff' }}>
                      Pro Plan
                    </Title>
                    <Badge
                      count="500 Credits"
                      style={{ backgroundColor: '#52c41a' }}
                    />
                    <Paragraph style={{ color: '#fff' }}>
                      Advanced AI responses and priority support
                    </Paragraph>
                    <Text strong style={{ fontSize: '24px', color: '#fff' }}>
                      $19.99/month
                    </Text>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    backgroundColor: '#000',
                    color: '#fff',
                  }}
                  actions={[
                    <Button
                      key="subscribe"
                      type="primary"
                      onClick={() => handleSubscribe('enterprise-plan-id')}
                      loading={isCreatingPayment}
                    >
                      Subscribe for $49.99/month
                    </Button>,
                  ]}
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                  >
                    <Title level={3} style={{ marginBottom: 0, color: '#fff' }}>
                      Enterprise Plan
                    </Title>
                    <Badge
                      count="Unlimited Credits"
                      style={{ backgroundColor: '#52c41a' }}
                    />
                    <Paragraph style={{ color: '#fff' }}>
                      Premium AI responses and dedicated support
                    </Paragraph>
                    <Text strong style={{ fontSize: '24px', color: '#fff' }}>
                      $49.99/month
                    </Text>
                  </Space>
                </Card>
              </Col>
            </Row>
          )}
        </Space>
      </div>
    </PageLayout>
  )
}
