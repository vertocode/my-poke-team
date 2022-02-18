<script lang="ts">
import SubHeader from "./SubHeader.vue";
export default {
  name: "HeaderApp",
  components: {
    SubHeader,
  },
};
</script>

<template>
  <div class="p-3 text-center bg-danger header">
    <h2 class="mt-2 display-5 text-light">My Poke Team</h2>
  </div>
  <sub-header />
</template>

<style>
.header {
  height: max-content;
}
.header h2 {
  font-size: 2.5em;
  font-family: KacstOne, serif;
  font-weight: bolder;
}
</style>
