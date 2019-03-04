import React, {Component} from 'react'
import './LoginPage.css'
import InputAuth from '../../shared/InputAuth/InputAuth'
import {validateControl} from '../../shared/validation/validation'
import {auth, logout} from '../../store/actions/auth'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import {indigo, lime} from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'


class LoginPage extends Component {

    state = {
        message: '',
        open: false,
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                name: 'email',
                autoComplete: 'email',
                errorMessage: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                name: 'password',
                autoComplete: 'password',
                errorMessage: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                    actualLength: null
                }
            }
        }
    }

    componentDidMount() {
        if (this.props.location.search === '?registered') {
            const message = 'Теперь вы можете зайти в систему используя свои данные'

            this.setState({message, open: true})
            setTimeout(() => this.setState({open: false}), 3000)
        }

        setTimeout(() => {
            const status = localStorage.getItem('status_401')

            if (status) {
                const message = 'Время сессии истекло, пожалуйста, зайдите в систему заново'

                setTimeout(() => localStorage.removeItem('status_401'), 500)
                this.setState({message, open: true})
                setTimeout(() => this.setState({open: false}), 3000)
            }
        })
    }

    loginHandler = () => {
        this.props.login(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        ).catch((e) => {
            const message = e.response.data.message
            this.setState({message, open: true})
            setTimeout(() => this.setState({open: false}), 3000)
        })
    }

    submitHandler = event => {
        event.preventDefault()
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        if (formControls[controlName].name.length === 5) {
            formControls[controlName].errorMessage = 'Введите корректный email'
            if (event.target.value < 1) {
                formControls[controlName].errorMessage = 'Email не должен быть пустым'
            }
        }

        if (formControls[controlName].name.length === 8) {
            formControls[controlName].validation.actualLength = formControls[controlName].value.length
            formControls[controlName].errorMessage = `Пароль должен быть не меньше 6 символов.
                 Вы ввели ${formControls[controlName].validation.actualLength}`
            if (event.target.value < 1) {
                formControls[controlName].errorMessage = 'Пароль не должен быть пустым.'
            }
        }

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <InputAuth
                    key={controlName + index}
                    type={control.type}
                    name={control.name}
                    autoComplete={control.autoComplete}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <Grid container justify="center" style={{padding: '0 15px'}}>
                <form onSubmit={this.submitHandler} className="card">
                    <div className="card-content">
                        <h1 className="card-title">Войти в систему</h1>

                        {this.renderInputs()}

                    </div>
                    <div className="card-action">
                        <Button
                            onClick={this.loginHandler}
                            type="submit"
                            variant="contained"
                            className="button"
                            style={this.state.isFormValid
                                ? {background: indigo.A700, color: lime["50"], cursor: 'pointer'}
                                : {cursor: 'not-allowed', pointerEvents: 'auto'}}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={this.state.open}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.message}</span>}
                        />
                    </div>
                </form>
            </Grid>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)