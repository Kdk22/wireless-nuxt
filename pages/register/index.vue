<template>
<div class="flex  py-12 px-4 sm:px-6 lg:px-8">
  <div class=" w-full space-y-8">
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
          Register Here
        </div>
      </div>
        <div class="md:flex md:justify-between">
          	<div class="md:flex lg:flex  md:mr-2 md:mb-0">

  <label class="block mb-2 text-lg authenticationLabel">First Name</label>

           <input
          v-model="formData.first_name"
          class="authentication-field-class w-full md:w-1/2 lg:w-1/2 xl:w-full"
          type="text"
          placeholder="First Name"
        >
        <InputValidation :class="'block pb-4 text-center'" :error-text="formValidator.getError('non_field_errors')" />
</div>
          <div class="md:ml-2">
  <label class="sm:w-1/2 md:w-1/7 block authenticationLabel text-lg md:px-10 ">Last Name</label>

           <input
          v-model="formData.last_name"
          class="authentication-field-class w-full md:w-1/2 lg:w-1/2"
          type="text"
          placeholder="Last Name"
        >
        <InputValidation :class="'pb-4 text-center'" :error-text="formValidator.getError('non_field_errors')" />

        </div>
          <div class="mt-4">
        <label class="authenticationLabel block" for="email">
          Email
        </label>
        <input
          v-model="formData.email"
          class="authentication-field-class w-full md:w-1/2 lg:w-1/2"
          type="email"
          placeholder="Email"
        >
        <InputValidation :error-text="formValidator.getError('email')" />
          </div>
           <div class="mb-4 md:flex md:justify-between">
								<div class="my-4 md:mr-2 md:mb-0">
        <label class="authenticationLabel" for="password">
          Password
        </label>
        <input
          v-model="formData.password"
          class="authentication-field-class  w-full md:w-1/2 lg:w-1/2"
          type="password"
          placeholder="Password"
          @keyup.enter="register"
        >
        <InputValidation :error-text="formValidator.getError('password')" />
           </div>
             <div class="md:ml-2">
               <label class="authenticationLabel " for="password">
          Confirm Password
        </label>
        <input
          v-model="confirmPassword"
          class="authentication-field-class w-full "
          type="password"
          placeholder="Password"
        >
        <InputValidation :error-text="formValidator.getError('password')" />
             </div>
           </div>


        <Button
          :title="'Register'"
          :button-class="'authenticationButtonClass group relative w-full my-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
          :button-title-class="'text-center '"
          @click="register"
        />
        <div class="text-center text-lg default-font ">
          <span class="block  pt-3">Already registered to Wireless Hotspot?  <Button
            :title="'Sign In'"
            :button-class="' border-none font-semibold  hover:text-gray-500'"
            :button-title-class="'secondary-button pl-2 default-font text-blue-600'"
            @click="$router.push('/login')"
          /></span>
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
  name: "RegisterUser",
  components: {
     Button,
     InputValidation
   },
  data () {
    return {
      password: '',
      formData: {},
      formValidator: new FormValidator(),
      confirmPassword: '',
      firstName:'',
      lastName:'',
      postDetails: {}


    }
  },
  mounted() {
    // this.getData();
  },
  methods: {
    getData () {
      this.$axios.get(`location/`)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.postDetails = response.data
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },

    postData() {
      if (this.formData.password === this.confirmPassword && this.formData.password ) {
console.log("Here in post data")
        this.$axios
          .$post('/detail/', this.formData)
          .then((response) => {
            // this.setNotifyMessage({
            //   message: 'Successfully Login. Enjoy Shopping.',
            //   color: 'green',
            // })
            console.log('data posted', response)
            this.$router.push('/requested')
            this.postDetails = response.data

          })
          .catch((error) => {
            console.log(error)
            this.setNotifyMessage({
              message: 'Username or Password doesnot match.',
              color: 'red',
            })
          })
      } else {
        this.formValidator.setError({confirmPassword: 'Did not match or must be more that 8 characters.'})
      }
      },
    register () {
      this.$axios
        .$post('users-detail/', this.formData)
        .then((response) => {
          // if(response.registration_stage )
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          // this.$store.dispatch('registration/addUserRegistrationDetails', response)
          // this.$store.dispatch('showSnackbar', { text: 'Successfully Registered ! Please login !', class: 'bg-blue-500 text-white' })
          // this.sendEmail()
          console.log(response)
          this.$router.push('/requested')
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.formValidator.setError(error.response)
          this.$store.({
            message: 'Username or Password doesnot match.',
            color: 'red',
          })
        })
    }
  }

}
</script>

<style scoped>

</style>
