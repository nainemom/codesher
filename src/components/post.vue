<template>
  <div class="post" v-if="post">
    <div class="title">
      <h2>
        <router-link class="app-link" :to="'/posts/'+post.number" target="_self"> {{post.title}} </router-link>
      </h2>
    </div>
    <p class="body" v-html="body"></p>
    <div class="description">
      <span class="info">
        سروده شده توسط <app-gravatar :user="post.user"></app-gravatar> در تاریخ {{date}}
      </span>
      <span class="twitter-share-button" @click="tweet"> توئیت </span>
    </div>
  </div>
</template>

<script>
import AppGravatar from "./gravatar.vue";
import { markdown } from "markdown";
import IDate from "idate";

export default {
  components: {
    AppGravatar
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    body() {
      return markdown
        .toHTML(this.post.body || "")
        .toString()
        .replace(/\n/g, "<br />");
    },
    shareContent() {
      let content = this.post.body || "";
      if (content.length > 100) {
        content = content.substr(0, 97) + "...";
      }
      const link = `http://${document.location.host}/%23/posts/${
        this.post.number
      }`;
      return `text=${encodeURI(content)}&url=${link}&hashtags=${encodeURI(
        "کدشعر"
      )}`;
    },
    date() {
      const date = new IDate(this.post.created_at || new Date());
      return date.toString(true);
    }
  },
  methods: {
    tweet() {
      const url = "https://twitter.com/intent/tweet?" + this.shareContent;
      window.open(url, "_blank", "width=480,height=290");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/functions";

.post {
  background: contrast($background, 1, force-light);
  border: solid 1px contrast($background, 2);
  margin: 15px 0;
  width: 100%;

  & > .title {
    line-height: 3em;
    padding: 15px;

    & > h2 {
      font-size: 2.5em;
    }
  }
  & > .body {
    padding: 20px 15px;
    font-size: 1.2em;
    line-height: 2em;
  }
  & > .description {
    padding: 15px 0 0 0;
    height: auto;
    overflow: auto;
    font-size: 0.9em;

    & > .info {
      float: right;
    }

    & > .twitter-share-button {
      color: #1da1f2;
      float: left;
      cursor: pointer;
    }
  }
}
</style>

