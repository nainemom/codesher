<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent>
      <AppPost v-if="post.user" :post="post" :comments="comments"></AppPost>
      <AppComment v-for="comment in comments" :key="'comment' + comment.id" :comment="comment"></AppComment>
    </AppContent>
  </div>
</template>
<script>
import AppHeader from "../components/header.vue";
import AppContent from "../components/content.vue";
import AppPost from "../components/post.vue";
import AppComment from "../components/comment.vue";

export default {
  components: {
    AppHeader,
    AppContent,
    AppPost,
    AppComment
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
        const response = await this.$store.dispatch("gitGet", {
          number: this.$route.params.post
        });
        this.post = response;
        this.$loading.finish();
      } catch (e) {
        this.$loading.finish();
      }
    },
    async fetchComments() {
      return;
      this.$loading.start();
      try {
        const response = await this.$store.dispatch("gitGetComments", {
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
