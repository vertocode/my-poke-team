<script setup lang="ts">
import Team from '../components/team/Team.vue'
import teamList from '../components/team/teamList.vue'
import { computed, reactive } from "vue";

const actualTeam = reactive({
  id: 1
})

const isOpen = computed(() => {
  return screenStatus.isTable ? teamList : Team
})
function screenChange(index: number) {
  screenStatus.isTable = !screenStatus.isTable
  actualTeam.id = index
}
const screenStatus = reactive({ isTable: true})

</script>

<template>
  <component
      :teamId="actualTeam.id"
      @back="screenChange"
      @openTeam="screenChange"
      :is="isOpen"
  />
</template>
