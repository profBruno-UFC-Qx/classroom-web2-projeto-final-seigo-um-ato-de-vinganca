import { api } from "../index";


export async function getMangaPicturesByCapCoverId(capCover_id : number){
    try{
        const res = await api.get(`/manga-picture/cap-cover/${capCover_id}`)
        if(res.status === 200){
            return res.data
        }
    }catch(e){
        console.log(`Error ao buscar manga pelo ID do capitulo: ${e}`)
    }
}