<template>

<div class=" font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">

  <div class="mail__wrapper max-w-md mx-auto">

    <div class="mail__content bg-white p-8 shadow-md">


      <div class="content__body py-8 border-b">
        <p>
          Hey, <br><br>It looks like you just signed up for Wireless Hotspot., that’s awesome! Please check your email for the verification code.
        </p>
        <button class="text-white text-sm tracking-wide bg-red rounded w-full my-8 p-4 ">CONFIRM EMAIL ADRESS</button>
         <input
          v-model="formData.code"
          class="authentication-field-class  "
          placeholder="Code"
        >
      </div>
        <Button
          :title="'Verify'"
          :button-class="'authenticationButtonClass group relative w-full my-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
          :button-title-class="'text-center '"
          @click="verify"
        />
       <Button
          :title="'Re-send'"
          :button-class="'authenticationButtonClass group relative w-full my-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
          :button-title-class="'text-center '"
          @click="resend"
        />

    </div>

  </div>

</div>
</template>

<script>
import Button from "@/components/common/Button.vue";

export default {
  name: "index",
  layout:"registration",
  components: {Button},
  data() {
    return {
      formData: {
        email: this.$store.state.user.email,
        code: ''
      },
    }
  },

  methods: {
    verify() {
      this.$axios
        .$post('/detail/verify_email/', this.formData)
        .then((response) => {
          // if(response.registration_stage )
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          // this.$store.dispatch('registration/addUserRegistrationDetails', response)
           this.$store.dispatch('showSnackbar', { text: 'Successfully Registered ! Please login !', class: 'bg-blue-500 text-white' })
          // this.sendEmail()

          console.log(response)
          this.$router.push('/select-location')
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.formValidator.setError(error.response)
          this.$store.dispatch({
            message: 'Code does not match.',
            color: 'red',
          })
        })



},
    resend(){

    }
  }
}
</script>

<style scoped>

</style>
