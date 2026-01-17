import { api } from "../index";

export const authUser = async (email: string, password: string) => {
    try {
        const res =  await api.post('/auth/local', {
            identifier: email,
            password: password
        });
        if(res.status === 200) {
            return res.data;
        }
    }catch(e) {
        console.log(`Error ao autenticar: ${e}`);
    }
}