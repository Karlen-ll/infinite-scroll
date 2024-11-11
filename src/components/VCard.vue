<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts">
// ...
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 500px;
  border-radius: 1rem;
  background-color: $color-bg-accent;
  box-sizing: border-box;
  padding: 2rem;
}
</style>
