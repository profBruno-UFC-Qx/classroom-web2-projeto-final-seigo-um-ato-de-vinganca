import { api } from "../index";

export const getAllActs = async () => {
    try {
        const res = await api.get('/act-cover');
        if(res.status === 200){
            return res.data;
        }
    }catch(e){
        console.log(`Error ao buscar atos: ${e}`);
    }
}

export const createAct = async (actData: FormData) => {
    try {
        const res = await api.post('/act-cover', actData);
        if(res.status === 201){
            return res
        }
    } catch (e) {
        console.log(`Error ao criar ato: ${e}`);
    }
}

export const getActById = async (id: number) => {
    try {
        const res = await api.get(`/act-cover/${id}`);
        if(res.status === 200){
            return res.data;
        }
    } catch (e) {
        console.log(`Error ao buscar ato por ID: ${e}`);
    }
}