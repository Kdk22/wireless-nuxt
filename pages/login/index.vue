<template>
 <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-10">
      <div class="flex flex-wrap items-center justify-center">
        <div class="pt-5 w-full default-font text-xxl font-semibold text-center">
          Welcome Back
        </div>
        <p class="default-font pb-6 text-lg text-center text-gray-600">
          Sign In to Continue
        </p>
      </div>
      <div class="shadow-sm ">

        <div>


        <label class="authenticationLabel" for="email">
          Email
        </label>
        <input
          v-model="email"
          class="authentication-field-class "
          type="email"
          placeholder="Email"
        >
        <InputValidation :error-text="formValidator.getError('email')" />
           <div>
        <label class="authenticationLabel pt-3" for="password">
          Password
        </label>
        <input
          v-model="password"
          class="authentication-field-class  "
          type="password"
          placeholder="Password"
          @keyup.enter="login()"
        >
        <InputValidation :error-text="formValidator.getError('password')" />
           </div>
          <div class="text-center text-lg">
          <Button
                      :title="'Log In'"
                      :button-class="'my-4 items-center bg-white hover:bg-purple-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'"
                      :button-title-class="'align-center'"
                      @click="login()"
        />
            </div>
        <div class="text-center text-lg default-font ">
          <span class="block  pt-3">New to Wireless Hotspot?
            <Button
            :title="'Register'"
            :button-class="' border-none font-semibold  hover:text-gray-500'"
            :button-title-class="'secondary-button pl-2 default-font text-blue-600'"
            @click="$router.push('/register')"
          /></span>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Button from '@/components/Common/Button.vue'
// import IconBase from './IconBase'
import InputValidation from '@/components/Common/InputValidation.vue'
// import ImageField from '@/components/ImageField'
// import FormValidator from '~/utils/form_validator/index.js'
import FormValidator from '~/utils/form_validator/index.js'
export default {
  name: "LoginUser",
  layout:"registration",
   components: {
     Button,
     InputValidation
   },

  data () {
    return {
      password: '',
      email: '',
      formValidator: new FormValidator()

    }
  },
  methods: {
     async login(){
      console.log(this.email)
       await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })

       if(this.$store.state.user.registration_stage === 'stage-2'){
        this.$router.push('/verify-email')

       }
       else if ( this.$store.state.user.registration_stage === 'stage-3' && this.$store.state.user.active){
        this.$router.push('/select-location')

       }
       else {
         this.$router.push('/register')
       }
    },
  }
}
</script>

<style scoped>

</style>
