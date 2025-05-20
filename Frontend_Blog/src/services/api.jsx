import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/Backend_Blog/v1',
    timeout: 5000
})

export const getPublicaciones = async () => {
    try {
        return await apiClient.get('/publicaciones/todas')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const postComentario = async () => {
    try {
        return await apiClient.post('/comentarios/crear')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
export const getComentarios = async () => {
    try {
        return await apiClient.get('/comentarios/listar')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const putComentario = async (id, data) => {
    try {
        return await apiClient.put(`/comentarios/actualizar/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteComentario = async (id) => {
    try {
        return await apiClient.delete(`/comentarios/eliminar/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}


