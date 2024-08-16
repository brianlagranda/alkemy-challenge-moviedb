import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movieType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

interface PeliculaProps {
    movie: Movie;
    isFavorite: boolean;
    addOrRemoveFromFavs: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Pelicula: React.FC<PeliculaProps> = ({
    movie,
    isFavorite,
    addOrRemoveFromFavs,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            key={movie.id}
            className="relative flex w-full flex-col rounded border transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.01]"
        >
            <button
                className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border bg-white text-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={addOrRemoveFromFavs}
                data-movie-id={movie.id}
            >
                <FontAwesomeIcon
                    icon={
                        isFavorite || isHovered ? faHeartSolid : faHeartRegular
                    }
                    className={
                        isFavorite || isHovered ? 'text-red-500' : 'text-black'
                    }
                />
            </button>

            <Link to={`/detalle?movieID=${movie.id}`} className="">
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : movie.imgURL
                    }
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
    );
};

export default Pelicula;
