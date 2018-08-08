<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent>
      <h1> چجوری کدشعر بگم؟ </h1>
      <p>
        باید با پروفایل گیت‌هابت بری توی صفحه <a class="app-link hover" :href="repoUrl" target="_blank">ریپازیتوری این وبلاگ</a> و توی قسمت <b>ایشوها</b> یا همون <b>Issues</b> کدشعری که می‌خوای رو بنویسی! بدون هیچ متن اضافه، درست همونجوری که دوست داری منتشر بشه.
        بچه‌های ما اون پشت نوتیفیکیشن می‌گیرن و تآییدش می‌کنن و فارت، کدشعر شما اتوماتیک توی این وبلاگ منتشر می‌شه.
      </p>
    </AppContent>
  </div>
</template>

<script>
import { getConfig } from "../utils/index.js";
import AppHeader from "../components/header.vue";
import AppContent from "../components/content.vue";

export default {
  components: {
    AppHeader,
    AppContent
  },
  data() {
    return {
      repoUrl: getConfig().repoUrl
    };
  }
};
</script>
