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
            e.currentTarget.keyword.value = '';
            navigate(`/resultados?keyword=${keyword}`);
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            className="flex w-full items-center justify-center gap-2 px-4 pt-4"
        >
            <label className="w-full xs:w-2/3 md:w-1/2 lg:w-1/3">
                <input
                    className="h-8 w-full rounded border p-2 text-black outline-black"
                    type="text"
                    name="keyword"
                    placeholder="¿Qué película buscás?"
                ></input>
            </label>
            <button
                className="h-8 rounded border border-white bg-black px-2 text-white hover:bg-white hover:font-bold hover:text-black"
                type="submit"
            >
                Buscar
            </button>
        </form>
    );
};

export default Buscador;
