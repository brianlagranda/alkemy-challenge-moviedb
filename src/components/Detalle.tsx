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
            {!movie && (
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
            {movie && (
                <>
                    <div className="lg:grid-cols-[1fr, 2fr] lg:grid lg:grid-rows-[1fr,100%] xl:mx-auto xl:w-[80%] xl:rounded xl:border xl:border-emerald-200 xl:shadow-xl xl:shadow-emerald-100">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            className="mx-auto xs:pt-4 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:pt-0"
                        ></img>
                        <h2 className="my-4 bg-emerald-600 p-4 text-center text-2xl font-bold text-white lg:col-start-2 lg:row-start-1 lg:mx-auto lg:my-0 lg:w-full lg:items-center lg:p-0">
                            {movie.title}
                        </h2>
                        <div className="flex flex-col gap-4 p-2 lg:col-start-2 lg:row-start-2 lg:p-4">
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
                    </div>
                </>
            )}
        </>
    );
};

export default Detalle;
