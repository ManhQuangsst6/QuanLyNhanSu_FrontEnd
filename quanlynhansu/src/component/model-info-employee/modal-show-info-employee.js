import React, { useEffect, useState } from 'react';
import { Button, Modal, Descriptions, Table } from 'antd';
const ModalShowInfoEmployee = ({ HideInfoEmployee, isModalOpen, data }) => {
    const columnsProject = [
        {
            title: 'Tên dự án',
            dataIndex: 'ProjectID',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'StartDate',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'EndDate',
        },
        {
            title: 'Tiền thưởng',
            dataIndex: 'Bonus',
        },
    ];
    const columnsSalary = [

        {
            title: 'Ngày bắt đầu',
            dataIndex: 'StartDate',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'EndDate',
        },
        {
            title: 'Lương',
            dataIndex: 'Amount',
        },
    ];
    const [item, SetItem] = useState([]);
    const [skills, SetSkills] = useState('')

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            SetItem([
                { label: 'Full Name', content: data.EmployeeInfo.FullName },
                { label: 'Birth Date', content: data.EmployeeInfo.BirthDate },
                { label: 'Address', content: data.EmployeeInfo.Address },
                { label: 'Phone Number', content: data.EmployeeInfo.PhoneNumber },
                { label: 'Email', content: data.EmployeeInfo.Email },
                { label: 'Gender', content: data.EmployeeInfo.Gender === 1 ? 'Male' : 'Female' },
            ])
            let str = ''
            data.Skills.forEach(item => {
                str += item.SkillName + ', '
            })
            SetSkills(str)
        }
    }, [data])

    const handleOk = () => {
        HideInfoEmployee()
    };

    const handleCancel = () => {
        HideInfoEmployee()
    };
    return (
        <>
            <>

                <Modal title="Thông tin chi tiết" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={900}>
                    <Descriptions title="" layout="vertical">
                        {item.map(ite => (
                            <Descriptions.Item label={ite.label} key={ite.label}>
                                {ite.content}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                    <div>Các kỹ năng nhân viên : {skills}</div>
                    <div>
                        <h3>Bảng các dự án từng tham gia</h3>
                        <Table dataSource={data.ProjectInfo} columns={columnsProject} />
                    </div>
                    <div>
                        <h3>Bảng các mức lương từng nhận</h3>
                        <Table dataSource={data.SalaryInfo} columns={columnsSalary} />
                    </div>
                </Modal>
            </>
        </>
    )
}
export default ModalShowInfoEmployee;