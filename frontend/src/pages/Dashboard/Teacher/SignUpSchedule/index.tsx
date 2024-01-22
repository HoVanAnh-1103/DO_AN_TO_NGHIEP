import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Popover, Radio, RadioChangeEvent, Space, Table, Tag, theme } from 'antd';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import classService from "@services/class.service";
import { daysInWeek } from "@utils/constants";
import { formatDate } from "@utils/index";
import ClassCreatingModal from "../../PM/ClassManagement/ClassCreatingModal";
import { Link } from "react-router-dom";
import signUpClassService from "@services/signUpClass.service";

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
    signs: any[]
}

const data: DataType[] = [

];
const optionsWithDisabled = [
    { label: 'Có thể đăng ký', value: 'possible' },
    { label: 'Tất cả', value: 'all' },
];

const signUpClass = async (id: number) => {
    return signUpClassService.post({ classId: id })
}
const cancleClass = async (id: number) => {
    return signUpClassService.delete(id)

}

function SignUpSchedule() {
    const [cls, setCls] = useState<DataType[]>([])
    const [textSearch, setTextSearch] = useState('')
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [pageIndex, setpageIndex] = useState(1)
    const [open, setOpen] = useState(false);
    const [value4, setValue4] = useState('all');

    const fresh = async () => {
        const data = await signUpClassService.findAllClassNotAsignet()
        setCls(data)
    }


    const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio4 checked', value);
        setValue4(value);
    };

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
                <Radio.Group
                    options={optionsWithDisabled}
                    onChange={onChange4}
                    value={value4}
                    optionType="button"
                    buttonStyle="solid"
                />
            </div>

            <Table dataSource={cls}>

                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Tên lớp" dataIndex="name" key="name" />
                <Column title="Bắt đầu" dataIndex="start" render={(data) => { return formatDate(new Date(data)) }} key="start" />
                <Column title="Kết thúc" dataIndex="end" render={(data) => { return formatDate(new Date(data)) }} key="end" />

                <Column title="Số chỗ" dataIndex="size" key="size" />
                <Column title="Thời khóa biểu" dataIndex="schedules" key="size"
                    render={(schedules: any[]) => (
                        <div>
                            {schedules.map((schedule) => (
                                <div>{`${daysInWeek[schedule.day]} ${schedule.start}-${schedule.end} `}
                                    <Popover content={<>số chỗ, địa chỉ</>} title="Chi tiết"><Button>Phòng {schedule.room.name}</Button></Popover>
                                </div>))}
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
                <Column title="Số học sinh" dataIndex="size" key="size" />

                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            {record?.signs?.length ? <Button type="primary" onClick={async () => {
                                await confirm({
                                    title: 'Xác nhận Đăng ký dạy lớp',
                                    content: (
                                        <>
                                            Xác nhận đăng ký lớp <b>{record.name}</b>
                                        </>
                                    ),
                                    okText: "Xác nhận",
                                    cancelText: "Hủy",
                                    onOk: async () => {
                                        await cancleClass(record.id)
                                        fresh()
                                    }
                                });
                            }}>
                                Hủy
                            </Button> : <Button type="primary" onClick={async () => {
                                await confirm({
                                    title: 'Xác nhận Đăng ký dạy lớp',
                                    content: (
                                        <>
                                            Xác nhận đăng ký lớp <b>{record.name}</b>
                                        </>
                                    ),
                                    okText: "Xác nhận",
                                    cancelText: "Hủy",
                                    onOk: async () => {
                                        await signUpClass(record.id)
                                        fresh()
                                    }
                                });
                            }}>
                                Đăng ký
                            </Button>
                            }

                        </Space>
                    )}
                />
            </Table>
        </div>
    </Content>);
}

export default SignUpSchedule;