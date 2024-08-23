import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer from '../../features/favourites/favouritesSlice';
import { persistFavourites } from './middleware/persistFavourites';

export const store = configureStore({
    reducer: {
        favourite: favouriteReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistFavourites),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
