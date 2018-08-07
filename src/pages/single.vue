<template>
  <div> <h2>Single</h2> <p> {{post}} </p></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      post: {}
    };
  },
  created() {
    const prerender = require("../../utils/prerender.js");
    if (prerender.hasAccess()) {
      this.post = prerender.getPostByName(this.$route.params.post);
      prerender.done();
    }
  }
};
</script>
