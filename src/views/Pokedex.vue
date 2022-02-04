<script>
import card from '../components/list/tablePokemon.vue'
</script>

<template>
  <table class="table table-striped table-hover">
  <thead>
  <tr>
    <th scope="col">Id</th>
    <th scope="col">Pokemon</th>
    <th scope="col">Type</th>
    <th scope="col"></th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <th scope="row">1</th>
    <td>Pikachu</td>
    <td>Otto</td>
    <td class="text-center"><button class="btn btn-primary">See more details</button></td>
  </tr>
  <tr>
    <th scope="row">2</th>
    <td>Bulbassour</td>
    <td>Thornton</td>
    <td class="text-center"><button class="btn btn-primary">See more details</button></td>
  </tr>
  <tr>
    <th scope="row">3</th>
    <td colspan="2">Charmander</td>
    <td class="text-center"><button class="btn btn-primary">See more details</button></td>
  </tr>
  </tbody>
</table>
</template>
