import React, { useState } from 'react';
import { Modal } from 'antd';
import { Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
    AddProject, UpdateComplete
} from "../../api/projectAPI";


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
    const [data, SetData] = useState({ ID: null, Name: '', DateStart: null, DateEnd: null, Description: '' })
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        console.log(data);
        AddProject(data).then(res => {
            console.log(res)
        })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const changeName = (e) => {
        let name = e.target.value
        SetData({
            ID: data.ID, Name: name, DateStart: data.DateStart, DateEnd: data.DateEnd, Description: data.Description
        })
    }
    const changeDes = (e) => {
        let des = e.target.value
        SetData({
            ID: data.ID, Name: data.Name, DateStart: data.DateStart, DateEnd: data.DateEnd, Description: des
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        SetData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
        console.log(data)
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
                                <Input name="Name" value={data.Name} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Mô tả:">
                                <TextArea name="Description" rows={4} value={data.Description} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default ProjectModelComponent;
