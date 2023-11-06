<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import card from '@/components/card.vue';
import iconCheckpoint from '@/components/checkpoint/icon-header.vue'
import type { Tools, Tool } from '@/types';
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
} as Tools

// Disabling for now since only one animation is active, for future should re-implement
const isMobileScreen = computed(() => {
  return true;
  // return window.innerWidth <= 870
})
const toggleHover = (property: Ref<boolean>, value: boolean): void => {
  if (isMobileScreen.value) property.value = true
  else property.value = value;
}

// Just a cursory check to determine if the user has loaded in a mobile device
toggleHover(tools.checkpoint.hover, false)
// This only occurs once which is far less taxing than measuring screen size events

</script>

<template>
  <div class="main">
    <Suspense>
      <!-- Since most content is being fetched from Github, we want to Suspend the main component and
      provide a fallback to skeleton content to prevent abrupt changes to content sizes on page load -->
      <template #fallback>
        <skeletonCard />
      </template>
      <card repo="checkpoint" label="#ffbe0b" :disabledHosts="[{ name: 'AEFT', disabled: true }]"
        @mouseenter="toggleHover(tools.checkpoint.hover, true)" @mouseleave="toggleHover(tools.checkpoint.hover, false)">
        <template v-slot:logo>
          <iconCheckpoint />
        </template>
        <template v-slot:animation>
          <lottiePreviewVue name="checkpoint" :data="checkpointAnimation" :hover="tools.checkpoint.hover.value" />
        </template>
      </card>
    </Suspense>
    <!-- For any tools which aren't currently available, we use mock data and a modified Card component -->
    <Suspense v-for="(tool, index) in toolList" :key="index">
      <pseudoCard :package="tool.package" :config="tool.config" :label="tool.label">
        <template v-slot:logo>
          <span class="material-symbols-outlined">
            {{ tool.icon }}
          </span>
        </template>
        <template v-slot:animation v-if="tools[tool.package.name as keyof Tools].animation">
          <lottiePreviewVue :name="tool.package.name" :data="tools[tool.package.name as keyof Tools].animation"
            :hover="isMobileScreen" :disabled="true" />
        </template>
      </pseudoCard>
    </Suspense>
  </div>
</template>

<style>
:root {
  --sm-breakpoint: 870px;
  --xs-breakpoint: 540px;
}

.main {
  padding-top: 40px;
  max-width: 800px;
  height: fit-content;
  width: 100%;
  margin-bottom: 80px;
}

/* General horizontal */
@media only screen and (max-width: 870px) {
  #app {
    width: 100vw;
    overflow-x: hidden;
  }

  .main {
    padding-left: 0px;
    padding-right: 0px;
    margin: 0px;
    box-sizing: border-box;
    width: 100%;
    min-width: calc(100vw - 16px);
  }
}

@media only screen and (max-width: 540px) {
  .main {
    min-width: calc(100vw - 14px);
  }
}
</style>
