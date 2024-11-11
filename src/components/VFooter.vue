<template>
  <ul class="footer list">
    <li>Copyright 2024 © Pireverdiev Karlen</li>
    <li>{{ count }} эл. / {{ page }} стр.</li>
  </ul>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
    page?: number
  }>(),
  {
    count: 0,
    page: 0,
  }
)
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  color: $color-font-65;
  background-color: $color-bg-accent;
  padding: 0.5em 1.5em 0.35em;
}
</style>
