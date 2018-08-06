<template>
  <div> {{$route.params.post}} {{salam}} </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      salam: ""
    };
  },
  created() {
    this.salam = process.env.posts[this.$route.params.post];
  }
};
</script>
