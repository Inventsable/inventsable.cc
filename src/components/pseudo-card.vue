<script setup lang="ts">
import { getExtensionPackage, getExtensionConfig } from '../util/github'
import hostIcon from './adobe-icons/host-icon.vue';
import iconButton from './icon-button.vue';
import { useSlots } from 'vue';
import type { HostList, PseudoPackage, Config } from '@/types'
useSlots();

const props = defineProps<{
  label: string,
  package: PseudoPackage,
  config: Config
}>()

</script>

<!-- <slot name="icon"></slot> -->
<template>
  <div class="card-container">
    <slot name="animation" v-if="$slots.animation" />
    <div class="card-preview" v-else>
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
        <div v-for="(host, index) in config.hosts" :key="index" class="host-icon">
          <hostIcon :app="host.name" :legacy="false" :disabled="host.disabled" />
        </div>
      </div>
      <div class="card-main">
        <div class="card-subheader">
          <div class="card-subheader-top">
            <div class="tool-icon" :style="{
              backgroundColor: props.label
            }">
              <slot name="logo" />
            </div>
            <div class="tool-title">
              <div class="tool-namespace" :style="{
                textDecorationColor: props.label
              }">
                {{ props.package.name }}
              </div>
              <div class="tool-version">
                {{ `v${props.package.version}` }}
              </div>
            </div>
          </div>
          <div class="card-subheader-bottom">
            {{ props.package.description }}
          </div>
        </div>
        <div class="card-actions">
          <div class="action-btn-disabled">
            IN DEVELOPMENT
          </div>
        </div>
      </div>
      <div class="card-sidebar">
        <div class="sidebar-btn">
          <span class="material-symbols-outlined">
            lock
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sidebar-btn {
  width: 48px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-container {
  user-select: none;
  overflow: hidden;
  border-radius: 5px 0px 0px 5px;
  height: 200px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.card-container:nth-child(n+2) {
  margin-top: 32px;
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
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.card-container:nth-child(even) {
  border-radius: 0px 5px 5px 0px;
}

.card-container:nth-child(even) .card-preview .card-label {
  order: 1;
}

.card-container:nth-child(even) .card-preview {
  order: 1;
}

.card-container:nth-child(even) .card-sidebar {
  order: -2;
}

.card-container:nth-child(even) .card-hosts {
  order: 2;
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
  box-sizing: border-box;
  width: 66px;
  height: 100%;
  /* border: 2px solid #000; */
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  padding: 14px 0px;
}

.host-icon {
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  /* background-color: #000; */
}

.host-icon:nth-child(n+1):not(:first-of-type) {
  margin-top: 6px;
}

.card-main {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.card-subheader {
  display: flex;
  flex-direction: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card-subheader-top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
}

.tool-icon {
  /* box-sizing: border-box; */
  width: 32px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}

.tool-title {
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: nowrap;
}

.tool-namespace {
  box-sizing: border-box;
  margin: 0px 10px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.1ch;
}

.tool-version {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2ch;
}

.card-subheader-bottom {
  padding-top: 6px;
  font-size: 11px;
  font-weight: 600;
}

.card-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-btn-disabled {
  user-select: none;
  cursor: auto;
  padding: 5px 16px;
  background-color: #cacaca;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.3ch;
}

.card-sidebar {
  box-sizing: border-box;
  width: 60px;
  padding: 0px 0px;
  height: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}
</style>