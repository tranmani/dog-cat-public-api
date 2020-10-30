<template>
  <div class="chip" :class="size">
    <div class="chip-content">{{ name }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/assets/style.scss";

@Component
export default class Chip extends Vue {
  @Prop({ required: true, type: String }) name!: string;
  @Prop({ required: false, type: String, default: "chip-md" }) size!: string;
}
</script>

<style lang="scss" scoped>
.chip {
  background-color: rgba(206, 206, 206, 0.87);
  padding: 0 10px;
  border-radius: 12px;
  cursor: default;
  transition: 0.25s;
}

.chip-md {
  font-size: 12px;
  height: 24px;
}

.chip-lg {
  font-size: 16px;
  height: 34px;
}

.chip-content {
  align-items: center;
  display: inline-flex;
  height: 100%;
  max-width: 100%;
}
.chip:hover {
  background-color: rgba(168, 168, 168, 0.87);
  transition: 0.25s;
}
</style>
