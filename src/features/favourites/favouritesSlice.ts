import { createSlice } from '@reduxjs/toolkit';
import { MovieProps } from '../../types/movieType';

export type FavouritesState = {
    favourites: MovieProps[];
};

const initialState: FavouritesState = {
    favourites: JSON.parse(localStorage.getItem('favs') || '[]'),
};

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite: (state, action) => {
            state.favourites.push(action.payload);
            localStorage.setItem('favs', JSON.stringify(state.favourites));
        },
        removeFavourite: (state, action) => {
            state.favourites = state.favourites.filter(
                (movie) => movie.id !== action.payload.id,
            );
            localStorage.setItem('favs', JSON.stringify(state.favourites));
        },
    },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
