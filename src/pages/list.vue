<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent>
      <AppNewPost @sent="fetch"></AppNewPost>
      <AppPost v-for="post in posts" :key="'post' + post.id" :post="post"></AppPost>
      <AppPaginate :prev="hasPrev ? {query: {page: page - 1}} : false" :next="hasNext ? {query: {page: page + 1}} : false" :page="page"></AppPaginate>
    </AppContent>
  </div>
</template>

<script>
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
    async fetch(forceOne = false) {
      if (forceOne) {
        this.$router.push({
          query: Object.assign(this.$route.query, {
            page: 1
          })
        })
      }
      this.$loading.start();
      try {
        const response = await this.$store.dispatch("gitGetAll", {
          page: this.page,
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
