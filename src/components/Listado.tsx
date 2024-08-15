import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Movie } from '../types/movieType';

const MySwal = withReactContent(Swal);

const Listado = () => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);

    const Token = sessionStorage.getItem('token');

    useEffect(() => {
        axios
            .get(
                'https://api.themoviedb.org/3/discover/movie?language=es-ES&page=1&api_key=a38828a7abe4db65150dacdb2df29843',
            )
            .then((res) => {
                setMoviesList(res.data.results);
            })
            .catch((e) => {
                MySwal.fire({
                    title: 'Hubo un error inesperado, intente nuevamente más tarde',
                    icon: 'error',
                });
                console.log(`Error: ${e}`);
            });
    }, [setMoviesList]);

    return (
        <>
            {!Token && <Navigate to="/" />}
            {!moviesList && (
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            <div className="my-4 grid grid-cols-1 gap-6 p-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {moviesList.map((movie, idx) => {
                    return (
                        <div
                            key={idx}
                            className="flex w-full flex-col rounded border transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                        >
                            <Link
                                to={`/detalle?movieID=${movie.id}`}
                                className=""
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                />
                            </Link>
                            <div className="flex h-full w-full flex-col gap-2 p-2">
                                <h2 className="text-xl font-bold">
                                    {movie.title}
                                </h2>
                                <p className="h-full">{`${movie.overview.substring(0, 80)}...`}</p>
                                <Link
                                    to={`/detalle?movieID=${movie.id}`}
                                    className="w-1/2 rounded border bg-black p-2 text-center text-white hover:bg-white hover:text-black xs:w-full"
                                >
                                    View detail
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Listado;
