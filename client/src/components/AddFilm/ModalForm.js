import React, {Component} from 'react'
import './ModalForm.css'
import {validateControl} from '../../shared/validation/validation'
import {filmHandler} from '../../store/actions/modalform'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/es/Dialog/Dialog'
import Button from '@material-ui/core/es/Button/Button'
import {grey, indigo, lime} from '@material-ui/core/colors/index'
import TextField from '@material-ui/core/es/TextField/TextField'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/es/Snackbar/Snackbar'
import Slide from '@material-ui/core/es/Slide/Slide'
import Fab from '@material-ui/core/es/Fab/Fab'
import DialogContent from '@material-ui/core/es/DialogContent/DialogContent'


const regexYear = RegExp(/^[0-9]+$/)

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ModalForm extends Component {

    state = {
        filmId: '',
        isFormValid: false,
        open: false,
        errorMessage: {
            name: '',
            year: '',
            description: '',
            file: ''
        },
        formControls: {
            name: {
                value: '',
                valid: false,
                touched: false,
                validation: {required: true}
            },
            year: {
                value: '',
                valid: false,
                touched: false,
                validation: {required: true}
            },
            description: {
                value: '',
                valid: false,
                touched: false,
                validation: {required: true}
            },
            file: {
                value: '',
                valid: false,
                touched: false,
                validation: {required: true},
                selectedFile: null
            }
        }
    }


    componentDidMount() {
        this.props.setClick(this.updateFilm)
    }

    updateFilm = (film) => {
        const formControls = {...this.state.formControls}
        const filmId = film._id

        formControls.name.value = film.name
        formControls.year.value = film.year
        formControls.description.value = film.description

        Object.keys(formControls).forEach(name => {
            !formControls[name].value
                ? formControls[name].valid = false
                : formControls[name].valid = true
        })

        this.setState({formControls, filmId})
    }

    resetForm = () => {
        const formControls = {...this.state.formControls}
        const isFormValid = false

        Object.keys(formControls).forEach(name => {
            formControls[name].value = ''
            formControls[name].valid = false
        })
        this.setState({isFormValid, formControls})
        this.props.handleClose()
    }

    filmHandler = () => {
        this.setState({isFormValid: false})
        const genreId = this.props.location.pathname.split('/')[2]
        const dataModalForm = {
            isNewFilm: this.props.isNewFilm,
            handleClose: this.props.handleClose,
            isOpenModalMessage: this.isOpenModalMessage,
            isCloseModalMessage: this.isCloseModalMessage,
            films: this.props.films,
            name: this.state.formControls.name.value,
            year: this.state.formControls.year.value,
            description: this.state.formControls.description.value,
            selectedFile: this.state.formControls.file.selectedFile,
            selectedFileName: this.state.formControls.file.selectedFile.name,
            filmId: this.state.filmId,
            genreId
        }

        this.props.filmHandler(dataModalForm)

        const formControls = {...this.state.formControls}
        Object.keys(formControls).forEach(name => {
            formControls[name].value = ''
            formControls[name].valid = false
        })

        this.setState({formControls})
    }

    isOpenModalMessage = () => this.setState({open: true})

    isCloseModalMessage = () => this.setState({open: false})

    submitHandler = event => {
        event.preventDefault()
    }

    onChangeHandler = event => {
        event.preventDefault()
        const formControls = {...this.state.formControls}
        const errorMessage = {...this.state.errorMessage}
        const {name, value} = event.target
        const ext = value.substring(value.lastIndexOf('.') + 1)

        formControls[name].touched = true
        formControls[name].valid = validateControl(value, formControls[name].validation)
        formControls[name].value = value
        if (event.target.files && event.target.files[0]) {
            formControls[name].selectedFile = event.target.files[0]
        }

        switch (name) {
            case 'genreselect':
                errorMessage.genreselect =
                    value.length < 1
                        ? 'Выберите, пожалуйста, жанр'
                        : ''
                break
            case 'name':
                errorMessage.name =
                    value.trim().length < 1 || value.length > 40
                        ? 'Название фильма должно иметь до 40 символов и не быть пустым'
                        : ''
                break
            case 'year':
                errorMessage.year =
                    (regexYear.test(value) ? '' : 'Введите, пожалуйста, год в числовом формате') ||
                    (value < 1895 ? 'В это время официально кинематографа не было :)' : '') ||
                    (value.length > 4 ? 'Значение года должно иметь не больше 4 символов' : '') ||
                    (value > new Date().getFullYear() ? 'Не торопитесь, это время ещё не настало :)' : '')
                break
            case 'description':
                errorMessage.description =
                    value.trim().length < 1 || value.length > 700
                        ? 'Описание фильма должно иметь до 700 символов и не быть пустым'
                        : ''
                break
            case 'file':
                errorMessage.file =
                    (ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'png'
                        ? '' : 'Фото обложки должно быть в формате jpeg, jpg, png') ||
                    (event.target.files[0].size > 5242880 ? 'Размер файла обложки не должен привышать 5 мб' : '') ||
                    (event.target.files[0].size < 70 * 70 ? 'Размер файла обложки не должен быть меньше 100 * 100' : '')
                break
            default:
                break
        }

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && !errorMessage[name].length && isFormValid
        })

        this.setState({formControls, errorMessage, isFormValid})
    }

    render() {
        const errorMessage = this.state.errorMessage

        return (
            <Dialog
                fullScreen
                open={this.props.open}
                onClose={this.props.handleClose}
                TransitionComponent={Transition}
            >
                <DialogContent style={{background: grey['400']}}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Fab
                            onClick={() => this.resetForm()}
                            size="small"
                            color="secondary"
                            aria-label="Close"
                            className="margin"
                        >
                            <CloseIcon/>
                        </Fab>
                    </div>
                    <div style={{maxWidth: 500, margin: '0 auto'}}>
                        <form
                            onSubmit={this.submitHandler}
                            className="form"
                        >
                            {
                                this.props.isNewFilm
                                    ? <h1 style={{textAlign: 'center', color: indigo.A700}}>Добавить фильм</h1>
                                    : <h1 style={{textAlign: 'center', color: indigo.A700}}>Редактировать фильм</h1>
                            }
                            <TextField
                                error={errorMessage.name ? !!1 : !!0}
                                name="name"
                                value={this.state.formControls.name.value || ''}
                                id="standard-dense"
                                label="Название фильма"
                                className="textField dense"
                                margin="dense"
                                onChange={this.onChangeHandler}
                            />
                            {errorMessage.name && (
                                <span className="error-message">{errorMessage.name}</span>
                            )}
                            <TextField
                                error={errorMessage.year ? !!1 : !!0}
                                name="year"
                                value={this.state.formControls.year.value || ''}
                                id="standard-dense"
                                label="Год выхода на экран"
                                className="textField dense"
                                margin="dense"
                                onChange={this.onChangeHandler}
                            />
                            {errorMessage.year && (
                                <span className="error-message">{errorMessage.year}</span>
                            )}
                            <TextField
                                error={errorMessage.description ? !!1 : !!0}
                                name="description"
                                value={this.state.formControls.description.value || ''}
                                id="standard-multiline-static"
                                label="Описание фильма"
                                multiline
                                rows="4"
                                className="textField"
                                margin="normal"
                                onChange={this.onChangeHandler}
                            />
                            {errorMessage.description && (
                                <span className="error-message">{errorMessage.description}</span>
                            )}
                            <div className="file">
                                <input
                                    name="file"
                                    value={this.state.formControls.file.value || ''}
                                    style={{display: 'none'}}
                                    accept="image/*"
                                    className="input"
                                    id="contained-button-file"
                                    type="file"
                                    onChange={this.onChangeHandler}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        className="button"
                                        style={{width: '100%'}}
                                    >
                                        Загрузить обложку
                                    </Button>
                                </label>
                                {errorMessage.file && (
                                    <span className="error-message">{errorMessage.file + '. '}</span>
                                )}
                                {!this.props.isNewFilm && !this.state.formControls.file.value
                                    ? <span className="error-message">Загрузка обложки обязательна.</span>
                                    : null
                                }
                            </div>
                            <Button
                                onClick={this.filmHandler}
                                variant="contained"
                                className="button"
                                style={this.state.isFormValid
                                    ? {background: indigo.A700, color: lime["50"], cursor: 'pointer'}
                                    : {cursor: 'not-allowed', pointerEvents: 'auto'}}
                                disabled={!this.state.isFormValid}
                            >
                                {this.props.isNewFilm ? 'Добавить' : 'Редактировать'}
                            </Button>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={this.state.open}
                                ContentProps={{'aria-describedby': 'message-id'}}
                                message={<span id="message-id">{this.props.message}</span>}
                            />
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        message: state.modalform.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filmHandler: (dataModalForm) => dispatch(filmHandler(dataModalForm))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalForm))