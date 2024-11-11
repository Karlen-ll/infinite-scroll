<template>
  <div class="header">
    <span class="header__logo">
      <logo-svg class="header__icon" width="3rem" height="1.5rem" aria-hidden="true" />

      {{ title }}
    </span>

    <div>
      <span class="header__method" title="Fetch method">{{ method }}</span>
      <input
        v-for="item in methods"
        :key="item"
        type="radio"
        name="method"
        :value="item"
        @change="handleChangeMethod"
        :checked="item === method"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoSvg from '@/assets/logo.svg'
import useMethod, { Method } from '@/hooks/method'

const { method, changeMethod } = useMethod()
const methods = Object.values(Method)

defineProps<{
  title: string
}>()

const handleChangeMethod = (event: Event) => {
  if (!event.target) {
    return
  }

  changeMethod((event.target as HTMLInputElement).value as Method)
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $color-bg-accent;
  padding: 0.74em 1.5em 1em;

  &__logo {
    display: flex;
    align-items: center;
    font-size: 1.15rem;
    line-height: 1;
  }

  &__icon {
    margin-right: 0.35em;
  }

  &__method {
    margin-right: 1em;
  }
}
</style>
