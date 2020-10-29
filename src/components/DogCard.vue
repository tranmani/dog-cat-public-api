<template>
  <div class="card">
    <div class="img d-flex center">
      <img :src="dogPic" class="img-content" />
      <div class="card-title">
        <div class="title">{{ truncate(name, 20, "...") }}</div>
      </div>
    </div>
    <div class="d-flex row center h-pa-5">
      <Chip
        v-for="char in characteristics"
        :key="char"
        :name="char"
        class="h-ma-8"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DogDetail from "@/components/DogDetail.vue";
import Chip from "@/components/Chip.vue";
import "@/assets/style.scss";

@Component({
  components: {
    DogDetail,
    Chip,
  },
})
export default class DogCard extends Vue {
  @Prop({ required: true, type: String }) name!: string;
  @Prop({ required: false, default: "" }) bredFor!: string;
  @Prop({ required: true }) height!: string;
  @Prop({ required: true }) weight!: string;
  @Prop({ required: true }) id!: number;
  @Prop({ required: true }) lifeSpan!: string;
  @Prop({ required: false }) characteristics!: Array<string>;
  @Prop({ required: false, default: "" }) countryCode!: string;
  @Prop({ required: true }) dogPic!: string;

  // mounted() {
  // }

  /**
   * truncate Truncate dog's name if it is too long
   */
  public truncate(text: string, length: number, suffix: string): string {
    if (text.length > length) {
      return text.substring(0, length) + suffix;
    } else {
      return text;
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  border-radius: 18px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: #f3f3f3;
  overflow: hidden;
  transition: 0.25s;
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.473);
  transition: 0.25s;
}

.img {
  cursor: pointer;
  position: relative;
  height: 250px;
  width: 300px;
}

.img-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  height: 15%;
  bottom: 0px;
  width: 100%;
  text-align: center;
  vertical-align: middle;
}

title {
  font-size: 1em;
}

.row {
  margin: 0px;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.d-flex {
  display: flex;
}

.center {
  justify-content: center;
}

@media only screen and (max-width: 600px) {
  .navi-btn {
    bottom: 48px;
  }
}
</style>
