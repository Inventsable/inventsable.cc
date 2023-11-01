<script setup lang="ts">
import card from '@/components/card.vue';
import iconCheckpoint from '@/components/checkpoint/icon-header.vue'

</script>

<template>
  <div class="main">
    <Suspense>
      <card repo="checkpoint" label="#21db56">
        <template v-slot:logo>
          <iconCheckpoint />
        </template>
      </card>
    </Suspense>
    <Suspense>
      <card repo="checkpoint" label="#236cd8">
        <template v-slot:logo>
          <iconCheckpoint />
        </template>
      </card>
    </Suspense>
    <Suspense>
      <card repo="checkpoint" label="#d82341">
        <template v-slot:logo>
          <iconCheckpoint />
        </template>
      </card>
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
