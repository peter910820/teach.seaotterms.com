<script setup lang="ts">
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // highlight-styles

const apiUrl = useRuntimeConfig().public.API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const M: any;

const route = useRoute();

interface Response {
  msg: string;
  data: Article[];
}

interface Article {
  id: number;
  title: string;
  image: string;
  seriesId: number;
  createdAt: string;
  content: string;
  createdName: string;
  updatedAt: string;
  updatedName: string;
}

const { data, error } = await useFetch<Response>(apiUrl + `/api/article?id=${route.params.id}`, {
  method: "GET",
  lazy: false,
  server: true,
});

if (error.value) {
  console.error("API 發生錯誤：", error.value);
}

onMounted(() => {
  nextTick(() => {
    document.addEventListener("DOMContentLoaded", function () {
      const elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, {});
    });
  });
});

const renderMarkdown = (content: string) => {
  const md = MarkdownIt({
    highlight: (str: string, lang: string): string => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre><code class="hljs">' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            "</code></pre>"
          );
        } catch (error) {
          console.log(error);
        }
      }

      return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>";
    },
  });
  return md.render(content);
};
const renderedMarkdown = computed(() => renderMarkdown(data?.value?.data[0].content ?? ""));
</script>

<template>
  <div class="row center-align page-block">
    <h1>{{ data?.data[0].title }}</h1>
    <div class="col s12">
      <div class="row">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="markdown-preview col s12 left-align" v-html="renderedMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-block {
  padding: 30px;
}
</style>
