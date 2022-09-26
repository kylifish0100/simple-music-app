import React from 'react'
import PlService from '../services/playlist'
import { Link } from 'react-router-dom'
import path from '../pics/oasis.jpg'
import { Button, Empty, Col, Row, message, Divider, List, Avatar, Space } from 'antd';
import { PlaylistForm1, PlaylistForm2 } from './PlaylistForm';
import { DeleteOutlined, CaretRightOutlined} from '@ant-design/icons';



// const loadSongs = (ListName) => {
//   PlService
//     .getOnePl(ListName)
//     .then(result => {
//     setSongs(result)
//     console.log("Songs:"+songs)
//   })
// }


export const Playlist = ({ playlist, loadSongs, songs, addnewSong}) => {

  loadSongs(playlist.ListName)
  // PlService
  //   .getOnePl(ListName)
  //   .then(result => {
  //   setSongs(result)
  //   console.log("Songs:"+songs)
  // })
  //console.log(songs)

  const deleteSong= (SongName) => {
    PlService
      .deleteSong(playlist.ListName,{SongName})
      .then(result=>{})
    console.log(playlist.ListName)
    message.success('Song succefully deleted!')
  };

  if(songs===[])
    return <Empty /> 
  return (
    <div>
      <h2>{playlist.ListName}</h2>
      <ul>
        {songs.map(s =>
          <Row key={s.SongName}>
            <Col span={4} order={1}>
            {s.SongName}
            </Col>
            <Col span={4} order={2}>
              <Button size="small" type="default" shape="round" icon={<CaretRightOutlined />}> Play </Button>
            </Col>
            <Col span={4} order={3}>
            <Button size="small" type="default" shape="round" icon={<DeleteOutlined />} onClick={()=>deleteSong(s.SongName)}>Delete</Button>
            </Col>
          </Row>
        )}
      </ul>
      <PlaylistForm1 addnewSong={addnewSong} ListName={playlist.ListName}/>
    </div>
  )
}

export const Playlists = ({playlists, addnewPlaylist, deleteList}) => {
  
  return(
    <div>
      <h2>My Playlists</h2>
        {playlists.map(pls =>
          <Row key={pls.ListID}>
            <Col span={4} order={1}>
            <img style={{resizeMode:"contain", width:130, height:130}} alt="playlist profile" src={path} />
            </Col>
            <Col span={4} order={2}>
              <Link to={`/musics/${pls.ListName}`}>{pls.ListName}</Link>
            </Col>
            <Col span={4} order={3}>
              <Button size="small" type="default" shape="round" icon={<DeleteOutlined />} onClick={()=>deleteList(pls.ListName)}>Delete</Button>
              </Col>
          </Row>
        )}
      <PlaylistForm2 addnewPlaylist={addnewPlaylist}/>
    </div>
  )
}

// export const Playlists1 = ({playlists}) => {
  
//   const IconText = ({ icon, text }) => (
//     <Space>
//       {React.createElement(icon)}
//       {text}
//     </Space>
//   );

//   return(
//   <List
//     itemLayout="vertical"
//     size="large"
//     pagination={{
//       onChange: page => {
//         console.log(page);
//       },
//       pageSize: 3,
//     }}
//     dataSource={playlists}

//     renderItem={item => (
//       <List.Item
//         key={item.ListName}
//         actions={[
//           <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
//           <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
//           <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
//         ]}
//         extra={
          
//         }
//       >
//         <List.Item.Meta
//           title={item.ListName}
//         />
//       </List.Item>
//     )}
//   />
//   )
// }
