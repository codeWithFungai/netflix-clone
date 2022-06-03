import React from 'react'
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ isLargeRow, title, fetchURL}) {

    const [movies, setMovies] = React.useState([]);
    const [trailerUrl, setTrailerUrl] = React.useState("");

    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL)
            setMovies(request.data.results);
            return request;
        }
        fetchData()
    }, [fetchURL])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl(''); //if the trailer was already open, let's close it.
        } else {
            movieTrailer(movie?.name || "").then((url) => {
             const urlParams = new URLSearchParams(new URL(url).search);
             setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.log(error))
        }

    }

  return (
    <div className='row'>
        <h2>{title}</h2>

        <div className='row__posters'>
            {movies.map(function (movie) {
                return(
                    <img key={movie.id} onClick={() => handleClick(movie)} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                )
            })}
        </div>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row