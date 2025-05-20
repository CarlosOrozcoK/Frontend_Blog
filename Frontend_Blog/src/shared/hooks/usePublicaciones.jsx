import { useEffect, useState } from "react";
import { getPublicaciones } from "../../services/api";

const usePublicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const response = await getPublicaciones();

            if (response.error) {
                setError("Error al obtener publicaciones");
                setLoading(false);
                return;
            }

            const { data } = response;

            if (data.ok) {
                setPublicaciones(data.publicaciones);
                setTotal(data.total);
            } else {
                setError("Error en la respuesta del servidor");
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return {
        publicaciones,
        total,
        loading,
        error
    };
};

export default usePublicaciones;