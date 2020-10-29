<template>
  <v-skeleton-loader
    class="mx-auto"
    width="300"
    type="card"
  ></v-skeleton-loader>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class DogCard extends Vue {}
</script>

<style lang="scss" scoped>
</style>
