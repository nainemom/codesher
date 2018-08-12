<template>
  <router-view></router-view>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("setAccessTokenIfNeeded");
  }
};
</script>