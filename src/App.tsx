import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Listado from './components/Listado';
import Login from './components/Login';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Buscador from './components/Buscador';
import Favoritos from './components/Favoritos';
import { useEffect, useState } from 'react';
import { Movie } from './types/movieType';

function App() {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        const favsInLocal = localStorage.getItem('favs');

        if (favsInLocal !== null) {
            const favsArray: Movie[] = JSON.parse(favsInLocal);
            setFavorites(favsArray);
        }
    }, []);

    const addOrRemoveFromFavs = (e: React.MouseEvent<HTMLButtonElement>) => {
        const favMovies = localStorage.getItem('favs');
        let tempMoviesInFav: Movie[];

        if (favMovies === null) {
            tempMoviesInFav = [];
        } else {
            tempMoviesInFav = JSON.parse(favMovies);
        }

        const btn = e.currentTarget;
        const parent = btn.parentElement;
        const imgURL = parent?.querySelector('img')?.getAttribute('src');
        const title = parent?.querySelector('h5')?.innerText;
        const overview = parent?.querySelector('p')?.innerText;

        const movieData: Movie = {
            imgURL: imgURL || '',
            title: title || '',
            overview: overview || '',
            isFavourite: false,
            id: btn.dataset.movieId || '',
        };

        const moviesInArray = tempMoviesInFav.find(
            (oneMovie: Movie) => oneMovie.id === movieData.id,
        );

        if (!moviesInArray) {
            movieData.isFavourite = true;
            tempMoviesInFav.push(movieData);
            localStorage.setItem('favs', JSON.stringify(tempMoviesInFav));
            setFavorites(tempMoviesInFav);
            console.log('Se agregó la película a favoritos');
        } else {
            const moviesLeft = tempMoviesInFav.filter(
                (oneMovie: Movie) => oneMovie.id !== movieData.id,
            );
            localStorage.setItem('favs', JSON.stringify(moviesLeft));
            setFavorites(moviesLeft);
            console.log('Se quitó la película a favoritos');
        }
    };

    return (
        <BrowserRouter>
            <div className="flex h-dvh select-none flex-col justify-between">
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<Login target={''} email={''} password={''} />}
                    />
                    <Route
                        path="/listado"
                        element={
                            <>
                                <Buscador />
                                <Listado
                                    addOrRemoveFromFavs={addOrRemoveFromFavs}
                                    favorites={favorites}
                                />
                            </>
                        }
                    />
                    <Route path="/detalle" element={<Detalle />} />
                    <Route
                        path="/resultados"
                        element={
                            <>
                                <Buscador />
                                <Resultados />
                            </>
                        }
                    />
                    <Route
                        path="/favoritos"
                        element={
                            <Favoritos
                                favorites={favorites}
                                addOrRemoveFromFavs={addOrRemoveFromFavs}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
