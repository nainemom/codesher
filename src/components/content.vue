<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/functions";

.content {
  padding: 15px;
}

@media (min-width: 768px) {
  .content {
    width: 798px;
    margin: 0 auto;
  }
}
</style>

