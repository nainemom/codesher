<template>
  <div> Salam Single {{$route.path}} <br> {{post}}</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      post: "salam"
    };
  },
  mounted() {},
  created() {
    if (window.__PRERENDER_INJECTED) {
      this.post = window.__PRERENDER_INJECTED.routes.find(
        post => post.path === this.$route.path
      ).data;
      document.dispatchEvent(new Event("render-done"));
    }
  }
};
</script>
