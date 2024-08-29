import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MovieProps } from '../types/movieType';

const MySwal = withReactContent(Swal);

export const useFetchSingleMovie = (movieID: string) => {
    const [data, setData] = useState<MovieProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=es-ES`,
                );
                setData(response.data);
            } catch (e) {
                setError(
                    'Hubo un error inesperado, intente nuevamente más tarde',
                );
                MySwal.fire({
                    title: 'Hubo un error inesperado, intente nuevamente más tarde',
                    icon: 'error',
                });
                console.log(`Error: ${e}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [movieID, apiKey]);

    return { data, loading, error };
};
