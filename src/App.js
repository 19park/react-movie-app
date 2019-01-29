import React, {Component} from 'react';
import './App.css';
import Movie from './Movie'


class App extends Component {
    state = {

    }

    componentDidMount () {
        this._getMovies();
    }

    _renderMovies = () => {
        return this.state.movies.map(e => {
            return <Movie title={e.title_english}
                          poster={e.medium_cover_image}
                          genres={e.genres}
                          synopsis={e.synopsis}
                          key={e.id}/>
        })
    }

    _getMovies = async () => {
        const movies = await this._callApi()
        this.setState({
            movies
        })
    }

    _callApi = () => {
        return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
            .then((res) => res.json())
            .then((json) => json.data.movies)
            .catch((err) => {
                console.log(err)
            })
    }

    render () {
        const { movies } = this.state;
        return (
            <div className={movies ? "App" : "App--loading"}>
                {this.state.movies ? this._renderMovies() : 'Loading..'}
            </div>
        );
    }
}

export default App;
