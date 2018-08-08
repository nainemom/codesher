<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent>
      <AppNewPost></AppNewPost>
      <AppPost :post="post"></AppPost>
    </AppContent>
  </div>
</template>
<script>
import Octokit from "@octokit/rest";
import AppHeader from "../components/header.vue";
import AppContent from "../components/content.vue";
import AppPost from "../components/post.vue";
import AppNewPost from "../components/new-post.vue";

export default {
  components: {
    AppHeader,
    AppContent,
    AppPost,
    AppNewPost
  },
  data() {
    return {
      post: {}
    };
  },
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      const octokit = new Octokit();
      const result = await octokit.issues.get({
        owner: "codesher-blog",
        repo: "src",
        number: this.$route.params.post
        /*, milestone, state, assignee, creator, mentioned, labels, sort, direction, since, per_page, page*/
      });
      this.post = result.data;
    }
  },
  watch: {
    "$route.params"() {
      this.fetch();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
