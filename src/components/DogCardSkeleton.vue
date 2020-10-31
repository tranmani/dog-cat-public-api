<template>
  <v-skeleton-loader class="rounded-lg card"
    :width="$store.getters.mobile == 'xs' || $store.getters.mobile == 'md' ? 200 : 300"
    type="card"
  ></v-skeleton-loader>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class DogCard extends Vue {}
</script>
