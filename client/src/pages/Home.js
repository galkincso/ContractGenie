import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';


const Home = () => {

    const navigate = useNavigate();
    const pages = ['Szerződés készítése', 'Sablonok', 'Sablon felvétele'];

    function handleClickList(event) {
        navigate("/list");
    }
    function handleClickUpload(event) {
        navigate("/upload");
    }
    function handleNavigation(page) {
        console.log("Page: ", page);
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        {/* Keskeny*/}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit">
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
                                }}>
                                     <MenuItem key={'készít'} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Szerződés készítése</Typography>
                                    </MenuItem>
                                    <MenuItem key={'list'} onClick={handleClickList}>
                                        <Typography textAlign="center">Sablonok</Typography>
                                    </MenuItem>
                                    <MenuItem key={'upload'} onClick={handleClickUpload}>
                                        <Typography textAlign="center">Sablon felvétele</Typography>
                                    </MenuItem>
                                {/*
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                                */}
                            </Menu>
                        </Box>

                        {/* Széles */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>                           
                            <Button 
                                sx={{ my: 2, color: 'black', display: 'block' }}
                                key={'készít'}>Szerződés készítése</Button>
                            <Button 
                                onClick={handleClickList}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                                key={'list'}>Sablonok</Button>
                            <Button
                                onClick={handleClickUpload}
                                sx={{ my: 2, color: 'black', display: 'block' }} 
                                key={'upload'}>Sablon felvétele</Button>
                            {/*
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleNavigation(page)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page}
                                </Button>
                            ))}
                            */}
                        </Box>

                        {/* MINDIG */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="a"
                                        sx={{
                                            mr: 2,
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: 'black',
                                            textDecoration: 'none',
                                        }}>
                                        Contract Genie
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/*
            <div className='options'>
                <Button onClick={handleClickList} variant="contained" size='large'>Szerződések listázása</Button>
                <Button onClick={handleClickUpload} variant="contained" size='large'>Szerződés feltöltése</Button>
            </div>
            */}
        </>
    )

};
export default Home;
