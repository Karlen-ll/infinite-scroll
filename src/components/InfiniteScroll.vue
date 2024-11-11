<template>
  <div ref="wrapperRef" class="scroller" @scroll="handleScroll">
    <div ref="contentRef" class="scroller__content">
      <slot />
    </div>

    <button class="scroller__button" @click="handleClick" aria-label="Up">
      <v-icon name="top" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { throttle } from 'throttle-debounce'
import VIcon from '@/components/VIcon'

const THROTTLE_DELAY = 500

const props = withDefaults(
  defineProps<{
    disabled: boolean
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'scrolled'): void
}>()

const wrapperRef = ref<HTMLDivElement | null>(null)
const contentRef = ref<HTMLDivElement | null>(null)

const handleScroll = throttle(THROTTLE_DELAY, () => {
  if (!wrapperRef.value || !contentRef.value || props.disabled) {
    return
  }

  if (wrapperRef.value.scrollTop + wrapperRef.value.offsetHeight >= contentRef.value.offsetHeight) {
    emit('scrolled')
  }
})

const handleClick = () => {
  if (!wrapperRef.value) {
    return
  }

  wrapperRef.value.scrollTop = 0
}
</script>

<style scoped lang="scss">
.scroller {
  overflow-x: hidden;

  &__button {
    width: 40px;
    height: 40px;
    right: 3rem;
    bottom: 4rem;
    position: fixed;
    border: none;
    background-color: $color-bg-accent;
    border-radius: 50%;
    color: $color-font;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
  }
}
</style>
