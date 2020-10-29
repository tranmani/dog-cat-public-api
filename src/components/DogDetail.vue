<template>
  <v-card hover class="card rounded-lg">
    <v-img
      :aspect-ratio="1 / 1"
      class="white--text align-end"
      height="250px"
      :src="dogPic"
      lazy-src="https://picsum.photos/id/11/100/60"
    >
      <!-- <v-card-title class="card-title">
        {{ name }}
      </v-card-title> -->
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-chip small v-for="char in characteristics" :key="char" class="ma-2">
      {{ char }}
    </v-chip>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/assets/style.scss";

@Component
export default class DogDetail extends Vue {
  @Prop({ required: true, type: String }) name!: string;
  @Prop({ required: false, default: "" }) bredFor!: string;
  @Prop({ required: true }) height!: string;
  @Prop({ required: true }) weight!: string;
  @Prop({ required: true }) id!: number;
  @Prop({ required: true }) lifeSpan!: string;
  @Prop({ required: true }) characteristics!: Array<string>;
  @Prop({ required: false, default: "" }) countryCode!: string;
  @Prop({ required: true }) dogPic!: string;
}
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
}

.card-title {
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
}

@media only screen and (max-width: 600px) {
  .navi-btn {
    bottom: 48px;
  }
}
</style>
