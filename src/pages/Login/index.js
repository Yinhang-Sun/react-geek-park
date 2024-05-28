import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'

const Login = () => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    console.log(values);
    // Trigger asychronous action, fetchLogin 
    dispatch(fetchLogin(values))
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* Login Form */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'Mobile phone number format is wrong'
              }
            ]}>
            <Input size="large" placeholder="Please enter phone number" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input your verification code!',
              },
            ]}>
            <Input size="large" placeholder="Please enter verification code" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login