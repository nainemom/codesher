<template>
  <div> {{post}} </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      post: null
    };
  },
  async mounted() {
    console.log(this.$route)
    this.post = this.$route
    this.$nextTick(() => {
      document.dispatchEvent(new Event('render-done'))
    })
  }
}
</script>
