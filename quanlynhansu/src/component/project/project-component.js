import React, { useState, useEffect } from 'react';
import { Space, Button, Table, Input, Form, Row, Col, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, CaretRightOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
//import ProjectModelComponent from './project-modal';
import { useNavigate } from 'react-router-dom';
import {
    GetProjects, DeleteProject, UpdateComplete, AddProject, UpdateProject
} from "../../api/projectAPI";
import ConvertDate from '../../common/ConvertDateShow';
import { Modal } from 'antd';
const { Column, ColumnGroup } = Table;
const { Search } = Input;




const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

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
                    <a  ><EyeOutlined /></a>
                    <a onClick={() => showModal("EDIT", record)}><EditOutlined /></a>
                    <a onClick={() => DeleteAProject(record.key)}><DeleteOutlined /></a>
                    <a onClick={() => handleNavigation('/employee')}><CaretRightOutlined /></a>
                    {record.DateEnd == null && <a onClick={() => UpdateCompleteProject(record.key)}><CheckOutlined /></a>}
                </Space>
            ),
        },

    ];
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    const [filter, SetFilter] = useState({
        searchName: '',
        filterDay: '',
        filterMonth: ''
    })
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
        if (isRender === true)
            GetProjects(filter.searchName, filter.filterDay, filter.filterMonth).then(res => {
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


    ////

    const [textTitle, SetTextTilte] = useState("")
    const [state, SetState] = useState("ADD")
    const [dataPush, SetDataPush] = useState({ ID: null, Name: '', DateStart: null, DateEnd: null, Description: '' })
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (state, dataEdit) => {
        setIsModalOpen(true);
        SetState(state)
        console.log(dataEdit)
        if (state == "ADD") {
            SetTextTilte("Thêm mới dự án")
            ClearForm()
        }
        else if (state == "EDIT") SetTextTilte("Cập nhật dự án")
        if (dataEdit) {
            SetDataPush({
                ID: dataEdit.key,
                Name: dataEdit.Name,
                DateStart: dataEdit.DateStart,
                DateEnd: dataEdit.DateEnd,
                Description: dataEdit.Description
            })
        }

    };
    const ClearForm = () => {
        SetDataPush({ ID: null, Name: '', DateStart: null, DateEnd: null, Description: '' })
    }
    const UpdateCompleteProject = (id) => {
        UpdateComplete(id).then(res => {
            SetIsRender(true)
        })
    }
    const handleOk = () => {
        setIsModalOpen(false);
        if (state === "ADD") {
            AddProject(dataPush).then(res => {
                console.log(res)
                SetIsRender(true)
            })
        } else {

            UpdateProject(dataPush).then(res => {
                console.log(res)
                SetIsRender(true)
            })
        }
        ClearForm()
    };
    const handleCancel = () => {
        setIsModalOpen(false); ClearForm()
    };

    const handleChange = (e) => {

        SetDataPush((dataPush) => ({
            ...dataPush,
            [e.target.name]: e.target.value,
        }));

    };
    const ChangeFilter = (e) => {
        SetFilter((filter) => ({
            ...filter,
            [e.target.name]: e.target.value,
        }));

    }
    const FilterAction = () => {
        SetIsRender(true)
    }
    const ClearFilter = () => {
        SetFilter({
            searchName: '',
            filterDay: '',
            filterMonth: ''
        })
        SetIsRender(true)
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
                                <Input name='searchName' value={filter.searchName} onChange={ChangeFilter} />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label="Tháng">
                                <Input name='filterDay' value={filter.filterDay} onChange={ChangeFilter} />
                            </Form.Item></Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label="Năm">
                                <Input name='filterMonth' value={filter.filterMonth} onChange={ChangeFilter} />
                            </Form.Item>
                        </Col>
                        <Col span={4}></Col>
                        <Col span={3}>
                            <Button type="primary" style={{ marginRight: 10 }} onClick={FilterAction}> Lọc </Button>
                            <Button onClick={ClearFilter}>Làm mới </Button>
                        </Col>

                    </Row>
                </Form>
            </div>
            <div style={{ marginTop: "16px", }}>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Danh sách dự án</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }} >

                        <Button type="primary" ghost onClick={() => showModal("ADD")} style={{ marginRight: 16 }}>
                            Thêm
                        </Button>
                        <Modal title={textTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                            <Form
                                layout="horizontal"
                                style={
                                    { maxWidth: 800 }
                                }
                            >
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="Tên dự án:">
                                            <Input name="Name" value={dataPush.Name} onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="Mô tả:">
                                            <TextArea name="Description" rows={4} value={dataPush.Description} onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>

                        {/* <ProjectModelComponent ></ProjectModelComponent> */}
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