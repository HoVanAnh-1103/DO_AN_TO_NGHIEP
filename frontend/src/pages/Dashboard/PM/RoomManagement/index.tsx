import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table, Tag, theme } from 'antd';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import classService from "@services/class.service";
import { RoomTypeEnum, daysInWeek } from "@utils/constants";
import { formatDate } from "@utils/index";
import ClassCreatingModal from "./RoomCreatingModal";
import roomService from "@services/room.service";

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;

interface DataType {
    id: number;
    name: string;
    size: number;
    type: RoomTypeEnum
}

const data: DataType[] = [

];

function RoomManagement() {
    const [cls, setCls] = useState<DataType[]>([])
    const [textSearch, setTextSearch] = useState('')
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [pageIndex, setpageIndex] = useState(1)
    const [open, setOpen] = useState(false);

    const fresh = async () => {
        const data = await roomService.get()
        console.log(data);
        setCls(data)
    }
    const deleteClass = async (classId: number) => {
        await roomService.delete(classId)
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
            <h3>Danh sách phòng</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0px' }}>
                <Space.Compact size="middle">
                    <Input addonBefore={<SearchOutlined />} placeholder="Tìm kiếm" />
                </Space.Compact>
                <Button icon={<PlusOutlined />} onClick={() => {
                    setOpen(true);
                }}>
                    Thêm phòng học
                </Button>
            </div>

            <Table dataSource={cls}>

                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Tên phòng" dataIndex="name" key="name" />
                
                <Column title="Số chỗ" dataIndex="size" key="size" />
               
                <Column title="Loại" dataIndex="type" key="type" render={(value)=>{
                    return value === RoomTypeEnum.NORMAL ? 'Thường' : 'Máy lạnh'
                }}/>
                <Column title="Mô tả" dataIndex="description" key="description" />
                <Column title="Địa chỉ" dataIndex="address" key="address" />

                
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
                const res = await roomService.post(data)
                setOpen(false)
                fresh()
            }} />
        </div>
    </Content>);
}

export default RoomManagement;