import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'

// import resources 
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI, delArticleAPI } from '@/apis/article'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const navigate = useNavigate()
    const { channelList } = useChannel()
    // Prepare data 
    // Define status enum 
    const status = {
        1: <Tag color='warning'>Examination Pending</Tag>,
        2: <Tag color='success'>Examination Passed</Tag>
    }
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
            // data - the status returned from backend 
            // data === 1 => examination pending; data === 2 => examination passed 
            render: data => status[data]
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
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)}/>
                        <Popconfirm
                            title="Delete article"
                            description="Are you sure to delete this article?"
                            onConfirm={() => onConfirm(data)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
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

    // filter articles 
    // 1. prepare parameters 
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })

    // get article list 
    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {
            const res = await getArticleListAPI(reqData)
            setList(res.data.results)
            setCount(res.data.total_count)
        }
        getList()
    }, [reqData])

    // 2. get filtering data 
    const onFinish = (formValue) => {
        console.log(formValue)
        // 3. put the data collected from formValue into params 
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD')
        })
        // 4. pull article list again + render table: logic repeat 
        // when reqData changed, the useEffect function will be triggered 
    }

    // pagination 
    const onPageChange = (page) => {
        console.log(page)
        // Modify parameter dependencies, trigger data retrieval and list rendering
        setReqData({
            ...reqData,
            page
        })
    }

    // Delete article 
    const onConfirm = async (data) => {
        console.log('delete click', data)
        await delArticleAPI(data.id)
        setReqData({
            ...reqData, 
        })
    }


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
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value={''}>All</Radio>
                            <Radio value={0}>Examination Pending</Radio>
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
            <Card title={`According to the filter criteria, ${count} results were found:`}>
                <Table rowKey="id" columns={columns} dataSource={list} pagination={{
                    total: count,
                    pageSize: reqData.per_page,
                    onChange: onPageChange
                }} />
            </Card>
        </div>
    )
}

export default Article