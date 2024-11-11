<template>
  <div class="page">
    <v-header title="Infinite Scroll" />

    <div class="page__container">
      <infinite-scroll class="page__scroller" :disabled="!!error" @scrolled="handleLoad">
        <user-list :data="users" />

        <div v-if="loading" class="page__loading">
          <svg-loading class="page__loader" width="2em" height="2em" />
        </div>

        <div v-if="error" class="page__error">{{ error }}</div>
      </infinite-scroll>
    </div>

    <v-footer :count="users.length" :page="page" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchUser, getErrorUser, getMockUser, UserRequest, UserRequestError } from '@/api/user'
import useMethod, { Method } from '@/hooks/method'
import VHeader from '@/components/VHeader.vue'
import VFooter from '@/components/VFooter.vue'
import UserList from '@/components/UserList.vue'
import InfiniteScroll from '@/components/InfiniteScroll.vue'
import SvgLoading from '@/assets/loading.svg'
import { User } from '@/types/user'

const { method } = useMethod()

const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const page = ref<number>(0)

const methodMap = {
  [Method.Fetch]: fetchUser,
  [Method.Mock]: getMockUser,
  [Method.Error]: getErrorUser,
}

const hasError = (value: UserRequest | UserRequestError): value is UserRequestError => Object.hasOwn(value, 'error')

const loadMore = async () => {
  if (loading.value) {
    // Выходим, если процесс уже запущен
    return
  }

  try {
    loading.value = true
    const response = await methodMap[method.value]({ page: ++page.value })

    if (!response || hasError(response)) {
      error.value = response?.error ?? '⚠️ Error request!'
      return
    }

    users.value.push(...response.results)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMore()
})

const handleLoad = () => {
  loadMore()
}
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__container {
    flex: 1 0;
    padding: 2em;
    overflow: hidden;
  }

  &__scroller {
    height: 100%;

    :deep(.scroller__content) {
      min-height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding-bottom: 2em;
      box-sizing: border-box;
    }
  }

  &__loader {
    color: $color-brand;
    margin-right: 1em;
  }

  &__error,
  &__loading {
    text-align: center;
    margin: 1em 0 -2em;
  }

  &__error {
    color: $color-danger;
  }
}
</style>
