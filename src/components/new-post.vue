<template>
  <div>
    <h2>
      <router-link class="app-link" to="/new" target="_self"> منم می‌خوام کدشعر بگم! </router-link>
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/functions";

div {
  padding: 15px;
  background: contrast($background, 1, force-light);
  border: dashed 2px contrast($background, 2);
  margin: 15px;
  position: sticky;
  top: 15px;
  text-align: center;
}
</style>

