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
  <div class="pseudo-card-container">
    <slot name="animation" v-if="$slots.animation" />
    <div class="pseudo-card-preview" v-else>
      <div class="pseudo-card-label" :style="{
        backgroundColor: `#${props.label?.replace(/^\#/, '')}`
      }">
      </div>
      <div class="pseudo-card-image-container">
        <div class="pseudo-card-image-text">
          GIF
        </div>
        <div class="pseudo-card-image-background">

        </div>
      </div>
    </div>
    <div class="pseudo-card-content">
      <div class="pseudo-card-hosts">
        <div v-for="(host, index) in config.hosts" :key="index" class="pseudo-host-icon">
          <hostIcon :app="host.name" :legacy="false" :disabled="host.disabled" />
        </div>
        <div class="pseudo-card-small-sidebar">
          <div class="sidebar-btn">
            <span class="material-symbols-outlined">
              lock
            </span>
          </div>
        </div>
      </div>
      <div class="pseudo-card-main">
        <div class="pseudo-card-subheader">
          <div class="pseudo-card-subheader-top">
            <div class="pseudo-tool-icon" :style="{}">
              <slot name="logo" />
            </div>
            <div class="pseudo-tool-title">
              <div class="pseudo-tool-namespace" :style="{
                textDecorationColor: props.label
              }">
                {{ props.package.name }}
              </div>
              <div class="pseudo-tool-version">
                {{ `v${props.package.version}` }}
              </div>
            </div>
          </div>
          <div class="pseudo-card-subheader-bottom">
            {{ props.package.description }}
          </div>
        </div>
        <div class="pseudo-card-actions">
          <div class="action-btn-disabled">
            IN DEVELOPMENT
          </div>
          <div class="action-btn-disabled sm">
            WIP
          </div>
        </div>
      </div>
      <div class="pseudo-card-sidebar">
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
.action-btn-disabled.sm {
  display: none;
}

.sidebar-btn {
  width: 48px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pseudo-card-container {
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

.pseudo-card-container:nth-child(n+2) {
  margin-top: 32px;
}

.pseudo-card-label {
  width: 8px;
  height: 100%;
}

.pseudo-card-preview {
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

.pseudo-card-container:nth-child(even) {
  border-radius: 0px 5px 5px 0px;
}

.pseudo-card-container:nth-child(even) .pseudo-card-preview .pseudo-card-label {
  order: 1;
}

.pseudo-card-container:nth-child(even) .pseudo-card-preview {
  order: 1;
}

.pseudo-card-container:nth-child(even) .pseudo-card-sidebar {
  order: -2;
}

.pseudo-card-container:nth-child(even) .pseudo-card-hosts {
  order: 2;
}

.pseudo-card-image-container {
  width: 100%;
  height: 100%;
}

.pseudo-card-image-text {
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

.pseudo-card-content {
  box-sizing: border-box;
  width: 100%;
  /* border: 2px solid green; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.pseudo-card-hosts {
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

.pseudo-host-icon {
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  /* background-color: #000; */
}

.pseudo-host-icon:nth-child(n+1):not(:first-of-type) {
  margin-top: 6px;
}

.pseudo-card-main {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.pseudo-card-subheader {
  display: flex;
  flex-direction: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.pseudo-card-subheader-top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
}

.pseudo-tool-icon {
  /* box-sizing: border-box; */
  width: 32px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pseudo-tool-title {
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: nowrap;
}

.pseudo-tool-namespace {
  box-sizing: border-box;
  margin: 0px 10px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.1ch;
}

.pseudo-tool-version {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2ch;
}

.pseudo-card-subheader-bottom {
  padding-top: 6px;
  font-size: 11px;
  font-weight: 600;
}

.pseudo-card-actions {
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

.pseudo-card-sidebar {
  box-sizing: border-box;
  width: 60px;
  padding: 0px 0px;
  height: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}

/* General horizontal */
@media only screen and (max-width: 870px) {
  .action-btn-disabled:not(.sm) {
    display: none;
  }

  .pseudo-tool-icon {
    display: none;
  }

  .action-btn-disabled.sm {
    display: flex;
  }

  .pseudo-card-container {
    border-radius: 0px 0px 0px 0px;
  }

  .pseudo-card-content {
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
  }

  .pseudo-card-subheader-bottom {
    padding: 0px 10px;
  }

  .pseudo-card-subheader-top {
    margin: 10px 0px;
  }

  .pseudo-card-actions {
    box-sizing: border-box;
    padding-top: 12px;
    height: fit-content;
  }

  .pseudo-card-main {
    height: 136px;
    align-items: space-between;
  }

  .pseudo-card-hosts {
    padding-top: 0px;
    box-sizing: border-box;
    order: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    height: fit-content;
  }

  .pseudo-tool-title {
    flex-direction: column;
  }

  .pseudo-card-sidebar {
    display: none;
  }

  .pseudo-card-small-sidebar {
    display: flex;
    width: 32px;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }

  .sidebar-btn {
    width: 32px;
  }

  .pseudo-host-icon:nth-child(n+1):not(:first-of-type) {
    margin-top: 0px;
    margin-left: 6px;
  }
}

@media only screen and (max-width: 540px) {
  .pseudo-card-container {
    flex-direction: column;
    height: fit-content;
  }

  .pseudo-card-content {
    height: fit-content;
  }

  .pseudo-tool-icon {
    display: flex;
    margin-bottom: 6px
  }

  .pseudo-card-subheader-bottom {
    font-size: 14px;
  }

  .action-btn-disabled.sm {
    display: none;
  }

  .action-btn-disabled:not(.sm) {
    display: flex;
  }
}
</style>