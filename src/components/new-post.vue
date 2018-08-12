<template>
  <form class="new-post" ref="form" @submit.prevent="sendPost" tabindex="0">
    <input v-model="title" placeholder="عنوان رو بنویس" required/>
    <textarea v-model="body" placeholder="متن کدشعرت رو بنویس. مارک‌داون هم قبوله." required></textarea>
    <div class="buttons">
      <button class="app-link" type="submit" :disabled="sending || !$store.state.accessToken">بفرست!</button>
    </div>
  </form>
</template>

<script>
import { faNumbers } from "../utils/index.js";
import { parse } from "path";

export default {
  data() {
    return {
      title: "",
      body: "",
      sending: false
    };
  },
  methods: {
    async sendPost() {
      this.sending = true;
      try {
        const result = await this.$store.dispatch("gitCreate", {
          title: this.title,
          body: this.body
        });
        this.title = this.body = "";
        this.sending = false;
        alert(
          "پست شما با موفقیت ارسال شد و ان‌شاالله که به زودی تأیید و نمایش داده خواهد شد."
        );
      } catch (e) {
        this.sending = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/functions";

.new-post {
  padding: 15px 15px 0 15px;
  background: contrast($background, 1, force-light);
  border: dashed 2px contrast($background, 2);
  margin: 15px 0;
  text-align: center;
  width: 100%;

  & > input,
  & > textarea {
    width: 100%;
    display: block;
    font-size: 1em;
    line-height: 1.5em;
    padding: 7px;
    background: $color;
    color: yiq($color);
    border: solid 1px contrast($background, 2, force-dark);
    margin-bottom: 7px;
  }

  & > textarea {
    resize: none;
  }

  &:focus-within {
    & > textarea {
      height: 6.7em;
    }
  }

  & > input {
    font-family: "Lalezar";
  }

  & > .buttons {
    font-size: 1.4em;
    padding: 7px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & > * {
      border: none;
      background: transparent;
      font-size: 1em;
      padding: 0;

      &:disabled {
        color: gray;
        cursor: not-allowed;
      }
    }
  }
}
</style>

