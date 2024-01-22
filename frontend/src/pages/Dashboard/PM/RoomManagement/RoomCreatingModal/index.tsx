
import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Space, Tag } from 'antd';
import { styled, alpha } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import { AppointmentMeta, EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip,
    WeekView,
    GroupingPanel
} from '@devexpress/dx-react-scheduler-material-ui';
import { formatDate, getDaysOfWeekForDate } from '@utils/index';
import { blue, orange } from '@mui/material/colors';
import teacherService from '@services/teacher.service';
import roomService from '@services/room.service';
import subjectService from '@services/subject.service';
import { RoomTypeEnum, cas, daysInWeek } from '@utils/constants';
import TextArea from 'antd/es/input/TextArea';
import categoryService from '@services/category.service';

interface Values {
    title: string;
    description: string;
    modifier: string;
}


const currentDate = '2018-11-01';
const data = getDaysOfWeekForDate(new Date(currentDate), 0).map((date) => {
    const strDate = formatDate(date);
    return cas.map((ca) => ({ startDate: `${strDate}T${ca.start}`, endDate: `${strDate}T${ca.end}`, title: "Có thể chọn", caId: ca.id, day: date.getDay() }))
})
let appointments: any[] = []
data.forEach((d) => {
    appointments = [...appointments, ...d]
})
const { RangePicker } = DatePicker;







interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const RoomCreatingModal: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const [schedule, setSchedule] = useState<any>([]);
    const [categories, setCategories] = useState<any[]>([])
    useEffect(() => {



        categoryService.get().then((data) => {
            setCategories(data.map((category: any) => {
                return {
                    value: category.id,
                    label: category.name
                }
            }))
        })



    }, [])

    useEffect(() => { }, [schedule])



    return (
        <Modal
            open={open}
            title="Thêm phòng"
            okText="Thêm"
            cancelText="Hủy"
            // cancelButtonProps={}
            onCancel={onCancel}
            // width={1200}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {

                        onCreate({ ...values });
                        form.resetFields();
                        setSchedule([])
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            // initialValues={{ modifier: 'public' }}
            >

                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="size" initialValue={0} label="Lớp">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="type" className="collection-create-form_last-form-item" label='Danh mục'>
                    <Select
                        showSearch
                        placeholder="Loại"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={[{
                            value: RoomTypeEnum.NORMAL,
                            label: 'Phòng thường'
                        },
                        { value: RoomTypeEnum.AIR_CON, label: 'Máy lạnh' }
                        ]}
                    />
                </Form.Item>

                <Form.Item name="description" className="collection-create-form_last-form-item" label='Mô tả'>
                    <TextArea placeholder="Mô tả" allowClear />

                </Form.Item>
                <Form.Item name="address" className="collection-create-form_last-form-item" label='Mô tả'>
                    <TextArea placeholder="Địa chỉ" allowClear />

                </Form.Item>


            </Form>

        </Modal>
    );
};

export default RoomCreatingModal;