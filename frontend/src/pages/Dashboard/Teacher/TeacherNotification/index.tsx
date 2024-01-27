import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Popover,
  Radio,
  RadioChangeEvent,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import classService from "@services/class.service";
import { daysInWeek } from "@utils/constants";
import { formatDate } from "@utils/index";
import ClassCreatingModal from "../../PM/ClassManagement/ClassCreatingModal";
import { Link, useNavigate } from "react-router-dom";
import signUpClassService from "@services/signUpClass.service";
import notificationService from "@services/notification.service";

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;

interface DataType {
  time: string;
  title: string;
  content: string;
}

const data: DataType[] = [];
const optionsWithDisabled = [
  { label: "Danh sách", value: "list" },
  { label: "Lịch", value: "calender" },
];

function TeacherNotification() {
  const [noti, setNoti] = useState<DataType[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [pageIndex, setpageIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const [value4, setValue4] = useState("list");
  const navigate = useNavigate();
  const fresh = async () => {
    const data = await notificationService.getAllForTeacher();
    console.log(data);
    setNoti(data);
  };
  const deleteClass = async (classId: number) => {
    await classService.delete(classId);
    fresh();
  };

  const onClickDelete = async (id: number, name: string) => {
    const confirmed = await confirm({
      title: "Xác nhận",
      content: (
        <>
          Bạn chắc chắn muốn xóa lớp học có Id <Tag>{`${id}`}</Tag>, tên lớp{" "}
          <Tag>{name}</Tag>
        </>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        deleteClass(id);
      },
    });
  };

  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio4 checked", value);
    setValue4(value);
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
        <h3>Thông báo</h3>
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

        <Table dataSource={noti}>
          {/* <Column title="ID" dataIndex="id" key="id" /> */}
          <Column title="Thời gian" dataIndex="time" key="time" />
          <Column
            title="Tiêu đề"
            dataIndex="type"
            key="type"
            render={(data) => {
              if ("THEM_LOP" == data) return "Xác nhận lớp học";
            }}
          />
          <Column
            title="Nội dung"
            dataIndex="content"
            key="content"
            render={(_, data: any) => {
              if ("THEM_LOP" == data.type)
                return (
                  <>
                    {" "}
                    Bạn đã được PM <Tag>{data.user.fullName}</Tag> thêm vào một
                    lớp dạy <Tag>{JSON.parse(data.content).className}</Tag> .
                    Hãy xác nhạn lớp hoc và chọn lịch dạy.
                  </>
                );
            }}
          />

          <Column
            title="Action"
            key="action"
            render={(_: any, record: any) => {
                console.log(record.receivers[0].isReaded );
                
                return (
                    <Space size="middle">
                      {record.receivers[0].isReaded ? (
                        `Đã giải quyết`
                      ) : (
                        <Button
                          type="primary"
                          onClick={() => {
                            navigate(
                              "/xac-nhan-lop-hoc?classId=" +
                                JSON.parse(record.content).classId +
                                "&notificationId=" +
                                record?.receivers?.[0].notificationId
                            );
                          }}
                        >
                          Xác nhận lịch học
                        </Button>
                      )}
                    </Space>
                  )
            }}
          />
        </Table>
      </div>
    </Content>
  );
}

export default TeacherNotification;
