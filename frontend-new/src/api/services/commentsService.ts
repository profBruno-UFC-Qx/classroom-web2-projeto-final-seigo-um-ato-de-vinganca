import { api } from "../index";

export const getAllCommentsByCapCoverId = async (capCover_id : number) => {
    try{
        const res = await api.get(`/comments/${capCover_id}`)
        if(res.status === 200) return res.data
    }catch(e){
        console.log(`Error ao buscar os comentários do capitulo ${e}`)
    }
}

export const createComment = async (capCover_id : number, text : string) => {

    try{ 
        const res = await api.post(`/comments`, {
            capCover: capCover_id,
            text: text
        })
        if (res.status === 201) return true
        
    }catch(e){
        console.log(`Error ao criar novo comentário: ${e}`)
        return false
    }

}

export const deleteComment = async (id: number) => {
    try {
        const res = await api.delete(`/comments/${id}`)
        if (res.status === 200) return true
    } catch(e){
        console.log(`Error ao deletar comentário: ${e}`)
        return false
    }
}