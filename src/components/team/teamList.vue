<script lang="ts" setup>
import { useStore } from "vuex";
import { reactive } from "vue";
import { router } from "../../router";

const store = reactive(useStore());

const deleteTeam = (teamId: number) => {
  store.commit("deleteTeam", teamId);
};

const openTeam = (teamId: number) => {
  store.commit("setTeamOpen", teamId);
  router.push(`/team/${teamId}`);
};
</script>

<template>
  <div v-if="store.state.teams.length > 0" class="table-main">
    <table class="table table-striped text-center mt-1">
      <thead class="bg-danger text-light">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Team Name</th>
          <th scope="col">Number of Pokemons</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(team, index) in store.state.teams">
          <th scope="row">{{ index }}</th>
          <td>{{ team.name }}</td>
          <td>{{ team.pokemons.length }}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-primary m-2" @click="openTeam(index)">
              Edit Team
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteTeam(index)">
              Delete Team
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-center mt-5">
    <h1>No teams found</h1>
    <router-link to="/createteam"
      ><button class="btn btn-outline-primary">Create Team</button></router-link
    >
  </div>
</template>

<style scoped>
tr:hover {
  background-color: rgba(192, 56, 56, 0.22);
}
</style>
