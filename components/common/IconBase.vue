<template>
  <svg
    :class="[classProp]"
    :aria-labelledby="iconName"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBoxValue"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <g :fill="iconColor" v-html="path" />
  </svg>
</template>
<script>
export default {
  props: {
    iconName: {
      type: String,
      default: ''
    },
    classProp: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    path: {
      type: String,
      default: ''
    },
    viewBoxValue: {
      type: String,
      default: '0,0,24,24'
    }
  }
}
</script>
<style>
.primary-icon {
  @apply fill-current w-6 h-6 text-black;
}
.wh-4 {
  @apply w-4 h-4;
}
</style>
