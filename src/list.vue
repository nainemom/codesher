<template>
  <div>
    <h2>List</h2>
    <div v-for="post in posts">
      <h3>
        <router-link :to="'/posts/'+post.name"> {{post.data.title}} </router-link>
      </h3>
      <p> {{post.data.content}} </p>
    </div>
    <div>
      <router-link v-if="prevPage" :to="prevPage"> Prev Page </router-link>
      <router-link v-if="nextPage" :to="nextPage"> Next Page </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
      page: 1,
      nextPage: null,
      prevPage: null
    };
  },
  created() {
    if (window.__PRERENDER_INJECTED) {
      const perPage = window.__PRERENDER_INJECTED.config.perPage;
      this.page = this.$route.params.page
        ? parseInt(this.$route.params.page)
        : 1;
      const startIndex = (this.page - 1) * perPage;
      const lastIndex = startIndex + perPage - 1;

      let posts = window.__PRERENDER_INJECTED.posts;
      Object.keys(this.$route.params)
        .filter(param => param !== "page")
        .forEach(param => {
          posts = posts.filter(
            post =>
              typeof post.data[param] === "object" &&
              post.data[param].indexOf(this.$route.params[param]) > -1
          );
        });
      this.posts = posts.filter(
        (post, index) => index >= startIndex && index <= lastIndex
      );

      if (lastIndex < posts.length - 1) {
        this.nextPage = this.$route.path;
        const newPage = this.page + 1;
        if (this.$route.path.indexOf("page/") > -1) {
          this.nextPage = this.$route.path.replace(
            `page/${this.page}`,
            `page/${newPage}`
          );
        } else {
          this.nextPage = `${this.$route.path}/page/${newPage}`;
        }
      }
      if (this.page > 1) {
        const newPage = this.page - 1;
        if (newPage === 1) {
          this.prevPage = this.$route.path.replace(`/page/${this.page}`, "");
        } else {
          this.prevPage = this.$route.path.replace(
            `/page/${this.page}`,
            `/page/${newPage}`
          );
        }
      }
      document.dispatchEvent(new Event("render-done"));
    }
  }
};
</script>
