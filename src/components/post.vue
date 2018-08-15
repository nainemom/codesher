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
        <app-gravatar :user="post.user"></app-gravatar>
        <span class="seperator"></span>
        <span class="date"> {{date}} </span>
        <span class="seperator"></span>
        <span class="hearts"> {{hearts}} </span>
      </span>
      <span class="action">
        <button class="btn app-link" @click="addHeart" :disabled="!$store.state.accessToken"> خوشم اومد! </button>
        <span class="seperator"></span>
        <a class="twitter-share-button btn app-link" @click="tweet"> توئیت </a>
      </span>
    </div>
  </div>
</template>

<script>
import AppGravatar from "./gravatar.vue";
import { markdown } from "markdown";
import timeago from "timeago.js";
import timeagoFa from 'timeago.js/locales/fa.js'

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
  data() {
    return {
      localHearts: 0
    }
  },
  computed: {
    body() {
      return markdown
        .toHTML(this.post.body || "")
        .toString()
        .replace(/\n/g, "<br />");
    },
    hearts () {
      const cnt = ((this.post.reactions || {}).heart || 0) + this.localHearts
      if (cnt === 0) {
        return 'هیشکی دوستش نداشت'
      } else if (cnt === 1) {
        return '1 نفر خوشش اومد'
      }
      return `${cnt} نفر دوستش داشتن`
    },
    shareContent() {
      let content = this.post.body || "";
      if (content.length > 100) {
        content = content.substr(0, 97) + "...";
      }
      const link = `${document.location.protocol}//${
        document.location.host
      }/%23/posts/${this.post.number}`;
      return `text=${encodeURI(content)}&url=${link}&hashtags=${encodeURI(
        "کدشعر"
      )}`;
    },
    date() {
      timeago.register('fa', timeagoFa);
      return timeago(null, 'fa').format(this.post.created_at || new Date())
    }
  },
  methods: {
    tweet() {
      const url = "https://twitter.com/intent/tweet?" + this.shareContent;
      window.open(url, "_blank", "width=480,height=290");
    },
    async addHeart() {
      try {
        await this.$store.dispatch('gitAddHeart', {
          number: this.post.number
        })
        this.localHearts++
      } catch (e) {
        // nothing
      }
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
    font-size: 1em;
    border-top: solid 1px contrast($background, 2);

    & > .info {
      float: right;

      & > * {
        display: inline-block;
      }
    }

    & > .action {
      float: left;

      & > * {
        display: inline-block;
      }

      & > .btn {
        cursor: pointer;
      }

      & > .twitter-share-button {
        color: #1da1f2;
      }
    }

    & > .info,
    & > .action, {
      & > .seperator {
        height: 5px;
        margin: 0 7px;
        width: 5px;
        background: contrast($background, 2);
        border-radius: 5px;
      }
    }
  }
}
</style>

