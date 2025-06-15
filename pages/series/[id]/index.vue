<script setup lang="ts">
import { useRouter } from "vue-router";

const apiUrl = useRuntimeConfig().public.API_URL;

const router = useRouter();
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

const { data, error } = await useFetch<Response>(apiUrl + `/article?series-id=${route.params.id}`, {
  method: "GET",
  lazy: false,
  server: true,
});

const goToArticlePage = async (id: number) => {
  router.push({ path: `/article/${id}` }); // Relative Path
};

if (error.value) {
  console.error("API 發生錯誤：", error.value);
}
</script>

<template>
  <div class="row center-align page-block">
    <h1>教學文章系列</h1>
    <div v-for="d in data?.data" :key="d.id" class="col s12 series-block floatup-div" @click="goToArticlePage(d.id)">
      <div class="row">
        <div class="col s3 series-image">
          <img :src="d.image" />
        </div>
        <div class="col s9 series-content">
          <div class="row equal-height">
            <div class="col s12 left-align series-title">
              {{ d.title }}
            </div>
            <div class="col s12 series-details">建立時間: {{ d.createdAt.replace("T", " ").split(".")[0] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-block {
  padding: 30px;
}
.series-block {
  min-height: 150px;
  border: 2px solid black;
  border-radius: 30px;
  margin-bottom: 10px;
}
.series-image {
  min-height: 150px;
  height: 150px;
  overflow: hidden;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.series-image img {
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 30px;
  object-fit: fill;
  display: block;
}
.series-content {
  min-height: 150px;
  height: 150px;
  overflow: hidden;
  padding: 0;
  > div {
    padding: 20px;
  }
}
.series-title {
  font-size: 30px;
}
.series-amount {
  font-size: 20px;
}
.series-details {
  font-size: 15px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-top: 20px;
  padding-right: 20px;
}

.equal-height {
  display: flex;
  flex-wrap: wrap;
}

/* 畫面太小縮小字型用 */
@media (max-width: 992px) {
  .series-title {
    font-size: 20px;
  }
  .series-amount {
    font-size: 15px;
  }
  .series-details {
    font-size: 10px;
  }
}
</style>
