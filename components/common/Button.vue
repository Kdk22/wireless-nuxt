<template>
  <button
    :class="[buttonClass]"
    class="focus:outline-none"
    @click="$emit('click')"
  >
    <slot name="buttonContent">
      <span v-if="beforeIcon" :class="[buttonTitleClass]">{{ title }}</span>
      <IconBase v-if="icon" :class-prop="iconClass" :path="icon" :view-box-value="iconViewBox" />
      <span v-if="!beforeIcon" :class="[buttonTitleClass]">{{ title }}</span>
    </slot>
  </button>
</template>

<script>
import IconBase from '@/components/Common/IconBase.vue'
export default {
  name: 'Button',
  components: { IconBase },
  props: {
    icon: {
      type: String,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false,
      default: 'Button Name'
    },
    buttonClass: {
      type: String,
      default: 'Button Class'
    },
    iconClass: {
      type: String,
      required: false,
      default: 'Button Icon Class'
    },
    beforeIcon: {
      type: Boolean,
      default: true
    },
    buttonTitleClass: {
      type: String,
      default: 'Button Title Class'
    },
    iconViewBox: {
      type: String,
      default: '0,0,24,24'
    }
  }
}
</script>

<style scoped>
.primary-button {
  @apply px-4 font-semibold text-white rounded border border-primarybuttoncolor font-sourceSansPro inline-flex items-center  bg-primarybuttoncolor;
}
.secondary-button {
  @apply inline-flex items-center border-none;
}
  .authenticationButtonClass {
    @apply py-3 px-4   font-semibold text-white  border border-primarybuttoncolor font-sourceSansPro  bg-blue-600
  }
</style>
