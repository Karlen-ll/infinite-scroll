<template>
  <template v-for="user in data" :key="user.id.value">
    <v-card class="user-item">
      <user-block :data="user" />
    </v-card>
  </template>
</template>

<script setup lang="ts">
import UserBlock from '@/components/UserBlock.vue'
import VCard from '@/components/VCard.vue'
import { User } from '@/types/user'

defineProps<{
  data: User[]
}>()
</script>

<style scoped lang="scss">
.user-item {
  & + & {
    margin-top: 3em;
  }
}
</style>
