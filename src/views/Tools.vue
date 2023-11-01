<script setup lang="ts">
import card from '@/components/card.vue';
</script>

<template>
  <div class="main">
    <Suspense>
      <card repo="checkpoint" label="#21db56"></card>
    </Suspense>
  </div>
</template>

<style>
.main {
  padding-top: 40px;
  min-height: 100%;
  max-width: 800px;
  width: 100%;
}
</style>
