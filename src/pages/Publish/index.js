import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { createArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
    // GET channel list 
    const { channelList } = useChannel()

    // submit form 
    const onFinish = (formValue) => {
        console.log(formValue)
        // check if the cover imageType match with the number of imageList or not 
        if (imageList.length !== imageType) return message.warning('The cover image type does not match the image number!')
        const { title, content, channel_id } = formValue
        // 1. proccess form list collected based on the format of api document 
        const reqData = {
            title,
            content,
            cover: {
                type: imageType, // cover mode
                images: imageList.map(item => item.response.data.url) // images list 
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

    // Switch cover image type 
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        console.log('Switch cover', e.target.value)
        setImageType(e.target.value)
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
                    initialValues={{ type: 0 }}
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
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>Single image</Radio>
                                <Radio value={3}>Three images</Radio>
                                <Radio value={0}>No image</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onChange}
                            maxCount={imageType}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
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