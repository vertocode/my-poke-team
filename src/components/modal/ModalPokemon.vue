<template>
  <div class="overlay row">
    <div class="bodyMoreDetails">
      <div class="d-flex row header">
        <div class="col-6 mt-3">
          <img
              src="https://cdn.pixabay.com/photo/2016/09/01/09/31/pokemon-1635610_960_720.png"
              alt="Card image cap"
          >
        </div>
        <div class="text-end col-6 mt-2">
          <button type="button" class="btn-close p-4" aria-label="Close" @click="$emit('closeModal')"></button>
        </div>
      </div>
      <div class="text-center slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.bodyMoreDetails {
  border: dashed 5px #ED4040;
  border-radius: 25px;
  margin: auto 0;
  overflow: auto;
  padding: 20px 80px 150px;
  height: 70vh;
  width: 55vw;
  background-color: whitesmoke;
}
img {
  height: 70px;
  margin: auto;
}
</style>
