import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Listado from './components/Listado';
import Login from './components/Login';

function App() {
    return (
        <BrowserRouter>
            <div className="flex h-screen select-none flex-col justify-between">
                <Header />
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Login target={''} email={''} password={''} />
                            }
                        ></Route>
                        <Route path="/listado" element={<Listado />}></Route>
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
