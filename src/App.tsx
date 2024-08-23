import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
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
            <div className="flex h-dvh select-none flex-col justify-between">
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
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
