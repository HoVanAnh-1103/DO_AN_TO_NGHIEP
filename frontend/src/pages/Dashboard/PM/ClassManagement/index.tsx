import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table, Tag, theme } from 'antd';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import classService from "@services/class.service";
import ClassCreatingModal from "./ClassCreatingModal";
import { daysInWeek } from "@utils/constants";
import { formatDate } from "@utils/index";

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;

interface DataType {
    id: number;
    name: string;
    size: number;
    subject: any[];
    start: Date;
    teacher: any
    end: Date;
}

const data: DataType[] = [

];

function ClassManagement() {
    const [cls, setCls] = useState<DataType[]>([])
    const [textSearch, setTextSearch] = useState('')
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [pageIndex, setpageIndex] = useState(1)
    const [open, setOpen] = useState(false);

    const fresh = async () => {
        const data = await classService.get()
        console.log(data);
        setCls(data)
    }
    const deleteClass = async (classId: number) => {
        await classService.delete(classId)
        fresh()
    }

    const onClickDelete = async (id: number, name: string) => {
        const confirmed = await confirm({
            title: 'Xác nhận',
            content: (
                <>
                    Bạn chắc chắn muốn xóa lớp học có Id <Tag>{`${id}`}</Tag>, tên lớp <Tag>{name}</Tag>
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
            <h3>Cập nhật lớp học</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0px' }}>
                <Space.Compact size="middle">
                    <Input addonBefore={<SearchOutlined />} placeholder="Tìm kiếm" />
                </Space.Compact>
                <Button icon={<PlusOutlined />} onClick={() => {
                    setOpen(true);
                }}>
                    Tạo lớp học
                </Button>
            </div>

            <Table dataSource={cls}>

                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Tên lớp" dataIndex="name" key="name" />
                <Column title="Bắt đầu" dataIndex="start" render={(data) => { return formatDate(new Date(data)) }} key="start" />
                <Column title="Kết thúc" dataIndex="end" render={(data) => { return formatDate(new Date(data)) }} key="end" />

                <Column title="Sĩ số" dataIndex="size" key="size" />
                <Column title="Thời khóa biểu" dataIndex="schedules" key="size"
                    render={(schedules: any[]) => (
                        <div>
                            {schedules.map((schedule) => (<div>{`${daysInWeek[schedule.day]} ${schedule.start}-${schedule.end} Phòng ${schedule.room.name}`}</div>))}
                        </div>
                    )} />
                <Column
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
                />
                <Column
                    title="Giáo viên"
                    dataIndex="teacher"
                    key="teacher"
                    render={(teacher: any) => (

                        <>
                            {teacher?.fullName}
                        </>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <Button type="primary">
                                Sửa
                            </Button>
                            <Button type="primary" danger onClick={() => { onClickDelete(record.id, record.name) }} >
                                Xóa
                            </Button>
                        </Space>
                    )}
                />
            </Table>
            <ClassCreatingModal open={open} onCancel={() => { setOpen(false) }} onCreate={async (data) => {
                const res = await classService.post(data)
                setOpen(false)
                fresh()
            }} />
        </div>
    </Content>);
}

export default ClassManagement;