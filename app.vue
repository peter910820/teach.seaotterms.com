<template>
  <div class="sticky-navbar">
    <NavBar />
  </div>
  <div class="row main-style">
    <div class="col s2" />
    <div class="col s8 main-block">
      <NuxtPage />
    </div>
    <div class="col s2" />
  </div>
</template>

<style>
.row {
  height: 100%;
  margin-bottom: 0px;
}
.main-block {
  padding: 40px;
}
.sub-block {
  padding-top: 20px;
  margin-top: 10px;
  cursor: default !important;
  border: 2px solid white;
  border-radius: 20px;
  display: inline-block;
  word-wrap: break-word;
  word-break: break-word;
}
.sticky-navbar {
  position: sticky;
  top: 0px;
  z-index: 10;
}
.sticky-profile {
  position: sticky;
  top: 70px;
}
.browser-default {
  background-color: #f2ebea;
  font-size: 15px;
  font-family: "Cubic_11_1.100_R";
}

/* hide materializecss select in mobile */
.mobile-hidden {
  display: block !important;
}
.mobile-display {
  display: none !important;
}
@media (max-width: 768px) {
  .mobile-display {
    display: block !important;
  }
  .mobile-hidden {
    display: none !important;
  }
}

.main-style {
  min-height: 100vh;
  min-width: 768px;
  background-color: #f2ebea;
  background-size: 400% 400%;
  font-family: "GenJyuuGothic";
}

.main-block {
  min-height: 100vh !important;
  border: 2px solid transparent;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
}
</style>
