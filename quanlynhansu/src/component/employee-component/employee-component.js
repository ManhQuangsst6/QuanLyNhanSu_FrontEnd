import React, { useState } from 'react';
import { Space, Button, Table, Input, Form, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import EmployeeModelComponent from '../model-info-employee/model-info-employee';
const { Column } = Table;
const { Search } = Input;

const columns = [
    {
        title: 'Họ và Tên',
        dataIndex: 'name',
        width: '30%',
    },
    {
        title: 'Tuổi',
        dataIndex: 'age',
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: '35%',
    },
    {
        title: 'Tùy chọn',
        dataIndex: 'action',
        width: '15%',
        render: (_, record) => (
            <Space size="middle">
                <a><EyeOutlined /></a>
                <a><EditOutlined /></a>
                <a><DeleteOutlined /></a>
                <a><CheckOutlined /></a>
            </Space>
        ),
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `John Doe ${i}`,
        age: 28 + i,
        email: `john.doe${i}@example.com`,
    });
}

const EmployeeComponent = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        // Simulate an AJAX request
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{ padding: 10 }}>
            <div>
                <Form
                    style={{ width: '100%', backgroundColor: '#fff', paddingTop: '20px', paddingLeft: '10px', borderRadius: '8px' }}
                >
                    <Row>
                        <Col span={5}>
                            <Form.Item label="Tên nhân viên">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label="Phòng ban">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label="Skill">
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
            <div style={{ marginTop: "16px" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Danh sách nhân viên</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <EmployeeModelComponent></EmployeeModelComponent>
                        <Button danger>Xóa </Button>
                    </div>
                </div>
                <Table rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }} columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default EmployeeComponent;
