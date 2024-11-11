<template>
  <component is="tag" class="user">
    <header class="user__wrapper">
      <div class="user__cover">
        <img
          v-if="!imgError"
          class="user__picture"
          :alt="data.name.first"
          :src="data.picture.large"
          :srcset="`${data.picture.medium} 600w`"
          @error="handleError"
        />

        <v-icon v-else class="user__icon" name="user" />
      </div>

      <div class="user__info">
        <h2 class="user__title">{{ normalizedData.title }}</h2>
        <span>{{ normalizedData.info }}</span>
      </div>
    </header>

    <ul class="user__data">
      <text-block tag="li" label="E-mail" :value="data.email" />
      <text-block tag="li" label="Phone" :value="data.phone" />
      <text-block tag="li" label="Address" :value="normalizedData.address" />
      <text-block tag="li" label="Timezone" :value="normalizedData.timezone" />
      <text-block tag="li" label="Registered" :value="normalizedData.registered" />
    </ul>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TextBlock from '@/components/TextBlock.vue'
import { User, UserGender } from '@/types/user'
import { getDate } from '@/utils/date.utils'
import VIcon from '@/components/VIcon'

const userGenderMap: Record<UserGender, string> = {
  [UserGender.Male]: 'Male',
  [UserGender.Female]: 'Female',
}

const props = withDefaults(
  defineProps<{
    data: User
    tag?: string
  }>(),
  {
    tag: 'section',
  }
)

const imgError = ref(false)

const normalizedData = computed(() => {
  return {
    title: `${props.data.name.title} ${props.data.name.first} ${props.data.name.last}`,
    info: [
      userGenderMap[props.data.gender],
      `${props.data.dob.age} years`,
      `born on ${getDate(props.data.dob.date)}`,
    ].join(', '),
    registered: getDate(props.data.registered.date),
    address: [
      props.data.location.country,
      props.data.location.state,
      props.data.location.city,
      `${props.data.location.street.name} ${props.data.location.street.number}`,
      props.data.location.postcode,
    ].join(', '),
    timezone: `${props.data.location.timezone.offset}. ${props.data.location.timezone.description}`,
  }
})

const handleError = () => {
  imgError.value = true
}
</script>

<style scoped lang="scss">
.user {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 0;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 2em;
  }

  &__cover {
    width: 128px;
    height: 128px;
    display: flex;
    flex-shrink: 0;
    flex-basis: 128px;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color: $color-bg;
    position: relative;
    overflow: hidden;
    margin-right: 2em;
  }

  &__picture {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  &__icon {
    width: 2em;
    height: 2em;
    color: $color-font-35;
  }
}
</style>
