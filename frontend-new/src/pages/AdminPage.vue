<script setup lang="ts">
import { api } from '@/api'
import { ref, onMounted } from 'vue'
import CustomModal from '@/components/CustomModal.vue'
import { useUserStore } from '@/stores/userStore'
import type { actionCardProps, capCardProps } from '@/types'
import ActionToUse from '@/components/ActionToUse.vue'
import CapCard from '@/components/CapCard.vue'
import { createAct, getAllActs } from '@/api/services/actServices'
import { createNewCapCover } from '@/api/services/capServices'
import { getAllCaps } from '@/api/services/capServices'
import { createNewMangaPictures } from '@/api/services/mangaPicturesServices'

    const useStore = useUserStore()
    const jwt = useStore.jwt
    const allActs = ref<actionCardProps[]>([])
    const allCap = ref<capCardProps[]>([])
    const loading = ref<boolean>(true)
    const isOpenModalToCreateNewAct = ref<boolean>(false)
    const isOpenModalToCreateNewCap = ref<boolean>(false)
    //Varaveis de criar um ato.
    const createIdCover = ref('')
    const createActDetails = ref('')
    const createIsReady = ref<boolean>(false)
    const createActCover = ref()
    //Variaveis de criar um capítulo
    const createIdCap = ref<number>()
    const capCoverTitle = ref('')
    const capDescription = ref('')
    const createIdAct = ref<number>()
    const createCapCover = ref()
    const createCapPages = ref()

    function handleActCover(e: Event) {
        const input = e.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            createActCover.value = input.files[0]
        }
    }

    function handleCapCover (e : Event) {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            createCapCover.value = input.files[0];
        }
    }

    function handleCapPages(e : Event){
        const input = e.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            createCapPages.value = input.files
        }
    }

    async function handleCreateAct() {
        try{
            const datas = new FormData()

            datas.append("actNumber", createIdCover.value)
            datas.append("actDetails", createActDetails.value)
            datas.append("isReady", String(createIsReady.value))
            datas.append("actCoverPicture", createActCover.value)
            console.log(createActCover.value)

            const res = await createAct(datas)
            if(res !== undefined) window.location.reload()
        }catch(e){  
            console.log(`Error ao criar um ato ${e}`)
        }
    }
    //Fim das coisas de criar um ato.
    //Deletando ato
    async function handleDeleteAct(id : number){
        try{
            const { data } = await api.get(`/act-covers`)
            const obj = data.data.filter((ea : actionCardProps) => ea.actCover_id === Number(id))
            const res = await api.delete(`/act-covers/${obj[0].id}`,{
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })
            if(res.status === 200){
                window.location.reload()
            }

        }catch(e){
            console.log(`Error ao deletar o ato ${e}`)
        }
    }
    // Fim do delete no ato.
    //Inicio comandos para criar capítulo
    async function handleCreateCap () {
        try{
            const realIdAct = allActs.value.find((act: actionCardProps) => act.actNumber === createIdAct.value)

            let datas = new FormData()
            
            datas.append('capCoverNumber', String(createIdCap.value));
            datas.append('actCover', String(realIdAct?.actCover_id));
            datas.append('capCoverTitle', String(capCoverTitle.value))
            datas.append('description', String(capDescription.value))

            datas.append('capCoverPicture', createCapCover.value)

            let res = await createNewCapCover(datas)
            const realId = res?.capCover_id

            console.log(`res`, res)
            console.log(`realId`, realId)            
            datas = new FormData()
        
            datas.append('capCover_id', String(realId))

            if (createCapPages.value) {
                const files = Array.isArray(createCapPages.value) 
                    ? createCapPages.value 
                    : Array.from(createCapPages.value);

                files.forEach((file: any) => {
                    datas.append('pages', file);
                });
            }
            
            res = await createNewMangaPictures(datas)
            
            if(res.status === 201){
                window.location.reload()
            }
            
            
        }catch(e){
            console.log(`Error ao criar um capitulo ${e}`)
        }
    }
    
    onMounted(async () => {
        try{
            const response = await getAllActs()
            allActs.value = response.filter((ea : actionCardProps) => ea.isReady)
            const res = await getAllCaps()
            console.log({res})
            allCap.value = res.data
        }catch(e){  
            console.log(`Error ao tentar pegar todos os atos ${e}`)
        }
        finally {
            loading.value = false
        }
    })

</script>
<template>
    <div class="mainContainer">
        <h1>Bem-vindo de volta, administrador!</h1>

        <CustomModal 
        v-if="isOpenModalToCreateNewAct" 
        @close="()=>{isOpenModalToCreateNewAct = !isOpenModalToCreateNewAct}"
        >
            <template v-slot:text>
                <h2 class="orange">Criar um novo ato</h2>
                <form class="createForm" @submit.prevent="handleCreateAct">
                    
                    <label for="idCover">Número do ato:</label>
                    <input type="text" id="idCover" required v-model="createIdCover">
                    
                    <label for="actDetails">Detalhes do ato:</label>
                    <input type="text" id="actDetails" required v-model="createActDetails">
                    
                    <span class="lineInput">
                        <label for="isReady">O ato está pronto ?</label>
                        <input type="checkbox" name="isReady" id="isReady" v-model="createIsReady">
                    </span>
                    
                    <label for="actCover">Foto do ato:</label>
                    <input type="file" name="actCoverPicture" id="actCover" accept=".png" @change="handleActCover">
                    
                    <div class="buttonContainer">
                        <button class="button cancel" type="button" @click="()=>{isOpenModalToCreateNewAct = false}">
                            Cancelar
                        </button>
                        <button class="button confirm" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </template>
        </CustomModal>
        
        <CustomModal 
        v-if="isOpenModalToCreateNewCap" 
        @close="()=>{isOpenModalToCreateNewCap = !isOpenModalToCreateNewCap}"
        >
            <template v-slot:text>
                <h2 class="orange">Criar um novo capítulo</h2>
                <form class="createForm" @submit.prevent="handleCreateCap">
                    
                    <label for="capCoverTitle">Titulo:</label>
                    <input type="text" id="capCoverTitle" required v-model="capCoverTitle">
                    
                    <label for="capDescription">Descrição:</label>
                    <input type="text" id="capDescription" required v-model="capDescription">
                    
                    <div class="row-inputs">
                        <div class="input-group">
                            <label for="idCap">Número do capítulo:</label>
                            <input type="number" id="idCap" required v-model.number="createIdCap">
                        </div>
                        <div class="input-group">
                            <label for="idAct">Número do ato:</label>
                            <input type="number" id="idAct" required v-model.number="createIdAct">
                        </div>
                    </div>
                    
                    <label for="capCover">Capa do capítulo:</label>
                    <input type="file" name="capCover" id="capCover" accept=".png" @change="handleCapCover">
                    
                    <label for="capPage">Páginas do capítulo:</label>
                    <input type="file" name="capPage" id="capPage" multiple accept=".png" @change="handleCapPages">
                    
                    <div class="buttonContainer">
                        <button class="button cancel" type="button" @click="()=>{isOpenModalToCreateNewCap = false}">
                            Cancelar
                        </button>
                        <button class="button confirm" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </template>
        </CustomModal>

        <span v-if="!loading" class="buttonContainer">
            <button class="addNew" @click="()=>{isOpenModalToCreateNewAct = true}">Adicionar novo ato</button>
            <button class="addNew" @click="()=> {isOpenModalToCreateNewCap = true}">Adicionar novo capítulo</button>
        </span>
        
        <p v-if="loading">Carregando ...</p>
        
        <div class="actContainer" v-else>
                <div class="rowInfoContainer" v-for="(actObj) of allActs" :key="actObj?.actCover_id">
                    <div class="cardContainer">
                        <ActionToUse
                        :key="actObj?.actCover_id" 
                        :actDetails="actObj?.actDetails"
                        :isReady="actObj?.isReady"
                        :actCover_id="actObj?.actCover_id"
                        :actCoverPicture="actObj?.actCoverPicture"
                        :actNumber="actObj?.actNumber"
                        />
                    </div>
                    <div class="capListContainer">
                        <template v-for="(cap) in allCap" :key="cap.capCover_id" >
                            <CapCard 
                                v-if="cap.actCover?.actCover_id === actObj?.actCover_id"
                                :key="cap.capCover_id"
                                :capCoverPicture="cap.capCoverPicture" 
                                :description="cap.description"
                                :idCapCover="cap.capCover_id"     
                                :capCoverNumber="cap.capCoverNumber" 
                                :isRouter="false"
                                :forAdmin="true"
                            />
                        </template>
                    </div>
                </div>
        </div>
    </div>
</template>
<style scoped>
    .capListContainer{
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .rowInfoContainer{
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .lineInput{
        display: flex;
        align-items: center;
        gap: 2em;
        >label {
            color: black;
        }
    }
    .createForm{
        color: black;
        display: flex;
        flex-direction: column;
        gap: 1em;
        max-height: 70vh;
        overflow-y: auto; 
        padding-right: 0.5em;
        >label {
            color: black;
        }
        >input {
            all: unset;
            padding: 1em;
            border: 1px solid black;
            border-radius: 1em;
            color: black;
        }
    }
    .createForm::-webkit-scrollbar {
        width: 8px;
    }
    .createForm::-webkit-scrollbar-track {
        background: #f1f1f1; 
        border-radius: 4px;
    }
    .createForm::-webkit-scrollbar-thumb {
        background: orange; 
        border-radius: 4px;
    }
    .createForm > label {
        color: black;
        font-weight: bold;
        font-size: 0.9em;
        margin-bottom: -0.5em;
    }
    .createForm > input {
        all: unset;
        box-sizing: border-box;
        width: 100%;
        padding: 0.5em; 
        border: 1px solid black;
        border-radius: 0.5em; 
        color: black;
    }
    .row-inputs {
        display: flex;
        gap: 1em;
        width: 100%;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 0.5em;
        min-width: 0;
        >label {
            color: black;
            font-weight: bold;
            font-size: 0.9em;
        }
    }
    .input-group > input {
        all: unset;
        box-sizing: border-box;
        width: 100%;
        padding: 0.5em;
        border: 1px solid black;
        border-radius: 0.5em;
        color: black;
    }
    .orange{
        color: orange;
    }
    .addNew{
        all: unset;
        padding: 1em;
        background-color: orange;
        color: white;
        border-radius: 1em;
        cursor: pointer;
    }
    .addNew:hover{
        box-shadow: 0px 0px 10px white;
        transition: box-shadow 0.2s;
    }
    .cardContainer{
        width: 232px;
        height: 416px;
        display: flex;
        align-items: center;
        justify-items: end;
    }
    .actContainer{
        /* border: 1px solid white; */
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 80vh;
        overflow-y: auto;
        padding-left: 2em;
        gap: 3em;
    }
    .mainContainer{
        width: 100%;
        height: 85vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 1em;
        gap: 1em;
    }
    .buttonContainer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: black;
        padding-bottom: 1em;
    }
    .button{
        all: unset;
        cursor: pointer;
        padding: 0.5em;
        border: 1px solid orange;
        border-radius: 1em;
    }
    .confirm:hover{
        background-color: orange;
        color: white;
        transition: background-color 0.5s, color 0.5s;
    }
    .cancel:hover{
        background-color: red;
        color: white;
        transition: background-color 0.5s, color 0.5s;
    }
</style>
