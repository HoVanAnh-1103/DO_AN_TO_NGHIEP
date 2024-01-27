import { selectUser, setUser } from "@redux/userSlice";
import subjectService from "@services/subject.service";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs from 'dayjs';
import teacherService from "@services/teacher.service";
import { authService } from "@services/auth.service";

function TeacherInfo() {
    const [form] = Form.useForm();
    const [subjects, setSubjects] = useState([])
    const user = useSelector(selectUser);
    const dispatch = useDispatch()

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

    useEffect(() => {
        if (user?.user)
            form.setFields([{
                name: 'fullName',
                value: user?.user?.fullName
            },
            {
                name: 'email',
                value: user.user.email
            },
            {
                name: 'phone',
                value: user?.user?.phone
            },
            {
                name: 'address',
                value: user?.user.fullName
            },
            {
                name: 'DOB',
                value: dayjs(user?.user.DOB)
            },
            {
                name: 'exYear',
                value: user?.user?.teacherInfo?.[0]?.exYear
            },
            {
                name: 'degree',
                value: user?.user?.teacherInfo?.[0]?.degree
            },
            {
                name: 'subjects',
                value: user?.user?.teacherInfo?.[0]?.subject?.map((d: any) => d.id)
            },
            { name: 'id', }

            ])

        console.log('CHECK', user?.user?.teacherInfo?.[0]);

    }, [user])
    return (
        <div style={{ margin: 15 }}>
            <h3>Thông tin cá nhân</h3>

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                onFinish={async (values) => {
                    values.id = user.user.id
                    await teacherService.patch(values).then(async () => {
                        const info = await authService.getMe()
                        console.log(info);

                        dispatch(setUser(info))
                    })

                }}
            // initialValues={{ modifier: 'public' }}
            >
                <Form.Item
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
                </Form.Item>

                <Form.Item name="address" className="collection-create-form_last-form-item" label='Địa chỉ'>
                    <Input.TextArea placeholder='Địa chỉ' rows={5}></Input.TextArea>
                </Form.Item>
                <Form.Item name="DOB" className="collection-create-form_last-form-item" label='Ngày sinh'>
                    <DatePicker placeholder='Ngày sinh' locale={locale} />
                </Form.Item>





                <Form.Item name="exYear" className="collection-create-form_last-form-item" label='Số năm kinh nghiệm'>
                    <Input type="number" placeholder='Năm kinh nghiệm' />
                </Form.Item>
                <Form.Item name="degree" className="collection-create-form_last-form-item" label='Bằng cấp'>
                    <Input type="text" placeholder='Bằng cấp' />
                </Form.Item>
                <Form.Item name="subjects" className="collection-create-form_last-form-item" label='Bộ môn'>
                    {/* <Input type="text" placeholder='Bộ môn' /> */}

                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="select one country"
                        // defaultValue={}
                        // onChange={handleChange}
                        optionLabelProp="label"
                        options={subjects}
                    // optionRender={(option) => (
                    //     <Space>
                    //         <span role="img" aria-label={option.data.label}>
                    //             {option.data.emoji}
                    //         </span>
                    //         {option.data.desc}
                    //     </Space>
                    // )}
                    />
                </Form.Item>


                <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }} className="collection-create-form_last-form-item">
                    <Button htmlType="submit">Cập nhật</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default TeacherInfo;