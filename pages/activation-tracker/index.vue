<template>
<div class="pb-32 content-center ">
          <h2 class="text-4xl text-center py-4">Activation Tracker</h2>
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
<!--          <div v-if="showForm" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">-->
<!--    <div class="relative w-full h-full max-w-2xl md:h-auto">-->
<!--        &lt;!&ndash; Modal content &ndash;&gt;-->
<!--        <div class="relative bg-white -lg shadow dark:bg-gray-700">-->
<!--            &lt;!&ndash; Modal header &ndash;&gt;-->
<!--<ActivationTrackerForm ></ActivationTrackerForm>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<!--{{userList}}-->
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
      <th class="px-2">Account Number


      </th>
      <th class="px-2">Ported Number
          </th>
      <th class="px-2">Plan
      </th>
      <th class="px-2">Auto-Pay
          </th>
      <th class="px-2">Email

      </th>
      <th class="px-2"> Action
         </th>
    </tr>
  </thead>
  <tbody v-if="!loading">
    <tr v-for="(item, index) in activationList" :key="item.id" class=" space-x-8 space-y-1 text-center text-sm">
      <td>{{index +1}}</td>

      <td class=""> {{dayjs(item.modified_at).format('ddd DD, MMMM, YYYY | HH:MM A')}}</td>
            <td>{{item.first_name}}</td>
      <td>{{item.last_name}}</td>
      <td>{{item.phone_number}}</td>
      <td>{{item.account_number}}</td>
      <td>{{item.ported_number}}</td>
      <td>{{item.plan_name}}</td>
      <td>{{item.auto_payment==false ? 'No': 'Yes'}}</td>
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
 <Button
          :button-class="'cursor-pointer '"
          @click="deleteModal(item)"
        >
          <template #button-content>
           <IconBase :class-prop="'h-7 w-7 hover:text-red-500'" :path="$options.icons.mdiDelete" :view-box-value="'0,0,24,28'"    />
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
    :modal-title="'Activation Tracker'"
    :action-name="formData.id ? 'Update': 'Save'"
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
            <input v-model="formData.phone_number" type="number" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('phone_number')" />

          </form>

  </div>
                 <div class="flex-1">
    <span> Account Number</span>
     <form>
            <input v-model="formData.account_number" type="number" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('account_number')" />

          </form>

  </div>


</div>
                      <div class="flex my-6 mx-4">
   <div class="flex-1">
    <span class="">Ported Number</span>
     <form>
            <input v-model="formData.ported_number" type="number" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('ported_number')" />

          </form>

  </div>
                 <div class="flex-1">
    <span>Email</span>
     <form>
            <input v-model="formData.email" type="email" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('email')" />

          </form>

  </div>


</div>
                             <div class="flex my-6 mx-4">
   <div class="flex-1">
    <span class="mb-2">Plan</span>
    <form>


            <div class="inline-flex flex flex-col justify-center profile-title-content ">
              <DropDown
                :class="'w-28 my-1'"
                :selected-text-class="'text-black default-font'"
                :button-class="'only-text border-2 -top-6 '"
                :selected-text=" selectedPlan"
                :drop-down-open-close="dropDownPlan"
                @close="dropDownPlansList"
              >
                <template #dropdown-elements>
                  <div
                    v-for="(item, index) in plansList"
                    :key="index"
                    class=" text-center"
                  >
                    <Button
                      :title="item.title"
                      :button-class="'secondary-button hover:text-gray-500 px-2 py-2'"
                      :button-title-class="'text-black'"
                      @click="selectedPlanElement(item)"
                    />
                    <div v-if="index < plansList.length -1" class="w-full border text-gray-500" />
                  </div>
                </template>
              </DropDown>
              <InputValidation :error-text="formValidator.getError('plan')" />
            </div>
<!--            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->
          </form>
<!--              <InputValidation :error-text="formValidator.getError('plan')" />-->



  </div>
                 <div class="flex-1">
    <span>Auto Pay</span>

                    <form>
            <div class="inline-flex flex flex-col justify-center profile-title-content ">
              <DropDown
                :class="'w-28 my-1'"
                :selected-text-class="'text-black default-font'"
                :button-class="'only-text border-2 -top-6 '"
                :selected-text=" selectedAutoPay"
                :drop-down-open-close="dropDownAutoPay"
                @close="dropDownAutoPay = !dropDownAutoPay"
              >
                <template #dropdown-elements>
                  <div
                    v-for="(item, index) in addAutoPayDropDownList"
                    :key="index"
                    class=" text-center"
                  >
                    <Button
                      :title="item.text"
                      :button-class="'secondary-button hover:text-gray-500 px-2 py-2'"
                      :button-title-class="'text-black'"
                      @click="selectedAutoPayElement(item)"
                    />
                    <div v-if="index < addAutoPayDropDownList.length -1" class="w-full border text-gray-500" />
                  </div>
                </template>
              </DropDown>
              <InputValidation :error-text="formValidator.getError('auto_payment')" />
            </div>
<!--            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->
                      <InputValidation :error-text="formValidator.getError('generalError')"></InputValidation>
          </form>

  </div>


</div>

    </template>
  </FormModal>
</div>

  <div class=" fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" v-if="deleteForm">
<FormModal
  :modal-content="`Are you sure you want to delete user ${formData.first_name}  ${formData.last_name} ?`"
  :action-name="'Confirm'"
  @close="deleteForm = !deleteForm , formData = {}"
  @confirm="deleteItem"
:modal-title="'Delete'">

</FormModal>
  </div>
</div>

</template>

<script>
  import dayjs from "dayjs";
  import DropDown from '@/components/common/DropDown.vue'
  import InputValidation from '~/components/Common/InputValidation'
  import Button from "@/components/common/Button.vue";
  import FormValidator from '~/utils/form_validator/index.js'
  import FormModal from "@/components/common/FormModal.vue";
  import {mdiEdit, mdiDelete, uniSearch} from "@/icons";
  import IconBase from "@/components/common/IconBase.vue";

  // import FormModal from "@/components/common/FormModal.vue";

export default {
  name: "Index",
  components: {FormModal, DropDown, InputValidation, Button, IconBase },

  data(){
    return {
      deleteForm:false,
      selectedValue: '',
      showForm: false,
      activationList: [],
      formData: {
        first_name: '',
        last_name :'',
        ported_number: '',
        phone_number: '',
        account_number: '',
        email: '',
        plan: null,
        auto_payment: null

      },
      loading: false,
      selectedPlan: 'Select',
      selectedAutoPay: 'Select',
      dropDownPlan: false,
      dropDownAutoPay: false,
      formValidator: new FormValidator(),
      plansList: [],
      addAutoPayDropDownList : [
        {
          text: 'Yes',
          value: 'True'
        },
        {
          text: 'No',
          value: 'False'
        }
        ],
      filter: {
        firstName: '',
        lastName: '',
        phoneNumber: ''

      }
    }
  },
  computed: {
    dayjs() {
      return dayjs
    }
  },
  icons: {mdiEdit, mdiDelete, uniSearch},
    mounted() {
     this.getData();

  },

  methods:{
    dropDownPlansList(){
      this.dropDownPlan = !this.dropDownPlan
       this.$axios.get(`plan/`)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.plansList = response.data
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },
    edit(item){
      this.formData =item
      this.showForm = true
      this.selectedPlan = item.plan_name
      this.selectedAutoPay = item.auto_payment === true ? 'Yes': 'No'
    },
    deleteModal(item){
      this.deleteForm = true
      this.formData = item
    },
    deleteItem(){
      this.$axios
        .$delete(`activation/${this.formData.id}/`)
        .then(() => {
            this.$store.dispatch('showSnackbar', {
              text: 'Activation Successfully Deleted !',
              class: 'bg-purple-500 text-white'
            })
          this.getData()
         this.closeFormModal()
        })
        .catch((error) => {
          console.log(error)
            this.$store.dispatch('showSnackbar', {
              text: 'Activation Cannot be Deleted !',
              class: 'bg-red-500 text-white'
            })
        })

    },
    selectedPlanElement (item) {
      console.log(item)
      this.formData.plan = item.id
      this.dropDownPlan = !this.dropDownPlan
      this.selectedPlan = item.title
      // this.formValidator.setError()
      console.log(this.formData)
    },
     selectedAutoPayElement (item) {
      this.formData.auto_payment = item.value
       this.selectedAutoPay = item.text
      this.dropDownAutoPay = !this.dropDownAutoPay
      // this.formValidator.setError()
    },
    closeFormModal () {
      this.formData = {
      }
      this.selectedAutoPay = 'Select'
      this.selectedPlan = 'Select'
      this.showForm = false
      this.deleteForm = false
      this.errors = {}
       this.filter= {
        firstName: '',
        lastName: '',
        phoneNumber: ''

      }
    },
getData () {
      this.loading = true
  let geturl =`activation/`
  if(this.filter.firstName || this.filter.lastName || this.filter.phoneNumber){
    geturl = geturl + `?phone_number=${this.filter.phoneNumber}&first_name=${this.filter.firstName}&last_name=${this.filter.lastName}`
  }
      this.$axios.get(geturl)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.activationList = response.data
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
      if (!this.formData.id) {

        this.formData.branch = 1
        this.formData.user = 1
        console.log(this.formData);
        this.$axios
          .$post('activation/', this.formData)
          .then((response) => {
            this.activationList.unshift(response)

            // if(response.registration_stage )
            // this.setNotifyMessage({
            //   message: 'Successfully Login. Enjoy Shopping.',
            //   color: 'green',
            // })
            // this.$store.dispatch('registration/addUserRegistrationDetails', response)
            this.$store.dispatch('showSnackbar', {
              text: 'New Activation Successfully Added !',
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
        this.formValidator.setError({ generalError: ['Please fill up the information'] })

            this.$store.dispatch({
              message: 'New Activation Cannon be Added.',
              color: 'red',
            })
          })

      } else {
        this.$axios.$put(`activation/${this.formData.id}/`, this.formData)
          .then(() => {
            this.showForm = false
            this.getData()
            this.formData = {}
            this.$store.dispatch('showSnackbar', {
              text: 'Activation Successfully Updated !',
              class: 'bg-purple-500 text-white'
            })
          })
          .catch((error) => {
            this.$store.dispatch('showSnackbar', {
              text: 'Activation Cannot be Created !',
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
.animated {
			-webkit-animation-duration: 1s;
			animation-duration: 1s;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
		}

		.animated.faster {
			-webkit-animation-duration: 500ms;
			animation-duration: 500ms;
		}

		.fadeIn {
			-webkit-animation-name: fadeIn;
			animation-name: fadeIn;
		}

		.fadeOut {
			-webkit-animation-name: fadeOut;
			animation-name: fadeOut;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}

		@keyframes fadeOut {
			from {
				opacity: 1;
			}

			to {
				opacity: 0;
			}
		}
</style>
