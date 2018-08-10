<template>
  <h3 v-if="!!prev || !!next">
    <router-link v-if="!!prev" class="app-link" :to="prev" target="_self"> صفحه قبلی </router-link>
    <span> {{faPage}} </span>
    <router-link v-if="!!next" class="app-link" :to="next" target="_self"> صفحه بعدی </router-link>
  </h3>
</template>

<script>
import { faNumbers } from "../utils/index.js";

export default {
  props: {
    next: {
      default: false
    },
    prev: {
      default: false
    },
    page: {
      default: 1
    }
  },
  computed: {
    faPage() {
      return faNumbers(this.page);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/functions";

h3 {
  padding: 15px;
  background: contrast($background, 1, force-light);
  border: dashed 2px contrast($background, 2);
  margin: 15px 0;
  text-align: center;
  width: 100%;

  & > a {
    margin: 0 15px;
  }

  & > span {
    background: $background;
    color: $color;
    text-align: center;
    padding: 10px;
    border-radius: 100%;
    width: 40px;
    display: inline-block;
    height: 40px;
    vertical-align: middle;
    line-height: 20px;
  }
}
</style>

