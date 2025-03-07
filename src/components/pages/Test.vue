<template>
    <div>
        <RouterLink to="/score">score</RouterLink>
esempio
<p>{{playerOne.point}}</p>
<button @click="increaseScore(1)">clicca</button>
</div>
</template>

<script setup>
import { RouterLink} from 'vue-router'
import {useTennisScore} from '../../store/store'
const {playerOne, increaseScore} = useTennisScore()
console.log(increaseScore)
</script>

<style lang="scss" scoped>

</style>