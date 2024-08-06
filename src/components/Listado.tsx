function Listado() {
    const Token = localStorage.getItem('token');

    return Token && <div>Listado de películas</div>;
}

export default Listado;
