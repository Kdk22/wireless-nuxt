<template>
 <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
      <div class="flex flex-wrap items-center justify-center">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <span class="font-semibold default-font inline-block text-xl">Wireless Hotspots </span>
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
          @keyup.enter="$router.push('/login')"
        >
        <InputValidation :error-text="formValidator.getError('password')" />
           </div>
        <Button
          :title="'Sign in'"
          :button-class="'authenticationButtonClass group relative w-full my-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
          :button-title-class="'text-center '"
          @click="$router.push('/login')"
        />
        <div class="text-center text-lg default-font ">
          <Button
            :title="'Forgot Password ?'"
            :button-class="' border-none font-semibold  hover:bg-indigo-200'"
            :button-title-class="'secondary-button pl-2 default-font text-blue-600'"
            @click="$router.push('/email-identification')"
          />
          <span class="block  pt-3">New to Wireless Hotspot?  <Button
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
import FormValidator from '@/utils/form_validator/index.js'

export default {
  name: "LoginUser",
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
  methods: {}
}
</script>

<style scoped>

</style>
