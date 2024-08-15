import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Movie } from '../types/movieType';

const MySwal = withReactContent(Swal);

const Resultados = () => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword');

    const Token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!keyword) return;

        setLoading(true);
        setError(null);

        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?language=es-ES&page=1&api_key=a38828a7abe4db65150dacdb2df29843&query=${keyword}`,
            )
            .then((res) => {
                setMoviesList(res.data.results);
                setLoading(false);
            })
            .catch((e) => {
                MySwal.fire({
                    title: 'Hubo un error inesperado, intente nuevamente más tarde',
                    icon: 'error',
                });
                setError('Error fetching data');
                setLoading(false);
                console.log(`Error: ${e}`);
            });
    }, [keyword]);

    if (!Token) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-4 flex justify-center">
                <span className="text-red-500">{error}</span>
            </div>
        );
    }

    return (
        <div className="my-4 grid grid-cols-1 gap-4 p-4 xs:mx-auto xs:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-8">
            {moviesList.length > 0 ? (
                moviesList.map((movie) => (
                    <div
                        key={movie.id}
                        className="flex w-full flex-col rounded border transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                    >
                        <Link to={`/detalle?movieID=${movie.id}`} className="">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            />
                        </Link>
                        <div className="flex h-full w-full flex-col gap-2 p-2">
                            <h2 className="text-xl font-bold">{movie.title}</h2>
                            <p className="h-full">{`${movie.overview.substring(0, 80)}...`}</p>
                            <Link
                                to={`/detalle?movieID=${movie.id}`}
                                className="w-1/2 rounded border bg-black p-2 text-center text-white hover:bg-white hover:text-black xs:w-full"
                            >
                                View detail
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-4 my-auto flex h-screen items-center justify-center">
                    <span>No results found</span>
                </div>
            )}
        </div>
    );
};

export default Resultados;
