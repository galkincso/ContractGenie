import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const Navigation = () => {

    const navigate = useNavigate();

    function handleClickList() {
        navigate("/list");
    }
    function handleClickUpload() {
        navigate("/upload");
    }
    function handleClickCreate() {
        navigate("/create");
    }
    function handleClickHome() {
        navigate("/");
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="static" className='custom-navigatiom'>
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
                                <MenuItem key={'készít'} onClick={handleClickCreate}>
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
                                onClick={handleClickCreate}
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
                                        onClick={handleClickHome}
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
        </>
    )

};
export default Navigation;