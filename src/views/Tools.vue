<script setup lang="ts">
import { ref } from 'vue';
import card from '@/components/card.vue';
import iconCheckpoint from '@/components/checkpoint/icon-header.vue'
import type { PseudoPackage, HostList, Config } from '@/types';
import pseudoCard from '@/components/pseudo-card.vue';
import checkpointAnimation from '@/assets/previews/checkpoint.json'
import toolList from '@/upcoming.json'
import skeletonCard from '@/components/skeleton-card.vue';
import lottiePreviewVue from '@/components/lottie-preview.vue';

import warlockAnimation from '@/assets/previews/warlock.json'
import snatchAnimation from '@/assets/previews/snatch.json'
import keyloAnimation from '@/assets/previews/keylo.json'
import bombeiAnimation from '@/assets/previews/bombei.json'

const tools = {
  checkpoint: {
    hover: ref(false),
    animation: checkpointAnimation
  },
  snatch: {
    hover: ref(false),
    animation: snatchAnimation
  },
  warlock: {
    hover: ref(false),
    animation: warlockAnimation
  },
  keylo: {
    hover: ref(false),
    animation: keyloAnimation
  },
  bombei: {
    hover: ref(false),
    animation: bombeiAnimation
  }
}

</script>

<template>
  <div class="main">
    <Suspense>
      <template #fallback>
        <skeletonCard />
      </template>
      <card repo="checkpoint" label="#ffbe0b" :disabledHosts="[{ name: 'AEFT', disabled: true }]"
        @mouseenter="tools.checkpoint.hover.value = true" @mouseleave="tools.checkpoint.hover.value = false">
        <template v-slot:logo>
          <iconCheckpoint />
        </template>
        <template v-slot:animation>
          <lottiePreviewVue name="checkpoint" :data="checkpointAnimation" :hover="tools.checkpoint.hover.value" />
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
        <template v-slot:animation v-if="tools[tool.package.name as string].animation">
          <lottiePreviewVue :name="tool.package.name" :data="tools[tool.package.name as string].animation" :hover="false"
            :disabled="true" />
        </template>
      </pseudoCard>
    </Suspense>
  </div>
</template>

<style>
.main {
  padding-top: 40px;
  max-width: 800px;
  height: fit-content;
  width: 100%;
  margin-bottom: 80px;
}
</style>
