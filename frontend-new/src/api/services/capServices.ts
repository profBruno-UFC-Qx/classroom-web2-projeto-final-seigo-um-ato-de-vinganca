import { api } from "../index";

export const getAllCaps = async () => {
     try {
        const res = await api.get('/cap-covers');
        if(res.status === 200){
            return res.data;
        }
    }catch(e){
        console.log(`Error ao buscar caoitulos: ${e}`);
    }
}

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

export const createNewCapCover = async (datas: FormData) => {
    try{
        const res = await api.post(`/cap-covers`, datas)
        if(res.status === 201){
            return res.data
        }
    } catch(e){
        console.error(`Error ao tentar cria capitulo: ${e} `)
    }
}