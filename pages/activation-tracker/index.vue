<template>
<div class=" pt-16 pb-32 content-center ">

        <div class="container mx-auto px-4 overflow-x-auto">
          <span>
         <Button
            :title="'Add New'"
                       :button-class="'my-4 items-center bg-white hover:bg-purple-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'"
                      :button-title-class="'align-center'"
            @click="showForm = !showForm"
         >
</Button>
            </span>
<!--          <div v-if="showForm" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">-->
<!--    <div class="relative w-full h-full max-w-2xl md:h-auto">-->
<!--        &lt;!&ndash; Modal content &ndash;&gt;-->
<!--        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">-->
<!--            &lt;!&ndash; Modal header &ndash;&gt;-->
<!--<ActivationTrackerForm ></ActivationTrackerForm>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<!--{{activationList}}-->
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
  <tbody>
    <tr v-for="(item, index) in activationList" :key="item.id" class="space-x-8 space-y-1 text-center text-sm">
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
          <IconBase :class-prop="'h-7 w-7 pr-2 mouse-pointer  hover:text-purple-500'" :path="$options.icons.mdiEdit" :view-box-value="'0,0,24,28'"    />

           <IconBase :class-prop="'h-7 w-7 hover:text-red-500'" :path="$options.icons.mdiDelete" :view-box-value="'0,0,24,28'"    />
     </td>
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
  @close="closeFormModal"
    @save="postData"
  >
    <template #form-content>
    <div class="flex my-6 mx-4">
  <div class="flex-1">
    <span> First Name</span>
     <form>
            <input v-model="formData.first_name" class="border-slate-200 bg-gray-400 my-1  p-2 w-11/12 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('first_name')" />

          </form>

  </div>
   <div class="flex-1">
    <span> Last Name</span>
     <form>
            <input v-model="formData.last_name" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('last_name')" />

          </form>

  </div>
  </div>
              <div class="flex my-6 mx-4">
   <div class="flex-1 ">
    <span class=""> Phone Number</span>
     <form>
            <input v-model="formData.phone_number" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('phone_number')" />

          </form>

  </div>
                 <div class="flex-1">
    <span> Account Number</span>
     <form>
            <input v-model="formData.account_number" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('account_number')" />

          </form>

  </div>


</div>
                      <div class="flex my-6 mx-4">
   <div class="flex-1">
    <span class="">Ported Number</span>
     <form>
            <input v-model="formData.ported_number" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
              <InputValidation :error-text="formValidator.getError('ported_number')" />

          </form>

  </div>
                 <div class="flex-1">
    <span>Email</span>
     <form>
            <input v-model="formData.email" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
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
          </form>

  </div>


</div>

    </template>
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
  import {mdiEdit, mdiDelete} from "@/icons";
  import IconBase from "@/components/common/IconBase.vue";

  // import FormModal from "@/components/common/FormModal.vue";

export default {
  name: "Index",
  components: {FormModal, DropDown, InputValidation, Button, IconBase },

  data(){
    return {
      selectedValue: '',
      showForm: false,
      activationList: {},
      formData: {

      },
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
    }
  },
  computed: {
    dayjs() {
      return dayjs
    }
  },
  icons: {mdiEdit, mdiDelete},
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
    saveData(){},
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
    },
getData () {
      this.$axios.get(`activation/`)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.activationList = response.data
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },
    postData(){
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
           this.$store.dispatch('showSnackbar', { text: 'New Activation Successfully Added !', class: 'bg-purple-500 text-white' })
          // this.sendEmail()
          console.log(response)
          this.closeFormModal()
          // this.$router.push('/requested')
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.formValidator.setError(error.response)
          this.$store.dispatch({
              message: 'New Activation Cannon be Added.',
              color: 'red',
            })
        })
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
