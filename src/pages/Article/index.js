import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'

// import resources 
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const { channelList } = useChannel()

    // Prepare data 
    const columns = [
        {
            title: 'Cover',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 220
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: data => <Tag color="green">Examination Passed</Tag>
        },
        {
            title: 'Publish Date',
            dataIndex: 'pubdate'
        },
        {
            title: 'Reads',
            dataIndex: 'read_count'
        },
        {
            title: 'Comments',
            dataIndex: 'comment_count'
        },
        {
            title: 'Likes',
            dataIndex: 'like_count'
        },
        {
            title: 'Operation',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                )
            }
        }
    ]
    // Prepare table body data 
    const data = [
        {
            id: '8218',
            comment_count: 0,
            cover: {
                images: [],
            },
            like_count: 0,
            pubdate: '2019-03-11 09:00:00',
            read_count: 2,
            status: 2,
            title: 'Wkwebview offline loading h5 resource solution'
        }
    ]

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Home</Link> },
                        { title: 'Article List' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }}>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value={''}>All</Radio>
                            <Radio value={0}>Draft</Radio>
                            <Radio value={2}>Examination Passed</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Channel" name="channel_id">
                        <Select
                            placeholder="Please select article channel"
                            defaultValue="lucy"
                            style={{ width: 120 }}
                        >
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Date" name="date">
                        <RangePicker></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            Filter
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* Table area */}
            <Card title={`According to the filter criteria, count results were found:`}>
                <Table rowKey="id" columns={columns} dataSource={data} />
            </Card>
        </div>
    )
}

export default Article