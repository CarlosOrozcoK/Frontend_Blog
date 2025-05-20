import React, { useState } from "react";
import usePublicaciones from "../shared/hooks/usePublicaciones";
import useComentario from "../shared/hooks/useComentario";
import useComentariosList from "../shared/hooks/useComentariosList";
import useGestionComentarios from "../shared/hooks/useGestionComentarios";

const Publicaciones = () => {
  const { publicaciones, total, loading, error } = usePublicaciones();
  const {
    comentarios,
    agregarComentarioLocalmente,
    eliminarComentarioLocalmente,
    actualizarComentarioLocalmente,
  } = useComentariosList();
  const { agregarComentario, loading: comentando } = useComentario();
  const [formulario, setFormulario] = useState({});
  const { actualizarComentario, eliminarComentario, loading: gestionando } =
    useGestionComentarios();

  const [filtroCurso, setFiltroCurso] = useState("");
  const [ordenFecha, setOrdenFecha] = useState("desc");

  const formatearFecha = (fecha) =>
    fecha
      ? new Date(fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      : "";

  const handleChange = (e, id) => {
    setFormulario({
      ...formulario,
      [id]: {
        ...formulario[id],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e, publicacion) => {
    e.preventDefault();
    const datos = formulario[publicacion._id];
    if (!datos?.autor || !datos?.comentario) return;

    const res = await agregarComentario({
      autor: datos.autor,
      comentario: datos.comentario,
      publicacion: publicacion.titulo,
    });

    if (res?.success && res.comentario) {
      alert("Comentario agregado correctamente");
      agregarComentarioLocalmente({
        ...res.comentario,
        publicacion: { _id: publicacion._id },
      });
      setFormulario((prev) => ({ ...prev, [publicacion._id]: {} }));
    }
  };

  const obtenerComentariosDePublicacion = (id) =>
    comentarios.filter((com) => com.publicacion?._id === id);

  const handleEditarComentario = async (comentario) => {
    const nuevoTexto = prompt("Nuevo comentario:", comentario.comentario);
    if (!nuevoTexto || nuevoTexto === comentario.comentario) return;

    const res = await actualizarComentario({
      id: comentario._id,
      comentario: nuevoTexto,
      publicacion: comentario.publicacion.titulo,
    });

    if (res?.success) {
      actualizarComentarioLocalmente(res.comentario);
      alert("Comentario actualizado");
    }
  };

  const handleEliminarComentario = async (comentario) => {
    if (!window.confirm("¿Seguro que deseas eliminar este comentario?")) return;

    const res = await eliminarComentario(comentario._id);
    if (res?.success) {
      eliminarComentarioLocalmente(comentario._id);
      alert("Comentario eliminado");
    }
  };

  const listaCursos = Array.from(
    new Set(publicaciones.flatMap((pub) => pub.cursos.map((c) => c.name)))
  );

  let publicacionesFiltradas = filtroCurso
    ? publicaciones.filter((pub) =>
      pub.cursos.some((c) => c.name === filtroCurso)
    )
    : publicaciones;

  publicacionesFiltradas = publicacionesFiltradas.sort((a, b) => {
    const fechaA = new Date(a.createdAt);
    const fechaB = new Date(b.createdAt);
    return ordenFecha === "asc" ? fechaA - fechaB : fechaB - fechaA;
  });

  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      <h1 className="mb-4 text-center text-danger fw-bold" style={{ fontSize: "2.5rem" }}>
        Publicaciones
      </h1>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && (
        <>
          <p className="text-end text-muted mb-4">Total: {total}</p>

          <div className="d-flex gap-3 mb-4">
            <select
              className="form-select w-auto"
              value={filtroCurso}
              onChange={(e) => setFiltroCurso(e.target.value)}
            >
              <option value="">-- Filtrar por curso --</option>
              {listaCursos.map((curso) => (
                <option key={curso} value={curso}>
                  {curso}
                </option>
              ))}
            </select>

            <select
              className="form-select w-auto"
              value={ordenFecha}
              onChange={(e) => setOrdenFecha(e.target.value)}
            >
              <option value="desc">Fecha: Más recientes</option>
              <option value="asc">Fecha: Más antiguos</option>
            </select>
          </div>

          {publicacionesFiltradas.map((pub) => (
            <div
              key={pub._id}
              className="mb-5 p-4 bg-white rounded shadow-sm border border-light"
            >
              <h3 className="fw-bold mb-1" style={{ color: "#cc0000" }}>
                {pub.titulo}
              </h3>
              <p className="text-muted fst-italic mb-3" style={{ fontSize: "0.9rem" }}>
                Publicado el {formatearFecha(pub.createdAt)}
              </p>
              <p className="mb-2">{pub.descripcion}</p>
              <p className="text-muted fst-italic mb-3">
                Cursos: {pub.cursos.map((c) => c.name).join(", ")}
              </p>

              <form onSubmit={(e) => handleSubmit(e, pub)} className="mb-4">
                <input
                  type="text"
                  name="autor"
                  value={formulario[pub._id]?.autor || ""}
                  onChange={(e) => handleChange(e, pub._id)}
                  placeholder="Tu nombre"
                  className="form-control rounded-pill mb-2 shadow-sm border-secondary"
                />
                <textarea
                  name="comentario"
                  rows="2"
                  value={formulario[pub._id]?.comentario || ""}
                  onChange={(e) => handleChange(e, pub._id)}
                  placeholder="Tu comentario"
                  className="form-control rounded-3 shadow-sm border-secondary"
                ></textarea>
                <button
                  type="submit"
                  className="btn btn-danger btn-sm mt-2 px-4 rounded-pill"
                  disabled={comentando}
                >
                  {comentando ? "Enviando..." : "Comentar"}
                </button>
              </form>

              <h5 className="mb-3" style={{ borderBottom: "1px solid #eee", paddingBottom: "6px" }}>
                🗨 Comentarios
              </h5>

              {obtenerComentariosDePublicacion(pub._id).length === 0 ? (
                <p className="text-muted fst-italic">No hay comentarios!</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {obtenerComentariosDePublicacion(pub._id).map((com) => (
                    <div
                      key={com._id}
                      className="p-3 bg-light rounded-3 shadow-sm d-flex justify-content-between align-items-start"
                    >
                      <div>
                        <strong>{com.autor}:</strong> {com.comentario}
                        <br />
                        <small className="text-muted fst-italic" style={{ fontSize: "0.8rem" }}>
                          Comentado el {formatearFecha(com.createdAt)}
                        </small>
                      </div>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleEditarComentario(com)}
                          disabled={gestionando}
                          title="Editar comentario"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleEliminarComentario(com)}
                          disabled={gestionando}
                          title="Eliminar comentario"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Publicaciones;