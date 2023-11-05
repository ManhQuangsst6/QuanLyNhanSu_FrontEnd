import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddEmployee } from '../../api/EmployeeAPI';

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
const ModelInfoEmployee = ({ listDataDepartment, listDataPosition, listDataSkill, listDataProject, isShow, OnHide }) => {
    // const [selectedItems, setSelectedItems] = useState([]);
    //const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        code: '',
        name: '',
        birthDate: null,
        address: '',
        phoneNumber: '',
        email: '',
        departmentID: '',
        positionID: '',
        dateStart: null,
        gender: 0,
        userID: '',
        avatar: '',
        userName: '',
        skillList: [],
        salaryID: '',
        salaryAmount: 0,
        salaryStartDate: null
    });
    const [formErrors, setFormErrors] = useState({});
    const handleOk = () => {
        // Basic validation example (you can add more complex validations as needed)
        const errors = {};

        if (!formData.name) {
            errors.name = 'Họ tên không được bỏ trống';
        }

        if (!formData.code) {
            errors.code = 'Mã nhân viên không được bỏ trống';
        }
        if (!formData.birthDate) {
            errors.birthDate = 'Ngày sinh không được bỏ trống';
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Email không hợp lệ';
        }

        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại không hợp lệ';
        }

        if (!formData.departmentID) {
            errors.departmentID = 'Phòng ban không được bỏ trống';
        }

        if (!formData.positionID) {
            errors.positionID = 'Vị trí không được bỏ trống';
        }

        if (!formData.dateStart) {
            errors.dateStart = 'Ngày bắt đầu không được bỏ trống';
        }

        if (!formData.salaryAmount || isNaN(parseFloat(formData.salaryAmount))) {
            errors.salaryAmount = 'Mức lương không hợp lệ';
        }

        if (!formData.address) {
            errors.address = 'Địa chỉ không được bỏ trống';
        }
        if (formData.skillList.length === 0) {
            errors.skillList = 'Vui lòng chọn ít nhất một kỹ năng';
        }
        if (!formData.userName) {
            errors.userName = 'Tên tài khoản không được bỏ trống';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});
        AddEmployee(formData).then(res => {
            setIsModalOpen(false);
            OnHide()
        })
    };

    const handleChangeGender = (e) => {
        setFormData({
            ...formData,
            gender: e.target.value
        });
    };
    const handleChangeSkills = (selectedSkills) => {
        setFormData({
            ...formData,
            skillList: selectedSkills
        });
    };

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    const handleCancel = () => {

        setIsModalOpen(false);
        OnHide()
    };
    const handleChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };
    useEffect(() => {
        setIsModalOpen(isShow)
    }, [isShow])
    return (
        <>
            {/* <Button type="primary" onClick={showModal} style={{ marginRight: 6 }}>
                Thêm
            </Button> */}
            <Modal title="Thêm nhân viên" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
                <Form
                    layout="horizontal"
                    style={
                        { maxWidth: 800 }
                    }
                >
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Họ tên:" validateStatus={formErrors.name ? 'error' : ''} help={formErrors.name}>
                                <Input value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Mã nhân viên" validateStatus={formErrors.code ? 'error' : ''} help={formErrors.code}>
                                <Input value={formData.code} onChange={(e) => handleChange('code', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={11}>
                            <Form.Item label="Giới tính:">
                                <Radio.Group
                                    value={formData.gender}
                                    onChange={handleChangeGender}
                                >
                                    <Radio value={0}>Nam</Radio>
                                    <Radio value={1}>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="DatePicker" validateStatus={formErrors.birthDate ? 'error' : ''} help={formErrors.birthDate} >
                                <DatePicker value={formData.birthDate}
                                    onChange={(date) => handleChange('birthDate', date)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Số điện thoại:" validateStatus={formErrors.phoneNumber ? 'error' : ''} help={formErrors.phoneNumber}>
                                <Input value={formData.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Email:" validateStatus={formErrors.email ? 'error' : ''} help={formErrors.email}>
                                <Input value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Phòng ban" validateStatus={formErrors.departmentID ? 'error' : ''} help={formErrors.departmentID}>
                                <Select
                                    showSearch
                                    style={{
                                        width: 200,
                                    }}
                                    placeholder=""
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={formData.departmentID} onChange={(value) => handleChange('departmentID', value)}
                                    options={listDataDepartment}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Vị trí" validateStatus={formErrors.positionID ? 'error' : ''} help={formErrors.positionID}>
                                <Select
                                    showSearch
                                    style={{
                                        width: 200,
                                    }}
                                    placeholder=""
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={formData.positionID} onChange={(value) => handleChange('positionID', value)}
                                    options={listDataPosition} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Ngày bắt đầu" validateStatus={formErrors.dateStart ? 'error' : ''} help={formErrors.dateStart}>
                                <DatePicker value={formData.dateStart}
                                    onChange={(date) => handleChange('dateStart', date)} />
                            </Form.Item></Col>
                        <Col span={2}>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="Mức lương" validateStatus={formErrors.salaryAmount ? 'error' : ''} help={formErrors.salaryAmount}>
                                <Input value={formData.salaryAmount} onChange={(e) => handleChange('salaryAmount', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item label="Địa chỉ" validateStatus={formErrors.address ? 'error' : ''} help={formErrors.address}>
                                <TextArea rows={4} value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row >
                        <Col span={24}>
                            <Form.Item label="Kỹ năng:" validateStatus={formErrors.skillList ? 'error' : ''} help={formErrors.skillList}>
                                <Select
                                    mode="multiple"
                                    placeholder=""

                                    onChange={handleChangeSkills}
                                    style={{
                                        width: '100%',
                                    }}
                                    value={formData.skillList}
                                    options={listDataSkill}
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Tên tài khoản" validateStatus={formErrors.userName ? 'error' : ''} help={formErrors.userName}>
                                <Input value={formData.userName} onChange={(e) => handleChange('userName', e.target.value)} />

                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>
        </>
    );
};
export default ModelInfoEmployee;
