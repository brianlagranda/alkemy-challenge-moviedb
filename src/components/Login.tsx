import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    target: string;
    email: string;
    password: string;
}

const Login: React.FC<LoginProps> = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const regexEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === '' || password === '') {
            MySwal.fire({
                title: 'Los campos no pueden estar vacíos.',
                icon: 'warning',
            });
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {
            MySwal.fire({
                title: 'Debes escribir una dirección de correo electrónico válido.',
                icon: 'error',
            });
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            MySwal.fire({
                title: 'Credenciales inválidas.',
                icon: 'error',
            });
            return;
        }

        Axios.post('http://challenge-react.alkemy.org', {
            email,
            password,
        }).then((res) => {
            const Token = res.data.token;
            localStorage.setItem('token', Token);
            MySwal.fire({
                title: 'Perfecto, ingresaste correctamente.',
                icon: 'success',
            });
            navigate('/listado');
        });
    };

    return (
        <div className="mx-auto flex flex-col items-center gap-8 rounded-lg bg-black p-6 text-white shadow-2xl shadow-black sm:w-3/4 md:w-2/4 lg:w-1/3">
            <h2 className="text-xl">Formulario de Login</h2>
            <form onSubmit={submitHandler} className="flex w-full flex-col">
                <label>
                    <span className="">Email</span>
                    <br />
                    <input
                        className="h-8 w-full rounded p-2 text-black outline-black"
                        type="email"
                        name="email"
                    ></input>
                </label>
                <br />
                <label>
                    <span className="">Contraseña</span>
                    <br />
                    <input
                        className="h-8 w-full rounded p-2 text-black outline-black"
                        type="password"
                        name="password"
                    ></input>
                </label>
                <br />
                <button
                    className="mx-auto h-8 w-1/2 rounded border-2 border-white hover:bg-white hover:font-bold hover:text-black"
                    type="submit"
                >
                    Log in
                </button>
            </form>
        </div>
    );
};

export default Login;
