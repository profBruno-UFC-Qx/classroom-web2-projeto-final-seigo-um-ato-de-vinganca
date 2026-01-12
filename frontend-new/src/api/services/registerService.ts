import { api } from "../index";

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
} 

export const registryUser = async (data: RegisterRequest) => {
    try {

        const response = await api.post('/auth/local/register', data);
        if(response.status === 201) {
            return response.data;
        }
    }catch(e) {
        console.log(`Error ao registrar usuário: ${e}`);
    }
}