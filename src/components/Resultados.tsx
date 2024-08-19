import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Movie, MovieListProps } from '../types/movieType';
import Pelicula from './Pelicula';

const MySwal = withReactContent(Swal);

const Resultados: React.FC<MovieListProps> = ({ addOrRemoveFromFavs }) => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword');

    const Token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!keyword) return;

        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?language=es-ES&page=1&api_key=a38828a7abe4db65150dacdb2df29843&query=${keyword}`,
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
    }, [keyword]);

    return (
        <>
            {!Token && <Navigate to="/" />}
            {!moviesList && (
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
            <div className="my-4 grid grid-cols-1 gap-4 p-4 xs:mx-auto xs:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-8">
                {moviesList.length > 0 ? (
                    moviesList.map((movie, idx) => (
                        <Pelicula
                            key={idx}
                            movie={movie}
                            addOrRemoveFromFavs={addOrRemoveFromFavs}
                        />
                    ))
                ) : (
                    <div className="col-span-4 my-auto flex h-full items-center justify-center">
                        <span>No se encontraron resultados</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Resultados;
