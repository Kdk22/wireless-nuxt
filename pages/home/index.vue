<template>
  <div class=" ">
<!--    <Header />-->
    <div> User Info is: </div>
    {{ $auth.user }}
<!--    <NoticeBoard />-->
  </div>
</template>

<script>
// import Header from '../../components/EventFeed/Header.vue'
// import NoticeBoard from '../../components/EventFeed/NoticeBoard.vue'
export default {
  name: 'HopePage',
  // components: { NoticeBoard, Header },
  data () {
    return {

    }
  },
  mounted() {
    this.getPostData()
  },
  methods: {
    getPostData() {
      this.$axios
        .$get('/wireless/location/')
        .then((response) => {
          // self.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // self.$router.push('/')
          console.log(response)
          // self.nextPostUrl = response.next
          // self.postData = self.postData.concat(response.results)
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    }
  },
  beforeCreate () {
    // if (this.$auth && this.$auth.user.registration_stage !== 'stage-3') {
    //   this.$router.push('/register/email-password')
    // }
  }
}
</script>

<style scoped>

</style>

