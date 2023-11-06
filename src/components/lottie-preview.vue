<script setup lang="ts">
// @ts-nocheck - Too many errors due to Lottie_API global
import { ref, onMounted, computed, watch } from 'vue';
import type { LottieApi, LottieMarker, LottieAnimation, LottieBuilder, LottieAnimationOptions } from '@/types'
import * as lottie from "lottie-web";

const colorList = {
  checkpoint: {
    cp_handle: "#FFEE00",
    cp_anchor: "#FFEE00",
    cp_outline: "#fff",
    cp_shape: "#000",
    cp_bg_1: "#6F61C0",
    cp_bg_2: "#A084E8",
    cp_bg_3: "#0080aa",
    shuffleColors: ['cp_bg_1', 'cp_bg_2', 'cp_bg_3', 'cp_handle', 'cp-anchor', 'cp-outline']
  },
  default: {
    cursor_stroke: "#fff",
    cursor_fill: "#000",
    panel_bg: "#323232",
    panel_header: "#262626",
    panel_icon: "#cccccc",
    panel_highlight: "#3f3f3f",
    panel_flyout: "#808080",
  }
}

const anim = ref(null)
const animAPI = ref(null);
const preview = ref(null)
const firstLoop = ref(false);
const hover = ref(false);

// Disabling for now since only one animation is active, for future should re-implement
const isMobileScreen = computed(() => {
  return true;
  // return window.innerWidth <= 870
})

let lastMarker = 0;

interface Props {
  data: any;
  name: string;
  shouldLoop?: boolean;
  hover?: boolean;
  disabled?: boolean;
}


const props = withDefaults(defineProps<Props>(), {
  data: null,
  shouldLoop: true,
  hover: false,
  disabled: false,
})

onMounted(async () => {
  anim.value = buildAnimation();
  animAPI.value = (lottie_api as LottieApi).createAnimationApi(anim.value);
  anim.value.addEventListener('loopComplete', () => {
    if (!firstLoop.value) firstLoop.value = true;
    if (!hover.value && !isMobileScreen.value) {
      anim.value.pause();
    }
    // shuffleColors();
  })
  anim.value.addEventListener('enterFrame', (frame) => {
    if (lastMarker && !hover.value && firstLoop && frame.currentTime >= lastMarker) {
      // shuffleColors();
      anim.value.pause();
    }
  })
  anim.value.setSpeed(1.2)
  watch(() => props.hover, (value) => {
    hover.value = value;
    if (!value) {
      lastMarker = findNearestStopPoint(anim.value.currentRawFrame)
    } else if (!props.disabled) {
      anim.value.play();
    }
  });
})

function findNearestStopPoint(frame) {
  return props.data.markers.filter((marker: LottieMarker) => /Done/.test(marker.cm) && marker.tm > frame)[0]?.tm || 1;
}

function buildAnimation() {
  const animData = {
    wrapper: preview.value,
    animType: "svg",
    loop: true,
    prerender: true,
    autoplay: !props.disabled,
    animationData: props.data
  }
  // @ts-ignore - Lottie_API is legacy and a pre-loaded global var here
  return (lottie as LottieBuilder).loadAnimation(animData);
}

const isMonochrome = computed(() => {
  // If a pseudo element always be mono
  if (props.disabled) return true;
  // If a mobile screen, never be mono
  if (isMobileScreen.value) return false;
  // Otherwise obey hover events on desktop
  if (hover.value) return false;
  // Unless the user isn't hovering, in which case deactivate after first loop
  if (!firstLoop.value) return false;
  return true;
})
</script>

<template>
  <div class="lottie-container" :class="isMonochrome ? 'mono' : ''">
    <div class="lottie-animation" ref="preview" />
  </div>
</template>

<style>
:root {
  --panel-bg: #323232;
  --panel-header: #262626;
  --panel-icon: #cccccc;
  --panel-highlight: #3f3f3f;
  --panel-flyout: #808080;
  --cursor-stroke: #fff;
  --cursor-fill: #000;
  --cp-handle: hsl(56, 100%, 50%);
  --cp-anchor: hsl(56, 100%, 50%);
  --cp-outline: hsl(0, 0%, 100%);
  --cp-shape: #000;
  --cp-bg-1-h: 256;
  --cp-bg-2-h: 214;
  --cp-bg-3-h: 129;
  --cp-bg-1: hsl(256, 80%, 56%);
  --cp-bg-2: hsl(214, 78%, 54%);
  --cp-bg-3: hsl(129, 56%, 54%);
  --quart: cubic-bezier(0.76, 0.00, 0.24, 1.00);
  --quad: cubic-bezier(0.48, 0.04, 0.52, 0.96);
  --quint: cubic-bezier(0.84, 0.00, 0.16, 1.00);
}

.lottie-animation {
  width: 103%;
  height: 100%;
  min-height: 210px;
}

.lottie-container {
  box-sizing: border-box;
  width: 420px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}


/* General vertical */
@media (max-width: 540px) {
  .lottie-container {
    width: 100%;
    height: fit-content;
  }
}

.mono {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  -webkit-transition: 300ms -webkit-filter var(--quart);
  -moz-transition: 300ms -moz-filter var(--quart);
  -moz-transition: 300ms filter var(--quart);
  -ms-transition: 300ms -ms-filter var(--quart);
  -o-transition: 300ms -o-filter var(--quart);
  transition: 300ms filter var(--quart), 300ms -webkit-filter var(--quart), background-color 180ms var(--quart);
}

.cursor {
  filter: drop-shadow(0.45rem 0.45rem 0.5rem rgba(0, 0, 0, 0.5));
}

.panel-full {
  filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
}

.cursor-stroke {
  stroke: var(--cursor-stroke);
}

.cursor-fill {
  fill: var(--cursor-fill);
}

.cp-handle {
  fill: var(--cp-handle);
  stroke: var(--cp-handle);
}

.cp-anchor {
  fill: var(--cp-anchor);
}

.cp-outline {
  stroke: var(--cp-outline);
}

.cp-shape {
  fill: var(--cp-shape);
}

.cp-bg-1 {
  fill: #565ecb;
}

.cp-bg-2 {
  fill: #8d56cb;
}

.cp-bg-3 {
  fill: #cb5656;
}

.wl-bg-1 {
  fill: #cb5856;
}

.sn-bg-1 {
  fill: #9c56cb;
}
</style>