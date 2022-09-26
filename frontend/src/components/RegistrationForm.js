import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = ({addnewUser}) => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [email, setEmail] = useState('')

  const AddUser2DB= (event) => {
      addnewUser({username,password,email})
      //await userService.registration(newUser)
      message.success('Succefully registered!')
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={AddUser2DB}
      scrollToFirstError
    >
       <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input value={email} onChange={({ target }) => setEmail(target.value)} />
      </Form.Item>
      
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input value={username} onChange={({ target }) => setUsername(target.value)} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password value={password} onChange={({ target }) => setPassword(target.value)}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password value={password} onChange={({ target }) => setPassword(target.value)} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm