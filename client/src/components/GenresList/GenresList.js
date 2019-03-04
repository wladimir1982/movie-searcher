import React, {Component} from 'react'
import './GenreList.css'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllGenre, deleteGenreHandler, genreHandler, changeGenre} from '../../store/actions/genrelist'
import {TextField, Fab} from '@material-ui/core/es'
import AddIcon from '@material-ui/icons/Add'
import {deepOrange, indigo, lightGreen, lime, pink} from '@material-ui/core/colors'
import Snackbar from '@material-ui/core/es/Snackbar/Snackbar'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress'
import Grid from '@material-ui/core/Grid'


const regexGenre = RegExp(/^[a-zA-Z,а-яА-Я]+$/)

class GenresList extends Component {

    state = {
        isFormValid: false,
        isInfo: false,
        isNew: true,
        genre: null,
        genreName: '',
        genreId: '',
        errorMessage: {
            genre: ''
        }
    }

    componentDidMount() {
        this.props.getAllGenre()
    }

    genreHandler = () => {
        const {genreName, genreId} = this.state
        const {isNew, genres} = this.props

        this.setState({isFormValid: false})
        this.props.genreHandler(genreName, isNew, genreId, genres)
        this.setState({genreName: ''})
    }

    submitHandler = event => {
        event.preventDefault()
    }

    onChangeHandler = event => {
        const {name, value} = event.target
        const state = {...this.state}
        let errorMessage = state.errorMessage

        switch (name) {
            case 'genreName':
                errorMessage.genre =
                    (regexGenre.test(value) ? '' : 'Введите, пожалуйста, жанр в строковом формате без пробелов') ||
                    (value.length > 15 ? 'Название жанра должно иметь до 15 символов' : '')
                break
            default:
                break
        }

        let isFormValid = true

        Object.keys(errorMessage).forEach(name => {
            isFormValid = errorMessage[name].length > 0 ? !isFormValid : isFormValid
        })

        this.setState({errorMessage, [name]: value, isFormValid})
    }

    renderGenreList() {
        const genres = this.props.genres.sort((a, b) => a.name.localeCompare(b.name))

        return (
            <ul style={{marginBottom: 50}}>
                {genres.map(genre => (
                    <li
                        className="list-item"
                        key={genre._id}
                    >
                        <NavLink
                            onClick={() => localStorage.setItem('genre', JSON.stringify(genre))}
                            to={`/genre/${genre._id}`}
                            style={{
                                width: '100%',
                                textDecoration: 'none'
                            }}
                        >
                            <p className="genre-name">{genre.name}</p>
                        </NavLink>
                        <IconButton
                            onClick={() => {
                                this.props.changeGenre()
                                this.setState({
                                    isFormValid: true,
                                    genreName: genre.name,
                                    genreId: genre._id
                                })
                            }}
                            style={{color: deepOrange['900']}}
                            className="button"
                            aria-label="Edit"
                        >
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            onClick={() => this.props.deleteGenreHandler(genres, genre)}
                            style={{color: pink["400"]}}
                            className="button"
                            aria-label="Delete"
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        const {errorMessage} = this.state

        return (
            <Grid
                className="content"
                container
                direction="column"
                style={{padding: '0 15px'}}
            >
                <div className="genre-title-btn">
                    <h1 style={{color: lime["50"]}}>
                        Добавте новый жанр или выбирите из списка
                    </h1>
                    <IconButton
                        onClick={() => {
                            this.setState(prevState => {
                                return {
                                    isInfo: !prevState.isInfo
                                }
                            })
                        }}
                        style={{
                            marginLeft: 10,
                            color: this.state.isInfo ? lightGreen.A400 : pink["400"]
                        }}
                        className="button"
                        aria-label="Info"
                    >
                        <InfoIcon style={{fontSize: 35}}/>
                    </IconButton>
                </div>
                {
                    this.state.isInfo
                        ? <p style={{fontWeight: 400, fontSize: 18, color: lime["50"]}}>
                            1. Для начала работы с приложением воспользуйтесь формой для добавления жанров <br/>
                            2. Добавляйте жанры по мере необходимости <br/>
                            3. Жанры из списка, по Вашему усмотрению, можно редактировать или удалять <br/>
                            4. Перейдите в нужный жанр и создайте в нём свою коллекцию фильмов
                        </p>
                        : null
                }
                <Grid item xs={12} style={{width: 400}}>
                    <div className="wrap">
                        <form onSubmit={this.submitHandler} className="genre-form" noValidate>
                            <div className="add-genre">
                                <TextField
                                    error={errorMessage.genre.length > 0 ? !!1 : !!0}
                                    name="genreName"
                                    value={this.state.genreName}
                                    id="standard-dense"
                                    label={this.props.isNew
                                        ? 'Добавить жанр'
                                        : 'Редактировать жанр'}
                                    className="textField dense"
                                    margin="dense"
                                    noValidate
                                    onChange={this.onChangeHandler}
                                />
                                <Fab
                                    onClick={this.genreHandler}
                                    type="submit"
                                    size="small"
                                    aria-label="Add"
                                    className="margin"
                                    style={this.state.isFormValid
                                        ? {background: indigo.A700, color: lime["50"], cursor: 'pointer'}
                                        : {cursor: 'not-allowed', pointerEvents: 'auto'}}
                                    disabled={!this.state.isFormValid}
                                >
                                    {
                                        this.props.isNew
                                            ? <AddIcon/>
                                            : <EditIcon/>
                                    }
                                </Fab>
                            </div>
                            {errorMessage.genre.length > 0 && (
                                <span className="error-message">{errorMessage.genre}</span>
                            )}
                        </form>
                    </div>
                </Grid>
                {
                    !this.props.loading
                        ? <Grid item xs={12} style={{width: 400}}>
                            {
                                this.props.genres.length !== 0
                                    ? <div className="list">
                                        {this.renderGenreList()}
                                    </div>
                                    : <p style={{paddingTop: 20, fontWeight: 400, fontSize: 18, color: lime["50"]}}>
                                        Ваш список жанров пока пуст. Вы можете создать свой список жанров воспользовавшись
                                        формой выше
                                    </p>
                            }
                        </Grid>
                        : <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress className="progress"/>
                        </div>
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.props.isOpenMessage}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.message}</span>}
                />
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        isNew: state.genres.isNew,
        loading: state.genres.loading,
        isOpenMessage: state.genres.isOpenMessage,
        message: state.genres.message,
        genres: state.genres.genres
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllGenre: () => dispatch(getAllGenre()),
        genreHandler: (name, isNew, genreId, genres) => dispatch(genreHandler(name, isNew, genreId, genres)),
        changeGenre: () => dispatch(changeGenre()),
        deleteGenreHandler: (genres, genre) => dispatch(deleteGenreHandler(genres, genre))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenresList)