<template>
  <router-link class="app-link user" :to="'/authors/' + user.email" target="_self">
    <img :src="user.image + '?s=28'"/>
    <span> {{user.name}} </span>
  </router-link>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/functions";

.user {
  display: inline-block;
  & > img {
    border-radius: 14px;
    overflow: hidden;
    vertical-align: middle;
  }
  & > span {
    padding: 4px;
    font-weight: bold;
  }
}
</style>

