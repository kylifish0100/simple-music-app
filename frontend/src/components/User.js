import React, { useState } from 'react';
import { message, Descriptions, Input, Space, Button, Modal, Form, Radio, Divider  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const CollectionCreateForm = ({ user, visible, onCreate, onCancel }) => {
 
  const [form] = Form.useForm();

  const handleClick = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }
  
  return (
    <Modal
      visible={visible}
      title="Edit my info"
      okText="Confirm"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {handleClick}}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          username: user.username,
        }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input new username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="password" 
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input new password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditPage = ({user}) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    //console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Edit my information
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        user={user}
      />
    </div>
  );
};


const MyDash = ({user}) => (
  <div>
    <Descriptions title="My Dashboard" bordered >
      <Descriptions.Item label="Username" >{user.username}</Descriptions.Item>
      <Descriptions.Item label="Password" >******</Descriptions.Item>
      <Descriptions.Item label="Email" >{user.email}</Descriptions.Item>
    </Descriptions>
    <Divider />
    <EditPage user={user}/>
  </div>

)

export default MyDash




