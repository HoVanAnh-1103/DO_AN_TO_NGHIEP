import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tag, theme } from 'antd';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import classService from "@services/class.service";
import ClassCreatingModal from "./ClassCreatingModal";
import { daysInWeek } from "@utils/constants";

const { Column, ColumnGroup } = Table;

interface DataType {
    id: React.Key;
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





    useEffect(() => {
        const func = async () => {
            const data = await classService.get()
            console.log(data);
            setCls(data)
        }
        func()
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
            <h3>Quản lý môn học</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0px' }}>
                <Space.Compact size="middle">
                    <Input addonBefore={<SearchOutlined />} placeholder="Tìm kiếm" />
                </Space.Compact>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setOpen(true);
                }}>
                    Tạo môn học
                </Button>
            </div>

            <Table dataSource={cls}>

                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Tên lớp" dataIndex="name" key="name" />

                <Column title="Sĩ số" dataIndex="size" key="size" />
                <Column title="Lịch" dataIndex="schedules" key="size"
                    render={(schedules: any[]) => (
                        <div>
                            {schedules.map((schedule) => (<div>{`${daysInWeek[schedule.ngay]} ${schedule.start}-${schedule.end} Phòng ${schedule.room.name}`}</div>))}
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
                            {teacher.fullName}
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
                            <Button type="primary" danger >
                                Xóa
                            </Button>
                        </Space>
                    )}
                />
            </Table>
            <ClassCreatingModal open={open} onCancel={() => { setOpen(false) }} onCreate={(data) => {
                console.log(data);
            }} />
        </div>
    </Content>);
}

export default ClassManagement;