<template>
  <div class="flex flex-auto ">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(item, index) in menuItems"
       :key="index"
        class="col-auto m-2 shadow-xl hover:bg-purple-500 bg-gray-100 shadow-gray-500"

                   >
                    <Button
                      :title="item.title"
                      :button-class="'group block max-w-xs mx-auto  p-6 active:bg-purple-500 focus:outline-none focus:ring focus:bg-purple-500'"
                      :button-title-class="'text-black text-sm font-semibold'"
                      @click="$router.push(item.action)"
                    />


      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/common/Button.vue";

export default {
  name: "index",

  components:{
    Button


  },
  data(){
    return {
  menuItems: [
        {


          title: 'Users',
            action: "users"
        },
        {
          title: 'Plans',
           action: "plans"
        },
        {
          title: 'Location',
           action: "locations"
        }
      ],
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
