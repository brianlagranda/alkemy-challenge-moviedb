type movieGenre = {
    id: string;
    name: string;
};

export interface Movie {
    id: string;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    genres: Array<movieGenre>;
}
