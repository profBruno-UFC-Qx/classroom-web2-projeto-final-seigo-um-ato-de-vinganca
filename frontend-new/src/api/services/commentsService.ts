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
        await api.post(`/comments`, {
            capCover: capCover_id,
            text: text
        })
        
    }catch(e){
        console.log(`Error ao criar novo comentário: ${e}`)
    }

}