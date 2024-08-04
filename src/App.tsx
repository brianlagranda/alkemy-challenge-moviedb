import Listado from './components/Listado/Listado';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Login target={''} email={''} password={''} />}
                ></Route>
                <Route path='/listado' element={<Listado />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
