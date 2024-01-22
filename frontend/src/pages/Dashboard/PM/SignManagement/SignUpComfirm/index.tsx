import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import { styled, alpha } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import {
  AppointmentMeta,
  EditingState,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
  WeekView,
  GroupingPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { formatDate, getDaysOfWeekForDate } from "@utils/index";
import { blue, orange } from "@mui/material/colors";
import teacherService from "@services/teacher.service";
import roomService from "@services/room.service";
import subjectService from "@services/subject.service";
import { SignUpStatus, cas, daysInWeek } from "@utils/constants";
import classService from "@services/class.service";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

const currentDate = "2018-11-01";
const data = getDaysOfWeekForDate(new Date(currentDate), 0).map((date) => {
  const strDate = formatDate(date);
  return cas.map((ca) => ({
    startDate: `${strDate}T${ca.start}`,
    endDate: `${strDate}T${ca.end}`,
    title: "Có thể chọn",
    caId: ca.id,
    day: date.getDay(),
  }));
});
let appointments: any[] = [];
data.forEach((d) => {
  appointments = [...appointments, ...d];
});
const { RangePicker } = DatePicker;

const PREFIX = "Demo";

const classes = {
  todayCell: `${PREFIX}-todayCell`,
  weekendCell: `${PREFIX}-weekendCell`,
  today: `${PREFIX}-today`,
  weekend: `${PREFIX}-weekend`,
};

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
  ({ theme }) => ({
    [`&.${classes.todayCell}`]: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.14),
      },
      "&:focus": {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
    },
    [`&.${classes.weekendCell}`]: {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
      "&:hover": {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
      },
      "&:focus": {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
      },
    },
  })
);

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
  ({ theme }) => ({
    [`&.${classes.today}`]: {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
    [`&.${classes.weekend}`]: {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
    },
  })
);

const TimeTableCell = (props: any) => {
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return (
      <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />
    );
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <StyledWeekViewTimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <StyledWeekViewTimeTableCell {...props} />;
};

const DayScaleCell = (props: any) => {
  const { startDate, today } = props;

  if (today) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return (
      <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />
    );
  }
  return <StyledWeekViewDayScaleCell {...props} />;
};

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  initData: any;
}
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
const SignUpComfirm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  initData,
}) => {
  const [form] = Form.useForm();
  const [schedule, setSchedule] = useState<any>([]);
  const [rooms, setRooms] = useState<any>([]);
  const [teachers, setTeachers] = useState<any>([]);
  const [roomSelected, setRoomSelected] = useState();
  const [subjects, setSubjects] = useState([]);
  const [initDataForm, setInitDataForm] = useState<{ classId?: number }>({});
  useEffect(() => {
    teacherService.get().then((data) => {
      setTeachers(
        data.map((teacher: any) => {
          return {
            value: teacher.userId,
            label: teacher.user.fullName,
          };
        })
      );
    });
    roomService.get().then((data) => {
      setRooms(
        data.map((room: any) => {
          return {
            value: room.id,
            label: room.name,
          };
        })
      );
      setRoomSelected(data[0].id);
    });
    subjectService.get().then((data) => {
      setSubjects(
        data.map((subject: any) => {
          return {
            value: subject.id,
            label: subject.name,
          };
        })
      );
    });
  }, []);

  useEffect(() => {}, [schedule]);

  useEffect(() => {
    console.log(initData);

    if (!initData.classId) return;
    classService.getOne(initData.classId).then((data: any) => {
      // setInitDataForm(data)
      form.setFields([
        { name: "name", value: data.name },
        { name: "subjectId", value: data.subject?.[0].id },
        { name: "size", value: data.size },
        { name: "teacherId", value: initData.teacherId },
        // { name: 'dateRange', value: [new Date(data.start), new Date(data.end)] }
      ]);

      setSchedule(
        data.schedules.map((data: any) => ({
          roomId: data.roomId,
          start: data.start,
          end: data.end,
          day: data.day,
        }))
      );
    });
  }, [initData]);

  const onSelected = (data: any) => {
    if (data.data.title === "Đã chọn") {
      console.clear();

      setSchedule(
        schedule.filter((sche: any) => {
          return !(
            data.data.caId == sche.caId &&
            data.data.day == sche.day &&
            sche.roomId == roomSelected
          );
        })
      );

      return;
    }
    setSchedule([
      ...schedule,
      { day: data.data.day, caId: data.data.caId, roomId: roomSelected },
    ]);
    data.data.instances = [{ text: "Low Priority", id: 1, color: blue }];
    return data;
  };
  return (
    <Modal
      open={open}
      title="Xác nhận đăng ký"
      okText="Xác nhận"
      cancelText="Hủy"
      onCancel={onCancel}
      width={1200}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values);

            onCreate({
              ...values,
              schedules: schedule,
              classId: initData.classId,
            });
            // form.resetFields();
            setSchedule([]);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initDataForm}
      >
        <Row gutter={24}>
          <Col span={8}>
            {" "}
            <Form.Item
              name="name"
              label="Tên"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="size" initialValue={0} label="Sĩ số">
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="teacherId"
              className="collection-create-form_last-form-item"
              label="Giáo viên"
            >
              <Select
                showSearch
                placeholder="Giáo viên"
                optionFilterProp="children"
                filterOption={filterOption}
                options={teachers}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="subjectId"
              className="collection-create-form_last-form-item"
              label="Môn học"
            >
              <Select
                showSearch
                placeholder="Môn học"
                optionFilterProp="children"
                filterOption={filterOption}
                options={subjects}
              />
            </Form.Item>

            <Form.Item label={"Bắt đầu/ Kết thúc"} name="dateRange">
              <RangePicker />
            </Form.Item>
            <Form.Item
              name="status"
              className="collection-create-form_last-form-item"
              label="Xác nhận"
            >
              <Select
                showSearch
                placeholder="Xác nhận"
                optionFilterProp="children"
                filterOption={filterOption}
                options={[
                  { label: "Xác nhận", value: SignUpStatus.APPROVED },
                  { label: "Hủy", value: SignUpStatus.REJECT },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <p>Lịch học:</p>
            <div>
              <Space direction="vertical">
                {schedule.map((s: any, index: number) => {
                  return (
                    <Tag
                      hidden={false}
                      key={`${daysInWeek[s.day]} ${s.start}-${s.end} Phòng ${
                        rooms.find((room: any) => room.value == s.roomId)?.label
                      }`}
                    >
                      {`${daysInWeek[s.day]} ${s.start}-${s.end} Phòng ${
                        rooms.find((room: any) => room.value == s.roomId)?.label
                      }`}
                    </Tag>
                  );
                })}
              </Space>
            </div>
            <Space direction="vertical">
              <div>Việc xác nhận hoặc hủy hiện tại sẽ không hoàn tác được!</div>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SignUpComfirm;
