import Axios from 'axios';

interface LoginProps {
    target: string;
    email: string;
    password: string;
}

const Login: React.FC<LoginProps> = () => {
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const regexEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === '' || password === '') {
            console.log('Los campos no pueden estar vacíos.');
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {
            console.log(
                'Debes escribir una dirección de correo electrónico válido.'
            );
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            console.log('Credenciales inválidas.');
            return;
        }

        Axios.post('http://challenge-react.alkemy.org', {
            email,
            password,
        }).then((res) => {
            console.log(res);
        });

        console.log('Ok, estamos listos para enviar la información.');
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
