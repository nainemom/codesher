<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent>
      <AppNewPost></AppNewPost>
      <AppPost v-if="post.user" :post="post" :comments="comments"></AppPost>
      <AppComment v-for="comment in comments" :key="'comment' + comment.id" :comment="comment"></AppComment>
    </AppContent>
  </div>
</template>
<script>
import { get, getComments } from "../utils/github.js";
import AppHeader from "../components/header.vue";
import AppContent from "../components/content.vue";
import AppPost from "../components/post.vue";
import AppComment from "../components/comment.vue";
import AppNewPost from "../components/new-post.vue";

export default {
  components: {
    AppHeader,
    AppContent,
    AppPost,
    AppComment,
    AppNewPost
  },
  data() {
    return {
      post: {},
      comments: []
    };
  },
  async created() {
    await this.fetch();
    await this.fetchComments();
  },
  methods: {
    async fetch() {
      this.$loading.start();
      try {
        const response = await get({
          number: this.$route.params.post
        });
        this.post = response;
        this.$loading.finish();
      } catch (e) {
        this.$loading.finish();
      }
    },
    async fetchComments() {
      this.$loading.start();
      try {
        const response = await getComments({
          number: this.$route.params.post
        });
        this.comments = response.result;
        this.$loading.finish();
      } catch (e) {
        this.$loading.finish();
      }
    }
  },
  watch: {
    "$route.params"() {
      this.fetch();
      this.fetchComments();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
