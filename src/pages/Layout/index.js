import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'


const { Header, Sider } = Layout

const items = [
    {
        label: 'Home',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: 'Manage Article',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: 'Create Article',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const onMenuClick = (route) => {
        console.log("Menu is clicked!", route)
        const path = route.key
        navigate(path)
    }

    // 反向高亮
    // 1. 获取当前路由路径
    const location = useLocation()
    console.log(location.pathname)
    const selectedkey = location.pathname
    // 2. 
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">Teacher John</span>
                    <span className="user-logout">
                        <Popconfirm title="Are you sure to log out?" okText="Logout" cancelText="Cancel">
                            <LogoutOutlined /> Logout
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedkey}
                        onClick={onMenuClick}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* Outlet of secondary routing */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout