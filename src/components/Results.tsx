import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useFetchMovies } from '../hooks/useFetchMovies';
import Movie from './Movie';
import LoadMoreButton from './LoadMoreButton';

const Results = () => {
    const [page, setPage] = useState(1);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword');
    const Token = sessionStorage.getItem('token');

    const {
        data: moviesList,
        loading,
        error,
    } = useFetchMovies('search/movie', `language=es-ES&query=${keyword}`, page);

    if (!Token) return <Navigate to="/" />;

    if (loading) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center">
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="my-4 grid grid-cols-1 gap-4 p-4 xs:mx-auto xs:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
            {moviesList.length > 0 ? (
                moviesList.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))
            ) : (
                <div className="col-span-4 my-auto flex h-full items-center justify-center">
                    <span>No se encontraron resultados</span>
                </div>
            )}
            <LoadMoreButton
                onClick={() => setPage((prevPage) => prevPage + 1)}
                buttonTitle="Load More"
            />
        </div>
    );
};

export default Results;
