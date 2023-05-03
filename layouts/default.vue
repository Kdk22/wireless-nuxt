<template>
  <div class="flex flex-col h-screen">
    <div  class="flex flex-1 overflow-hidden">
      <nav-bar v-if="showSideBar" ></nav-bar>
      <div class="flex flex-1 flex-col">
    <Header
      @sidebar="showSideBar = !showSideBar"
    />
    <div class=" items-center justify-center m-8 overflow-y-auto ">
    <Nuxt />
      </div>
        </div>

    <Footer />
  </div>
    <transition name="snackbar">
      <div v-if="$store.state.snackBar.display" class="snackbar">
        <div class="flex p-3" :class="$store.state.snackBar.class">
          <div>
            {{ $store.state.snackBar.text }}
          </div>
          <button class="ml-3" @click="$store.dispatch('hideSnackbar')">
            <IconBase
              :path="$options.icons.uniTimesCircle"
              class="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
import {
  uniTimesCircle
} from '@/icons'
import IconBase from '~/components/Common/IconBase.vue';
import Header from "~/components/EventFeed/Header.vue";
import Footer from "@/components/Common/Footer.vue";
import NavBar from "@/components/common/NavBar.vue";
export default {
  icons: {
    uniTimesCircle
  },
  components: {
    NavBar,
    IconBase, Header, Footer
  },
  data(){
    return {
      showSideBar: false,
    }
  }
}
</script>
<style>
/*html {*/
/*  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',*/
/*    sourceSansPro, 'Helvetica Neue', Arial, sans-serif;*/
/*  font-size: 16px;*/
/*  word-spacing: 1px;*/
/*  -ms-text-size-adjust: 100%;*/
/*  -webkit-text-size-adjust: 100%;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  box-sizing: border-box;*/
/*}*/

/**,*/
/**::before,*/
/**::after {*/
/*  box-sizing: border-box;*/
/*  margin: 0;*/
/*}*/

/*.button--green {*/
/*  display: inline-block;*/
/*  border-radius: 4px;*/
/*  border: 1px solid #3b8070;*/
/*  color: #3b8070;*/
/*  text-decoration: none;*/
/*  padding: 10px 30px;*/
/*}*/

/*.button--green:hover {*/
/*  color: #fff;*/
/*  background-color: #3b8070;*/
/*}*/

/*.button--grey {*/
/*  display: inline-block;*/
/*  border-radius: 4px;*/
/*  border: 1px solid #35495e;*/
/*  color: #35495e;*/
/*  text-decoration: none;*/
/*  padding: 10px 30px;*/
/*  margin-left: 15px;*/
/*}*/

/*.button--grey:hover {*/
/*  color: #fff;*/
/*  background-color: #35495e;*/
/*}*/
h1 {
  @apply text-6xl text-headingtext font-sourceSansPro;
  font-style: normal;
  font-weight: bold;
  line-height: 60px;
}
  .inputFieldClass {
    @apply border  w-full py-2 px-2 text-gray-700 leading-tight;
    focus:outline-none;
    focus:shadow-outline;
  }
  .organization-input-field {
    @apply w-full py-1 px-2 text-gray-700 leading-tight;
    focus:outline-none;
    focus:shadow-outline;
  }
  .authenticationLabel {
    @apply block text-gray-700 text-sm font-bold
  }
  .authentication-field-class {
      @apply border  w-full py-3 px-2 text-gray-700 leading-tight;
    focus:outline-none;
    focus:shadow-outline;
  }
  button {
    focus:outline-none;
  }

  .snackbar{
    @apply fixed;
    @apply inset-x-0;
    @apply bottom-0;
    @apply flex;
    @apply justify-center;
    @apply items-center;
    height: 10%;
  }

  .snackbar-enter-active, .snackbar-leave-active {
    transition: opacity .5s;
  }
  .snackbar-enter, .snackbar-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .default-font {
    @apply font-sourceSansPro;
  }
</style>
