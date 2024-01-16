import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table, Tag, theme } from 'antd';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import classService from "@services/class.service";
import { daysInWeek } from "@utils/constants";
import { formatDate } from "@utils/index";
import ClassCreatingModal from "../ClassManagement/ClassCreatingModal";
import subjectService from "@services/subject.service";
import SubjectCreatingModal from "./SubjectCreatingModal";

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;

interface DataType {
    id: number;
    name: string;
    subject: any[];
    description: string;
    class: number;
    category: {
        name: string
    }
}

const data: DataType[] = [

];

function SubjectManagement() {
    const [cls, setCls] = useState<DataType[]>([])
    const [textSearch, setTextSearch] = useState('')
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [pageIndex, setpageIndex] = useState(1)
    const [open, setOpen] = useState(false);

    const fresh = async () => {
        const data = await subjectService.get()
        console.log(data);
        setCls(data)
    }
    const deleteSubject = async (classId: number) => {
        await subjectService.delete(classId)
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
            onOk: () => {
                deleteSubject(id)
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
            <h3>Quản lý môn học</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0px' }}>
                <Space.Compact size="middle">
                    <Input addonBefore={<SearchOutlined />} placeholder="Tìm kiếm" />
                </Space.Compact>
                <Button icon={<PlusOutlined />} onClick={() => {
                    setOpen(true);
                }}>
                    Tạo môn học
                </Button>
            </div>

            <Table dataSource={cls}>

                <Column title="Mã môn học" dataIndex="id" key="id" />
                <Column title="Tên môn học" dataIndex="name" key="name" />
                <Column title="Danh mục" dataIndex="category" key="category"
                render={(value)=>{
                    return value.name
                }} />

                <Column title="Ghi chú" dataIndex="description" key="description" />
                <Column title="Lớp" dataIndex="class" key="class" />
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
            {/* <ClassCreatingModal open={open} onCancel={() => { setOpen(false) }} onCreate={async (data) => {
                const res = await subjectService.post(data)
                setOpen(false)
                fresh()
            }} /> */}
            <SubjectCreatingModal open={open} onCancel={() => { setOpen(false) }} onCreate={async (data) => {
                const res = await subjectService.post(data)
                setOpen(false)
                fresh()
            }} />
        </div>
    </Content>);
}

export default SubjectManagement;