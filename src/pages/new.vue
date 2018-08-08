<template>
  <div> <h2>Post Creator App</h2></div>
</template>

<script>
export default {
  components: {},
  data() {},
  created() {
    const prerender = require("../../utils/prerender.js");
    if (prerender.hasAccess()) {
      prerender.done();
    }
  }
};
</script>
