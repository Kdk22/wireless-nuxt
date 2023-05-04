<template>
<div class="pb-32 content-center ">
          <h2 class="text-4xl text-center py-4">Location</h2>
        <div class="container mx-auto px-6 overflow-x-auto">
          <div class="flex flex-row justify-between">
            <div class="">
            <span > Title</span>
     <form>
                      <input @keyup.enter="getData" v-model="filter.name" type="text" placeholder="Search" class=" placeholder:italic placeholder-slate-400 rounded mt-1 px-2 border border-slate-600  h-10    contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
<!--front end validation for search-->
          </form>
            </div>
              <div class="">
            <span > City</span>
     <form>
                      <input @keyup.enter="getData" v-model="filter.city" type="text" placeholder="Search" class=" placeholder:italic placeholder-slate-400 rounded mt-1 px-2 border border-slate-600  h-10    contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
<!--front end validation for search-->
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
      <th class="px-2">Title </th>
      <th class="px-2">City</th>
      <th class="px-2">Action</th>
    </tr>
  </thead>
  <tbody v-if="!loading">
    <tr v-for="(item, index) in locationList" :key="item.id" class=" space-x-8 space-y-1 text-center text-sm">
      <td>{{index +1}}</td>

      <td class=""> {{dayjs(item.modified_at).format('ddd DD, MMMM, YYYY')}}</td>
            <td>{{item.name}}</td>
      <td>{{item.city}}</td>

      <td class="flex justify-center">
          <Button
          :button-class="'cursor-pointer '"
          @click="edit(item)"
        >
          <template #button-content>
                   <IconBase :class-prop="'h-7 w-5  mouse-pointer hover:text-purple-500'" :path="$options.icons.mdiEdit" :view-box-value="'0,0,24,28'"    />

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
    :modal-title="'Add Location'"
    :action-name="formData.id ? 'Update': 'Save'"
  @close="closeFormModal"
    @confirm="postData"
  >
    <template #form-content>
    <div class="flex my-6 mx-4">
  <div class="flex-1">
    <span> Title</span>
     <form>
            <input v-model="formData.name" placeholder="Eg: Eglinton" type="text" class="border-slate-200 my-1  p-2 w-11/12 placeholder:italic placeholder-slate-400 rounded mt-1 px-2 border border-slate-600"/>
              <InputValidation :error-text="formValidator.getError('name')" />

          </form>

  </div>
   <div class="flex-1">
    <span> City</span>
     <form>
            <input v-model="formData.city" type="text" placeholder="Eg: Toronto" class="border-slate-200 my-1  p-2 w-11/12 placeholder:italic placeholder-slate-400 rounded mt-1 px-2 border border-slate-600"/>
              <InputValidation :error-text="formValidator.getError('city')" />

          </form>

  </div>
  </div>

                             <div class="flex my-6 mx-4">
<!--   <div class="flex-1">-->
<!--    <span class="mb-2">Active</span>-->
<!--    <form>-->
<!--            <input v-model="formData.is_active" type="checkbox" :class="formData.is_superuser? 'pointer-events-none': 'pointer-events-auto'" class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->

<!--&lt;!&ndash;            <input v-model="formData.location" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>&ndash;&gt;-->
<!--          </form>-->
<!--&lt;!&ndash;              <InputValidation :error-text="formValidator.getError('location')" />&ndash;&gt;-->



<!--  </div>-->
                 <div class="flex-1">
    <span>Active</span>

          <form>
            <input v-model="formData.is_active" type="checkbox"  class="border-slate-200 bg-gray-400 my-1 p-2 w-11/12 placeholder-slate-800 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>

<!--            <input v-model="formData.location" class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>-->
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
      locationList: [],
      formData: {
        name: '',
        city: '',
        is_active: true,

      },
      loading: false,
      formValidator: new FormValidator(),
      filter: {
        name: '',
        city: '',

      },
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
      this.formValidator.setError({})
       this.filter= {
        name: '',
        city: ''

      }
    },
getData () {
      this.loading = true
  let geturl =`location/`
  if(this.filter.name || this.filter.city){
    geturl = geturl + `?name=${this.filter.name}&city=${this.filter.city}`
  }
      this.$axios.get(geturl)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.locationList = response.data
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
      this.formData.provience = 'Ontario'
      this.formData.country = 'Canada'
      if (!this.formData.id) {
          console.log(this.formData);
          this.$axios
            .$post('location/', this.formData)
            .then((response) => {
              this.locationList.unshift(response)

              // if(response.registration_stage )
              // this.setNotifyMessage({
              //   message: 'Successfully Login. Enjoy Shopping.',
              //   color: 'green',
              // })
              // this.$store.dispatch('registration/addUserRegistrationDetails', response)
              this.$store.dispatch('showSnackbar', {
                text: 'New location Successfully Added !',
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
                message: 'New location Cannot be Added.',
                color: 'red',
              })
            })

      } else {
        this.$axios.$put(`location/${this.formData.id}/`, this.formData)
          .then(() => {
            this.showForm = false
            this.getData()
            this.formData = {}
            this.$store.dispatch('showSnackbar', {
              text: 'Location Successfully Updated !',
              class: 'bg-purple-500 text-white'
            })
          })
          .catch((error) => {
            this.$store.dispatch('showSnackbar', {
              text: 'Location Cannot be Created !',
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
