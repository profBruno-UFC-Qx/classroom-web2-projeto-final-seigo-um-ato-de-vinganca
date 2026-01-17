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

export async function createNewMangaPictures (datas : FormData) {
    try {
        const res = await api.post(`/manga-picture`, datas)
        if(res.status === 201){
            return res.data
        }
    }catch(e){
        console.error(`Error ao tentar criar mangapictures: ${e}`)
    }
}

export async function deleteMangaPicture(id: number) {
    try{
        const res = await api.delete(`/manga-picture/${id}`)
        return res.data;
    } catch (e) {
        console.log(`Error ao deletar mangaPicture: ${e}`)
    }
}