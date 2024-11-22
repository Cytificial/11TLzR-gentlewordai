import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Tag,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function AdminDashboardPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.globalRole !== 'ADMIN') {
      navigate('/home')
    }
  }, [user, navigate])

  if (!user || user.globalRole !== 'ADMIN') {
    return null
  }
  const [isUserModalVisible, setIsUserModalVisible] = useState(false)
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [form] = Form.useForm()
  const [planForm] = Form.useForm()

  // Fetch users with their subscriptions
  const { data: users, refetch: refetchUsers } = Api.user.findMany.useQuery({
    include: {
      subscriptions: {
        include: {
          plan: true,
        },
      },
    },
  })

  // Fetch plans
  const { data: plans, refetch: refetchPlans } = Api.plan.findMany.useQuery({})

  // Mutations
  const updateUser = Api.user.update.useMutation()
  const updatePlan = Api.plan.update.useMutation()
  const createPlan = Api.plan.create.useMutation()

  const handleUserUpdate = async (values: any) => {
    await updateUser.mutateAsync({
      where: { id: selectedUser.id },
      data: values,
    })
    setIsUserModalVisible(false)
    refetchUsers()
  }

  const handlePlanUpdate = async (values: any) => {
    if (selectedPlan) {
      await updatePlan.mutateAsync({
        where: { id: selectedPlan.id },
        data: values,
      })
    } else {
      await createPlan.mutateAsync({
        data: values,
      })
    }
    setIsPlanModalVisible(false)
    refetchPlans()
  }

  const userColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'VERIFIED' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Current Plan',
      key: 'currentPlan',
      render: (record: any) => {
        const currentSub = record.subscriptions?.[0]
        return currentSub?.plan?.name || 'No Plan'
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedUser(record)
            form.setFieldsValue(record)
            setIsUserModalVisible(true)
          }}
        >
          <i className="las la-edit"></i> Edit
        </Button>
      ),
    },
  ]

  const planColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Credits', dataIndex: 'credits', key: 'credits' },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedPlan(record)
            planForm.setFieldsValue(record)
            setIsPlanModalVisible(true)
          }}
        >
          <i className="las la-edit"></i> Edit
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-user-shield"></i> Admin Dashboard
        </Title>
        <Text>
          Manage users and subscription plans from this central dashboard.
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-users"></i> Users Management
                </>
              }
              extra={<Text>Total Users: {users?.length || 0}</Text>}
            >
              <Table dataSource={users} columns={userColumns} rowKey="id" />
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-tags"></i> Subscription Plans
                </>
              }
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedPlan(null)
                    planForm.resetFields()
                    setIsPlanModalVisible(true)
                  }}
                >
                  <i className="las la-plus"></i> New Plan
                </Button>
              }
            >
              <Table dataSource={plans} columns={planColumns} rowKey="id" />
            </Card>
          </Col>
        </Row>

        <Modal
          title="Edit User"
          open={isUserModalVisible}
          onCancel={() => setIsUserModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleUserUpdate} layout="vertical">
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                <Select.Option value="VERIFIED">Verified</Select.Option>
                <Select.Option value="INVITED">Invited</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={selectedPlan ? 'Edit Plan' : 'Create Plan'}
          open={isPlanModalVisible}
          onCancel={() => setIsPlanModalVisible(false)}
          footer={null}
        >
          <Form form={planForm} onFinish={handlePlanUpdate} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="credits"
              label="Credits"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {selectedPlan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
