import React, { useState } from 'react';
import { Form, Input, Button, Space, message, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';

export const PlaylistForm1 = ({addnewSong, ListName}) => {
    const [SongName, setSongName] = useState('') 
    const [file, setFile] = useState('') 
  
    const AddSong2DB= (event) => {
        addnewSong({ListName,SongName})
        message.success('Songs succefully added!')
    };

    const handleAudioFile= (event) =>{
        console.log(file, event.song)
    }

  return (
    <Form name="dynamic_form_nest_item" onFinish={AddSong2DB} autoComplete="off">
      <Form.List name="songs">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  SongName={[name, 'first']}
                  fieldKey={[fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing Song Name' }]}
                >
                  <Input placeholder="Song Name" value={SongName} onChange={({ target }) => setSongName(target.value)} />
                </Form.Item>

                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="song"
                    getValueFromEvent={handleAudioFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Another Song
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const PlaylistForm2 = ({addnewPlaylist}) => {
    const [ListName, setListName] = useState('') 
    const [SongName, setSongName] = useState('') 
  
    const AddPlaylist2DB= (event) => {
        addnewPlaylist({ListName,SongName})
        message.success('Playlist succefully added!')
    };

  return (
    <Form name="dynamic_form_nest_item" onFinish={AddPlaylist2DB} autoComplete="off">
      <Form.List name="playlists">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  fieldKey={[fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing Playlist Name' }]}
                >
                  <Input placeholder="Playlist Name" value={ListName} onChange={({ target }) => setListName(target.value)} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'second']}
                  fieldKey={[fieldKey, 'second']}
                  rules={[{ required: true, message: 'Missing Song Name' }]}
                >
                    <Input placeholder="Song Name" value={SongName} onChange={({ target }) => setSongName(target.value)} />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Create New Playlist
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};



