import React, { useState, useEffect } from 'react';
import { Space, Button, Table, Input, Form, Row, Col, } from 'antd';
import { EditOutlined, DeleteOutlined, CaretRightOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import ProjectModelComponent from './project-modal';
import {
    GetProjects, DeleteProject, UpdateComplete
} from "../../api/projectAPI";
import ConvertDate from '../../common/ConvertDateShow';
const { Column, ColumnGroup } = Table;
const { Search } = Input;



const ProjectComponent = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            width: '20%',
        },
        {
            title: 'DateStart',
            dataIndex: 'DateStart',
            width: '20%',
            render: (item) => ConvertDate(item)
        },
        {
            title: 'DateEnd',
            dataIndex: 'DateEnd',
            width: '20%',
            render: (item) => {
                return item ? ConvertDate(item) : ''
            }
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            width: '35%',
        },
        {
            title: 'Tùy chọn',
            dataIndex: 'action',
            width: '5%',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => DeleteAProject(record.key)} ><EyeOutlined /></a>
                    <a><EditOutlined /></a>
                    <a><DeleteOutlined /></a>
                    <a><CaretRightOutlined /></a>
                    <a><CheckOutlined /></a>
                </Space>
            ),
        },

    ];
    const [data, SetData] = useState([]);
    const [isRender, SetIsRender] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    useEffect(() => {
        if (isRender == true)
            GetProjects('', '', '').then(res => {
                let dataShow = res.data.map(item => {
                    return {
                        key: item.ID,
                        Name: item.Name,
                        DateStart: item.DateStart,
                        DateEnd: item.DateEnd,
                        Description: item.Description
                    }
                })
                SetData(dataShow)
            }).catch(e => {
                console.log(e)
            })
        SetIsRender(false)
    }, [isRender])
    const DeleteAProject = (id) => {
        DeleteProject(id).then(res => {
            SetIsRender(true)
        }).catch(e => {
            console.log(e)
        })
    }


    return (
        <div style={{ padding: 10 }}>
            <div >
                <Form
                    style={{ width: '100%', backgroundColor: '#fff', paddingTop: '20px', paddingLeft: '10px', borderRadius: '8px' }}
                >

                    <Row>
                        <Col span={5}>
                            <Form.Item label="Tên dự án">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label="Tháng">
                                <Input />
                            </Form.Item></Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label="Năm">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={4}></Col>
                        <Col span={3}>
                            <Button type="primary" style={{ marginRight: 10 }}> Lọc </Button>
                            <Button>Làm mới </Button>
                        </Col>

                    </Row>
                </Form>
            </div>
            <div style={{ marginTop: "16px", }}>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Danh sách dự án</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                        <ProjectModelComponent ></ProjectModelComponent>
                        {/* <Button type="primary" ghost style={{ marginRight: 16 }}>Thêm </Button> */}
                        <Button danger>Xóa </Button>
                    </div>
                </div>

                <div

                >

                    <span
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} >


                </Table>
            </div>
        </div>

    )
}

export default ProjectComponent;