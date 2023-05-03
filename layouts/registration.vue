<template>
<div class="flex flex-1 flex-col h-screen">
  <Header></Header>
  <div>
    <Nuxt />
</div>
    <Footer></Footer>

</div>

</template>

<script>
import Footer from "@/components/common/Footer.vue";
import Header from "~/components/EventFeed/Header.vue";
export default {
  name: "registration",
  components: {Footer, Header}
}
</script>

<style scoped>

</style>
