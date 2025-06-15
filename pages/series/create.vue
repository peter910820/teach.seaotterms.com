<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

interface FormData {
  title: string;
  image: string;
}
const form = ref<FormData>({
  title: "",
  image: "",
});
const mainVisible = ref<boolean>(true);
const successVisible = ref<boolean>(false);
const errorVisible = ref<boolean>(false);
const errorMsg = ref<string>("");

const submit = async () => {
  const apiUrl = useRuntimeConfig().public.API_URL;
  if (!form.value.image.startsWith("https://")) {
    alert("圖片連結請使用https");
    return;
  }

  try {
    mainVisible.value = false;
    await axios.post(apiUrl + "/series", form.value);
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

const switchBlock = async () => {
  mainVisible.value = true;
  errorVisible.value = false;
};
</script>

<template>
  <div class="row center-align page-block">
    <h1>建立系列</h1>
    <div v-if="mainVisible" class="col s12 create-block">
      <div class="row">
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
        <div class="col s12">
          <button class="button-submit" type="button" @click="submit">
            建立系列
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
