<template>
<div class=" pt-16 pb-32 content-center ">

        <div class="container mx-auto px-4 overflow-x-auto">
          <span>
         <button
           data-modal-target="defaultModal"
           data-modal-toggle="defaultModal"
           class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
           type="button"
            @click="showForm = !showForm"
         >
  Add New
</button>
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
          <thead class="border-b bg-gray-400 font-medium text-black dark:border-neutral-500 dark:bg-neutral-900 ">
    <tr>
      <th>
          No.
      </th>
      <th>
        <span>First Name</span>
        <span>
          <form>
            <input v-model="formData.first_name" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
          </form>
        </span>
      </th>
      <th>
        <span>Last Name</span>
        <span>
          <form>
            <input v-model="formData.last_name" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
          </form>
        </span>
      </th>
      <th>
        <span>Phone Number</span>
        <span>
          <span>
          <form>
            <input v-model="formData.phone_number" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
          </form>
        </span>
        </span>
      </th>
      <th><span>Account Number</span>

          <span>
          <form>
            <input v-model="formData.account_number" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
          </form>
        </span>
      </th>
      <th><span>Ported Number</span>

          <span>
          <form>
            <input v-model="formData.ported_number" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
          </form>
        </span></th>
      <th><span>Plan</span>

          <span>
          <form>
            <div class="inline-flex flex flex-col justify-center profile-title-content ">
              <DropDown
                :class="'w-20'"
                :selected-text-class="'text-black default-font'"
                :button-class="'only-text border-2 -top-6 '"
                :selected-text=" selectedPlan"
                :drop-down-open-close="dropDownPlan"
                @close="dropDownPlan = !dropDownPlan"
              >
                <template v-slot:dropdown-elements>
                  <div
                    v-for="(item, index) in addPlanDropDownList"
                    :key="index"
                    class=" text-center"
                  >
                    <Button
                      :title="item.text"
                      :button-class="'secondary-button hover:text-gray-500 px-2 py-2'"
                      :button-title-class="'text-black'"
                      @click="selectedPlanElement(item)"
                    />
                    <div v-if="index < addPlanDropDownList.length -1" class="w-full border text-gray-500" />
                  </div>
                </template>
              </DropDown>
              <InputValidation :error-text="formValidator.getError('account')" />
            </div>
<!--            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->
          </form>
        </span></th>
      <th><span>Auto-Pay</span>
          <span>
          <form>
              <form>
            <div class="inline-flex flex flex-col justify-center profile-title-content ">
              <DropDown
                :class="'w-20'"
                :selected-text-class="'text-black default-font'"
                :button-class="'only-text border-2 -top-6 '"
                :selected-text=" selectedAutoPay"
                :drop-down-open-close="dropDownAutoPay"
                @close="dropDownAutoPay = !dropDownAutoPay"
              >
                <template v-slot:dropdown-elements>
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
              <InputValidation :error-text="formValidator.getError('account')" />
            </div>
<!--            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->
          </form>
          </form>
        </span></th>
      <th> <span>Email</span>
          <span>
          <form>
            <input v-model="formData.email" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
          </form>
        </span>
      </th>
      <th> <span>Action</span>
<div>
<button
  @click="postData"  class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
  Save
</button>
  </div>
         </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in activationList" :key="item.id">
      <td>{{index +1}}</td>
            <td>{{item.first_name}}</td>
      <td>{{item.last_name}}</td>
      <td>{{item.phone_number}}</td>
      <td>{{item.account_number}}</td>
      <td>{{item.ported_number}}</td>
      <td>{{item.plan_name}}</td>
      <td>True</td>
      <td>{{item.email}}</td>

      <td><span>
        <button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
  Edit
</button>
      </span>
      <span>
        <button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
  Delete
</button>
      </span></td>
    </tr>

  </tbody>
</table>

        </div>

    </div>
  </div>
         </div>
        </div>
</div>

</template>

<script>
  import DropDown from '@/components/common/DropDown.vue'
  import InputValidation from '~/components/Common/InputValidation'
  import Button from "@/components/common/Button.vue";
  import FormValidator from '~/utils/form_validator/index.js'

export default {
  name: "Index",
  components: { DropDown, InputValidation, Button },
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
      addPlanDropDownList: [
        {
          text: '15',
          value: '15-3G'
        },
        {
          text: '25',
          value: '25-3G'
        },
        {
          text: '35',
          value: '35-3G'
        },
        {
          text: '40',
          value: '40-3G'
        },
        {
          text: '50',
          value: '50-3G'
        },
        {
          text: '60',
          value: '60-3G'
        },
        {
          text: '70',
          value: '70-3G'
        },
        {
          text: '40-4G',
          value: '40-4G'
        },
        {
          text: '45-4G',
          value: '45-4G'
        },
        {
          text: '55-4G',
          value: '55-4G'
        },
        {
          text: '65-4G',
          value: '65-4G'
        },
        {
          text: '75-4G',
          value: '75-4G'
        }
      ],
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
    mounted() {
     this.getData();
  },

  methods:{
    selectedPlanElement (item) {
      console.log(item)
      this.formData.plan_name = item.value
      this.dropDownPlan = !this.dropDownPlan
      this.selectedPlan = item.text
      this.formValidator.setError()
      console.log(this.formData)
    },
     selectedAutoPayElement (item) {
      this.formData.auto_pay = item.value
       this.selectedAutoPay = item.text
      this.dropDownAutoPay = !this.dropDownAutoPay
      this.formValidator.setError()
    },
    clearForm () {
      this.formData = {
      }
      this.selectedAutoPay = 'Select'
      this.selectedAutoPay = 'Select'
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
      this.formData.plan_name = 'QUEENS'
      this.formData.user = 1
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
          // this.$store.dispatch('showSnackbar', { text: 'Successfully Registered ! Please login !', class: 'bg-blue-500 text-white' })
          // this.sendEmail()
          console.log(response)
          this.clearForm()
          this.$router.push('/requested')
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.formValidator.setError(error.response)
          this.setNotifyMessage({
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
