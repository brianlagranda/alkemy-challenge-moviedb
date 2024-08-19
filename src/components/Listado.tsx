import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Movie, MovieListProps } from '../types/movieType';
import Pelicula from './Pelicula';

const MySwal = withReactContent(Swal);

const Listado: React.FC<MovieListProps> = ({ addOrRemoveFromFavs }) => {
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

export default Listado;
