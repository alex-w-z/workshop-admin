<template>
    <div class="M-entry">
        <Nav />
        <router-view />
    </div>
</template>


<script setup>
import Nav from '@/popup/components/nav/nav.vue'
</script>

<style scoped lang="stylus">
.M-entry
    display: flex
    flex-direction: column
    height: 100%
    .main-container
        position: relative
        flex: 1
</style>