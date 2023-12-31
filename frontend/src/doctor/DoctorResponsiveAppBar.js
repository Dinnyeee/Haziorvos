import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Routes, Route, useNavigate} from 'react-router-dom';




function DoctorResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate= useNavigate();

  const LogOut=()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate('/login');
  }

  const navigateToHome = () => {
    navigate('/cases');
  }
  const navigateToPraxes = () => {
    navigate('/praxes');
  }
  const navigateToAppointments = () => {
    navigate('/appointments');
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            General Practitioner
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                      
                      <Button onClick={navigateToPraxes} sx={{ my: 2, display: 'block' }}> 
                       Praxes
                      </Button>

                       <Button onClick={navigateToHome} sx={{ my: 2, display: 'block' }}>
                     Cases
                      </Button>
                      
                      <Button onClick={navigateToAppointments} sx={{ my: 2,  display: 'block' }}> 
                       Appointments
                      </Button>
                    <Button onClick={LogOut} sx={{ my: 2,  display: 'block' }}> 
                        Log out 
                     </Button>
                    
                    </Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GPApp
          </Typography>
          <Container sx={{ flexGrow:1, display: { xs: 'none', md: 'flex' } }}>
              
              <Button variant="text"  sx={{color: 'white'}} onClick={navigateToPraxes}> 
                Praxes
              </Button>

              <Button variant="text"  sx={{color: 'white'}} onClick={navigateToHome}> 
              Cases           
              </Button>

              <Button variant="text"  sx={{color: 'white'}} onClick={navigateToAppointments} > 
              Appointments
              </Button>

              <Button variant="text"  sx={{color: 'white'}} onClick={LogOut}> 
             Log out   
              </Button>
            
          </Container>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default DoctorResponsiveAppBar;