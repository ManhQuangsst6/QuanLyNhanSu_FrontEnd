import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddEmployee, UpdateEmployee } from '../../api/EmployeeAPI';
import moment from 'moment';
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
const ModelInfoEmployee = ({ listDataDepartment, listDataPosition, listDataSkill, listDataProject,
    isShow, OnHide, dataEdit, ResetTable }) => {
    // const [selectedItems, setSelectedItems] = useState([]);
    //const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        ID: '',
        Code: '',
        Name: '',
        BirthDate: null,
        Address: '',
        PhoneNumber: '',
        Email: '',
        DepartmentID: '',
        PositionID: '',
        DateStart: null,
        Gender: 0,
        UserID: '',
        Avatar: '',
        userName: '',
        skillList: [],
        salaryID: '',
        SalaryAmount: 0,
        salaryStartDate: null
    });
    const [formErrors, setFormErrors] = useState({});
    const [state, SetState] = useState('');
    useEffect(() => {
        if (Object.keys(dataEdit).length > 0) {

            SetState("EDIT")
            let data = dataEdit[0];
            data.BirthDate = moment(dataEdit.BirthDate);

            data.DateStart = moment(dataEdit.BirthDate);
            setFormData({ ...data })
            console.log('dataEdit')
            console.log(formData, dataEdit)
        }

    }, [dataEdit])
    const handleOk = () => {
        //  console.log(formData)
        const errors = {};

        if (!formData.Name) {
            errors.Name = 'Họ tên không được bỏ trống';
        }

        if (!formData.Code) {
            errors.Code = 'Mã nhân viên không được bỏ trống';
        }
        if (!formData.BirthDate) {
            errors.BirthDate = 'Ngày sinh không được bỏ trống';
        }

        if (!formData.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.Email = 'Email không hợp lệ';
        }

        if (!formData.PhoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
            errors.PhoneNumber = 'Số điện thoại không hợp lệ';
        }

        if (!formData.DepartmentID) {
            errors.DepartmentID = 'Phòng ban không được bỏ trống';
        }

        if (!formData.PositionID) {
            errors.PositionID = 'Vị trí không được bỏ trống';
        }

        if (!formData.DateStart) {
            errors.DateStart = 'Ngày bắt đầu không được bỏ trống';
        }

        if (!formData.SalaryAmount || isNaN(parseFloat(formData.salaryAmount))) {
            errors.SalaryAmount = 'Mức lương không hợp lệ';
        }

        if (!formData.Address) {
            errors.Address = 'Địa chỉ không được bỏ trống';
        }
        if (formData.skillList.length === 0) {
            errors.skillList = 'Vui lòng chọn ít nhất một kỹ năng';
        }
        if (!formData.userName && state != "EDIT") {
            errors.userName = 'Tên tài khoản không được bỏ trống';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});

        if (state === "EDIT") {
            UpdateEmployee(formData).then(res => {
                setIsModalOpen(false);
                OnHide()
                ResetTable()
            })
        }
        else {

            AddEmployee(formData).then(res => {
                setIsModalOpen(false);
                OnHide()
                ResetTable()
            })
        }
        SetState("")
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
        SetState("")
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
                            <Form.Item label="Họ tên:" validateStatus={formErrors.Name ? 'error' : ''} help={formErrors.Name}>
                                <Input value={formData.Name} onChange={(e) => handleChange('Name', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Mã nhân viên" validateStatus={formErrors.Code ? 'error' : ''} help={formErrors.Code}>
                                <Input value={formData.Code} onChange={(e) => handleChange('Code', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={11}>
                            <Form.Item label="Giới tính:">
                                <Radio.Group
                                    value={formData.Gender}
                                    onChange={handleChangeGender}
                                >
                                    <Radio value={0}>Nam</Radio>
                                    <Radio value={1}>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="DatePicker" validateStatus={formErrors.BirthDate ? 'error' : ''} help={formErrors.BirthDate} >
                                <DatePicker value={formData.BirthDate}
                                    onChange={(date) => handleChange('BirthDate', date)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Số điện thoại:" validateStatus={formErrors.PhoneNumber ? 'error' : ''} help={formErrors.PhoneNumber}>
                                <Input value={formData.PhoneNumber} onChange={(e) => handleChange('PhoneNumber', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Email:" validateStatus={formErrors.Email ? 'error' : ''} help={formErrors.Email}>
                                <Input value={formData.Email} onChange={(e) => handleChange('Email', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Phòng ban" validateStatus={formErrors.DepartmentID ? 'error' : ''} help={formErrors.DepartmentID}>
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
                                    value={formData.DepartmentID} onChange={(value) => handleChange('DepartmentID', value)}
                                    options={listDataDepartment}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Vị trí" validateStatus={formErrors.PositionID ? 'error' : ''} help={formErrors.PositionID}>
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
                                    value={formData.PositionID} onChange={(value) => handleChange('PositionID', value)}
                                    options={listDataPosition} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Ngày bắt đầu" validateStatus={formErrors.DateStart ? 'error' : ''} help={formErrors.DateStart}>
                                <DatePicker value={formData.DateStart}
                                    onChange={(date) => handleChange('DateStart', date)} />
                            </Form.Item></Col>
                        <Col span={2}>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="Mức lương" validateStatus={formErrors.SalaryAmount ? 'error' : ''} help={formErrors.SalaryAmount}>
                                <Input value={formData.SalaryAmount} onChange={(e) => handleChange('SalaryAmount', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item label="Địa chỉ" validateStatus={formErrors.Address ? 'error' : ''} help={formErrors.Address}>
                                <TextArea rows={4} value={formData.Address} onChange={(e) => handleChange('Address', e.target.value)} />
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
                    {state != "EDIT" && <Row >
                        <Col span={24}>
                            <Form.Item label="Tên tài khoản" validateStatus={formErrors.userName ? 'error' : ''} help={formErrors.userName}>
                                <Input value={formData.userName} onChange={(e) => handleChange('userName', e.target.value)} />

                            </Form.Item>
                        </Col>
                    </Row>}
                </Form>

            </Modal>
        </>
    );
};
export default ModelInfoEmployee;
