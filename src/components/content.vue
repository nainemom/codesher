<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/functions";

@media (min-width: 768px) {
  div {
    width: 768px;
    margin: 0 auto;
  }
}
</style>

