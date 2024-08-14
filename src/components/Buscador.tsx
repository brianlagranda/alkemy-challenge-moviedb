import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const Buscador = () => {
    const navigate = useNavigate();
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            return MySwal.fire({
                title: 'Debes ingresar una palabra clave',
                icon: 'warning',
            });
        } else if (keyword.length < 4) {
            return MySwal.fire({
                title: 'Debes ingresar más de 3 caracteres',
                icon: 'warning',
            });
        } else {
            navigate(`/resultados?keyword=${keyword}`);
        }
    };

    return (
        <form onSubmit={submitHandler} className="flex gap-2">
            <label>
                <input
                    className="h-8 w-full rounded p-2 text-black outline-black"
                    type="text"
                    name="keyword"
                ></input>
            </label>
            <button
                className="mx-auto h-8 w-1/2 rounded border-2 border-white hover:bg-white hover:font-bold hover:text-black"
                type="submit"
            >
                Buscar
            </button>
        </form>
    );
};

export default Buscador;
