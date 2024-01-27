import React, { useCallback, useState } from "react";
import style from "./style.module.scss";
import classNames from "classnames";
import logo from "../../access/snapedit_1705690457169.png";
import colors from "@access/colors";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  message,
} from "antd";
import { authService, login } from "@services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@redux/userSlice";
import { RocketTwoTone } from "@ant-design/icons";
import studentService from "@services/student.service";

const cx = classNames.bind(style);
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
function Login() {
  const [form] = Form.useForm<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [action, setAction] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = useCallback(
    async (values: any) => {
      const data = await login(values.username, values.password);
      if (data.access_token) {
        console.log(data);
        localStorage.setItem("access_token", data.access_token);
        console.log(localStorage.getItem("access_token"));

        // dispath(getProfileAsync());
        navigate("/");
        const user = await authService.getMe();
        dispatch(setUser(user));
      } else {
        //thong bao loi
      }
      form.resetFields(["email", "password"]);
    },
    [1]
  );

  return (
    <div className={cx([style.wrapper])}>
      <div className={cx([style["sub-content"], style["left-content"]])}>
        <img src={logo} alt="" />
      </div>
      <div className={cx([style["sub-content"], style["right-content"]])}>
        <div className={cx([style["wrapper-form"]])}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              onClick={() => {
                setAction(0);
              }}
              // style={{ width: "100%" }}
              style={{
                margin: 20,
                width: 120,
                ...(action == 1 ? { background: "#CCCCCC" } : {}),
              }}
              // {...colors.primary}
            >
              Đăng nhập
            </Button>
            <Button
              size="large"
              type="default"
              style={{
                margin: 20,
                width: 120,
                ...(action == 0 ? { background: "#CCCCCC" } : {}),
              }}
              // {...colors.primary}
              onClick={() => {
                setAction(1);
              }}
            >
              Đăng ký
            </Button>
          </div>
          {action == 0 && (
            <Form
              form={form}
              title="DDawng Nhapj"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ minWidth: 450 }}
              layout="vertical"
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              size="middle"
              autoComplete="off"
            >
              <Form.Item<FieldType>
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input style={{ minWidth: 450 }} />
              </Form.Item>

              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password style={{ minWidth: 450 }} />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 0 }}>
                <Button
                  htmlType="submit"
                  size="middle"
                  style={{ width: "100%" }}
                  {...colors.primary}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}

          {action == 1 && (
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              // initialValues={{ modifier: 'public' }}
              onFinish={() => {
                form
                  .validateFields()
                  .then((values) => {
                    console.log(values);
                    return studentService.post(values).then(() => {
                      form.resetFields();
                      setAction(0);
                      messageApi.open({
                        type: "success",
                        content: "Bạn đã đăng ký tài khoản thành công, hãy đăng nhập để tiếp tục nhé",
                      });
                    });
                    // onCreate({ ...values, schedules: schedule });
                    // setSchedule([]);
                  })
                  .catch((info) => {
                    console.log("Validate Failed:", info);
                  });
              }}
              style={{ minWidth: 450 }}
            >
              {" "}
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input placeholder="Họ tên" />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
              <Form.Item name="email" required>
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="phone"
                className="collection-create-form_last-form-item"
              >
                <Input type="text" placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item
                name="address"
                className="collection-create-form_last-form-item"
              >
                <Input.TextArea placeholder="Địa chỉ" rows={5}></Input.TextArea>
              </Form.Item>
              <Form.Item
                name="DOB"
                className="collection-create-form_last-form-item"
              >
                <DatePicker placeholder="Ngày sinh" />
              </Form.Item>
              <Button
                htmlType="submit"
                size="middle"
                style={{ width: "100%" }}
                {...colors.primary}
              >
                Submit
              </Button>
            </Form>
            // <Form
            //   form={form}
            //   title="DDawng Nhapj"
            //   name="basic"
            //   labelCol={{ span: 8 }}
            //   wrapperCol={{ span: 16 }}
            //   style={{ minWidth: 450 }}
            //   initialValues={{
            //     remember: true,
            //     username: "tangthithuhoang@gmail.com",
            //     password: "12345",
            //   }}
            //   layout="vertical"
            //   onFinish={onFinish}
            //   // onFinishFailed={onFinishFailed}
            //   size="middle"
            //   autoComplete="off"
            // >
            //   <Form.Item
            //     name="email"
            //     rules={[
            //       { required: true, message: "Please input your username!" },
            //     ]}
            //   >
            //     <Input placeholder="Họ tên" style={{ minWidth: 450 }} />
            //   </Form.Item>

            //   <Form.Item
            //     name="password"
            //     rules={[
            //       { required: true, message: "Please input your password!" },
            //     ]}
            //   >
            //     <Input.Password style={{ minWidth: 450 }} />
            //   </Form.Item>

            //   <Form.Item wrapperCol={{ offset: 0 }}>
            //     <Button
            //       htmlType="submit"
            //       size="middle"
            //       style={{ width: "100%" }}
            //       {...colors.primary}
            //     >
            //       Submit
            //     </Button>
            //   </Form.Item>
            // </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
