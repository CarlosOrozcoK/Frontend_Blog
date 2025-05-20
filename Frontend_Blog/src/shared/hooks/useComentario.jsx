import { useState } from "react";
import axios from "axios";

const useComentario = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const agregarComentario = async ({ autor, comentario, publicacion }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:3000/Backend_Blog/v1/comentarios/crear",
                { autor, comentario, publicacion }
            );
            return response.data;
        } catch (err) {
            setError("No se pudo agregar el comentario.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { agregarComentario, loading, error };
};

export default useComentario;