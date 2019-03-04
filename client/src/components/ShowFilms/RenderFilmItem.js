import React from 'react'
import {lightGreen, lime, pink} from '@material-ui/core/colors/index'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'


const RenderFilmItem = props => {
    let films = props.films.sort((a, b) => a.name.localeCompare(b.name))
    const lowerCaseQuery = props.query.toLowerCase()

    if (props.columnToQuery === 'Название Фильма') {
        if (props.query) {
            films = films.filter(x => x.name.toLowerCase().includes(lowerCaseQuery) ? true : null)
        }
    } else if (props.columnToQuery === 'Описание фильма') {
        if (props.query) {
            films = films.filter(x => x.description.toLowerCase().includes(lowerCaseQuery) ? true : null)
        }
    } else if (props.columnToQuery === 'Год выхода на экран') {
        if (props.query) {
            films = films.filter(x => x.year.toString().toLowerCase().includes(props.query.toString().toLowerCase()) ? true : null)
        }
    } else {
        films = props.films.sort((a, b) => a.name.localeCompare(b.name))
    }


    if (films.length) {
        return films.map(film => {
            return (
                <Grid key={film._id} item xs={12} sm={4} md={3}>
                    <li
                        className="film-item"
                    >
                        <div className="film-pop-ups">
                            <h1 className="film-title">{film.name}</h1>
                            <p className="film-year">Год: {film.year}</p>
                            <p className="film-description">{film.description}</p>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <IconButton
                                    onClick={() => {
                                        props.openModalFilm()
                                        props.changeFilm()
                                        props.clickChangeFilm(film)
                                    }}
                                    style={{color: lightGreen.A400}}
                                    className="button"
                                    aria-label="Edit"
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton
                                    onClick={() => props.deleteFilm(film.name, film._id)}
                                    style={{color: pink["400"]}}
                                    className="button"
                                    aria-label="Delete"
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </div>
                        <img className="film-img" src={`../../../../${film.imageSrc}`} alt={film.name}/>
                    </li>
                </Grid>
            )
        })
    } else {
        return (
            <p style={{fontWeight: 400, fontSize: 18, color: lime["50"]}}>
                Извините... Фильма соответствующего критериям Вашего поиска у нас нет...
            </p>
        )
    }
}

export default RenderFilmItem