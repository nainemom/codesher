<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent>
      <AppNewPost></AppNewPost>
      <AppPost v-for="post in posts" :key="'post' + post.id" :post="post"></AppPost>
      <AppPaginate :prev="hasPrev ? {query: {page: page - 1}} : false" :next="hasNext ? {query: {page: page + 1}} : false" :page="page"></AppPaginate>
    </AppContent>
  </div>
</template>

<script>
import { getAll } from "../utils/github.js";
import AppHeader from "../components/header.vue";
import AppContent from "../components/content.vue";
import AppPost from "../components/post.vue";
import AppNewPost from "../components/new-post.vue";
import AppPaginate from "../components/paginate.vue";

export default {
  components: {
    AppHeader,
    AppContent,
    AppPost,
    AppNewPost,
    AppPaginate
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
      this.$loading.start();
      try {
        const response = await getAll({
          page: this.$route.query.page || undefined,
          user: this.$route.query.user || undefined
        });
        this.hasNext = response.hasNext;
        this.hasPrev = response.hasPrev;
        this.posts = response.result;
        this.$loading.finish();
      } catch (e) {
        this.hasNext = false;
        this.hasPrev = false;
        this.$loading.finish();
      }
    }
  },
  watch: {
    "$route.query"() {
      this.fetch();
    }
  }
};
</script>
