import React, {Component} from 'react'
import './ShowFilms.css'
import SearchFilms from '../SearchFilms/SearchFilms'
import RenderFilmItem from './RenderFilmItem'
import {addFilm, changeFilm, closeModalFilm, deleteFilm, fetchFilms, openModalFilm} from '../../store/actions/films'
import {connect} from 'react-redux'
import ModalForm from '../AddFilm/ModalForm'
import Button from '@material-ui/core/es/Button/Button'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress'
import Snackbar from '@material-ui/core/es/Snackbar/Snackbar'
import {indigo, lime} from '@material-ui/core/colors'
import {lightGreen, pink} from '@material-ui/core/colors/index'
import Grid from '@material-ui/core/Grid'


class ShowFilms extends Component {

    state = {
        isFormFilter: false,
        query: '',
        columnToQuery: 'Название Фильма'
    }

    componentDidMount() {
        this.props.fetchFilms()
    }

    onChangeQuery = e => {
        this.setState({query: e.target.value})
    }

    onChangeColumnToQuery = e => {
        this.setState({columnToQuery: e.target.value})
    }

    render() {
        const genre = JSON.parse(localStorage.getItem('genre'))
        let films = this.props.films

        return (
            <Grid
                container
                direction="column"
                className="ShowFilms"
                style={{padding: '0 30px'}}
            >
                <div className="add-film">
                    <div className="wrap-btn">
                        <Button
                            onClick={() => {
                                this.props.openModalFilm()
                                this.props.addFilm()
                                this.setState({isFormFilter: false, query: ''})
                            }}
                            type="submit"
                            variant="contained"
                            className="button"
                            style={{background: indigo.A700, color: lime["50"], cursor: 'pointer'}}
                        >
                            Добавить фильм
                        </Button>
                        {
                            !this.props.loading && films.length >= 2
                                ? <IconButton
                                    onClick={() => {
                                        this.setState(prevState => {
                                            return {
                                                isFormFilter: !prevState.isFormFilter
                                            }
                                        })
                                    }}
                                    style={{
                                        marginLeft: 10,
                                        color: this.state.isFormFilter ? lightGreen.A400 : pink["400"]
                                    }}
                                    className="button"
                                    aria-label="FilterListIcon"
                                >
                                    <FilterListIcon style={{fontSize: 35}}/>
                                </IconButton>
                                : null
                        }
                    </div>
                    <ModalForm
                        open={this.props.isOpenModal}
                        isNewFilm={this.props.isNewFilm}
                        films={this.props.films}
                        changeIsNewFilm={this.props.addFilm}
                        handleClose={() => this.props.closeModalFilm()}
                        setClick={click => this.clickChangeFilm = click}
                    />
                </div>
                <div className="row">
                    <div>
                        <h1 style={{marginBottom: 30, fontWeight: 500, textAlign: 'center', color: lime["50"]}}>
                            Список фильмов по жанру "{genre.name}"
                        </h1>
                        {
                            films.length >= 2 && this.state.isFormFilter
                                ? <SearchFilms
                                    query={this.state.query}
                                    columnToQuery={this.state.columnToQuery}
                                    onChangeQuery={this.onChangeQuery}
                                    onChangeColumnToQuery={this.onChangeColumnToQuery}
                                />
                                : null
                        }
                        {
                            !this.props.loading
                                ? <div>
                                    {
                                        films.length !== 0
                                            ? < ul className="film-list">
                                                <Grid container spacing={24}>
                                                    <RenderFilmItem
                                                        query={this.state.query}
                                                        columnToQuery={this.state.columnToQuery}
                                                        films={films}
                                                        openModalFilm={this.props.openModalFilm}
                                                        changeFilm={this.props.changeFilm}
                                                        deleteFilm={this.props.deleteFilm}
                                                        clickChangeFilm={this.clickChangeFilm}
                                                    />
                                                </Grid>
                                            </ul>
                                            : <p style={{paddingTop: 20, fontWeight: 400, fontSize: 18, color: lime["50"]}}>
                                                Ваш список фильмов в жанре "{genre.name}" пока пуст. Чтобы создать список -
                                                кликните по кнопке "ДОБАВИТЬ ФИЛЬМ" и создайте свою коллекцию...
                                            </p>
                                    }
                                </div>
                                : <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <CircularProgress className="progress"/>
                                </div>
                        }
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={this.props.isOpenMessage}
                    ContentProps={{'aria-describedby': 'message-id'}}
                    message={<span id="message-id">{this.props.message}</span>}
                />
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.films.loading,
        isNewFilm: state.films.isNewFilm,
        isOpenMessage: state.films.isOpenMessage,
        isOpenModal: state.films.isOpenModal,
        message: state.films.message,
        films: state.films.films
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFilms: () => dispatch(fetchFilms()),
        deleteFilm: (name, id) => dispatch(deleteFilm(name, id)),
        openModalFilm: () => dispatch(openModalFilm()),
        closeModalFilm: () => dispatch(closeModalFilm()),
        addFilm: () => dispatch(addFilm()),
        changeFilm: () => dispatch(changeFilm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowFilms)