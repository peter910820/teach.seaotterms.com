<template>
  <div class="row center-align page-block">
    <h1>教學文章系列</h1>
    <div class="col s12 series-block floatup-div">
      <div class="row">
        <div class="col s3 series-image">
          <!-- eslint-disable vue/html-self-closing -->
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg" />
        </div>
        <div class="col s9 left-align series-title">Golang系列教學</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-block {
  padding: 20px;
}
.series-block {
  min-height: 100px;
  border: 2px solid black;
  border-radius: 30px;
}
.series-image {
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.series-title {
  min-height: 100px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
