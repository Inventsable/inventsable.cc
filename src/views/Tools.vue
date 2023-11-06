<script setup lang="ts">
// @ts-nocheck
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

const checkpointHover = ref(false);
const warlockHover = ref(false);
const snatchHover = ref(false);
const keyloHover = ref(false);
const bombeiHover = ref(false);

import warlockAnimation from '@/assets/previews/warlock.json'
import snatchAnimation from '@/assets/previews/snatch.json'
import keyloAnimation from '@/assets/previews/keylo.json'
import bombeiAnimation from '@/assets/previews/bombei.json'
const animations = {
  snatch: snatchAnimation,
  warlock: warlockAnimation,
  keylo: keyloAnimation,
  bombei: bombeiAnimation
}
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
        <template v-slot:animation v-if="animations[tool.package.name as string]">
          <lottiePreviewVue :name="tool.package.name" :data="animations[tool.package.name as string]"
            :hover="checkpointHover" :disabled="true" />
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
