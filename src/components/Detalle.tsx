import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Movie } from '../types/movieType';

const Detalle = () => {
    const [movie, setMovie] = useState<Movie>();

    const Token = sessionStorage.getItem('token');

    const query = new URLSearchParams(window.location.search);
    const movieID = query.get('movieID');

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?language=es-ES&api_key=a38828a7abe4db65150dacdb2df29843`;
        axios
            .get(endPoint)
            .then((res) => setMovie(res.data))
            .catch((error) => console.log(error));
    }, [movieID]);

    return (
        <>
            {!Token && <Navigate to="/" />}
            {movie && (
                <>
                    <div className="">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        ></img>
                        <h2 className="p-4 text-center text-2xl font-bold">
                            {movie.title}{' '}
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h5>
                            <strong className="text-lg font-bold">
                                Fecha de estreno:
                            </strong>{' '}
                            {movie.release_date}
                        </h5>
                        <p>
                            <strong className="text-lg">Reseña:</strong>{' '}
                            {movie.overview}
                        </p>
                        <h5 className="text-lg font-bold">Géneros:</h5>
                        <ul>
                            {movie.genres.map((genre) => (
                                <li
                                    key={genre.id}
                                    className="px-4 py-1 font-bold"
                                >
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </>
    );
};

export default Detalle;
