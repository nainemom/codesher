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
      <router-link class="app-link btn app-link" :to="'/posts/'+post.number" target="_self">
        لینک مستقیم
      </router-link>
      <a class="twitter-share-button btn app-link" @click="tweet"> توئیت </a>
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
    position: sticky;
    background: rgba(contrast($background, 1, force-light), 0.3);
    top: 0;

    & > h2 {
      font-size: 2.5em;
    }
  }
  & > .body {
    padding: 20px 15px;
    font-size: 1.2em;
    line-height: 2em;
    text-align: justify;
  }
  & > .description {
    margin: 15px 0 0 0;
    padding: 5px 15px;
    height: auto;
    overflow: auto;
    font-size: 0.9em;
    border-top: solid 1px contrast($background, 2);

    & > .info {
      float: right;
    }
    & > .btn {
      float: left;
      cursor: pointer;
      margin-right: 5px;
    }

    & > .twitter-share-button {
      color: #1da1f2;
    }
  }
}
</style>

