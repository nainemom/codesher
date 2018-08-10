<template>
  <header>
    <div class="title">
      <h2><router-link class="app-link" to="/posts" target="_self"> {{title}} </router-link></h2>
      <p>{{description}}</p>
    </div>
  </header>
</template>

<script>
import { getConfig } from "../utils/index.js";

export default {
  data() {
    return {
      title: getConfig().title,
      description: getConfig().description
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/functions";

header {
  color: $color;
  text-align: center;

  & > .title {
    padding: 25px 15px;
    display: block;
    height: auto;
    overflow: auto;

    & > h2 {
      font-size: 3em;
      font-weight: bold;
    }

    @media (min-width: 768px) {
      width: 768px;
      margin: 0 auto;
    }
  }

  & > .links {
    padding: 15px;
    background: contrast($background, 1, force-light);
    border-top: solid 1px contrast($background, 2);
    border-bottom: solid 1px contrast($background, 2);
  }
}
</style>

