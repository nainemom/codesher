<template>
  <div> <h2>Single</h2> <p> {{post}} </p></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      post: "salam"
    };
  },
  created() {
    if (window.__PRERENDER_INJECTED) {
      this.post = window.__PRERENDER_INJECTED.posts.find(
        post => post.name === this.$route.params.post
      ).data;
      document.dispatchEvent(new Event("render-done"));
    }
  }
};
</script>
