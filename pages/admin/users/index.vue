<template>
<div class="pb-32 content-center ">
          <h2 class="text-4xl text-center py-4">Registered Users</h2>
        <div class="container mx-auto px-6 overflow-x-auto">
          <div class="flex flex-row justify-between">
            <div class="">
            <span > Phone Number</span>
     <form>
                      <input @keyup.enter="getData" v-model="filter.phoneNumber" type="text" placeholder="Search" class=" placeholder:italic placeholder-slate-400 rounded mt-1 px-2 border border-slate-600  h-10    contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
<!--front end validation for search-->
          </form>
            </div>
            <div class="mx-4">
                  <span> First Name</span>
     <form>
                      <input @keyup.enter="getData" v-model="filter.firstName" type="text" placeholder="Search" class=" placeholder:italic mt-1 placeholder-slate-400 pl-2  h-10  border border-slate-600 rounded contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
<!--set up error validation for search-->
          </form>
            </div>
            <div class="">
                  <span> Last Name</span>
     <form>
                      <input @keyup.enter="getData" v-model="filter.lastName" type="text" placeholder="Search" class=" placeholder:italic mt-1 placeholder-slate-400 h-10 border border-slate-600 rounded pl-2 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
<!--set up validation for search-->
          </form>

              </div>
                <Button
          :button-class="'cursor-pointer mt-6'"
          @click="getData"
        >
          <template #button-content>
           <IconBase :class-prop="'h-8 w-5 hover:text-purple-500'" :path="$options.icons.uniSearch" :view-box-value="'0,0,24,28'"    />
          </template>
 </Button>

<div class="w-70 hidden">Date Picker </div>

         <Button
            :title="'Add New'"
                       :button-class="'my-4 rounded  bg-white hover:bg-purple-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400  shadow'"
                      :button-title-class="'align-center'"
            @click="showForm = !showForm"
         >
</Button>

            </div>

         <div class="flex flex-col overflow-x-auto">
  <div class="sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-x-auto overflow-y-auto">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b  bg-gray-400 font-medium  text-black dark:border-neutral-500 dark:bg-neutral-900 ">
    <tr class="  text-base space-x-6  text-center">
      <th>
          No.
      </th>
       <th>
          Date | Time.
      </th>
      <th class="px-2">First Name</th>
      <th class="px-2">Last Name</th>
      <th class="px-2">Phone Number

        </th >
      <th class="px-2"> Active


      </th>
      <th class="px-2"> Staff
          </th>
      <th class="px-2"> Verified
      </th>
      <th class="px-2">Blocked
          </th>
      <th class="px-2">Email

      </th>
      <th class="px-2"> Action
         </th>
    </tr>
  </thead>
  <tbody v-if="!loading">
    <tr v-for="(item, index) in userList" :key="item.pk" class=" space-x-8 space-y-1 text-center text-sm">
      <td>{{index +1}}</td>

      <td class=""> {{dayjs(item.modified_at).format('ddd DD, MMMM, YYYY | HH:MM A')}}</td>
            <td>{{item.first_name}}</td>
      <td>{{item.last_name}}</td>
      <td>{{item.phone_number}}</td>
      <td>{{item.is_active==false ? 'No': 'Yes'}}</td>
      <td>{{item.is_staff==false ? 'No': 'Yes'}}</td>
      <td>{{item.registration_stage === "stage-3"? 'Yes' : 'No'}}</td>
      <td>{{item.is_blocked==false ? 'No': 'Yes'}}</td>
      <td>{{item.email}}</td>

      <td class="flex text-center">
          <Button
          :button-class="'cursor-pointer '"
          @click="edit(item)"
        >
          <template #button-content>
                   <IconBase :class-prop="'h-7 w-7 pr-2 mouse-pointer  hover:text-purple-500'" :path="$options.icons.mdiEdit" :view-box-value="'0,0,24,28'"    />

          </template>

        </Button>
     </td>
    </tr>

  </tbody>
          <tbody v-else>
          <tr v-for="index in 20" :key="index" class="animate-pulse space-y-5">
  <td class=" bg-gray-400 h-5 px-12"></td>
  <td class=" bg-gray-500 h-5 px-12"></td>
  <td class=" bg-gray-400 h-5 px-12  "></td>
  <td class=" bg-gray-500 h-5 px-12 "></td>
  <td class=" bg-gray-400 h-5 px-12 "></td>
  <td class=" bg-gray-500 h-5 px-12 "></td>
  <td class=" bg-gray-400 h-5 px-12 "></td>
  <td class=" bg-gray-500 h-5 px-12 "></td>
  <td class=" bg-gray-400 h-5 px-12 "></td>
  <td class=" bg-gray-500 h-5 px-12 "></td>
  <td class=" bg-gray-400 h-5 px-12 "></td>

            </tr>
          </tbody>
</table>

        </div>

    </div>
  </div>
         </div>

        </div>

  <div v-if="showForm" class=" fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
		>

  <FormModal
    :modal-title="'Register User'"
    :action-name="formData.pk ? 'Update': 'Save'"
  @close="closeFormModal"
    @confirm="postData"
  >
    <template #form-content>
    <div class="flex my-6 mx-4">
  <div class="flex-1">
    <span> First Name</span>
     <form>
            <input v-model="formData.first_name" type="text" class="border-slate-200 bg-gray-400 my-1  p-2 w-11/12 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('first_name')" />

          </form>

  </div>
   <div class="flex-1">
    <span> Last Name</span>
     <form>
            <input v-model="formData.last_name" type="text" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('last_name')" />

          </form>

  </div>
  </div>
              <div class="flex my-6 mx-4">
   <div class="flex-1 ">
    <span class=""> Phone Number</span>
     <form>
            <input v-model="formData.mobile_number" type="text" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('phone_number')" />

          </form>

  </div>
                 <div class="flex-1">
    <span> Email</span>
     <form>
            <input v-model="formData.email" type="email" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('email')" />

          </form>

  </div>


</div>
                      <div class="flex my-6 mx-4">
   <div v-if="!formData.pk" class="flex-1">
    <span class="">Password</span>
     <form>
            <input v-model="formData.password" type="password" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('password')" />

          </form>

  </div>
                 <div v-if="!formData.pk" class="flex-1">
    <span>Confirm Password</span>
     <form>
            <input v-model="confirmPassword" type="password" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('confirmPassword')" />

          </form>

  </div>


</div>
                             <div class="flex my-6 mx-4">
<!--   <div class="flex-1">-->
<!--    <span class="mb-2">Active</span>-->
<!--    <form>-->
<!--            <input v-model="formData.is_active" type="checkbox" :class="formData.is_superuser? 'pointer-events-none': 'pointer-events-auto'" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->

<!--&lt;!&ndash;            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>&ndash;&gt;-->
<!--          </form>-->
<!--&lt;!&ndash;              <InputValidation :error-text="formValidator.getError('plan')" />&ndash;&gt;-->



<!--  </div>-->
                 <div class="flex-1">
    <span>Blocked</span>

          <form>
            <input v-model="formData.is_blocked" type="checkbox" :class="formData.is_superuser? 'pointer-events-none': 'pointer-events-auto'" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>

<!--            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->
          </form>

  </div>
                               <div class="flex-1">
                                 <span> Verified</span>
                                 <span>
           <IconBase :class-prop="formData.registration_stage === 'stage-3' ? 'h-5 w-5 text-green-500': 'h-5 w-5 text-red-500'" :path="formData.registration_stage === 'stage-3' ? $options.icons.uniCheck : $options.icons.uniMultiply" :view-box-value="'0,0,24,28'"    />

                                 </span>
                               </div>
  <div v-if="!!$store.state.user && !!$store.state.user.is_staff" class="flex-1">
    <span>Staff</span>

          <form>
            <input v-model="formData.is_staff" type="checkbox" :class="formData.is_staff? 'pointer-events-none': 'pointer-events-auto'" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>

<!--            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->
          </form>

  </div>
                                <div v-if="!!$store.state.user && !!$store.state.user.is_superuser" class="flex-1">
    <span>Super User</span>

          <form>
            <input v-model="formData.is_superuser" type="checkbox" :class="formData.is_superuser? 'pointer-events-none': 'pointer-events-auto'" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>

<!--            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->
          </form>

  </div>
                               <div v-if="formData.is_staff && formData.last_login">
                                 <span> Last Login </span>
                                 {{dayjs(formData.last_login).format('ddd DD, MMMM, YYYY | HH:MM A')}}
                               </div>


</div>

    </template>
  </FormModal>
</div>
</div>
</template>

<script>
import dayjs from "dayjs";
import FormValidator from "@/utils/form_validator";
import FormModal from "@/components/common/FormModal.vue";
import InputValidation from "@/components/common/InputValidation.vue";
import Button from "@/components/common/Button.vue";
import IconBase from "@/components/common/IconBase.vue";
import {mdiEdit, mdiDelete, uniSearch, uniCheck, uniMultiply} from "@/icons";

export default {
  name: "index",
  components: {FormModal, InputValidation, Button, IconBase, },


  data(){
    return {
      showForm: false,
      userList: [],
      formData: {
        first_name: '',
        last_name :'',
        mobile_number: '',
        email: '',
        password: '',
        is_blocked: false,
        is_staff: false,
        is_active: true,

      },
      loading: false,
      formValidator: new FormValidator(),
      filter: {
        firstName: '',
        lastName: '',
        phoneNumber: ''

      },
      confirmPassword:''
    }
  },
  computed: {
    dayjs() {
      return dayjs
    }
  },
  icons: {mdiEdit, mdiDelete, uniSearch, uniCheck, uniMultiply, },
    mounted() {
     this.getData();

  },

methods: {

    edit(item){
      this.formData =item
      this.showForm = true
    },
    closeFormModal () {
      this.formData = {
      }
      this.showForm = false
      this.confirmPassword = ''
      this.formValidator.setError({})
       this.filter= {
        firstName: '',
        lastName: '',
        phoneNumber: ''

      }
    },
getData () {
      this.loading = true
  let geturl =`users/`
  if(this.filter.firstName || this.filter.lastName || this.filter.phoneNumber){
    geturl = geturl + `?mobile_number=${this.filter.phoneNumber}&first_name=${this.filter.firstName}&last_name=${this.filter.lastName}`
  }
      this.$axios.get(geturl)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.userList = response.data
          this.loading = false
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
      console.log(this.formData)
      if (!this.formData.pk) {
        if(this.formData.password !== this.confirmPassword){
          this.formValidator.setError({password: ['Password Doesn\'t matches']})
        }
        else {
          console.log(this.formData);
          this.$axios
            .$post('users/', this.formData)
            .then((response) => {
              this.userList.unshift(response)

              // if(response.registration_stage )
              // this.setNotifyMessage({
              //   message: 'Successfully Login. Enjoy Shopping.',
              //   color: 'green',
              // })
              // this.$store.dispatch('registration/addUserRegistrationDetails', response)
              this.$store.dispatch('showSnackbar', {
                text: 'New User Successfully Added !',
                class: 'bg-purple-500 text-white'
              })
              // this.sendEmail()
              console.log(response)
              this.closeFormModal()
              // this.$router.push('/requested')
              // this.$router.push('/')
            })
            .catch((error) => {
              console.log(error)
              this.formValidator.setError(error.response)
              this.formValidator.setError({generalError: ['Please fill up the information']})

              this.$store.dispatch({
                message: 'New User Cannon be Added.',
                color: 'red',
              })
            })
        }

      } else {
        this.$axios.$put(`users/${this.formData.pk}/`, this.formData)
          .then(() => {
            this.showForm = false
            this.getData()
            this.formData = {}
            this.$store.dispatch('showSnackbar', {
              text: 'User Successfully Updated !',
              class: 'bg-purple-500 text-white'
            })
          })
          .catch((error) => {
            this.$store.dispatch('showSnackbar', {
              text: 'User Cannot be Created !',
              class: 'bg-red-500 text-white'
            })
            console.log(error)
            this.formValidator.setError(error)
          })
      }
    }
}
}
</script>

<style scoped>

</style>
