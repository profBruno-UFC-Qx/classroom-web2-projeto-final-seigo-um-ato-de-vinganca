<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { actionCardProps, capCardProps } from '@/types'
import ActionToUse from '@/components/ActionToUse.vue'
import CapCard from '@/components/CapCard.vue'
import { getActById } from '@/api/services/actServices';
import { getCapCoversByActCoverId } from '@/api/services/capServices';
const actObj = ref<actionCardProps>({} as actionCardProps)
const allCaps = ref<capCardProps[]>([])
const loading = ref(true)

onMounted( async () => {
    const route = useRoute();
    const id = route.params.id;
    try{
        const res = await getActById(Number(id));
        const resCaps = await getCapCoversByActCoverId(Number(id))
        actObj.value = res
        allCaps.value = resCaps
    }catch(e){
        console.log(e)
    }
    finally{
        loading.value = false
    }
})

</script>

<template>
    <div class="mainContainer">
        <div v-if="loading">
            <p>
                Aguarde...
            </p>
        </div>
        <div v-else class="fullSize">
            <div class="cardContainer">
                <ActionToUse 
                :key="actObj.actCover_id" 
                :actCoverPicture="actObj.actCoverPicture"
                :actNumber="actObj.actNumber"
                :actDetails="actObj.actDetails"
                :isReady="actObj.isReady"
                />
            </div>
            <div class="infoContainer">
                <h1>{{ actObj.actDetails }}</h1>
                 <div class="allCapsContainer">
                     <CapCard v-for="(cap) in allCaps" 
                     :capCoverPicture="cap.capCoverPicture" 
                     :idCapCover="cap.capCover_id" 
                     :capCoverNumber="cap.capCoverNumber"
                     :key="cap.capCover_id" 
                     :isRouter="true"/>
                 </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
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
    .cardContainer{
        width: 450px;
        height: 600px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-self: center;
    }
    .cardContainer > .imagem {
        width: 270px;
        height: 360px;
    }
    .infoContainer{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2em;
    }
    .infoContainer h1 {
        color: orange;
    }
    .infoContainer > .capContainer {
        border: 1px solid purple;
    }
    .allCapsContainer {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>
