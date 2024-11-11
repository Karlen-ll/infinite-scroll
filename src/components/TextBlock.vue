<template>
  <component :is="tag" class="block">
    <span class="block__label" :style="width ? { minWidth: width } : null">{{ label }}:</span>

    <div class="block__wrapper">
      <span class="block__value">{{ value }}</span>
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string
    width?: string
    href?: string
    tag?: string
  }>(),
  {
    tag: 'span',
    width: '100px',
  }
)
</script>

<style scoped lang="scss">
.block {
  display: flex;

  &__label {
    font-weight: bold;
    text-align: right;
  }

  &__label,
  &__value:not(:last-child) {
    margin-right: 1ch;
  }
}
</style>
