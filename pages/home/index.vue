<template>
  <div class="flex ">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(item, index) in menuItems"
       :key="index"
        class="col-auto mt-2"

                   >
                    <Button
                      :title="item.title"
                      :button-class="'group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500'"
                      :button-title-class="'text-black group-hover:text-blue text-sm font-semibold'"
                      @click="$router.push(item.action)"
                    />


      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/common/Button.vue";

export default {
  name: 'Home',
  components: {Button},
  data () {
    return {
      menuItems: [
        {


          title: 'Daily Closing',
            action: "daily-reports"
        },
        {
          title: 'Activation Tracker',
           action: "activation-tracker"
        }
      ],

    }
  },
  mounted() {
    // this.getPostData()
  },
  methods: {
  //   getPostData() {
  //     this.$axios
  //       .$get('/location/')
  //       .then((response) => {
  //         // self.setNotifyMessage({
  //         //   message: 'Successfully Login. Enjoy Shopping.',
  //         //   color: 'green',
  //         // })
  //         this.locationData = response
  //         console.log('data posted', response)
  //         // self.$router.push('/')
  //         console.log(response)
  //         // self.nextPostUrl = response.next
  //         // self.postData = self.postData.concat(response.results)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //         // this.setNotifyMessage({
  //         //   message: 'Username or Password doesnot match.',
  //         //   color: 'red',
  //         // })
  //       })
  //   }
  // },
  // beforeCreate () {
    // if (this.$auth && this.$auth.user.registration_stage !== 'stage-3') {
    //   this.$router.push('/register/email-password')
    // }
  }
}
</script>

<style scoped>

</style>

