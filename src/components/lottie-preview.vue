<script setup lang="ts">
// @ts-nocheck - Too many errors due to Lottie_API global
import { ref, onMounted, computed, watch } from 'vue';
import type { LottieApi, LottieMarker, LottieAnimation, LottieBuilder, LottieAnimationOptions } from '@/types'
import { setCSS, getCSS } from '@/util/style'
import * as lottie from "lottie-web";

const shouldShuffle = false;

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
let lastMarker = 0;

interface Props {
  data: any;
  name: string;
  shouldLoop?: boolean;
  hover?: boolean;
  disabled?: boolean;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBrightColor(min: number = 40, max: number = 80): string {
  const minLuminance = 40; // Minimum luminance for good contrast
  const maxLuminance = 70; // Maximum luminance for good contrast
  const randomColor = () => Math.floor(Math.random() * 256);
  let hexColor: string;
  let luminance: number;
  do {
    const r = randomColor();
    const g = randomColor();
    const b = randomColor();
    // Calculate luminance using the relative luminance formula (perceived brightness)
    luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luminance >= minLuminance && luminance <= maxLuminance) {
      // Convert the RGB values to a hexadecimal string
      hexColor = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    }
  } while (!hexColor); // Repeat until a valid color is found
  return hexColor;
}

const props = withDefaults(defineProps<Props>(), {
  data: null,
  shouldLoop: true,
  hover: false,
  disabled: false,
})

// Neat idea but generated colors don't have enough contrast and look ugly
const shuffleColors = () => {
  if (!shouldShuffle) return null;
  colorList[props.name].shuffleColors.forEach((cssVar: string) => {
    const target = cssVar.replace(/\_/gm, '-');
    const last = getCSS(target);
    setCSS(target, last.replace(/\d{1,},/, `${getRandomInt(10, 255)},`))
  })
}

onMounted(async () => {
  anim.value = buildAnimation();
  animAPI.value = (lottie_api as LottieApi).createAnimationApi(anim.value);
  anim.value.addEventListener('loopComplete', () => {
    if (!firstLoop.value) firstLoop.value = true;
    if (!hover.value) {
      anim.value.pause();
    }
    shuffleColors();
  })
  anim.value.addEventListener('enterFrame', (frame) => {
    if (lastMarker && !hover.value && firstLoop && frame.currentTime >= lastMarker) {
      shuffleColors();
      anim.value.pause();
    }
  })
  watch(() => props.hover, (value) => {
    hover.value = value;
    if (!value) {
      lastMarker = findNearestStopPoint(anim.value.currentRawFrame)
    } else {
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

function hexToGrayscale(hex: string): string {
  hex = hex.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16); const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  const grayHex = grayValue.toString(16).padStart(2, '0');
  return `#${grayHex}${grayHex}${grayHex}`;
}

const isMonochrome = computed(() => {
  if (props.disabled) return true;
  if (hover.value) return false;
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

.lottie-animation {
  width: 103%;
  height: 100%;
  min-height: 210px;
}

.wl-bg-1 {
  fill: #cb5856;
}

.sn-bg-1 {
  fill: #9c56cb;
}
</style>