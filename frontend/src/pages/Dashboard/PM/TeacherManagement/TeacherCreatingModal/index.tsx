
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
import { cas, daysInWeek } from '@utils/constants';

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

const PREFIX = 'Demo';

const classes = {
    todayCell: `${PREFIX}-todayCell`,
    weekendCell: `${PREFIX}-weekendCell`,
    today: `${PREFIX}-today`,
    weekend: `${PREFIX}-weekend`,
};

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({ theme }) => ({
    [`&.${classes.todayCell}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.14),
        },
        '&:focus': {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
    },
    [`&.${classes.weekendCell}`]: {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        '&:hover': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
        '&:focus': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
    },
}));

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({ theme }) => ({
    [`&.${classes.today}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
    [`&.${classes.weekend}`]: {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
    },
}));



const DayScaleCell = (props: any) => {
    const { startDate, today } = props;

    if (today) {
        return <StyledWeekViewDayScaleCell {...props} className={classes.today} />;
    } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        return <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />;
    } return <StyledWeekViewDayScaleCell {...props} />;
};


interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const TeacherCreatingModal: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const [schedule, setSchedule] = useState<any>([]);
    const [roomSelected, setRoomSelected] = useState()
    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        subjectService.get().then(data => {
            setSubjects(data.map((subject: any) => {
                return {
                    value: subject.id,
                    label: subject.name
                }
            }))
        })
    }, [])

    useEffect(() => { }, [schedule])


    const onSelected = (data: any) => {
        if (data.data.title === 'Đã chọn') {
            console.clear()

            setSchedule(schedule.filter((sche: any) => {
                return !(data.data.caId == sche.caId && data.data.day == sche.day && sche.roomId == roomSelected)
            }))

            return
        }
        setSchedule([...schedule, { day: data.data.day, caId: data.data.caId, roomId: roomSelected }])
        data.data.instances = [
            { text: 'Low Priority', id: 1, color: blue },

        ]
        return data
    }
    return (
        <Modal
            open={open}
            title="Thêm học viên"
            okText="Thêm"
            cancelText="Hủy"
            onCancel={onCancel}
            width={1200}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        console.log(values);

                        onCreate({ ...values, schedules: schedule });
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
                <Row gutter={24}>
                    <Col span={8}> <Form.Item
                        name="fullName"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Input />
                    </Form.Item>
                        <Form.Item name="email" initialValue={0} label="Email" required>
                            <Input type="email" placeholder='Email' />
                        </Form.Item>
                        <Form.Item name="phone" className="collection-create-form_last-form-item" label='Số điện thoại'>
                            <Input type="text" placeholder='Phone' />
                        </Form.Item></Col>
                    <Col span={8}>
                        <Form.Item name="address" className="collection-create-form_last-form-item" label='Địa chỉ'>
                            <Input.TextArea placeholder='Địa chỉ' rows={5}></Input.TextArea>
                        </Form.Item>
                        <Form.Item name="DOB" className="collection-create-form_last-form-item" label='Ngày sinh'>
                            <DatePicker placeholder='Ngày sinh' />
                        </Form.Item>

                    </Col>

                    <Col span={8}>

                        <Form.Item name="exYear" className="collection-create-form_last-form-item" label='Số năm kinh nghiệm'>
                            <Input type="number" placeholder='Năm kinh nghiệm' />
                        </Form.Item>
                        <Form.Item name="degree" className="collection-create-form_last-form-item" label='Bằng cấp'>
                            <Input type="text" placeholder='Bằng cấp' />
                        </Form.Item>
                        <Form.Item name="subject" className="collection-create-form_last-form-item" label='Bộ môn'>
                            <Input type="text" placeholder='Bộ môn' />
                        </Form.Item>

                    </Col>

                </Row>
            </Form>

        </Modal>
    );
};

export default TeacherCreatingModal;