import React, { useState } from 'react';
import { Modal } from 'antd';
import { Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


import './style.scss';
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const ModelInfoEmployee = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Thêm nhân viên" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <Form
                    layout="horizontal"

                >
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Họ tên:">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={11}>
                            <Form.Item label="Giới tính:">
                                <Radio.Group>
                                    <Radio value="0"> Nam </Radio>
                                    <Radio value="1"> Nữ </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="DatePicker">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Số điện thoại:">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Email:">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Phòng ban:">
                                <Select>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Vị trí:">
                                <Select>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Ngày bắt đầu">
                                <DatePicker />
                            </Form.Item></Col>
                        <Col span={2}>
                        </Col>
                        <Col span={11}>
                            <Form.Item >
                                <Col span={4}>

                                </Col>
                                <Col span={7}>
                                    <Input />
                                </Col>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item label="Địa chỉ">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row >
                        <Col span={24}>
                            <Form.Item label="Kỹ năng:">
                                <Select
                                    mode="multiple"
                                    placeholder="Inserted are removed"
                                    value={selectedItems}
                                    onChange={setSelectedItems}
                                    style={{
                                        width: '100%',
                                    }}
                                    options={filteredOptions.map((item) => ({
                                        value: item,
                                        label: item,
                                    }))}
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Dự án:">
                                <Select>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>
        </>
    );
};
export default ModelInfoEmployee;
