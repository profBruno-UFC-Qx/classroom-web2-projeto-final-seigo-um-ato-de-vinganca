import { api } from "../index";


export const getCapCoversByActCoverId = async (id: number) => {
    try{
        const res = await api.get(`/cap-covers/act-cover/${id}`);
        if (res.status === 200) {
            return res.data;
        }
    }catch(e){
        console.log(`Error ao buscar capítulos por id do ato: ${e}`);
    }
}

export const getCapCoverById = async (id : number) => {
    try{
        const res = await api.get(`/cap-covers/${id}`)
        if(res.status === 200){
            return res.data
        }
    }catch(e){
        console.log(`Error ao buscar capitulo por ID: ${e}`)
    }
}