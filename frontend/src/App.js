import React, { useState, useEffect } from 'react'
import { Playlist, Playlists } from './components/Playlist'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Home from './components/Home'
import MyDash from './components/User'
import Footer from './components/Footer'
import PlService from './services/playlist'
import loginService from './services/login' 
import userService from './services/user'
import {
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { message, Button, Col } from 'antd';
import 'antd/dist/antd.css';
import PlaylistForm from './components/PlaylistForm'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



const App = () => {
  const [playlists, setPls] = useState([])
  const [songs, setSongs] = useState([])
  const [ListName, setListName] = useState('')
  //const [newSong, setNewSong] = useState('')
  const [showAll, setShowAll] = useState(false)


  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      PlService.setToken(user.token)
      console.log(user)
    }
  }, [])  

  useEffect(() => {
    PlService
      .getAll()
      .then(result => {
      setPls(PlService.listFilter(result))
      console.log(PlService.listFilter(result))
    })
  }, [])
  //console.log("playlists:"+playlists)

  const loadSongs = (ListName) => {
    PlService
      .getOnePl(ListName)
      .then(result => {
      setSongs(result)
      //console.log("Songs:"+songs)
    })
    setListName(ListName)
  }
  
  const addnewUser = (newUser) => {
    userService
      .create(newUser)
      .then(result => {
        console.log('result:'+ result, 'newUser:' + newUser)
      })
  }

  const addnewSong = (newSong) => {
    PlService
      .create(newSong)
      .then(result => {
        console.log('result:'+ result, 'newSong:' + newSong)
      })
  }

  const addPlaylist = (newPl) => {
    PlService
      .create(newPl)
      .then(result => {})
      setPls(playlists.concat(newPl))
  }
  
  const deleteList= (List_Name) => {
    PlService
      .deleteList({ListName})
      .then(result=>{})
    setPls(playlists.filter(item => item.ListName !== List_Name))
    message.success('Playlist succefully deleted!')
  };
  
  const match = useRouteMatch('/musics/:ListName')
  const singlePl = match 
    ? playlists.find(s => s.ListName === String(match.params.ListName))
    : null
 
  const handlePlChange = (event) => {
    console.log(event.target.value)
    setListName(event.target.value)
  }

  const handleLogin = async (event) => {
    //event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      
      PlService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
      message.success('Successfully logined!')

    } catch (exception) {
      message.error('Wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    try {
      window.localStorage.clear()
      setUser(null)
    } catch (exception) {
      message.error('Logout failed...')
    }
  } 

  return (
    <Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/musics">Musics</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/users">My Dashboard</Link></Menu.Item>
          <Menu.Item key="4">
            {user
            ? <em>{user.username} logged in</em>
            : <Link to="/login">Login</Link>
            }
          </Menu.Item>
          <Menu.Item key="5"> <Link to="/users/signup" target="_blank" rel="noopener noreferrer" />Sign Up </Menu.Item>
          <Col span={6} order={4}>
          <Link to="/">
            <Button onClick={()=> handleLogout()}>Logout</Button>
          </Link>
          </Col>
        </Menu>
      </Header>

      <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="My Playlists">
            <Menu.Item key="1">Playlist1</Menu.Item>
            <Menu.Item key="2">Playlist2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="My Albums">
            <Menu.Item key="5">Album1</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/users/signup">
              <RegistrationForm addnewUser={addnewUser} />
            </Route>
            <Route path="/musics/:ListName">
              <div>
                <Playlist playlist={singlePl} loadSongs= {loadSongs} songs={songs} addnewSong={addnewSong} />
              </div>
            </Route>
            <Route path="/musics">
              <div>
                {user ? <Playlists playlists={playlists} addnewPlaylist={addPlaylist} deleteList={deleteList} />: "Login or Sign up first" }  
              </div>
            </Route>
            <Route path="/users">
              {user ? <MyDash user={user}/> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

        </Content>
      </Layout>
    </Layout>
  </Layout>
  )
}

export default App