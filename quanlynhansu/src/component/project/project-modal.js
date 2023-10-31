import React, { useState } from 'react';
import { Modal } from 'antd';
import { Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';



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

const ProjectModelComponent = () => {
    const [state, SetState] = useState("ADD")
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
            <Button type="primary" ghost onClick={showModal} style={{ marginRight: 16 }}>
                Thêm
            </Button>
            <Modal title="Thêm dự án" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <Form
                    layout="horizontal"
                    style={
                        { maxWidth: 800 }
                    }
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Tên dự án:">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Mô tả:">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default ProjectModelComponent;
