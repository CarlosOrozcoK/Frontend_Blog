import { useState } from "react";
import axios from "axios";

const useGestionComentarios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const actualizarComentario = async ({ id, comentario, publicacion }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:3000/Backend_Blog/v1/comentarios/actualizar/${id}`,
        {
          comentario,
          publicacion,
          estado: true,
        }
      );
      return response.data;
    } catch (err) {
      setError("Error al actualizar comentario.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const eliminarComentario = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `http://localhost:3000/Backend_Blog/v1/comentarios/eliminar/${id}`
      );
      return response.data;
    } catch (err) {
      setError("Error al eliminar comentario.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    actualizarComentario,
    eliminarComentario,
    loading,
    error,
  };
};

export default useGestionComentarios;