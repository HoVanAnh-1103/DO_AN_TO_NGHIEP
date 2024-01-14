import React, { useCallback } from 'react';
import style from "./style.module.scss";
import classNames from 'classnames';
import logo from '../../access/logo.svg'
import colors from '@access/colors'
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '@services/auth.service';
import { useNavigate } from 'react-router-dom';









const cx = classNames.bind(style);
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
function Login() {
  const [form] = Form.useForm<any>()
  const navigate = useNavigate();



  const onFinish = useCallback(async (values: any) => {
    const data = await login(values.username, values.password);
    
    if (data.access_token) {
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      console.log(localStorage.getItem('access_token'));
      
      // dispath(getProfileAsync());
      navigate("/");
    } else {
      //thong bao loi
    }
    form.resetFields(["email", "password"]);
  }, [1])

  return (
    <div className={cx([style.wrapper])}>
      <div className={cx([style['sub-content'], style['left-content']])}>
        <img src={logo} alt="" />
      </div>
      <div className={cx([style['sub-content'], style['right-content']])}>
        <div className={cx([style['wrapper-form']])}>
          <Form
            form={form}
            title='DDawng Nhapj'
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ minWidth: 450, }}
            initialValues={{ remember: true, username: 'tangthithuhoang@gmail.com', password: '12345' }}
            layout="vertical"

            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            size='middle'

            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input style={{ minWidth: 450, }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password style={{ minWidth: 450, }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 0., span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0 }}>
              <Button htmlType="submit" size="large" style={{ width: '100%' }}
                {...colors.primary}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>

    </div >
  );
}

export default Login;
