import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Listado from './components/Listado';
import Login from './components/Login';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Buscador from './components/Buscador';

function App() {
    return (
        <BrowserRouter>
            <div className="flex h-screen select-none flex-col justify-between">
                <Header />
                <div className="">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Login target={''} email={''} password={''} />
                            }
                        ></Route>
                        <Route
                            path="/listado"
                            element={
                                <>
                                    <Buscador />
                                    <Listado />
                                </>
                            }
                        ></Route>
                        <Route path="/detalle" element={<Detalle />}></Route>
                        <Route
                            path="/resultados"
                            element={
                                <>
                                    <Buscador />
                                    <Resultados />
                                </>
                            }
                        ></Route>
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
