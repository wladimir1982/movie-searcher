import React from 'react'
import {lime, pink} from '@material-ui/core/colors'


const Footer = () => {
    return (
        <footer style={{background: pink["700"], color: lime["50"]}}>
            <h1 style={{margin: 0, lineHeight: 2, textAlign: 'center', fontSize: 18, fontWeight: 400}}>
                Cinema {new Date().getFullYear()}
            </h1>
        </footer>
    )
}

export default Footer