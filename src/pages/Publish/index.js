import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getChannelAPI } from '@/apis/article'

const { Option } = Select

const Publish = () => {
    // GET channel list 
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        // 1. Encapsulate function, and call api in the function body 
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        // 2. call the function 
        getChannelList()
    }, [])

    // submit form 
    const onFinish = (formValue) => {
        console.log(formValue)
        const {title, content, channel_id} = formValue
        // 1. proccess form list collected based on the format of api document 
        const reqData = {
            title,
            content,
            cover: {
                type: 0, 
                images: []
            }, 
            channel_id
        }
        // 2. call api to submit 
        createArticleAPI(reqData)
    }

    // upload callback 
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        console.log('Uploading...', value)
        setImageList(value.fileList)
    }
    
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Home</Link> },
                        { title: 'Publish Article' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the article title' }]}
                    >
                        <Input placeholder="Please enter the article title" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Channel"
                        name="channel_id"
                        rules={[{ required: true, message: 'Please select the article channel' }]}
                    >
                        <Select placeholder="Please select the article channel" style={{ width: 400 }}>
                            {/* value attribute: After the user selects it, 
                            it will be automatically collected as the submission field of the interface */}
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Cover">
                    <Form.Item name="type">
                        <Radio.Group>
                        <Radio value={1}>Single image</Radio>
                        <Radio value={3}>Three images</Radio>
                        <Radio value={0}>No image</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Upload
                        listType="picture-card"
                        showUploadList
                        action={'http://geek.itheima.net/v1_0/upload'}
                        name='image'
                        onChange={onChange}
                    >
                        <div style={{ marginTop: 8 }}>
                        <PlusOutlined />
                        </div>
                    </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please enter the article content' }]}
                    >

                        {/* Rich text editor */}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="Please enter the content of the article"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                Publish
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish