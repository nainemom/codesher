<template>
  <div class="comment" v-if="comment">
    <div class="description">
      <small>
        <app-gravatar :user="comment.user"></app-gravatar> در تاریخ {{date}} گفت:
      </small>
    </div>
    <p class="body" v-html="body"></p>
  </div>
</template>

<script>
import AppGravatar from "./gravatar.vue";
import { markdown } from "markdown";

export default {
  components: {
    AppGravatar
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    body() {
      return markdown
        .toHTML(this.comment.body || "")
        .toString()
        .replace(/\n/g, "<br />");
    },
    date() {
      return ''
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/functions";

.comment {
  margin: 15px 0;
  width: 100%;

  & > .body {
    padding: 15px;
    font-size: 1em;
    line-height: 2em;
  }
  & > .description {
    padding: 0 0 0 0;
  }
}
</style>

