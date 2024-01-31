import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isUserLogin } from '../store/selectors/isUserLogin';
import { userState } from '../store/atoms/user';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { Search } from './SearchBar';
import { SearchIconWrapper } from './SearchBar';
import { StyledInputBase } from './SearchBar';
import { searchState } from '../store/atoms/search';
import { search } from '../store/selectors/search';
import { isUserLoading } from '../store/selectors/isUserLoading';



export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const userLogin = useRecoilValue(isUserLogin)
  const userLoading = useRecoilValue(isUserLoading)
  const setUserLogin = useSetRecoilState(userState)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const setSearch = useSetRecoilState(searchState)
  const searchItem = useRecoilValue(search)


  const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);

  };

    const handleLogout = () => {
    localStorage.removeItem("token");
    setUserLogin({
        isUser:false
    })
    navigate("/signin")
}

  const menuId = 'primary-search-account-menu';


  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  if(userLoading){
    return <Box>
      <CircularProgress></CircularProgress>
    </Box>
  }
  
  return (userLogin)?( <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography
            onClick={() => { if(userLogin){
              window.location.reload()
            }else{
              navigate('/')
            }  
                  }}
            variant="h6"
            noWrap
            component="div"
            style={{cursor : 'pointer',
          fontFamily  : 'scribble',
          fontWeight : 800,
          fontSize : 35
          }}
            sx={{ display: { xs: 'div', sm: 'block' } }}
          >
            Notesy
          </Typography>
          <div style={{display : 'flex',
        justifyContent : 'center'

        }}>
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchItem}
                onChange={(e) => setSearch({
                  search : e.target.value
                })}
              />
            </Search>
          </div>
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex'}}>
           
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
         
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box> ):(
    <div>
    <div>  
   </div>
   <div style={{
     display : 'flex',
     justifyContent : 'right'
   }}>
     <Button
       style={{
         margin : 10
       }}
       variant='contained'
       onClick={()=>{
         navigate('/signin')
       }}>
         Login
     </Button>
     <Button
       style={{
         margin : 10,
         marginRight : 20
       }}
       variant='contained'
       onClick={()=>{
         navigate('/signup')
       }}>
         signup
     </Button>
   </div>
 
   </div>
  )
}
