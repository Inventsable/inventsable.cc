<script setup lang="ts">

</script>

<template>
  <div class="github-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 256 256">
      <path class="github-icon" d="M128,0C57.3,0,0,58.8,0,131.2c0,58,36.7,107.2,87.5,124.5c6.4,1.2,8.5-2.9,8.5-6.3V225c-35.6,7.9-43-15.5-43-15.5
    c-5.8-15.2-14.2-19.2-14.2-19.2c-11.6-8.1,0.9-8,0.9-8c12.9,0.9,19.6,13.5,19.6,13.5c11.4,20.1,29.9,14.3,37.2,10.9
    c1.1-8.5,4.5-14.3,8.1-17.5c-28.4-3.3-58.3-14.6-58.3-64.9c0-14.3,5-26,13.2-35.2c-1.3-3.3-5.7-16.7,1.2-34.7
    c0,0,10.8-3.5,35.2,13.5c10.2-2.9,21.2-4.4,32-4.4c10.9,0.1,21.8,1.5,32.1,4.4c24.4-17,35.2-13.5,35.2-13.5
    c7,18.1,2.6,31.4,1.3,34.7c8.2,9.2,13.2,20.9,13.2,35.2c0,50.4-29.9,61.5-58.4,64.8c4.6,4.1,8.8,12.1,8.8,24.3v36
    c0,3.5,2,7.6,8.5,6.3c50.8-17.4,87.5-66.6,87.5-124.5C256,58.8,198.7,0,128,0z" />
    </svg>
  </div>
</template>

<style>
.github-wrapper {
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.github-wrapper svg {
  width: 100%;
}

.github-icon {
  fill: #000
}

.github-wrapper:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>