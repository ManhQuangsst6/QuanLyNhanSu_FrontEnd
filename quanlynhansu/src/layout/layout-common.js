import React, { useState, useEffect } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomeOutlined, ProjectOutlined, UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons';
import ModelInfoEmployee from '../component/model-info-employee/model-info-employee';
import { Avatar, Space } from 'antd';
import './style.scss';
import ProjectComponent from '../component/project/project-component';
import HomeComponent from '../component/home/home-component';
import EmployeeComponent from '../component/employee-component/employee-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeProjectComponent from '../component/employeeInProject/employee-project';
const { Header, Content, Footer, Sider } = Layout;

const LayoutCommon = () => {
    const navigate = useNavigate()
    const [currentKeyNav, SetCurrentKeyNav] = useState('');
    const [textHeader, SetTextHeader] = useState('')
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        const link = window.location.href.split('/');
        const key = link[link.length - 1]
        switch (key) {
            case '':
                SetTextHeader("Trang chủ");
                break;
            case 'employee':
                SetTextHeader("Quản lý nhân viên");
                break;
            case 'project':
                SetTextHeader("Quản lý dự án");
                break;
        }
    }, [window])
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    onClick={({ key }) => {
                        navigate(key)
                        SetCurrentKeyNav(key)
                        switch (key) {
                            case '/':
                                SetTextHeader("Trang chủ");
                                break;
                            case '/employee':
                                SetTextHeader("Quản lý nhân viên");
                                break;
                            case '/project':
                                SetTextHeader("Quản lý dự án");
                                break;
                        }
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
                            key: "/employee"
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

                    <div className='text-header'>{textHeader}</div>
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            <Avatar src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg" size="large" icon={<UserOutlined />} />
                        </Space>

                    </Space>
                </Header>
                <Content style={{ backgroundColor: 'rgb(246 248 255)' }}>
                    <ContentShow ></ContentShow>

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
    const notify = () => {
        toast.success('success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return <div >
        <Routes>
            <Route path='/' element={<HomeComponent></HomeComponent>}></Route>
            <Route path='/employee' element={<EmployeeComponent></EmployeeComponent>}></Route>logout
            <Route path='/project' element={<ProjectComponent ></ProjectComponent>}></Route>
            <Route path='/project-employee/:id' element={<EmployeeProjectComponent></EmployeeProjectComponent>}></Route>
            <Route path='/logout' element={<h1></h1>}></Route>
        </Routes>
    </div>
}
export default LayoutCommon;