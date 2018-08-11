<template>
  <header>
    <div class="title">
      <img class="logo" src="../assets/logo.svg"/>
      <div class="text">
        <h2><router-link class="app-link" to="/posts" target="_self"> {{title}} </router-link></h2>
        <p>{{description}}</p>
      </div>
    </div>
    <div class="buttons" v-if="false">
      <a class="button" :href="githubLoginUrl" target="_self">ورود</a>
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
  },
  computed: {
    githubLoginUrl() {
      const url = `https://github.com/login/oauth/authorize?client_id=${
        getConfig().clientId
      }`;
      return url;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/functions";

header {
  color: $color;
  height: auto;
  overflow: auto;
  padding: 25px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > .title {
    padding: 0 15px;
    height: auto;
    overflow: auto;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > .text {
      line-height: 1.5;

      & > h2 {
        font-size: 3em;
        font-weight: bold;
      }
    }

    & > img.logo {
      width: 120px;
    }
  }

  & > .buttons {
    padding: 0 15px;

    & > .button {
      font-size: 1.4em;
      padding: 0 3px;
      border-bottom: dashed 2px contrast($background, 2);
      cursor: pointer;
    }
  }

  @media (min-width: 768px) {
    width: 768px;
    margin: 0 auto;
  }
}
</style>

