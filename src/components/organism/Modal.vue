<template>
    
    <div class="h-full w-full bg-gray-400/5 absolute top-0 left-0 flex justify-center items-center" aria-labelledby="inizia partita" role="dialog" aria-modal="true">
        <div class="h-full w-full  md:h-64 md:w-64 bg-white p-10 rounded-3xl" >
           ciao sono un modal
           <div class="flex flex-col gap-2">
            <Input v-model="playerOne.nome"/>
            <Input v-model="playerTwo.nome"/>
            <Button @handler="closeModal" text="chiudi"/> 
<Button @handler="$router.push('/test')" text="nuova partita"/> 
           </div>

        </div>

    </div>
</template>

<script setup>
import Button from '../atoms/Button.vue'
import Input from '../atoms/Input.vue'
import { useTennisScore } from '../../store/store'
const { playerOne, playerTwo} = useTennisScore()

const emit = defineEmits(['handlerModal'])

function closeModal(){
    emit('handlerModal')
}




</script>

