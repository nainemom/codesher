<template>
  <router-view></router-view>
</template>

<script>
import { login } from "./utils/github.js";

export default {
  created() {
    console.log(this.$cookie.get("github_token"));
  }
};
</script>