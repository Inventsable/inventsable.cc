<script setup lang="ts">
/**
 * This should be compartmentalized. It'd be nice to refactor this
 * to bundle card, pseudo-card, and skeleton in the same parent,
 * then pieces like HostList into children components.
 */

import { getExtensionPackage, getExtensionConfig } from '../util/github'
import hostIcon from './adobe-icons/host-icon.vue';
import iconButton from './icon-button.vue';
import { useSlots, computed } from 'vue';

useSlots();
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
  },
  disabledHosts: {
    type: Array,
    required: false
  }
})
const pkg = await getExtensionPackage(props.repo);
const config = await getExtensionConfig(props.repo);
console.log(pkg);
console.log(config)
interface hostList {
  name: string;
  version: string | number;
  disabled?: boolean;
}

const hostList = computed((): hostList[] => {
  // @ts-ignore
  return [].concat(config.hosts, props.disabledHosts)
})

console.log(hostList.value)

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
        <div class="card-image-text" v-if="!$slots.animation">
          GIF
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="card-hosts">
        <div v-for="(host, index) in hostList" :key="index" class="host-icon">
          <hostIcon :app="host.name" :legacy="false" :disabled="host.disabled" />
        </div>
        <div class="card-small-sidebar">
          <iconButton />
        </div>
      </div>
      <div class="card-main">
        <div class="card-subheader">
          <div class="card-subheader-top">
            <div class="tool-icon" :style="{
              // backgroundColor: props.label
            }">
              <slot name="logo" />
            </div>
            <div class="tool-title">
              <div class="tool-namespace" :style="{
                textDecorationColor: props.label
              }">
                {{ pkg.name }}
              </div>
              <div class="tool-version">
                {{ `v${pkg.version}` }}
              </div>
            </div>
          </div>
          <div class="card-subheader-bottom">
            {{ pkg.description }}
          </div>
        </div>
        <div class="card-actions">
          <div class="action-btn">
            DOWNLOAD
          </div>
        </div>
      </div>
      <div class="card-sidebar">
        <iconButton />
      </div>
    </div>
  </div>
</template>

<style>
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
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
}

.card-container:last-of-type {
  margin-bottom: 40px;
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


.card-container:nth-child(even) .card-preview,
[class$="card-container"]:nth-child(even) .lottie-container {
  order: 1;
}

[class$="card-container"]:nth-child(even) .card-sidebar {
  order: -2;
}

[class$="card-container"]:nth-child(even) .card-hosts {
  order: 2;
}

.card-image-container {
  width: 100%;
  height: 100%;
  position: relative;
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

.card-small-sidebar {
  display: none;
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
  background-color: rgba(0, 0, 0, 0.0) !important;
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
  text-decoration: underline;
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
  font-weight: 600;
}

[class$="subheader-bottom"] {
  font-size: 14px;
}

.card-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-btn {
  border-radius: 2px;
  user-select: none;
  cursor: pointer;
  padding: 5px 16px;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.3ch;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  transform: translateY(0px);
  transition: box-shadow 0ms cubic-bezier(0.48, 0.04, 0.52, 0.96) 80ms, transform 0ms cubic-bezier(0.48, 0.04, 0.52, 0.96) 80ms
}

.action-btn:active {
  transform: translateY(1px);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
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


/* General horizontal */
@media only screen and (max-width: 870px) {
  .card-container {
    border-radius: 0px 0px 0px 0px;
    width: 100%;
  }

  .card-content {
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
  }

  .card-subheader-bottom {
    padding: 0px 10px;
  }

  .card-subheader-top {
    margin: 10px 0px;
  }

  .card-actions {
    box-sizing: border-box;
    padding-top: 12px;
    height: fit-content;
  }

  .card-main {
    height: 136px;
    align-items: space-between;
  }

  .card-hosts {
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

  .tool-title {
    flex-direction: column;
  }

  .card-sidebar {
    display: none;
  }

  .card-small-sidebar {
    display: flex;
    width: 50px;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }

  .host-icon:nth-child(n+1):not(:first-of-type) {
    margin-top: 0px;
    margin-left: 6px;
  }

  .lottie-container {
    min-width: 278px;
  }
}

/* General vertical */
@media only screen and (max-width: 540px) {
  .card-container {
    flex-direction: column;
    height: fit-content;
  }

  .card-content {
    height: fit-content;
  }

  .card-subheader-bottom {
    font-size: 14px;
  }

  .tool-icon {
    margin-bottom: 8px;
  }

  [class$="card-container"]:nth-child(even) .lottie-container {
    order: 0;
  }

  [class$="card-container"]:last-of-type {
    margin-bottom: 80px;
  }
}
</style>