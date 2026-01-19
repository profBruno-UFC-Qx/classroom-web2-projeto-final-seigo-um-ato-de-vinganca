<script setup lang="ts">
    import { useUserStore } from '@/stores/userStore';
    import { ref, onMounted } from 'vue';
    import CapCard from '@/components/CapCard.vue';
    import { getFavByUser } from '@/api/services/favoriteServices';

    interface favFormat {
        favorite_id: number,
        isFavorite: boolean,
        capCover: {
            capCoverNumber: number,
            capCoverPicture: string,
            capCoverTitle: string,
            capCover_id: number,
            description: string,
        }
    }

    const useStore = useUserStore()
    const allCap = ref<favFormat[]>()

    onMounted(async () => {
        try {
            const res = await getFavByUser()
            allCap.value = res
        }catch(e){ 
            console.log(`Error ao buscar favoritos ${e}`)
        }
    })
</script>

<template>
    <div class="mainContainer">
        <h1>Bem-vindo de volta, {{ useStore.user.username }}!</h1>
        <div class="headerContainer">
            <h2>User: {{ useStore.user.username }}</h2>
            <h2>E-mail: {{ useStore.user.email }}</h2>
        </div>
        <h1>Favoritos:</h1>
        <div class="listCaps">
            <div v-for="(cap) in allCap" :key="cap.capCover.capCover_id" >
                <CapCard
                :capCoverPicture="cap.capCover.capCoverPicture" 
                :idCapCover="cap.capCover.capCover_id" 
                :capCoverNumber="cap.capCover.capCoverNumber"
                :isRouter="true"
                :forAdmin="false"
                />
            </div>
        </div>

    </div>
    
</template>

<style scoped>
    .mainContainer{
        width: 100%;
        height: 85vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 1em;
    }
    .listCaps{
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: 1em;
    }
</style>