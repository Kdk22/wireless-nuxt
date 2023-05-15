<template>
<div class="flex flex-col">

        <label class="authenticationLabel" for="email">
          Password
        </label>
        <input
          v-model="password"
          class="authentication-field-class  "
          type="password"
          placeholder="Password"
        >
   <label class="authenticationLabel" for="email">
          Confirm Password
        </label>
     <input
          v-model="confirmPassword"
          class="authentication-field-class  "
          type="password"
          placeholder="Password"
          @keyup.enter="passwordReset()"
        >
        <InputValidation :error-text="formValidator.getError('password')" />
   <div class="text-center text-lg default-font ">
             <Button
                      :title="'Verify'"
                      :button-class="'my-4 items-center bg-white hover:bg-purple-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'"
                      :button-title-class="'align-center'"
                      @click="passwordReset()"
        />
        </div>
  {{$route.params.token}}
</div>
</template>

<script>
import Button from "@/components/common/Button.vue";
import InputValidation from "@/components/common/InputValidation.vue";
import FormValidator from "@/utils/form_validator";

export default {
 name: "_token",
   components: {
     Button,
     InputValidation
   },

  data () {
    return {
      email: '',
      password:'',
      confirmPassword:'',
      formValidator: new FormValidator(),

    }
  },
  methods: {
      passwordReset() {
        if(this.password === this.confirmPassword) {
          this.$axios
            .$post(`detail/reset_password/`,
              {password: this.password, pk: this.$route.params.uid, token: this.$route.params.token}
             )
            .then((response) => {
              // if(response.registration_stage )
              // this.setNotifyMessage({
              //   message: 'Successfully Login. Enjoy Shopping.',
              //   color: 'green',
              // })
              // this.$store.dispatch('registration/addUserRegistrationDetails', response)
               this.$router.push('/')
              this.$store.dispatch('showSnackbar', {
                text: 'Password is successfully reset',
                class: 'bg-blue-500 text-white'
              })


            })
            .catch((error) => {
              console.log(error)
              this.formValidator.setError(error.response)
              this.$store.dispatch({
                message: 'Password cannot be changed.',
                color: 'red',
              })
            })
        }else {
          this.formValidator.setError({ 'password': 'Doesn\'t match. '})
        }



},


  }
  }

</script>

<style scoped>

</style>
