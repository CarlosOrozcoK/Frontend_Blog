import { useEffect, useState } from "react";
import axios from "axios";

const useComentariosList = () => {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const res = await axios.get("http://localhost:3000/Backend_Blog/v1/comentarios/listar");
                setComentarios(res.data.comentarios || []);
            } catch (err) {
                setError("Error al cargar los comentarios.");
            } finally {
                setLoading(false);
            }
        };

        fetchComentarios();
    }, []);

    const agregarComentarioLocalmente = (comentario) => {
        setComentarios((prev) => [...prev, comentario]);
    };

    const actualizarComentarioLocalmente = (comentarioActualizado) => {
        setComentarios((prev) =>
            prev.map((c) => (c._id === comentarioActualizado._id ? comentarioActualizado : c))
        );
    };

    const eliminarComentarioLocalmente = (idComentario) => {
        setComentarios((prev) => prev.filter((c) => c._id !== idComentario));
    };

    return {
        comentarios,
        loading,
        error,
        agregarComentarioLocalmente,
        actualizarComentarioLocalmente,
        eliminarComentarioLocalmente
    };
};

export default useComentariosList;