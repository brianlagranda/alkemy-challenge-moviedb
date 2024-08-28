import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Login from './components/Login';
import DetailedMovie from './components/DetailedMovie';
import Results from './components/Results';
import SearchBar from './components/SearchBar';
import Favourites from './components/Favourites';

function App() {
    return (
        <BrowserRouter>
            <div className="h-full select-none">
                <Header />

                <Routes>
                    <Route
                        path="/"
                        element={<Login target={''} email={''} password={''} />}
                    />
                    <Route
                        path="/movieList"
                        element={
                            <>
                                <SearchBar />
                                <MovieList />
                            </>
                        }
                    />
                    <Route path="/detailedMovie" element={<DetailedMovie />} />
                    <Route
                        path="/results"
                        element={
                            <>
                                <SearchBar />
                                <Results />
                            </>
                        }
                    />
                    <Route path="/favourites" element={<Favourites />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
