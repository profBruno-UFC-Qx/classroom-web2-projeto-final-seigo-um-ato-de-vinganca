<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { BASE_URL, api } from '@/api'
import { useRoute } from 'vue-router'
import CommentCard from '@/components/CommentCard.vue'
import type { CommentFormatResponse, FavoritesFormatResponse, Nota } from '@/types'
import CapCard from '@/components/CapCard.vue'
import CustomModal from '@/components/CustomModal.vue'
import { useUserStore } from '@/stores/userStore'
import JSZip from 'jszip'
import { getCapCoverById } from '@/api/services/capServices'
import { createAndUpdateFav, getFavByCapCoverId } from '@/api/services/favoriteServices'
import { createAndUpdateNota, getMediaNotas, getNotaByCapCoverId } from '@/api/services/notaServices'
import { createComment, getAllCommentsByCapCoverId } from '@/api/services/commentsService'

interface capInfFormat {
    capCover_id : number,
    capCoverTitle : string,
    capCoverNumber : number,
    description : string,
    capCoverPicture : string
}

interface picturesFormat {
    mangaPicture_id : number
    images : string[]
}

const userStore = useUserStore();
const jwt = userStore.jwt;

const route = useRoute()
const id = route.params.id

const capInf = ref<capInfFormat>({} as capInfFormat)
const comments = ref<CommentFormatResponse[]>([])
const pictures = ref<picturesFormat | null>(null) 
const actualPage = ref<number>(0)
const load = ref(true)
const openModal = ref(false)
const openModalForCheck = ref(false)
const isFav = ref<boolean>(false)
const notaCap = ref<number>(0)
const textAreaInput = ref('')
const capNota = ref<number>(0)

onMounted( async () => {
    try{
        const res = await getCapCoverById(Number(id))
        const comment = await getAllCommentsByCapCoverId(Number(id))
        const notas = await getMediaNotas(Number(id))
        const userNota = await getNotaByCapCoverId(Number(id))


        if(jwt){
            const fav = await getFavByCapCoverId(Number(id))
            isFav.value = fav?.isFavorite
        }
        capInf.value = {
            capCoverNumber : res.capCoverNumber,
            capCoverPicture : res.capCoverPicture,
            capCoverTitle : res.capCoverTitle,
            capCover_id : res.capCover_id,
            description : res.description
        }
        
        if(res.mangaPictures){
            pictures.value = {
                mangaPicture_id : res.mangaPictures.mangaPicture_id,
                images : res.mangaPictures.pictures
            }
        }else {
            pictures.value = null
        }
        comments.value = comment
        notaCap.value = notas ? notas : 0
        capNota.value = userNota ? userNota.nota : 0

    }catch(e){
        console.log(e)
    }finally{
        load.value = false
    }
})
const showManga = () : void =>{
    openModal.value = !openModal.value
    openModalForCheck.value = false
}   
const previousPage = () : void => {
    if(actualPage.value > 0){
        actualPage.value--
    }
}
const nextPage = () : void => {
    if(pictures.value?.images && actualPage.value < pictures.value.images.length - 1){
        actualPage.value++
    }
}
async function handleCreateComment(){
    try{
        const res = await createComment(Number(id), textAreaInput.value)
        if (res) window.location.reload()
    } catch(e){
        console.log(`Error ao criar comentario ${e}`)
    }
}
async function updateFavorite(e : Event) {
    const input = e.target as HTMLInputElement
    const isActive = input.checked
    try{
        await createAndUpdateFav(Number(id), isActive)
    }
    catch(e){
        console.log(`error ao atualizar favorito ${e}`);
    }
}
async function downloadZip() {
    try {
        const zip = new JSZip();
        if (pictures.value?.images) {
            for (let i = 0; i < pictures.value.images.length; i++) {
                const image = pictures.value.images[i];
                const blobResponse = await api.get(BASE_URL + image, { responseType: 'blob' });
                const blob = blobResponse.data;
                zip.file(`page-${i+1}.png`, blob);
            }
        }

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);

        const link = document.createElement('a');
        link.href = url;
        link.download = `capitulo-${capInf.value.capCoverNumber}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error(`Erro ao criar o ZIP: ${error}`);
    }
}
async function Avaliation (e : Event) {
    let input = e.target as HTMLInputElement
    try {
        const res = await createAndUpdateNota(Number(id), Number(input.value))
        if(res) window.location.reload()
    }catch(e){
        console.log(e)
    }
}
function ReinitManga () {
    actualPage.value = 0
    showManga()
    openModalForCheck.value = !openModalForCheck.value
}
function Choose() {
    if(actualPage.value != 0){
        openModalForCheck.value = !openModalForCheck.value
    }else{
        showManga()
    }
}
</script>

<template>
    <CustomModal 
    @close="Choose"
    v-if="actualPage != 0 && openModalForCheck"
    >
    <template v-slot:text>
        <h1 class="black">
            Deseja continuar de onde parou ?
        </h1>
        <div class="buttonContainer">
            <button @click="ReinitManga" class="button cancel">
                Não
            </button>
            <button @click="showManga" class="button confirm">
                Sim
            </button>
        </div>
    </template>
    </CustomModal>

    <CustomModal  
    v-if="openModal"
    :toSee="true" 
    @close="showManga" 
    @previous="previousPage" 
    @next="nextPage" 
    :url="pictures?.images[actualPage]" 
    :topLimit="pictures?.images.length" 
    :actualPage="actualPage"
    />
        
    
    <div  class="mainContainer">
        <div v-if="load">
            Aguarde...
        </div>
        <div v-else class="fullSize">
            <div class="capContainer">
                <CapCard
                    :capCoverPicture="capInf.capCoverPicture" 
                    :idCapCover="capInf?.capCover_id" 
                    :description="capInf?.description"
                    :capCoverNumber="capInf.capCoverNumber" 
                    :isRouter="false"
                />
            </div>
            <div class="restPage">
                <h1 class="ler" @click="Choose" v-if="pictures !== null">Ler mangá</h1>
                <h1 class="indisponivel" v-if="pictures === null">Indisponível</h1>
                <template v-if="userStore.jwt">
                    <span class="options">
                        <label for="favoritar">Favoritar:</label>
                        <input type="checkbox" name="favoritar" id="favoritar" @change="updateFavorite" v-model="isFav">
                    </span>
                    <span class="options">
                        <label for="nota">Avaliar</label>
                        <select name="nota" id="nota" @change="Avaliation" v-model="capNota">
                            <option :value="0">0</option>
                            <option :value="1">1</option>
                            <option :value="2">2</option>
                            <option :value="3">3</option>
                            <option :value="4">4</option>
                            <option :value="5">5</option>
                        </select>
                        <h3 class="avaliation">Nota: {{ notaCap === 0 ? 'Sem notas 😭' : notaCap }}</h3>
                    </span>
                    <div class="comentario">
                        <div class="flexRow">
                            <h2>Deixe um comentário!</h2>
                            <button @click="handleCreateComment">Comentar</button>
                            <button @click="downloadZip">Fazer download do capítulo {{ id }}</button>
                        </div>
                        <textarea 
                        v-model="textAreaInput"
                        name="comentario" id="comentario" maxlength="255"></textarea>
                        <div class="commentList">
                            <CommentCard v-for="(comment, index) in comments" 
                            :key="index"
                            :user="comment.user.username"
                            :comment="comment.text"
                            :id="comment.comment_id"
                            />
                        </div>
                    </div>
                </template>
                <template v-else>
                    <h3 class="avaliation">Nota: {{ notaCap === 0 ? 'Sem notas 😭' : notaCap }}</h3>
                    <div class="comentario">
                        <div class="commentList">
                            <CommentCard v-for="(comment, index) in comments" 
                            :key="index"
                            :user="comment.user.username"
                            :comment="comment.text"
                            :id="comment.comment_id"
                            />
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .buttonContainer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .button{
        all: unset;
        cursor: pointer;
        padding: 0.5em;
        border: 1px solid orange;
        border-radius: 1em;
        color: black;
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
    .black{
        color: black;
    }
    #nota{
        color: orange;
        padding: 0.3em;
        > option {
            color: black;
        }
    }
    .avaliation{
        color: orange;
    }
    .mainContainer{
        width: 100%;
        height: 85vh;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        padding: 1em;
    }
    .fullSize{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .capContainer {
        width: 550px;
    }
    .restPage{
        width: 80%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .ler{
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: orange;
        cursor: pointer;
    }

    .indisponivel {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: orange;
    }

    .options{
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: start;
        gap:2em;
        > label {
            color: orange;
        }
        
    }
    .comentario{
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        gap: 2em;
        > h2 {
            color: orange;
        }
        > textarea{
            resize: none;
            color: black;
            padding: 1em;
            width: 80%;
            height: 20%;
            border-radius: 1em;
            font-size:large ;
            overflow-y: auto;
        }
        .h1Modal{
            color: black;
        }
    }

    .commentList{
        width: 80%;
        max-height: 80%;
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
        > p {
            color: white;
        }
        overflow-y : auto;
    }

    .flexRow{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        >h2{
            color: orange;
        }
        >button{
            all: unset;
            padding: 1em;
            background-color: orange;
            color: white;
            border-radius: 1em;
            cursor: pointer;
        }
        >button:hover{
            box-shadow: 0px 0px 10px white;
            transition: box-shadow 0.2s;
        }
    }

</style>