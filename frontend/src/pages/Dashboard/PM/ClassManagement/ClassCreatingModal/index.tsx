
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
                    label: teacher.user.fullName,
                    data: teacher.subject
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
            title="Thêm lớp học"
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
                        name="name"
                        label="Tên"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Input />
                    </Form.Item>
                        <Form.Item name="size" initialValue={0} label="Sĩ số">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="teacherId" className="collection-create-form_last-form-item" label='Giáo viên'>
                            <Select
                                showSearch
                                placeholder="Giáo viên"
                                optionFilterProp="children"
                                filterOption={filterOption}
                                options={teachers}
                                onChange={(data:any)=>{
                                    const teacher = teachers.find((t: any)=>t.value === data)
                                    console.log(teacher);
                                    setSubjects(teacher?.data.map((subject: any) => {
                                        return {
                                            value: subject.id,
                                            label: subject.name
                                        }
                                    }))                                    
                                }}
                            />
                        </Form.Item></Col>
                    <Col span={8}>
                        <Form.Item name="subjectId" className="collection-create-form_last-form-item" label='Môn học'>
                            <Select
                                showSearch
                                placeholder="Môn học"
                                optionFilterProp="children"
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
                                filterOption={filterOption}
                                options={rooms}

                            />
                        </Form.Item>
                        <Form.Item label={'Bắt đầu/ Kết thúc'} name='dateRange'>
                            <RangePicker />

                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <p>Lịch học:</p>
                        <div>
                            <Space direction='vertical'>
                                {
                                    schedule.map((s: any, index: number) => {
                                        return <Tag closable hidden={false} key={`${daysInWeek[s.day]} ${cas[s.caId].start}-${cas[s.caId].end} Phòng ${rooms.find((room: any) => room.value == s.roomId)?.label}`} onClose={() => {
                                            setSchedule(schedule.filter((sche: any) => {
                                                return !(s.caId == sche.caId && s.day == sche.day && s.roomId == sche.roomId)
                                            }))
                                        }} >{`${daysInWeek[s.day]} ${cas[s.caId].start}-${cas[s.caId].end} Phòng ${rooms.find((room: any) => room.value == s.roomId)?.label}`}</Tag>
                                    })
                                }

                            </Space>
                        </div>
                    </Col>
                </Row>



            </Form>
            {/* <Paper>
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
                                key={data.day + data.start + data.end}
                                onHover={() => {
                                    console.log('hover');

                                }}
                                {...restProps}
                                data={data}
                                style={{
                                    ...style,
                                    backgroundColor: selected ? '#5BB318' : data.backgroundColor,
                                }}
                            >
                                <div>{children}</div>
                            </Appointments.Appointment>
                        )
                    }} />

                    <AppointmentTooltip

                        onAppointmentMetaChange={onSelected} visible={false} />


                </Scheduler>
            </Paper> */}
        </Modal>
    );
};

export default ClassCreatingModal;