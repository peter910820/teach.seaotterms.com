<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const M: any;

onMounted(() => {
  const elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);

  nextTick(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, { draggable: true });

    // change position for navbar overlay
    const overlay = document.querySelector(".sidenav-overlay");
    const sidenav = document.querySelector(".sidenav");

    if (overlay && sidenav) {
      sidenav.parentNode?.insertBefore(overlay, sidenav);
    }
  });
});
</script>

<template>
  <!-- Main Navbar -->
  <nav>
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Home</router-link>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <!-- common -->
      <ul class="right hide-on-med-and-down">
        <li>
          <NuxtLink to="/">
            首頁
            <i class="material-icons left">home</i>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
  <!-- mobile -->
  <ul id="mobile-demo" class="sidenav">
    <li>
      <NuxtLink to="/">首頁</NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.nav-wrapper {
  background-color: #f2ebea;
}
.brand-logo {
  margin-left: 10px;
}
a {
  color: #444444 !important;
}
.dropdown-trigger {
  padding-right: 0px;
}
.dropdown-content {
  width: 220px !important;
  background-color: #f2ebea;
  border-radius: 10px;
}
</style>
