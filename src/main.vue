<template>
  <router-view></router-view>
</template>

<script>
import { deserialize } from "./utils/index.js";
import { login } from "./utils/github.js";

export default {
  async created() {
    const githubData = this.$cookie.get("github_token");
    if (githubData) {
      const parsed = deserialize(githubData);
      await login(parsed);
    }
  }
};
</script>