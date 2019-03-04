import React from 'react'
import {NavLink} from 'react-router-dom'
import ListItem from '@material-ui/core/es/ListItem/ListItem'
import Drawer from '@material-ui/core/es/Drawer/Drawer'
import {grey, pink} from '@material-ui/core/colors'


const SiteDrower = props => {
    return (
        <Drawer
            open={props.open}
            onClose={() => props.onClose(false)}
        >
            <div style={{background: grey['400'], width: 300, height: '100%'}}>
                <div>
                    <ListItem button>
                        <NavLink
                            style={{textDecoration: 'none'}}
                            to="/logout"
                        >
                            <span style={{color: pink["400"], fontWeight: 700, fontSize: 20}}>
                            Выйти
                        </span>
                        </NavLink>
                    </ListItem>
                </div>
            </div>
        </Drawer>
    )
}

export default SiteDrower

