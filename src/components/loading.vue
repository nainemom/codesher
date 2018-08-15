<template>
<div class="loading-page" v-if="loading">
  <div class="lds-ring">
    <div></div>
    <div></div>
  </div>
</div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      if (!this.$parent) {
        this.$mount();
        document.body.appendChild(this.$el);
      }
      window.scrollTo(0, 0)
      this.loading = true;
    },
    finish() {
      if (!this.$parent) {
        this.$mount();
        document.body.appendChild(this.$el);
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.loading-page {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.lds-ring {
  display: inline-block;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 64px;
  height: 64px;
}
.zlds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>