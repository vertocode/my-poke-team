<script lang="ts" setup>
import { useStore } from "vuex";
import { reactive } from "vue";

const store = reactive(useStore())

const deleteTeam = (teamId: number) => {
  store.commit('deleteTeam', teamId)
}

</script>

<template>
  <table class="table table-striped text-center" v-if="store.state.teams.length > 0">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Team Name</th>
      <th scope="col">Number of Pokemons</th>
      <th scope="col">
        <router-link to="/createteam"><button class="btn btn-outline-primary">Create Team</button></router-link>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(team, index) in store.state.teams">
      <th scope="row">{{ team.id }}</th>
      <td>{{ team.name }}</td>
      <td>{{ team.pokemons.length }}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-primary m-2" @click="$emit('openTeam', index)">Edit Team</button>
        <button class="btn btn-sm btn-danger" @click="deleteTeam(index)">Delete Team</button>
      </td>
    </tr>
    </tbody>
  </table>
  <div v-else class="text-center mt-5">
    <h1>No teams found</h1>
    <router-link to="/createteam"><button class="btn btn-outline-primary">Create Team</button></router-link>
  </div>
</template>

