type MovieGenre = {
    id: string;
    name: string;
};

export interface MovieProps {
    id: string;
    title: string;
    overview: string;
    backdrop_path?: string;
    poster_path?: string;
    release_date?: string;
    genres?: Array<MovieGenre>;
    imgURL: string;
    isFavourite: boolean;
}

export type MovieComponentProps = {
    movie: MovieProps;
};

export type FavouritesStateProps = {
    favourites: MovieProps[];
};
