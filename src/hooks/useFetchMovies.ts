import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MovieProps } from '../types/movieType';

const MySwal = withReactContent(Swal);

export const useFetchMovies = (
    endpoint: string,
    queryParams: string,
    page: number,
) => {
    const [data, setData] = useState<MovieProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [prevQuery, setPrevQuery] = useState<string>('');

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&${queryParams}&page=${page}`,
                );

                const newMovies = response.data.results || [];

                const seenIds = new Set(data.map((movie) => movie.id));

                const filteredMovies = newMovies.filter(
                    (movie: { id: string }) => {
                        if (seenIds.has(movie.id)) {
                            return false;
                        } else {
                            seenIds.add(movie.id);
                            return true;
                        }
                    },
                );

                if (queryParams !== prevQuery) {
                    setData(filteredMovies);
                    setPrevQuery(queryParams);
                } else {
                    setData((prevData) => [...prevData, ...filteredMovies]);
                }
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
    }, [endpoint, queryParams, page, apiKey]);

    return { data, loading, error };
};
