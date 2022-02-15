<script setup lang="ts">
import Team from './Team.vue'
import teamList from '../components/team/teamList.vue'
import { computed, reactive } from "vue";
import {router} from "../router";

const actualTeam = reactive({
  id: 1
})

const isOpen = computed(() => {
  return screenStatus.isTable ? teamList : Team
})
function screenChange(index: number) {
  router.push(`/team/${index}`)
}
const screenStatus = reactive({ isTable: true})

</script>

<template>
  <component
      :teamId="actualTeam.id"
      @openTeam="screenChange"
      :is="isOpen"
  />
</template>
