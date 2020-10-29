<template>
  <div>
    <p>hasdhasjkd</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DogCard from "@/components/DogCard.vue";

@Component({
  components: {
    DogCard,
  },
})
export default class Home extends Vue {}
</script>
