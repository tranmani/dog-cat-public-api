<template>
  <DogDetail />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DogDetail from "@/components/DogDetail.vue";
// import Dog from "../remote/Dog";
import "@/assets/style.scss";

@Component({
  components: {
    DogDetail,
  },
})
export default class Home extends Vue {
  // mounted() {}

  /**
   * bgGrad Return random background css
   */
  get bgGrad(): string {
    const random = Math.floor(Math.random() * 8) + 1;
    switch (random) {
      case 1:
        return "bg-grad-1";
      case 2:
        return "bg-grad-2";
      case 3:
        return "bg-grad-3";
      case 4:
        return "bg-grad-4";
      case 5:
        return "bg-grad-5";
      case 6:
        return "bg-grad-6";
      case 7:
        return "bg-grad-7";
      case 8:
        return "bg-grad-8";
    }
    return "bg-grad-1";
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .navi-btn {
    bottom: 48px;
  }
}
</style>
