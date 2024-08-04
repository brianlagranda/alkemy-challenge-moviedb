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
        <>
            <h2>Formulario de Login</h2>
            <form onSubmit={submitHandler} className='loginForm'>
                <label>
                    <span className='loginForm-label'>Email:</span>
                    <br />
                    <input
                        className='loginForm-input'
                        type='email'
                        name='email'
                    ></input>
                </label>
                <br />
                <label>
                    <span className='loginForm-label'>Contraseña:</span>
                    <br />
                    <input
                        className='loginForm-input'
                        type='password'
                        name='password'
                    ></input>
                </label>
                <br />
                <button className='loginForm-button' type='submit'>
                    Log in
                </button>
            </form>
        </>
    );
};

export default Login;
