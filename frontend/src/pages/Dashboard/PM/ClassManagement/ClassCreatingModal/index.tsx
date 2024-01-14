
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Radio, Row, Select, Space, Tag } from 'antd';
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
import { daysInWeek } from '@utils/constants';

interface Values {
    title: string;
    description: string;
    modifier: string;
}

const cas = [
    { start: '07:00', end: '08:55', id: 1 },
    { start: '09:00', end: '10:55', id: 2 },
    { start: '13:00', end: '14:55', id: 3 },
    { start: '15:00', end: '16:55', id: 4 },
    { start: '17:00', end: '19:55', id: 5 },
    { start: '19:00', end: '20:55', id: 6 },
]
const currentDate = '2018-11-01';
const data = getDaysOfWeekForDate(new Date(currentDate), 0).map((date) => {
    const strDate = formatDate(date);
    return cas.map((ca) => ({ startDate: `${strDate}T${ca.start}`, endDate: `${strDate}T${ca.end}`, title: "Có thể chọn", caId: ca.id, day: date.getDay() }))
})
let appointments: any[] = []
data.forEach((d) => {
    appointments = [...appointments, ...d]
})



// [
//     { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//     { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];


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

const TimeTableCell = (props: any) => {
    const { startDate } = props;
    const date = new Date(startDate);

    if (date.getDate() === new Date().getDate()) {
        return <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />;
    } if (date.getDay() === 0 || date.getDay() === 6) {
        return <StyledWeekViewTimeTableCell {...props} className={classes.weekendCell} />;
    } return <StyledWeekViewTimeTableCell {...props} />;
};

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
const ClassCreatingModal: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const [schedule, setSchedule] = useState<any>([]);
    const [rooms, setRooms] = useState<any>([])
    const [teachers, setTeachers] = useState<any>([])
    const [roomSelected, setRoomSelected] = useState()
    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        teacherService.get().then(data => {
            setTeachers(data.map((teacher: any) => {
                return {
                    value: teacher.userId,
                    label: teacher.user.fullName
                }
            }))
        })
        roomService.get().then(data => {
            setRooms(data.map((room: any) => {
                return {
                    value: room.id,
                    label: room.name
                }
            }))
            setRoomSelected(data[0].id)
        })
        subjectService.get().then(data => {
            setSubjects(data.map((subject: any) => {
                return {
                    value: subject.id,
                    label: subject.name
                }
            }))
        })
    }, [])


    return (
        <Modal
            open={open}
            title="Thêm lớp học"
            okText="Thêm"
            cancelText="Hủy"
            onCancel={onCancel}
            width={1200}
            // style={{minHeight: 900px}}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        console.log(values);

                        // form.resetFields();
                        onCreate(values);
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
                onFinish={(data) => {
                    console.log(data);

                }}
                onSubmitCapture={(data) => {
                    console.log(data);

                }}
            // initialValues={{ modifier: 'public' }}
            >
                <Row gutter={24}>
                    <Col span={8}> <Form.Item
                        name="title"
                        label="Tên"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Input />
                    </Form.Item>
                        <Form.Item name="size" label="Sĩ số">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="teacher" className="collection-create-form_last-form-item" label='Giáo viên'>
                            <Select
                                showSearch
                                placeholder="Giáo viên"
                                optionFilterProp="children"
                                // onChange={onChange}
                                // onSearch={onSearch}
                                filterOption={filterOption}
                                options={teachers}
                            />
                        </Form.Item></Col>
                    <Col span={8}>
                        <Form.Item name="subjectId" className="collection-create-form_last-form-item" label='Môn học'>
                            <Select
                                showSearch
                                placeholder="Môn học"
                                optionFilterProp="children"
                                // onChange={onChange}
                                // onSearch={onSearch}
                                filterOption={filterOption}
                                options={subjects}
                            />
                        </Form.Item>
                        <Form.Item initialValue={roomSelected} name="roomId" className="collection-create-form_last-form-item" label='Phòng'>
                            <Select
                                showSearch
                                placeholder="Phòng"
                                optionFilterProp="children"
                                onChange={(data) => {
                                    setRoomSelected(data)

                                }}
                                // onSearch={onSearch}
                                filterOption={filterOption}
                                options={rooms}

                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <p>Lịch học:</p>
                        <div>
                            <Space direction='vertical'>
                                {
                                    schedule.map((schedule: any) => {
                                        return <Tag closable>{`${daysInWeek[schedule.day]} ${cas[schedule.caId].start}-${cas[schedule.caId].end} Phòng ${rooms.find((room: any) => room.value == schedule.roomId)?.label}`}</Tag>
                                    })
                                }
                                {/* <Tag closable>Chủ nhật 7:00-8:55 Phòng A1</Tag>
                                <Tag closable>Chủ nhật 7:00-8:55 Phòng A2</Tag>
                                <Tag closable>Chủ nhật 7:00-8:55 Phòng A2</Tag>
                                <Tag closable>Chủ nhật 7:00-8:55 Phòng A2</Tag> */}
                            </Space>
                        </div>
                    </Col>
                </Row>



            </Form>
            <Paper>
                <Scheduler
                    height={500}
                    data={appointments}
                >
                    <ViewState
                        currentDate={currentDate}
                    />
                    <WeekView
                        startDayHour={7}
                        endDayHour={19}
                        timeTableCellComponent={TimeTableCell}
                        dayScaleCellComponent={DayScaleCell}
                    />
                    <Appointments appointmentComponent={({ children, style, data, ...restProps }: any) => {
                        let selected = false
                        if (schedule.find((sche: any) => {
                            return sche.caId == data.caId && sche.day == data.day && roomSelected == sche.roomId
                        })) selected = true
                        if (selected) {
                            data.title = 'Đã chọn'
                        } else {
                            data.title = 'Có thể chọn'
                        }
                        return (

                            <Appointments.Appointment
                                {...restProps}
                                data={data}
                                style={{
                                    ...style,
                                    backgroundColor: selected ? '#5BB318' : data.backgroundColor,
                                }}
                            >
                                {children}
                            </Appointments.Appointment>
                        )
                    }} />
                    <AppointmentTooltip

                        onAppointmentMetaChange={(data: any) => {
                            if (data.data.title === 'Đã chọn') {
                                console.clear()
                                // console.log((schedule.filter((sche: any) => {
                                //     return !(data.data.caId == sche.caId && data.data.day == sche.day)
                                // })));
                                setSchedule(schedule.filter((sche: any) => {
                                    console.log(data.data.caId, sche.caId, data.data.day, sche.day, data.data.caId == sche.caId, data.data.day == sche.day);

                                    return !(data.data.caId == sche.caId && data.data.day == sche.day && sche.roomId == roomSelected)
                                }))

                                return
                            }
                            setSchedule([...schedule, { day: data.data.day, caId: data.data.caId, roomId: roomSelected }])
                            data.data.instances = [
                                { text: 'Low Priority', id: 1, color: blue },

                            ]
                            //    data.target['style'].background = '#5BB318'
                            return data
                        }} visible={false} />


                </Scheduler>
            </Paper>
        </Modal>
    );
};

export default ClassCreatingModal;