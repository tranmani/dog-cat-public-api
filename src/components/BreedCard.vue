<template>
  <div class="card">
    <div class="img d-flex center" @click="seeDetail">
      <img :src="pic" class="img-content" />
      <div class="card-title">
        <div class="breed-title">{{ truncate(name, 23, "...") }}</div>
      </div>
    </div>
    <transition name="fade">
      <div class="d-flex row center h-pa-5" v-if="traits.length > 0">
        <Chip v-for="trait in traits.slice(0, 5)" :key="trait" :name="trait" class="h-ma-8" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BreedDetail from "@/components/BreedDetail.vue";
import Chip from "@/components/Chip.vue";
import "@/assets/style.scss";
import { Mutation } from "vuex-class";

@Component({
  components: {
    BreedDetail,
    Chip,
  },
})
export default class DogCard extends Vue {
  @Mutation("addCurrentBreed") addCurrentBreed!: any;

  @Prop({ required: true, type: String }) name!: string;
  @Prop({ required: false, default: "" }) bredFor!: string;
  @Prop({ required: false }) height!: string;
  @Prop({ required: true }) weight!: string;
  @Prop({ required: true }) id!: number;
  @Prop({ required: true }) lifeSpan!: string;
  @Prop({ required: false }) traits!: Array<string>;
  @Prop({ required: true }) pic!: string;
  @Prop({ required: true }) bg!: string;
  @Prop({ required: false }) description!: string;
  @Prop({ required: false }) wiki!: string;
  @Prop({ required: false }) origin!: string;

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

  /**
   * seeDetail Go to detail page of the clicked dog
   */
  public seeDetail() {
    this.addCurrentBreed({
      name: this.name,
      bredFor: this.bredFor,
      height: this.height,
      weight: this.weight,
      id: this.id,
      lifeSpan: this.lifeSpan,
      traits: this.traits,
      origin: this.origin,
      wiki: this.wiki,
      description: this.description,
      pic: this.pic,
      bg: this.bg,
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.$emit("clickedDog");
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  border-radius: 18px;
  background-color: #f3f3f3;
  overflow: hidden;
  transition: 0.25s;
}

.card:hover {
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.473), 0 6px 20px 0 rgba(0, 0, 0, 0.582);
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.breed-title {
  vertical-align: middle;
  font-size: 1.3em;
  font-weight: bold;
}

.row {
  margin: 0px;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

@media only screen and (max-width: 900px) {
  .breed-title {
    font-size: 1em;
  }

  .card {
    width: 200px;
  }

  .img {
    height: 170px;
    width: 200px;
  }
}

@media only screen and (max-width: 631px) {
  .breed-title {
    font-size: 1em;
  }

  .card {
    width: 250px;
  }

  .img {
    height: 200px;
    width: 250px;
  }
}
</style>
