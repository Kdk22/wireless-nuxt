<template>
<div class="flex flex-col">

        <label class="authenticationLabel" for="email">
          Email
        </label>
        <input
          v-model="email"
          class="authentication-field-class px-2 my-2"
          type="email"
          placeholder="Email"
        >
        <InputValidation :error-text="formValidator.getError('email')" />
   <div class="text-center text-lg default-font">
            <Button
            :title="'Reset'"
            :button-class ="secondsRemaining === 0 ?
             'my-4 items-center bg-white hover:bg-purple-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow':'opacity-50 border-none font-semibold  hover:text-gray-500 cursor-not-allowed'"
            :button-title-class="'align-center'"
            @click="forgotPassword"
          />
        </div>
  <div v-if="!!secondsRemaining" class="text-sm ">
    Please check your email. Resent link after {{this.secondsRemaining}} seconds.

  </div>
</div>
</template>

<script>
import Button from "@/components/common/Button.vue";
import InputValidation from "@/components/common/InputValidation.vue";
import FormValidator from "@/utils/form_validator";

export default {
 name: "LoginUser",
   components: {
     Button,
     InputValidation
   },

  data () {
    return {
      email: '',
      formValidator: new FormValidator(),
      secondsRemaining: 0

    }
  },
  methods: {
      forgotPassword() {
        this.$axios
          .$post('/detail/forgot_password/', {email: this.email})
          .then((response) => {
            // if(response.registration_stage )
            // this.setNotifyMessage({
            //   message: 'Successfully Login. Enjoy Shopping.',
            //   color: 'green',
            // })
            // this.$store.dispatch('registration/addUserRegistrationDetails', response)
            this.$store.dispatch('showSnackbar', {text: 'Please check your email !', class: 'bg-blue-500 text-white'})
            // this.sendEmail()
            // this.$router.push('/')
            this.secondsRemaining = 60;
            this.startCountdown()


          })
          .catch((error) => {
            this.secondsRemaining = 0;
            console.log(error)
            this.formValidator.setError(error.response)
            this.$store.dispatch({
              message: 'Doesn\'t exists.',
              color: 'red',
            })
          })


},
     startCountdown() {
       const  timer = setInterval(() => {
        if (this.secondsRemaining < 1) {
          this.secondsRemaining = 1;
          clearInterval(timer)
        }
        this.secondsRemaining --
          // Countdown completed, perform necessary actions
      }, 1000); // Update every 1 second (1000 milliseconds)
     }


  }
  }

</script>

<style scoped>

</style>
