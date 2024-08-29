import { Link } from 'react-router-dom';
import { MovieComponentProps } from '../types/movieType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    addFavourite,
    removeFavourite,
} from '../features/favourites/favouritesSlice';
import { RootState } from '../app/store';
import imageNotFound from '../assets/NoImageFound.png';

const Movie: React.FC<MovieComponentProps> = ({ movie }) => {
    const dispatch = useDispatch();
    const favourites = useSelector(
        (state: RootState) => state.favourite.favourites,
    );

    const isFavourite = favourites.some((fav) => fav.id === movie.id);

    const handleFavClick = () => {
        if (isFavourite) {
            dispatch(removeFavourite(movie));
        } else {
            dispatch(addFavourite(movie));
        }
    };

    const imgEndpoint = 'https://image.tmdb.org/t/p/w500/';

    const imageSrc = movie.poster_path
        ? `${imgEndpoint}${movie.poster_path}`
        : movie.imgURL || imageNotFound;

    return (
        <div
            key={movie.id}
            className={`relative grid w-full ${imageSrc === imageNotFound ? 'grid-rows-[2fr_1fr]' : 'grid-rows-[auto_1fr]'} rounded border transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-[1.01]`}
        >
            <button
                className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border bg-white text-xl transition-colors duration-300 ease-in-out"
                onClick={handleFavClick}
                data-movie-id={movie.id}
            >
                <FontAwesomeIcon
                    icon={isFavourite ? faHeartSolid : faHeartRegular}
                    className={isFavourite ? 'text-red-500' : 'text-black'}
                />
            </button>

            <Link to={`/detailedMovie?movieID=${movie.id}`}>
                <img
                    src={imageSrc}
                    loading="lazy"
                    className={`h-full bg-[#ECECEC] ${imageSrc === imageNotFound ? 'object-contain' : 'object-fill'}`}
                />
            </Link>
            <div className="flex w-full flex-col justify-between gap-2 bg-white p-2">
                <h2 className="text-xl font-bold">{movie.title}</h2>
                <p className="">{`${movie.overview.substring(0, 80)}...`}</p>
                <Link
                    to={`/detailedMovie?movieID=${movie.id}`}
                    className="w-1/2 rounded border bg-black p-2 text-center text-white hover:border-black hover:bg-white hover:text-black xs:w-full"
                >
                    View detail
                </Link>
            </div>
        </div>
    );
};

export default Movie;
