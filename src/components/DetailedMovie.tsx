// src/components/DetailedMovie.tsx
import { Navigate } from 'react-router-dom';
import { useFetchMovies } from '../hooks/useFetchMovies';

const DetailedMovie = () => {
    const Token = sessionStorage.getItem('token');

    const query = new URLSearchParams(window.location.search);
    const movieID = query.get('movieID');

    const {
        data: movieData,
        loading,
        error,
    } = useFetchMovies(`movie/${movieID}`, 'language=es-ES');

    const movie = movieData.length > 0 ? movieData[0] : undefined;

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
        <>
            {movie && (
                <div className="lg:grid-cols-[1fr, 2fr] h-fit lg:m-8 lg:mx-auto lg:grid lg:w-[80%] lg:grid-rows-[1fr,100%] lg:rounded-lg lg:shadow-xl lg:shadow-emerald-100 xl:mx-auto">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        className="mx-auto xs:pt-4 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:rounded-lg lg:rounded-tr-none lg:pt-0"
                        alt={movie.title}
                    />
                    <h2 className="my-4 bg-emerald-600 p-4 text-center text-2xl font-bold text-white lg:col-start-2 lg:row-start-1 lg:mx-auto lg:my-0 lg:w-full lg:items-center lg:rounded-tr-lg lg:p-0">
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
                            {movie.genres?.map((genre) => (
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
            )}
        </>
    );
};

export default DetailedMovie;
