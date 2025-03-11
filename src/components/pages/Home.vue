<template>
    <main class="bg-gray-900 flex justify-center items-center h-dvh">
        <div class="w-48">
            <div v-if="isShowModal">
               <Modal @handlerModal="showModal" /> 
            </div>
        
           <Button text="nuova partita with push" @handler="$router.push('/score')"/> 
           <Button text="nuova partita" @handler="showModal"/>  
        </div>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import Button from '../atoms/Button.vue'
import Modal from '../organism/Modal.vue';
import { useTennisScore } from '../../store/store';
const isShowModal = ref(false)
const showModal = () => {
    
    isShowModal.value = !isShowModal.value
  };

</script>
