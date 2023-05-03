
<template>
<div class=" pt-16 pb-32 grid justify-center">
  <div class="flex my-4 w-full justify-center">Select the Location You are working</div>

            <div class="flex w-full justify-center profile-title-content ">

              <DropDown
                :class="'w-grow'"
                :selected-text-class="'text-black default-font'"
                :button-class="'only-text border-2 -top-6 '"
                :selected-text=" selectedBranch"
                :drop-down-open-close="dropDownBranch"
                @close="dropDownBranch = !dropDownBranch"
              >
                <template #dropdown-elements>
                  <div
                    v-for="(item, index) in addBranchDropDownList"
                    :key="index"
                    class=" text-center"
                  >
                    <Button
                      :title="item.title"
                      :button-class="'secondary-button hover:text-gray-500 px-2 py-2'"
                      :button-title-class="'text-black'"
                      @click="selectedBranchElement(item)"
                    />
                    <div v-if="index < addBranchDropDownList.length -1" class="w-full border text-gray-500" />
                  </div>
                </template>
              </DropDown>
              <InputValidation :error-text="formValidator.getError('account')" />
            </div>
<!--            <input v-model="formData.plan" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->


</div>
</template>

<script>
   import DropDown from '../../components/common/DropDown.vue'
  import FormValidator from '../../utils/form_validator'
  import InputValidation from '~/components/Common/InputValidation'
  import Button from "@/components/common/Button.vue";
export default {
  name: "index",
  layout:"registration",
  components: {DropDown, InputValidation, Button},
  data() {
    return {
      selectedValue: '',
      showForm: false,
      selectedBranch: 'Select',
      dropDownBranch: false,
      formValidator: new FormValidator(),
      addBranchDropDownList: [


        ],

    }
  },
    async mounted() {
     await this.getData();
  },

  methods: {
    selectedBranchElement (item) {
      console.log(item)
      this.dropDownBranch = !this.dropDownBranch
      this.selectedBranch = item.title
      this.formValidator.setError()
      console.log(this.formData)
      this.$store.commit('setLocation', item)
      this.$router.push('/home')
    },
    clearForm () {
      this.selectedBranch = 'Select'
    },
getData () {
      this.$axios.get(`branch/`)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.addBranchDropDownList = response.data

        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },
  }
}
</script>

<style scoped>

</style>
