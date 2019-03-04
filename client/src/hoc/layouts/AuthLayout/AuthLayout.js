import React, {Component} from 'react'
import './AuthLayout.css'
import Header from '../../../shared/Header/Header'


class AuthLayout extends Component {

    state = {
        isAuth: true
    }

    render() {
        return (
            <div className="AuthLayout">
                <Header isAuth={this.state.isAuth}/>
                <main className="auth-block">
                    {this.props.children}
                </main>
            </div>
        )
    }

}

export default AuthLayout