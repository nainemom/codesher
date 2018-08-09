<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/functions";

div {
  padding: 15px;
}

@media (min-width: 768px) {
  div {
    width: 798px;
    margin: 0 auto;
  }
}
</style>

