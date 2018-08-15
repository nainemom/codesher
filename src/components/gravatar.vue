<template>
  <router-link v-if="user" class="app-link user" :to="'/posts?user=' + user.login + '&page=1'" target="_self">
    <img :src="avatar" :alt="user.login"/>
    <span> {{user.login}} </span>
  </router-link>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    avatar() {
      let seperator = "?";
      if (this.user.avatar_url.indexOf("?") > -1) {
        seperator = "&";
      }
      return this.user.avatar_url + seperator + `s=18`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/functions";

.user {
  & > img {
    margin-left: 2px;
    border-radius: 14px;
    overflow: hidden;
    vertical-align: middle;
    // transition: transform 0.7s;
  }

  & > span {
    font-weight: bold;
  }
}
</style>

