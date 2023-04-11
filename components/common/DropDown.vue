<template>
  <div class="relative inline-block">
    <span>
      <button type="button" class="focus:outline-none " :class="buttonClass " @click="$emit('close')">
        <div v-if="selectedText" class="pt-2 px-1 font-semibold rounded-lg text-white default-font">
          <span class="text-center text-sm " :class="selectedTextClass"> {{ selectedText }}</span>
        </div>
        <IconBase
          v-if="selectedIcon"
          :path="selectedIcon"
          :view-box-value="'0,0,30,30'"
          :class-prop="' fill-current w-8 h-8 mt-2 text-gray-600'"
        />
        <svg class="h-10 w-5 align-center" viewBox="0 -1 20 20" fill="currentColor">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </span>
    <!--
    Dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <transition
      enter-active-class="transition ease-out duration-75 transform"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isOpen" class=" absolute z-30 right-0 w-28 rounded-md shadow-lg">
        <div class="rounded-md bg-white shadow-xs">
          <slot name="dropdown-elements" />
          <!--
          Inside slot add all the dropdown elements list
          -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import IconBase from '../../components/Common/IconBase.vue'
export default {
  name: 'DropDown',
  components: { IconBase },
  props: {
    selectedText: {
      type: String,
      default: ''
    },
    dropDownOpenClose: {
      type: Boolean,
      default: false
    },
    selectedIcon: {
      type: String,
      default: ''
    },
    buttonClass: {
      type: String,
      default: ''
    },
    selectedTextClass: {
      type: String,
      default: 'text-white'
    }
  },
  data () {
    return {
      isOpen: this.dropDownOpenClose
    }
  },
  watch: {
    dropDownOpenClose (val) {
      this.isOpen = val
    }
  }
}
</script>

<style scoped>
.only-icon {
  @apply inline-flex justify-center w-full px-4 py-4 bg-white text-sm leading-5 font-medium text-gray-700;
}
  .only-text {
    @apply inline-flex justify-center w-full  px-3 font-semibold rounded-lg  font-sourceSansPro;
  }
</style>

