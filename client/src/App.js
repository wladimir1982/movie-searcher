import React, {Component} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import AuthLayout from './hoc/layouts/AuthLayout/AuthLayout'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import ShowFilms from './components/ShowFilms/ShowFilms'
import SiteLayout from './hoc/layouts/SiteLayout/SiteLayout'
import Logout from './components/Logout/Logout'
import GenresList from './components/GenresList/GenresList'


class App extends Component {

    render() {
        const token = localStorage.getItem('token')

        const authRoutes = (
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Redirect to="/login"/>
            </Switch>
        )


        const siteRouts = (
            <Switch>
                <Route path="/genre/:id" exact component={ShowFilms}/>
                <Route exact path="/genreslist" component={GenresList}/>
                <Route path="/logout" component={Logout}/>
                <Redirect to="/genreslist"/>
            </Switch>
        )

        return (
            token
                ? <SiteLayout>{siteRouts}</SiteLayout>
                : <AuthLayout>{authRoutes}</AuthLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(App))
