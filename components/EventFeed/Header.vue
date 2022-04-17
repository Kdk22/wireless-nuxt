<template>
  <div
    id="home"
    :class="addOrganizationModal ? 'background-overlay': '' "
    class="fixed top-0 w-full z-30 py-4 bg-primary"
  >
    <div class="container max-w-full">
      <nav class="flex justify-between flex-wrap">
        <div class="flex items-center flex-shrink-0 text-black mr-6">
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
          <span class="font-semibold default-font text-xl">Biz Event</span>
        </div>
        <div class="lg:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded border-primary hover:text-gray hover:border-white focus:outline-none"
            @click="dropdownOpen = !dropdownOpen"
          >
            <svg
              class="h-4 w-4 fill-current text-black"
              viewBox="0 0 480 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title class="text-black">Menu</title>
              <path
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              />
            </svg>
          </button>
        </div>
        <div
          :class="{ hidden: !dropdownOpen, block: dropdownOpen }"
          class="w-full block flex-grow lg:flex lg:w-auto"
          @click="dropdownOpen = false"
        >
          <div
            class="text-lg w-full flex-grow lg:flex  lg:items-center lg:w-auto lg:justify-center"
          >
            <a
              v-for="(item, index) in headingTitle"
              :key="index"
              class="block lg:inline-block"
            >
              <Button
                :title="item.title"
                :class="$route.path === item.route ? ' border-t-4 border-blue-500': 'border-white'"
                :button-class="'inline-flex items-center  px-4 pt-2 text-gray-500 default-font hover:text-gray-500'"
                @click="headerClicked(item)"
              />
            </a>
          </div>
          <div v-if="showSearchBar" class="animated fadeInLeft pt-2 pr-2">
            <input
              v-model="search"
              class="inputFieldClass"
              type="text"
              placeholder="Search"
            >
          </div>
          <div>
            <Button
              :button-class="'p-4 border-none'"
              :icon="$options.icons.uniSearchAlt"
              :icon-class="'primary-icon'"
              @click="showSearchBar = !showSearchBar"
            />
          </div>
        </div>
        <div class="cursor-pointer" @click="showDropDown = !showDropDown">
          <Avatar
            :image-path="$auth.user.profile_picture"
            :image-class="'h-12 w-12 rounded-full  transform scale-85 border-2 border-white'"
            :div-class="'flex rounded-full border-2 border-blue-500'"
          />
          <transition
            enter-active-class="transition ease-out duration-75 transform"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75 transform"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div v-if="showDropDown" class=" absolute z-30 right-0 w-28 rounded-md shadow-lg">
              <div
                v-for="(item, index) in userActions"
                :key="`${index}-ec`"
                class="rounded-md bg-white shadow-xs"
              >
                <Button
                  :title="item.title"
                  :icon="item.icon"
                  :button-class="'secondary-button pt-3 hover:text-gray-500  font-extrabold'"
                  :icon-class="'fill-current wh-4 ml-2 mt-1 text-darkblue'"
                  :before-icon="false"
                  :button-title-class="'text-darkblue py-2 px-4 default-font'"
                  @click="callUserAction(item)"
                />
              </div>
            </div>
          </transition>
        </div>
      </nav>
      <div
        v-if="addOrganizationModal"
        class="flex flex-col"
      >
        <div
          class=" shadow-2xl animated fadeInUp fixed z-50 overflow-auto bg-white rounded sm:w-full md:w-full lg:w-1/2 lg:mt-2 lg:ml-56"
        >
<!--          <AddOrganization @close="addOrganizationModal = !addOrganizationModal" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uniChevronDropDown, uniSearchAlt, uniPlus, uniLogOut } from '../../icons/index'
import Button from '../Common/Button.vue'
import Avatar from '../Common/Avatar.vue'
// import AddOrganization from '~/components/Organization/AddOrganization'
export default {
  name: 'HeaderItem',
  components: {  Avatar, Button },
  icons: { uniChevronDropDown, uniSearchAlt, uniPlus, uniLogOut },

  data () {
    return {
      dropdownOpen: false,
      showSearchBar: false,
      search: '',
      showDropDown: false,
      showBar: false,
      addOrganizationModal: false,
      headingTitle: [
        {
          icon: '',
          title: 'Home',
          route: '/'
        },
        {
          icon: '',
          title: 'Profile',
          route: '/profile'
        },
        {
          icon: '',
          title: 'Notification',
          route: '/notification'
        },
        {
          icon: '',
          title: 'Watch',
          route: '/watch'
        },
        {
          icon: '',
          title: 'Messenger',
          route: '/messenger'
        },
        {
          icon: '',
          title: 'Live',
          route: '/live'
        },
        {
          icon: '',
          title: 'Blog',
          route: '/blog/landing'
        }
      ],
      userActions: [
        {
          icon: this.$options.icons.uniPlus,
          title: 'Add Organization'
        },
        {
          icon: this.$options.icons.uniLogOut,
          title: 'Log Out'
        }
      ]
    }
  },
  methods: {
    callUserAction (item) {
      if (item.title === 'Add Organization') {
        this.toggleOrganizationModal()
      } else {
        this.$auth.logout()
      }
    },
    toggleOrganizationModal () {
      this.addOrganizationModal = !this.addOrganizationModal
    },

    headerClicked (item) {
      this.$router.push(`${item.route}`)
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
