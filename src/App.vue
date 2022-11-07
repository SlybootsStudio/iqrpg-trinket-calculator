<template>
  <div class="container">
    <TheHeader />
    <Main />
    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "@/components/layout/TheHeader";
import Main from "@/views/Main";
import TheFooter from "@/components/layout/TheFooter";

export default {
  name: "App",
  components: {
    TheHeader,
    Main,
    TheFooter
  }
};
</script>
