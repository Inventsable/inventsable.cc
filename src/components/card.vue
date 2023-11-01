<script setup lang="ts">

import { getExtensionPackage, getExtensionConfig } from '@/util/github'
// import { defineProps } from 'vue';
const props = defineProps({
  repo: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
  },
  label: {
    type: String,
  }
})
const data = await getExtensionPackage(props.repo);
console.log(data);
const config = await getExtensionConfig(props.repo);
console.log(config)

</script>

<!-- <slot name="icon"></slot> -->
<template>
  <div class="card-container">
    <div class="card-preview">
      <div class="card-label" :style="{
        backgroundColor: `#${props.label?.replace(/^\#/, '')}`
      }">

      </div>
      <div class="card-image-container">
        <div class="card-image-text">
          GIF
        </div>
        <div class="card-image-background">

        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="card-hosts">

      </div>
      <div class="card-main">

      </div>
      <div class="card-code">

      </div>
    </div>
  </div>
</template>

<style>
.card-container {
  /* border: 2px solid red; */
  height: 200px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.card-label {
  width: 8px;
  height: 100%;
}

.card-preview {
  box-sizing: border-box;
  /* border: 2px solid blue; */
  width: 420px;
  height: 100%;
  overflow: hidden;
  border-radius: 5px 0px 0px 5px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.card-image-container {
  width: 100%;
  height: 100%;
}

.card-image-text {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: .35ch;
  color: #fff;
  font-weight: 700;
}

.card-content {
  box-sizing: border-box;
  width: 100%;
  /* border: 2px solid green; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.card-hosts {
  width: 50px;
  height: 100%;
  border: 2px solid #000;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}

.card-main {
  width: 100%;
  height: 100%;
  border: 2px solid blue;
}

.card-code {
  width: 50px;
  height: 100%;
  border: 2px solid #000;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}
</style>