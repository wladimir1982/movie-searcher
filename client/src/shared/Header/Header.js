import React from 'react'
import './Header.css'
import NavLink from 'react-router-dom/es/NavLink'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {indigo, lime, pink} from '@material-ui/core/colors'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import MenuIcon from '@material-ui/icons/Menu'


const Header = props => {
    const token = localStorage.getItem('token')

    return (
        <AppBar
            position="fixed"
            style={
                token
                    ? {background: pink["700"]}
                    : {background: indigo.A700}
            }
        >
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" color="inherit" className="grow">
                    <NavLink to="/genreslist" style={{textDecoration: 'none', color: lime["50"]}}>
                        Cinema
                    </NavLink>
                </Typography>
                {
                    token
                        ? <ul className="nav" style={{display: 'flex', alignItems: 'center'}}>
                            <li style={{marginRight: 10}}>
                                <NavLink
                                    className="nav-item"
                                    to="/genreslist"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        color: lime["50"]
                                    }}
                                >
                                    Жанры
                                </NavLink>
                            </li>
                            <li>
                                <IconButton
                                    onClick={props.onLeftIconClicked}
                                    className="menuButton"
                                    color="inherit"
                                    aria-label="Menu"
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </li>
                        </ul>
                        : <ul className="nav">
                            <li style={{marginRight: 10}}>
                                <NavLink
                                    className="nav-item"
                                    to="/login"
                                    style={{color: lime["50"]}}
                                >
                                    Вход
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-item"
                                    to="/register"
                                    style={{color: lime["50"]}}
                                >
                                    Регистрация
                                </NavLink>
                            </li>
                        </ul>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header
