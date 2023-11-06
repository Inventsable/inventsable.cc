<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue';

/**
 * For now there is no landing page, just push to the tools page.
 * 
 * Should add a toolbar, landing page, and scripts page later on.
 * 
 * Tools.vue should have a header as well, about Discord channel and contacts
 */

onMounted(() => {
  const router = useRouter();
  router.push({ path: '/tools' })
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
