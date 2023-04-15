<template>

		<div
			class="border border-teal-500 shadow-lg modal-container bg-white w-6/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="modal-content py-4 text-left px-6">
				<!--Title-->
				<div class="flex justify-between items-center border-b-2 pb-3">
					<p class="text-2xl font-bold">{{ modalTitle }}</p>
					<div class="modal-close cursor-pointer z-50">
						<Button
          :button-class="'hover:bg-purple-500 cursor-pointer '"
          @click="$emit('close')"
        >
          <template #button-content>
          <IconBase :class-prop="'h-8 w-8'" :path="$options.icons.mdiClose" :view-box-value="'0,0,24,28'"    />

          </template>
        </Button>
					</div>
				</div>
				<!--Body-->
				    <slot name="form-content" class="my-5">

            </slot>
				<!--Footer-->
				<div class="flex justify-end border-t-2 space-x-2 pt-2">
          <Button
					:title="'Cancel'"
                      :button-class="'my-4 items-center bg-white hover:bg-purple-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'"
                      :button-title-class="'align-center'"
                      @click="$emit('close')">

          </Button>
          <Button
          :title="'Save'"
                      :button-class="'my-4 items-center bg-white hover:bg-purple-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'"
                      :button-title-class="'align-center'"
                      @click="$emit('save')"
          >

          </Button>

					<button
						class="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
				</div>
			</div>
		</div>
</template>

<script>
import Button from "@/components/common/Button.vue";
import IconBase from "@/components/common/IconBase.vue";

import {mdiClose} from "@/icons";
import FormValidator from "@/utils/form_validator";
export default {
  name: "FormModal",
  components: {Button, IconBase},
  icons: {mdiClose},
    props: {
    modalTitle: {
      type: String,
      required: false,
      default: 'Modal Title Name'
    },
      itemDetails: {
      type: Object,
        required: false,
        default: null
      }

  },
  data() {
    return {
      formData: this.itemDetails || {},
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
      selectedPlan: 'Select',
      selectedAutoPay: 'Select',
      dropDownPlan: false,
      dropDownAutoPay: false,


    }
  },
  methods:{
    save() {
      this.$emit('close');
    },
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
  }
}
</script>
<style scoped>

</style>
