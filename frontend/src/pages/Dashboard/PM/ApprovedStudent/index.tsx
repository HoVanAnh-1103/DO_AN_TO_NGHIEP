import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table, Tag, theme } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import classService from "@services/class.service";
import { SignUpStatus, daysInWeek } from "@utils/constants";
import { formatDate } from "@utils/index";
import ClassCreatingModal from "../ClassManagement/ClassCreatingModal";
import signUpClassService from "@services/signUpClass.service";
import SignUpComfirm from "../SignManagement/SignUpComfirm";
import studentOfClassService from "@services/studentOfClass.service";

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;

interface DataType {
  id: number;
  signedAt: Date;
  teacherId: number;
  classId: number;
  class: {
    end: Date;
    id: number;
    start: Date;
    size: number;
    subject: any[];
    name: string;
  };
  user: { fullName: string };
  userId: number;
  schedules: any[];
}

const data: DataType[] = [];

function ApprovedStudent() {
  const [cls, setCls] = useState<DataType[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [pageIndex, setpageIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const [signSelected, setSignSelected] = useState({});
  const fresh = async () => {
    let data = await studentOfClassService.getAllStudenClassForPM();
    data = data.map((d: any) => ({ ...d.class, ...d }));
    console.log(data);
    setCls(data);
  };
  const deleteClass = async (classId: number) => {
    await classService.delete(classId);
    fresh();
  };

  const cofrim = async (
    fullNameSTD: string,
    className: string,
    userId: number,
    classId: number
  ) => {
    const confirmed = await confirm({
      title: "Xác nhận",
      content: (
        <>
          Bạn xác nhận cho học viên <Tag>{fullNameSTD}</Tag> tham gia lớp{" "}
          <Tag>{className}</Tag>
        </>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        await studentOfClassService.approveRequest(userId, classId);
        fresh();
      },
    });
    setOpen(false);
  };

  useEffect(() => {
    fresh();
  }, [textSearch, pageIndex]);
  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      <div
        style={{
          padding: 24,
          paddingTop: 10,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: "100vh",
        }}
      >
        <h3>Danh sách đăng ký lịch học</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 0px",
          }}
        >
          <Space.Compact size="middle">
            <Input addonBefore={<SearchOutlined />} placeholder="Tìm kiếm" />
          </Space.Compact>
        </div>

        <Table dataSource={cls}>
          {/* <Column title="ID" dataIndex="id" key="id" /> */}
          <Column
            title="Học sinh Đăng ký"
            dataIndex="user"
            key="class.name"
            render={(data) => {
              return data.fullName;
            }}
          />

          <Column
            title="Tên lớp"
            dataIndex="class"
            key="class.name"
            render={(data) => {
              return data.name;
            }}
          />
          <Column
            title="Bắt đầu"
            dataIndex="class"
            key="class.start"
            render={(data) => {
              return formatDate(new Date(data.start));
            }}
          />
          <Column
            title="Kết thúc"
            dataIndex="class"
            key="class.end"
            render={(data) => {
              return formatDate(new Date(data.end));
            }}
          />
          <Column
            title="Lịch"
            dataIndex="class"
            key="class.schedule"
            render={(data: { schedules: any[] }) => {
              return (
                <div>
                  {data.schedules.map((schedule) => (
                    <div>{`${daysInWeek[schedule.day]} ${schedule.start}-${
                      schedule.end
                    } Phòng ${schedule.room.name}`}</div>
                  ))}
                </div>
              );
            }}
          />
          <Column
            title="Sĩ số"
            dataIndex="class"
            key="class.size"
            render={(data) => {
              return data.size;
            }}
          />

          <Column
            title="Thời gian đăng ký"
            dataIndex="signedAt"
            key="signedAt"
            render={(data) => {
              return formatDate(new Date(data));
            }}
          />
          <Column
            title="Giáo viên"
            dataIndex="teacher"
            key="teacher"
            render={(data) => {
              return <Tag>{data.fullName}</Tag>;
            }}
          />

          {/* <Column title="Bắt đầu" dataIndex="class" render={(_) => { return formatDate(new Date(data)) }} key="start" /> */}
          {/* <Column title="Kết thúc" dataIndex="end" render={(data) => { return formatDate(new Date(data)) }} key="end" /> */}

          {/* <Column title="Sĩ số" dataIndex="size" key="size" /> */}
          {/* <Column title="Thời khóa biểu" dataIndex="schedules" key="size"
                    render={(schedules: any[]) => (
                        <div>
                            {schedules.map((schedule) => (<div>{`${daysInWeek[schedule.day]} ${schedule.start}-${schedule.end} Phòng ${schedule.room.name}`}</div>))}
                        </div>
                    )} /> */}
          {/* <Column
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
                /> */}
          {/* <Column title="Lớp" dataIndex="class" render={(data) => { return formatDate(new Date(data)) }} key="end" /> */}

          {/* <Column
                        title="Giáo viên"
                        dataIndex="teacher"
                        key="teacher"
                        render={(teacher: any) => (

                            <>
                                {teacher?.fullName}
                            </>
                        )}
                    /> */}
          <Column
            title="Action"
            dataIndex="active"
            key="action"
            render={(data: any, record: DataType) => {
              let button;
              if (data == true) button = "Đã xác nhận";
              if (data == false)
                button = (
                  <Button
                    onClick={() => {
                      cofrim(
                        record.user.fullName,
                        record.class.name,
                        record.userId,
                        record.classId
                      );

                      setSignSelected({
                        classId: record.classId,
                        teacherId: record.teacherId,
                      });

                      setOpen(true);
                    }}
                  >
                    Xác nhận
                  </Button>
                );
              if (data == undefined) button = "Đã từ chối";

              return button;
            }}
          />
        </Table>
        {/* <SignUpComfirm open={open} onCancel={() => { setOpen(false) }} onCreate={async (data: any) => {
                cofrim(data.classId, data.teacherId, data.status)
            }} initData = {signSelected} /> */}
      </div>
    </Content>
  );
}

export default ApprovedStudent;
