import React, { useState, useEffect } from 'react';
import { Space, Button, Table, Input, Form, Row, Col, Select, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusSquareOutlined, ArrowUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import EmployeeModelComponent from '../model-info-employee/model-info-employee';
import { GetView_DepartmentList, GetView_PositionList, GetView_ProjectList, GetView_SkillList } from '../../api/listViewAPI';
import { GetEmployeeViews, DeleteEmployee, GetEmployeeInProjectView, AddEmployee_Project, DeleteEmployee_Project } from '../../api/EmployeeAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { GetProjectById } from '../../api/projectAPI';
const { Column } = Table;
const { Search } = Input;





const EmployeeProjectComponent = () => {
    let { id } = useParams();
    const [nameProject, SetNameProject] = useState('')
    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'Employeecode',
            width: '10%',
        },
        {
            title: 'Họ tên',
            dataIndex: 'Name',
            width: '20%',
        },
        {
            title: 'phòng',
            dataIndex: 'Department',
            width: '10%',
        },
        {
            title: 'vị trí',
            dataIndex: 'Position',
            width: '15%',
        },
        {
            title: 'dự án hiện tại',
            dataIndex: 'Project',
            width: '15%',
        },
        {
            title: 'mức lương ',
            dataIndex: 'Salary',
            width: '10%',
        },

    ];
    const [totalPages, setTotalPages] = useState(10);
    const [DataTable, SetDataTable] = useState([])
    const [DataAll, SetDataAll] = useState([])
    const [isRender, SetIsRender] = useState(true);
    const [resetData, SetResetData] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRowKeysChoose, setSelectedRowKeysChoose] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listDataDepartment, SetListDataDepartment] = useState([])
    const [listDataPosition, SetListDataPosition] = useState([])
    const [listDataSkill, SetListDataSkill] = useState([])
    const [listDataProject, SetListDataProject] = useState([])

    const [dataSearch, SetDataSearch] = useState({
        nameSearch: '',
        departmentID: '',
        positionID: '',
        projectID: id,
        skillID: '',
        pageNum: 1,
        pageSize: 5
    })
    useEffect(() => {
        GetProjectById(id).then(res => {
            SetNameProject(res.data.Name)
        }).catch(e => {
            console.log(e)
        })
        // SetDataSearch({
        //     ...dataSearch,
        //     projectID: 
        // });

        //  SetIsRender(true)

    }, [id])
    useEffect(() => {
        if (resetData) {
            GetView_DepartmentList().then(res => {
                let data = res.data.map(item => { return { value: item.ID, label: item.Name } })
                SetListDataDepartment(data)
            }).catch(e => {
                console.log(e)
            })
            GetView_PositionList().then(res => {
                let data = res.data.map(item => { return { value: item.ID, label: item.Name } })
                SetListDataPosition(data)
            }).catch(e => {
                console.log(e)
            }).catch(e => {
                console.log(e)
            })
            GetView_SkillList().then(res => {
                let data = res.data.map(item => { return { value: item.ID, label: item.Name } })
                SetListDataSkill(data)
            }).catch(e => {
                console.log(e)
            })
            GetView_ProjectList().then(res => {
                let data = res.data.map(item => { return { value: item.ID, label: item.Name } })
                SetListDataProject(data)
            }).catch(e => {
                console.log(e)
            })
            SetResetData(false)
        }

    }, [resetData])
    useEffect(() => {
        if (isRender) {
            console.log(dataSearch)
            GetEmployeeViews(dataSearch).then(res => {
                let dataShow = res.data.map(item => {
                    return {
                        key: item.Id,
                        Employeecode: item.Employeecode,
                        Department: item.Department,
                        Name: item.Name,
                        Position: item.Position,
                        Project: item.Project,
                        Salary: item.Salary,
                    }
                })
                SetDataTable(dataShow)
                SetIsRender(false)
            })
            // SetDataSearch({
            //     ...dataSearch,
            //     projectID: ''
            // });
            GetEmployeeViews({
                nameSearch: '',
                departmentID: '',
                positionID: '',
                projectID: '',
                skillID: '',
                pageNum: 1,
                pageSize: 5
            }).then(res => {
                let dataShow = res.data.map(item => {
                    return {
                        key: item.Id,
                        Employeecode: item.Employeecode,
                        Department: item.Department,
                        Name: item.Name,
                        Position: item.Position,
                        Project: item.Project,
                        Salary: item.Salary,
                    }
                }).
                    SetDataAll(dataShow)
            }).catch(e => {
                console.log(e)
            })

        }
    }, [isRender])
    const handleChangeSearchDepartment = (value) => {
        SetDataSearch({
            ...dataSearch,
            departmentID: value
        });
    }
    const handleChangeSearchPosition = (value) => {
        SetDataSearch({
            ...dataSearch,
            positionID: value
        });
    }
    const handleChangeSearchProject = (value) => {
        SetDataSearch({
            ...dataSearch,
            projectID: value
        });
    }
    const handleChangeSearchSkill = (value) => {
        SetDataSearch({
            ...dataSearch,
            skillID: value
        });
    }
    const ChangeFilterText = (e) => {
        SetDataSearch((dataSearch) => ({
            ...dataSearch,
            [e.target.name]: e.target.value,
        }));

    }
    const Filter = () => {
        SetIsRender(true)
        console.log(isRender)
    }
    const ClearFilter = () => {
        SetDataSearch({
            nameSearch: '',
            departmentID: '',
            positionID: '',
            projectID: id,
            skillID: '',
            pageNum: 1,
            pageSize: 5
        })
        SetIsRender(true)
    }
    useEffect(() => {
        fetchRecords(1);
    }, []);
    const fetchRecords = (pageNum) => {
        SetDataSearch({
            ...dataSearch,
            pageNum: pageNum,
            projectID: id
        });
        SetIsRender(true)
    }
    const showInfoDelete = () => {
        console.log(selectedRowKeys)
    }

    //
    const notify = (message) => {
        toast.success(message + ' thành công!', {
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
    const RemoveEmployee = (id) => {
        DeleteEmployee(id).then(res => {
            console.log(res);
            SetIsRender(true);
            notify("Xóa nhân viên")
        }).catch(e => {
            console.log(e)
        })
    }
    ///
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        ClearFormSearchModel()
        setIsModalOpen(true);
    }
    const handleOk = () => {
        const data = { id: id, employees: selectedRowKeysChoose }
        AddEmployee_Project(data).then(res => {
            console.log(res)
            setIsModalOpen(false);
            SetIsRender(true)
        }).catch(e => {
            console.log(e)
        })

        //setSelectedRowKeysChoose([])
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // setSelectedRowKeysChoose([])
        SetIsRender(true)
    };
    const FilterDataModal = () => {
        GetEmployeeViews(dataSearch).then(res => {
            let dataShow = res.data.map(item => {
                return {
                    key: item.Id,
                    Employeecode: item.Employeecode,
                    Department: item.Department,
                    Name: item.Name,
                    Position: item.Position,
                    Project: item.Project,
                    Salary: item.Salary,
                }
            })
            SetDataAll(dataShow)
        }).catch(e => {
            console.log(e)
        })
    }
    const [modal, contextHolder] = Modal.useModal();
    const ShowRemove = () => {
        modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Xác nhận xóa ?',
            okText: 'Xóa',
            onOk() {
                const data = { id: id, employees: selectedRowKeys }
                DeleteEmployee_Project(data).then(res => {
                    SetIsRender(true)
                    notify("Xóa nhân viên")
                }).catch(e => {
                    console.log(e)
                })
            },
            cancelText: 'Quay lại',
        });
    }
    const ClearFormSearchModel = () => {
        GetEmployeeViews({
            nameSearch: '',
            departmentID: '',
            positionID: '',
            projectID: '',
            skillID: '',
            pageNum: 1,
            pageSize: 5
        }).then(res => {
            let dataShow = res.data.map(item => {
                return {
                    key: item.Id,
                    Employeecode: item.Employeecode,
                    Department: item.Department,
                    Name: item.Name,
                    Position: item.Position,
                    Project: item.Project,
                    Salary: item.Salary,
                }
            })
            SetDataAll(dataShow)
        }).catch(e => {
            console.log(e)
        })

    }
    return (
        <div style={{ padding: 10 }}>
            <div>
                <Row>
                    <Col span={12} className='test'>
                        Tên dự án:{nameProject}
                    </Col>
                </Row>

            </div>
            <div>
                <Form
                    style={{ width: '100%', backgroundColor: '#fff', paddingTop: '20px', paddingLeft: '10px', borderRadius: '8px' }}
                >
                    <Row>
                        <Col span={5}>
                            <Form.Item label="Tên nhân viên">
                                <Input style={{
                                    width: 200,
                                }} value={dataSearch.nameSearch} onChange={ChangeFilterText} name='nameSearch' />
                            </Form.Item>
                        </Col>
                        <Col span={3}></Col>
                        <Col span={5}>
                            <Form.Item label="Phòng ban">
                                <Select
                                    showSearch
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={handleChangeSearchDepartment}
                                    placeholder=""
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={dataSearch.departmentID}
                                    options={listDataDepartment}
                                />
                            </Form.Item>
                        </Col>


                    </Row>
                    <Row>
                        <Col span={5}>
                            <Form.Item label="Skill">
                                <Select
                                    showSearch
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={handleChangeSearchSkill}
                                    placeholder=""
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={dataSearch.skillID}
                                    options={listDataSkill} />
                            </Form.Item>
                        </Col>
                        <Col span={3}></Col>
                        <Col span={5}>
                            <Form.Item label="Vị trí">
                                <Select
                                    showSearch
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={handleChangeSearchPosition}
                                    placeholder=""
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={dataSearch.positionID}
                                    options={listDataPosition} />
                            </Form.Item>
                        </Col>
                        <Col span={3}></Col>
                        <Col span={5}>
                            <Button type="primary" style={{ marginRight: 10 }} onClick={Filter}> Lọc </Button>
                            <Button onClick={ClearFilter}>Làm mới </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div style={{ marginTop: "16px" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Danh sách nhân viên</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button danger onClick={() => ShowRemove()} style={{ marginRight: 16 }}>
                            Xóa
                        </Button>  {contextHolder}
                        <Button type="primary" ghost onClick={() => showModal("ADD")} style={{ marginRight: 16 }}>
                            Thêm
                        </Button>
                        <Modal title="Danh sách nhân viên" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                            width={1000}>
                            <div>
                                <Form
                                    style={{ width: '100%', backgroundColor: '#fff', paddingTop: '20px', paddingLeft: '10px', borderRadius: '8px' }}
                                >
                                    <Row>
                                        <Col span={5}>
                                            <Form.Item label="Tên nhân viên">
                                                <Input style={{
                                                    width: 200,
                                                }} value={dataSearch.nameSearch} onChange={ChangeFilterText} name='nameSearch' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={3}></Col>
                                        <Col span={5}>
                                            <Form.Item label="Phòng ban">
                                                <Select
                                                    showSearch
                                                    style={{
                                                        width: 200,
                                                    }}
                                                    onChange={handleChangeSearchDepartment}
                                                    placeholder=""
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    value={dataSearch.departmentID}
                                                    options={listDataDepartment}
                                                />
                                            </Form.Item>
                                        </Col>



                                    </Row>
                                    <Row>
                                        <Col span={5}>
                                            <Form.Item label="Vị trí">
                                                <Select
                                                    showSearch
                                                    style={{
                                                        width: 200,
                                                    }}
                                                    onChange={handleChangeSearchPosition}
                                                    placeholder=""
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    value={dataSearch.positionID}
                                                    options={listDataPosition} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={3}></Col>
                                        <Col span={5}>
                                            <Form.Item label="Skill">
                                                <Select
                                                    showSearch
                                                    style={{
                                                        width: 200,
                                                    }}
                                                    onChange={handleChangeSearchSkill}
                                                    placeholder=""
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    value={dataSearch.skillID}
                                                    options={listDataSkill} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={3}></Col>


                                        <Col span={5}>
                                            <Button type="primary" style={{ marginRight: 10 }} onClick={FilterDataModal}> Lọc </Button>
                                            <Button onClick={ClearFilter}>Làm mới </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <div style={{ marginTop: "16px" }}>
                                <div >
                                    <h3>Danh sách nhân viên</h3>

                                </div>
                                <Table rowSelection={{
                                    selectedRowKeysChoose,
                                    onChange: setSelectedRowKeysChoose,
                                    getCheckboxProps: (record) => ({

                                        disabled: DataTable.map(item => item.key).includes(record.key),
                                    }),

                                }}
                                    columns={columns} dataSource={DataAll}
                                    pagination={{
                                        pageSize: 5,
                                        total: totalPages,
                                        onChange: (page) => {
                                            fetchRecords(page);
                                        },
                                    }} />
                            </div>
                        </Modal>

                    </div>
                </div>
                <Table rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                    columns={columns} dataSource={DataTable}
                />
            </div>
            <ToastContainer />
        </div>
    );
};

export default EmployeeProjectComponent;
