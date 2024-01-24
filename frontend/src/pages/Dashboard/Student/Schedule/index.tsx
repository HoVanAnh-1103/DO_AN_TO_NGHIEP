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
import {
  formatDate,
  getDaysOfWeekForDate,
  getSpecificDayOfWeek,
  getWeekStartEnd,
} from "@utils/index";
import { blue, orange } from "@mui/material/colors";
import teacherService from "@services/teacher.service";
import roomService from "@services/room.service";
import subjectService from "@services/subject.service";
import { cas, daysInWeek } from "@utils/constants";
import studentOfClassService from "@services/studentOfClass.service";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

const currentDate = new Date();
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

// interface CollectionCreateFormProps {
//     open: boolean;
//     onCreate: (values: Values) => void;
//     onCancel: () => void;
// }

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
const Schedule: React.FC = () => {
  const [form] = Form.useForm();
  const [schedule, setSchedule] = useState<any>([]);
  const [roomSelected, setRoomSelected] = useState();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [rangeDates, setRangeDates] = useState<Date[]>(
    getWeekStartEnd(new Date())
  );
  const fresh = async (start: Date, end: Date) => {
    const res = await studentOfClassService.getMySchedule({ start, end });
    const dataTemp: any[] = [];
    res.map((d: any) => {
      d.class.schedules.map((s: any) => {
        const day = getSpecificDayOfWeek(rangeDates[0], rangeDates[1], s.day);
        dataTemp.push({
          startDate: formatDate(day) + "T" + s.start,
          endDate: formatDate(day) + "T" + s.end,
          title: `${d.class.name} tại phòng ${s.room.name}`,

        });
      });
    });
    console.log(dataTemp);
    
    setAppointments(dataTemp);
    return data;
  };
  useEffect(() => {
    const [start, end] = getWeekStartEnd(new Date());
    fresh(start, end);
  }, []);

  useEffect(() => {}, [schedule]);

  return (
    <div style={{ margin: 10 }}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{ modifier: 'public' }}
      >
        <Form.Item label={"Bắt đầu/ Kết thúc"} name="date">
          <DatePicker />
        </Form.Item>
      </Form>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState currentDate={currentDate} />
          <WeekView
            startDayHour={7}
            endDayHour={19}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
          <Appointments
           
          />

          <AppointmentTooltip
            // visible={false}
          />
        </Scheduler>
      </Paper>
    </div>
    // </Modal>
  );
};

export default Schedule;
