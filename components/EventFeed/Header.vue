<template>

    <nav class="flex bg-gray-300 h-20 py-4">

      <div v-if="$store.state.user" class="w-20">
        <Button
          :button-class="'hover:bg-purple-500 cursor-pointer mx-2 md:mx-8 lg:mx-10'"
          @click="$emit('sidebar')"
        >
          <template v-slot:button-content>
          <IconBase :class-prop="'h-8 w-8'" :path="$options.icons.uniBars" :view-box-value="'0,0,24,28'"    />

          </template>
        </Button>
      </div>
      <div class="flex  flex-shrink-0 text-black mx-6">
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
        <span class="font-semibold default-font text-xl">Wireless Hotspot</span>
      </div>
      <div v-if="!!$store.state.user" class="">
        <DropDown
                :class="'w-grow'"
                :selected-text-class="'text-black default-font'"
                :button-class="'only-text border-2 -top-6 '"
                :selected-text="$store.state.user? $store.state.user.first_name : 'Name'"
                :drop-down-open-close="!!$store.state.user"
                @close="!!$store.state.user"
              >
                <template #dropdown-elements>
                  <div
                    v-for="(item, index) in headingTitleList"
                    :key="index"
                    class=" text-center"
                  >
                    <Button
                      :title="item.title"
                      :icon="item.icon"
                      :button-class="'secondary-button hover:text-gray-500 px-2 py-2'"
                      :button-title-class="'text-black'"
                      @click="selectHeadingTitle(item)"
                    />
                    <div v-if="index < headingTitleList.length -1" class="w-full border text-gray-500" />
                  </div>
                </template>
              </DropDown>
      </div>

    </nav>
</template>

<script>
 import {  uniLogOut, uniBars } from '@/icons/index'
import Button from "@/components/common/Button.vue";
 import IconBase from "@/components/common/IconBase.vue";
 // import IconBase from "@/components/common/IconBase.vue";
// import Avatar from '../Common/Avatar.vue'
// import AddOrganization from '~/components/Organization/AddOrganization'
export default {
  name: 'HeaderItem',
  components: {IconBase, Button, },
  icons: { uniLogOut, uniBars },

  data () {
    return {
      dropdownOpen: false,
      showSearchBar: false,
      search: '',
       headingTitleList: [
        {
          icon: this.$options.icons.uniLogOut,
          title: 'Log Out',
          action: 'logout'
        }
      ]
    }
  },
  methods: {
    logout () {

        this.$store.dispatch('logout')
      },

    selectHeadingTitle(item){
      if (item.action === 'logout'){

        this.$router.push('/')
      }

    }

  }
}
</script>

<style scoped>
  .background-overlay {
    position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  }
</style>
