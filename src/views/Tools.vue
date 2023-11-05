<script setup lang="ts">
import card from '@/components/card.vue';
import iconCheckpoint from '@/components/checkpoint/icon-header.vue'
import type { PseudoPackage, HostList, Config } from '@/types';
import pseudoCard from '@/components/pseudo-card.vue';
// @ts-ignore - Typescript keeps flagging files made outside default folders
import checkpointAnimation from '@/assets/previews/checkpoint.json'
// @ts-ignore - Typescript keeps flagging files made outside default folders
import toolList from '@/upcoming.json'
import skeletonCard from '@/components/skeleton-card.vue';
import lottiePreviewVue from '@/components/lottie-preview.vue';
import { ref } from 'vue';

const checkpointLoop = ref(true);
const checkpointHover = ref(false);
</script>

<template>
  <div class="main">
    <Suspense>
      <template #fallback>
        <skeletonCard />
      </template>
      <card repo="checkpoint" label="#ffbe0b" :disabledHosts="[{ name: 'AEFT', disabled: true }]"
        @mouseenter="checkpointHover = true" @mouseleave="checkpointHover = false">
        <template v-slot:logo>
          <iconCheckpoint />
        </template>
        <template v-slot:animation>
          <lottiePreviewVue name="checkpoint" :data="checkpointAnimation" :hover="checkpointHover" />
        </template>
      </card>
    </Suspense>
    <Suspense v-for="(tool, index) in toolList" :key="index">
      <pseudoCard :package="tool.package" :config="tool.config" :label="tool.label">
        <template v-slot:logo>
          <span class="material-symbols-outlined">
            {{ tool.icon }}
          </span>
        </template>
      </pseudoCard>
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
