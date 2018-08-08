<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent>
      <AppNewPost></AppNewPost>
      <AppPost v-for="post in posts" :key="'post' + post.id" :post="post"></AppPost>
    </AppContent>
    <div>
      <router-link v-if="hasPrev" :to="{query: {page: page - 1}}" target="_self"> Prev Page </router-link>
      <router-link v-if="hasNext" :to="{query: {page: page + 1}}" target="_self"> Next Page </router-link>
    </div>
  </div>
</template>
<script>
import { getConfig } from "../utils/index.js";
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
      posts: [],
      hasNext: false,
      hasPrev: false
    };
  },
  computed: {
    page() {
      return this.$route.query.page ? parseInt(this.$route.query.page) : 1;
    }
  },
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      const octokit = new Octokit();
      const result = await octokit.issues.getForRepo({
        owner: "codesher-blog",
        repo: "src",
        labels: "codesher",
        per_page: getConfig().perPage,
        page: this.page
        /*, milestone, state, assignee, creator, mentioned, labels, sort, direction, since, per_page, page*/
      });
      this.hasNext = octokit.hasNextPage(result);
      this.hasPrev = this.page > 1;
      this.posts = result.data;
    }
  },
  watch: {
    "$route.query"() {
      this.fetch();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
