<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template >
  <div class="row p-5">
    <div class="col-4">
      <button type="button" class="btn text-light mt-2">Create Team</button>
    </div>
    <div class="col-4">
      <h2 class="text-center title">My Teams</h2>
    </div>
    <div class="col-4 text-center mt-2">
      <input>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.7em;
  font-weight: bolder;
}
button {
  background-color: #3DADFF;
}
</style>
