import img from '../assets/react.png'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import css from './Dashboard.module.css'
import { Button } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { database } from './firebase';
import { useState } from 'react';
import { getDocs } from "firebase/firestore";
import { useEffect } from 'react';
import { doc, updateDoc } from "firebase/firestore";

export default function Dashboard() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Name, setName] = useState()
  const [Username, setUsername] = useState()
  const [Email, setEmail] = useState()
  const navigate = useNavigate();
  const [Getdataindatabase, setGetdataindatabase] = useState([])
  const [Refresh,setRefresh]=useState(false)
  const handleChange = (event) => {
    setAuth(event.target.checked);
    navigate('/');

  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const obj = {
    name: Name,
    UserName: Username,
    email: Email,
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(database, "users"), obj);
      alert('User Data Successfully Add')
      setName('')
      setUsername('')
      setEmail('')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const arr = []
    try {
      const querySnapshot = await getDocs(collection(database, "users"));
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
        setGetdataindatabase(arr);
      });
    } catch (error) {
      console.log(error);
    }
  }
  const EditData = async (id) => {
    const Updateval = prompt("Enter Name")
    try {
      const NewUpdateuser = {
        name: Updateval
      }
      const washingtonRef = updateDoc(doc(database, "users", id),NewUpdateuser);
      console.log(washingtonRef);
      setRefresh(!Refresh)

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'you are Login' : 'If you want to Logout'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem style={{ textAlign: "center" }} ><Link style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  textDecoration: 'none',
                  margin: "auto",
                  fontWeight: "bolder",
                  color: 'black'
                }} to='/' >Logout</Link>
                </MenuItem>
                <MenuItem style={{ textAlign: "center" }} ><Link style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  textDecoration: 'none',
                  margin: "auto",
                  fontWeight: "bolder",
                  color: 'black'
                }} to='/'>Delete Account</Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar><br /><br />
      <Container className={css.img}>
        <form onSubmit={handleSubmit}>
          <input type="text"
            placeholder='Name'
            required
            style={{ padding: '15px', }}
            onChange={(e) => setName(e.target.value)}
            value={Name}
          /><br /><br />
          <input type="text"
            placeholder='User Name'
            required
            style={{ padding: '15px', }}
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
          /><br /><br />
          <input type="email"
            placeholder='Email'
            required
            style={{ padding: '15px', }}
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
          /><br /><br />
          <Button variant='contained' type='submit'>Add Data</Button>
        </form><br />
        {
          Getdataindatabase.map((item, index) => (
            <div key={index}>
              <h3>Name: {item.name}
              <Button variant='contained' onClick={() => EditData(item.id)}>Edit</Button>
              <Button variant='contained'>Delete</Button><br /><br />

              </h3>
              <p>Username: {item.UserName}</p>
              <p>Email: {item.email}</p><br />
              
              <hr /><br />
            </div>
          ))
        }
      </Container>
    </Box>
  );
}

