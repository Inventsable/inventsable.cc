<script setup lang="ts">
// This should really be embedded into card instead of being a standalone component
</script>

<template>
  <div class="skeleton-card-container">
    <div class="skeleton-card-preview">
      <div class="skeleton-card-image-container">
        <div class="skeleton-card-image-text">
        </div>
        <div class="skeleton-card-image-background">
        </div>
      </div>
    </div>
    <div class="skeleton-card-content">
      <div class="skeleton-card-hosts">
        <div class="skeleton-host-icon"></div>
        <div class="skeleton-card-sidebar sm">
          <div class="skeleton-radial">
            <div class="skeleton-icon"></div>
          </div>
        </div>
      </div>
      <div class="skeleton-card-main">
        <div class="skeleton-card-subheader">
          <div class="skeleton-card-subheader-top">
            <div class="skeleton-tool-icon" :style="{
              // backgroundColor: props.label
            }">
            </div>
            <div class="skeleton-tool-title">
              <div class="skeleton-tool-namespace">
              </div>
              <div class="skeleton-tool-version">
              </div>
            </div>
          </div>
          <div class="skeleton-card-subheader-bottom">
          </div>
        </div>
        <div class="skeleton-card-actions">
          <div class="skeleton-btn">
          </div>
        </div>
      </div>
      <div class="skeleton-card-sidebar">
        <div class="skeleton-radial">
          <div class="skeleton-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
:root {
  --color-sk0: #eee;
  --color-sk1: #ccc;
  --color-sk2: #aaa;
  --color-sk3: #888;
  --color-sk4: #666;
}

.skeleton-radial {
  padding: 10px;
}

.skeleton-card-sidebar.sm {
  display: none;
}

.skeleton-icon {
  width: 28px;
  height: 28px;
  background-color: var(--color-sk2);
  border-radius: 28px;
}

.skeleton-card-container {
  user-select: none;
  overflow: hidden;
  border-radius: 5px 0px 0px 5px;
  height: 200px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
}

.skeleton-card-container:nth-child(n+2) {
  margin-top: 32px;
}

.skeleton-card-label {
  width: 8px;
  height: 100%;
  background-color: var(--color-sk1);
}

.skeleton-card-preview {
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

.skeleton-card-container:nth-child(even) {
  border-radius: 0px 5px 5px 0px;
}

.skeleton-card-container:nth-child(even) .skeleton-card-preview .skeleton-card-label {
  order: 1;
}

.skeleton-card-container:nth-child(even) .skeleton-card-preview {
  order: 1;
}

.skeleton-card-container:nth-child(even) .skeleton-card-sidebar {
  order: -2;
}

.skeleton-card-container:nth-child(even) .skeleton-card-hosts {
  order: 2;
}

.skeleton-card-image-container {
  width: 100%;
  height: 100%;
}

.skeleton-card-image-text {
  background-color: var(--color-sk2);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.skeleton-card-content {
  box-sizing: border-box;
  width: 100%;
  /* border: 2px solid green; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.skeleton-card-hosts {
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

.skeleton-host-icon {
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  background-color: var(--color-sk2);
  border-radius: 2px;
}

.skeleton-host-icon:nth-child(n+1):not(:first-of-type) {
  margin-top: 6px;
}

.skeleton-card-main {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.skeleton-card-subheader {
  display: flex;
  flex-direction: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.skeleton-card-subheader-top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
}

.skeleton-tool-icon {
  /* box-sizing: border-box; */
  width: 32px;
  height: 32px;
  background-color: var(--color-sk2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.skeleton-tool-title {
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: nowrap;
}

.skeleton-tool-namespace {
  text-decoration: underline;
  box-sizing: border-box;
  margin: 0px 10px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.1ch;
  background-color: var(--color-sk2);
  width: 130px;
  height: 32px;
}

.skeleton-tool-version {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2ch;
  background-color: var(--color-sk2);
  width: 40px;
  height: 15px;
}

.skeleton-card-subheader-bottom {
  margin-top: 8px;
  padding-top: 6px;
  font-size: 11px;
  font-weight: 600;
  background-color: var(--color-sk2);
  width: 320px;
  height: 13px;
}

.skeleton-card-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.skeleton-btn {
  width: 148px;
  height: 30px;
  background-color: var(--color-sk2);
}

.skeleton-card-sidebar {
  box-sizing: border-box;
  width: 60px;
  padding: 0px 0px;
  height: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 870px) {
  .skeleton-card-hosts {
    position: relative;
  }

  .skeleton-card-preview {
    min-width: 278px;
    width: 278px;
  }

  .skeleton-card-sidebar.sm {
    display: flex;
    width: 50px;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }

  .skeleton-card-subheader-bottom {
    box-sizing: border-box;
    padding: 0px 10px;
    width: 80%
  }

  .skeleton-tool-icon {
    margin-bottom: 14px;
  }

  .skeleton-card-container {
    border-radius: 0px 0px 0px 0px;
    width: 100%;
  }

  .skeleton-card-content {
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
  }

  .skeleton-card-subheader-bottom {
    padding: 0px 10px;
  }

  .skeleton-card-subheader-top {
    margin: 10px 0px;
  }

  .skeleton-card-actions {
    box-sizing: border-box;
    padding-top: 12px;
    height: fit-content;
  }

  .skeleton-card-main {
    height: 136px;
    align-items: space-between;
  }

  .skeleton-card-hosts {
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

  .skeleton-tool-title {
    flex-direction: column;
  }

  .skeleton-card-sidebar {
    display: none;
  }

  .skeleton-card-small-sidebar {
    display: flex;
    width: 50px;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }

  .skeleton-host-icon:nth-child(n+1):not(:first-of-type) {
    margin-top: 0px;
    margin-left: 6px;
  }
}

@media only screen and (max-width: 540px) {
  .skeleton-card-preview {
    width: 100%;
    padding: 0px;
    padding-top: calc(600 / 810 * 100%);
    background-color: var(--color-sk2);
  }

  .skeleton-card-container {
    flex-direction: column;
    height: fit-content;
    padding-bottom: 4px;
  }

  .skeleton-card-content {
    height: fit-content;
  }

  .skeleton-card-subheader-bottom {
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