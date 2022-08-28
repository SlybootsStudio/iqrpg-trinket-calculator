<template>
  <div class="container">
    <Main />
    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/views/Main";
import TheFooter from "@/components/layout/TheFooter";

export default {
  name: "App",
  components: {
    Main,
    TheFooter
  }
};
</script>
