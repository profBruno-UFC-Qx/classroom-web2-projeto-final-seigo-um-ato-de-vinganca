import { api } from "../index";

export const getFavByCapCoverId = async (id : number | string) => {
    try{
        const res = await api.get(`/favorites/cap-covers/${id}`)
        if(res.status === 200) return res.data
    }catch(e){
        console.log(`Error ao buscar favorito por capCover_id: ${e}`)
    }
}

export const createAndUpdateFav = async (capCover_id: number, isFav : boolean) => {
    try{
        const obj = {
            capCover: capCover_id,
            isFavorite: isFav,
        }
        const res = await api.post(`/favorite`, obj)
        if(res.status === 200) return res.data
    }catch(e){
        console.log(`Error ao atualizar favorito: ${e}`)
    }
}

export const getFavByUser = async () => {
    try{
        const res = await api.get(`/favoritesByUser`)
        if(res.status === 200) return res.data
    }catch(e){
        console.log(`Error ao buscar favoritos por usuário: ${e}`)
    }
}