import { api } from "../index";


export const getMediaNotas = async (capCover_id : number) => {
    try{
        const res = await api.get(`/notas/media/${capCover_id}`)
        if(res.status === 200) return res.data
    }catch(e){
        console.log(`Error ao buscar media das notas: ${e}`)
    }
}

export const createAndUpdateNota = async (capCover_id : number, nota : number) => {
    try{
        await api.post(`/notas`, {
            capCover : capCover_id,
            nota : nota
        })
    }catch(e){
        console.log(`Error ao criar ou atualizar nota: ${e}`)
    }
}