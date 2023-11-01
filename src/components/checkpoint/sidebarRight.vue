<script setup lang="ts">
import iconHeader from './icon-header.vue';
import adobeIconILST from '../adobe-icons/ilst.vue'

</script>

<template>
  <div class="sidebar-container">
    <div class="sidebar-right">
      <iconHeader />
      <adobeIconILST />
    </div>
  </div>
</template>

<style>
.sidebar-container {
  padding: 10px 20px;
  /* position: absolute; */
}

.sidebar-right {
  /* border: 2px solid blue; */
  position: sticky;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>