import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table, Tag, theme } from 'antd';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import classService from "@services/class.service";
import { daysInWeek } from "@utils/constants";
import { formatDate } from "@utils/index";
import ClassCreatingModal from "../ClassManagement/ClassCreatingModal";
import studentService from "@services/student.service";
import StudentCreatingModal from "./StudentCreatingModal";

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;

interface DataType {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    address: Date;
    active: boolean;
}

const data: DataType[] = [

];

function StudentManagement() {
    const [cls, setCls] = useState<DataType[]>([])
    const [textSearch, setTextSearch] = useState('')
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [pageIndex, setpageIndex] = useState(1)
    const [open, setOpen] = useState(false);

    const fresh = async () => {
        const data = await studentService.get()

        setCls(data)
    }
    const deleteClass = async (classId: number) => {
        await studentService.delete(classId)
        fresh()
    }

    const onClickDelete = async (id: number, name: string) => {
        const confirmed = await confirm({
            title: 'Xác nhận',
            content: (
                <>
                    Bạn chắc chắn muốn Xóa học viên có Id <Tag>{`${id}`}</Tag>, tên <Tag>{name}</Tag>
                </>
            ),
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: ()=>{
                deleteClass(id)
            }
        });

    }

    useEffect(() => {
        fresh()
    }, [textSearch, pageIndex])
    return (<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div
            style={{
                padding: 24,
                paddingTop: 10,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                minHeight: '100vh',
            }}
        >
            <h3>Danh sách học viên</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0px' }}>
                <Space.Compact size="middle">
                    <Input addonBefore={<SearchOutlined />} placeholder="Tìm kiếm" />
                </Space.Compact>
                <Button icon={<PlusOutlined />} onClick={() => {
                    setOpen(true);
                }}>
                    Thêm học viên
                </Button>
            </div>

            <Table dataSource={cls}>

                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Họ tên" dataIndex="fullName" key="fullName" />
                <Column title="Số điện thoại" dataIndex="phone" key="phone" />
                <Column title="Email" dataIndex="email" key="email" />

                <Column title="Địa chỉ" dataIndex="address" key="address" />
                <Column title="Lớp đã tham gia" dataIndex="address" key="address" />
                {/* <Column title="Thời khóa biểu" dataIndex="schedules" key="size"
                    render={(schedules: any[]) => (
                        <div>
                            {schedules.map((schedule) => (<div>{`${daysInWeek[schedule.day]} ${schedule.start}-${schedule.end} Phòng ${schedule.room.name}`}</div>))}
                        </div>
                    )} /> */}
                {/* <Column
                    title="Môn"
                    dataIndex="subject"
                    key="subject"
                    render={(tags: any[]) => (
                        <>
                            {tags.map((tag) => (
                                <Tag color="blue" key={tag.name}>
                                    {tag.name}
                                </Tag>
                            ))}
                        </>
                    )}
                /> */}
                {/* <Column
                    title="Giáo viên"
                    dataIndex="teacher"
                    key="teacher"
                    render={(teacher: any) => (

                        <>
                            {teacher?.fullName}
                        </>
                    )}
                /> */}
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <Button type="primary">
                                Sửa
                            </Button>
                            <Button type="primary" danger onClick={() => { onClickDelete(record.id, record.fullName)}} >
                                Xóa
                            </Button>
                        </Space>
                    )}
                />
            </Table>
            <StudentCreatingModal open={open} onCancel={() => { setOpen(false) }} onCreate={async (data) => {
                return studentService.post(data).then((data) => {
                    setOpen(false)
                    fresh()
                })
                // if (res.status == 200)
            }} />
        </div>
    </Content>);
}

export default StudentManagement;