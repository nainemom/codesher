<template>
  <div class="post">
    <h2>
      <router-link :to="'/posts/'+post.name" target="_self"> {{post.data.title}} </router-link>
    </h2>
    <h4>
      <app-gravatar :user="post.calculatedData.authors[authorIndex]" v-for="(author, authorIndex) in post.data.authors" :key="'author' + author"></app-gravatar>
    </h4>
    <div> {{post.calculatedData.pdate}} </div>
    <p v-html="post.data.content"></p>
    <!-- div> {{post}} </div -->
  </div>
</template>

<script>
import AppGravatar from "./gravatar.vue";

export default {
  components: {
    AppGravatar
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/functions";

.post {
  padding: 15px;
  background: contrast($background, 1, force-light);
  border: solid 1px contrast($background, 2);
  margin: 15px;
}
</style>

