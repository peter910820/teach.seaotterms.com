<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // highlight-styles

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const M: any;

const route = useRoute();

interface FormData {
  title: string;
  image: string;
  seriesId: number;
  tags: string[];
  content: string;
}
const form = ref<FormData>({
  title: "",
  image: "",
  seriesId: Number(route.query["series-id"]),
  tags: [],
  content: "",
});

const mainVisible = ref<boolean>(true);
const successVisible = ref<boolean>(false);
const errorVisible = ref<boolean>(false);
const errorMsg = ref<string>("");

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
const renderedMarkdown = computed(() => renderMarkdown(form.value.content));

const switchBlock = async () => {
  mainVisible.value = true;
  errorVisible.value = false;
};

const submit = async () => {
  const apiUrl = useRuntimeConfig().public.API_URL;
  if (!form.value.image.startsWith("https://")) {
    alert("圖片連結請使用https");
    return;
  }

  // 清理materialize-textarea自適應化高度的多餘組件
  const hiddenDivs = document.querySelectorAll(".hiddendiv.common");
  hiddenDivs.forEach((div) => div.remove());

  try {
    mainVisible.value = false;
    await axios.post(apiUrl + "/article", form.value);
    successVisible.value = true;
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    if (!status && !msg) {
      errorMsg.value = "發生例外狀況，請聯絡管理員";
      return;
    }
    errorMsg.value = `${status}: ${msg}`;
    errorVisible.value = true;
  }
};
</script>

<template>
  <div class="row center-align page-block">
    <h1>建立文章</h1>
    <div v-if="mainVisible" class="col s12 create-block">
      <div class="row">
        <!-- Modal Structure -->
        <div id="modal" class="modal left-align">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="markdown-preview col s12 main-color" v-html="renderedMarkdown"></div>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="title" v-model="form.title" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="title">title</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">image</i>
          <input id="image" v-model="form.image" type="text" class="validate" />
          <span class="helper-text" data-success=""></span>
          <label for="image">image</label>
        </div>
        <div class="input-field text-insert col s12">
          <i class="material-icons prefix">mode_edit</i>
          <textarea id="content" v-model="form.content" class="materialize-textarea"></textarea>
          <label for="content">Content</label>
        </div>
        <div class="col s12">
          <button data-target="modal" class="btn modal-trigger">預覽</button>
          <button class="button-submit" type="button" @click="submit">
            建立文章
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="successVisible" class="col s12 success-block">
      <div class="row">
        <div class="col s12 big-title">資料鍵入成功!</div>
        <div class="col s12">
          <button class="button-submit" type="button">
            <NuxtLink to="/">回到首頁</NuxtLink>
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="errorVisible" class="col s12 error-block">
      <div class="row">
        <div class="col s12 big-title">資料鍵入失敗!</div>
        <div class="col s12 content">{{ errorMsg }}</div>
        <div class="col s12">
          <button class="button-submit" type="button" @click="switchBlock()">
            重新鍵入
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-block {
  padding: 30px;
}
.create-block {
  min-height: 250px;
  border: 2px solid black;
  border-radius: 30px;
}
.success-block {
  background-color: rgba(0, 255, 0, 0.3);
  border: 2px solid transparent;
  border-radius: 30px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-block {
  background-color: rgba(255, 0, 0, 0.3);
  border: 2px solid transparent;
  border-radius: 30px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
