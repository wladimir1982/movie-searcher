import React from 'react'
import './SearchFilms.css'
import TextField from '@material-ui/core/es/TextField/TextField'
import Grid from '@material-ui/core/Grid'


const SearchFilms = props => {

    const data = [
        {value: 'Название Фильма', id: 1},
        {value: 'Год выхода на экран', id: 2},
        {value: 'Описание фильма', id: 3}
    ]

    return (
        <div className="wrap-form">
            <form onSubmit={e => e.preventDefault()} className="form-search">
                <Grid container direction="row" spacing={16}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="columnToQuery"
                            id="standard-select-currency-native"
                            select
                            label="Фильтр по:"
                            className="textField"
                            value={props.columnToQuery}
                            onChange={e => props.onChangeColumnToQuery(e)}
                            SelectProps={{
                                native: true,
                                MenuProps: {className: 'menu'}
                            }}
                            style={{width: '100%', height: '2.87em'}}
                        >
                            {data.map(option => (
                                <option key={option.id} value={option.value}>
                                    {option.value}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="query"
                            id="standard-dense"
                            label={props.columnToQuery}
                            className="textField dense"
                            value={props.query}
                            onChange={e => props.onChangeQuery(e)}
                            style={{width: '100%', height: '2.87em'}}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default SearchFilms
