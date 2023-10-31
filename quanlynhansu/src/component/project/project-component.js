import React, { useState, useEffect } from 'react';
import { Space, Button, Table, Input, Form, Row, Col, } from 'antd';
import { EditOutlined, DeleteOutlined, CaretRightOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import ProjectModelComponent from './project-modal';
const { Column, ColumnGroup } = Table;
const { Search } = Input;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: '30%',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: '30%',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: '35%',
    },
    {
        title: 'Tùy chọn',
        dataIndex: 'action',
        width: '5%',
        render: (_, record) => (
            <Space size="middle">
                <a><EyeOutlined /></a>
                <a><EditOutlined /></a>
                <a><DeleteOutlined /></a>
                <a><CaretRightOutlined /></a>
                <a><CheckOutlined /></a>
            </Space>
        ),
    },

];
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}
const ProjectComponent = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


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
                        <ProjectModelComponent></ProjectModelComponent>
                        {/* <Button type="primary" ghost style={{ marginRight: 16 }}>Thêm </Button> */}
                        <Button danger>Xóa </Button>
                    </div>
                </div>

                <div
                    style={{

                    }}
                >

                    {/* <span
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span> */}
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} >


                </Table>
            </div>
        </div>

    )
}

export default ProjectComponent;