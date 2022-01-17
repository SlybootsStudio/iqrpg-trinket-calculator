<template>
  <div class="row justify-content-center">
    <div class="col-lg-6 col-md-8 mt-5">
      <div class="footer border-top mb-5 pt-3">
        <p class="m-0">
          <span class="fw-bold">{{ title }}</span> made by
          <a href="https://www.nickbreslin.com">Nick Breslin</a>.
        </p>
        <p class="m-0">
          Proudly built with
          <a href="https://https://vuejs.org/">Vue</a> and
          <a href="https://getbootstrap.com/">Bootstrap</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      title: process.env.VUE_APP_TITLE
    };
  }
};
</script>
