import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Listado from './components/Listado';
import Login from './components/Login';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path='/'
                    element={<Login target={''} email={''} password={''} />}
                ></Route>
                <Route path='/listado' element={<Listado />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
