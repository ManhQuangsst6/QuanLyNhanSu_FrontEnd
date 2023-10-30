import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomeOutlined, ProjectOutlined, UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons';
import ModelInfoEmployee from '../component/model-info-employee/model-info-employee';
import { Avatar, Space } from 'antd';
import './style.scss';
const { Header, Content, Footer, Sider } = Layout;

const LayoutCommon = () => {
    const navigate = useNavigate()
    const [currentKeyNav, SetCurrentKeyNav] = useState('/');
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    onClick={({ key }) => {
                        navigate(key)
                        SetCurrentKeyNav(key)
                    }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[currentKeyNav]}
                    items=
                    {[
                        { label: "Trang chủ", icon: <HomeOutlined />, key: "/" },
                        {
                            label: "Quản lý nhân viên",
                            icon: <UnorderedListOutlined />,
                            key: "/Employee"
                        },
                        { label: "Quản lý dự án", icon: <ProjectOutlined />, key: "/project" },
                        { label: "Đăng xuất", icon: <LogoutOutlined />, key: "/logout" }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            <Avatar src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg" size="large" icon={<UserOutlined />} />
                        </Space>

                    </Space>
                </Header>
                <Content>
                    <ContentShow></ContentShow>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
function ContentShow() {
    return <div>
        <Routes>
            <Route path='/' element={<div>Home</div>}></Route>
            <Route path='/Employee' element={<ModelInfoEmployee></ModelInfoEmployee>}></Route>logout
            <Route path='/Project' element={<div>Project</div>}></Route>
            <Route path='/logout' element={<div>Đăng xuất</div>}></Route>
        </Routes>
    </div>
}
export default LayoutCommon;