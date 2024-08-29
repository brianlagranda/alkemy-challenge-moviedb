import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useFetchMovies } from '../hooks/useFetchMovies';
import Movie from './Movie';
import LoadMoreButton from './LoadMoreButton';
import { Navigate } from 'react-router-dom';
import { incrementPage } from '../features/search/searchSlice';

const Results = () => {
    const dispatch = useDispatch();
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const page = useSelector((state: RootState) => state.search.page);
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
        <div className="px-8">
            {moviesList.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 gap-4 xs:mx-auto xs:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
                        {moviesList.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <div className="my-4 flex justify-center">
                        <LoadMoreButton
                            onClick={() => dispatch(incrementPage())}
                            buttonTitle="Load More"
                        />
                    </div>
                </>
            ) : (
                <div className="flex h-full items-center justify-center">
                    <span className="text-lg">
                        No se encontraron resultados
                    </span>
                </div>
            )}
        </div>
    );
};

export default Results;
