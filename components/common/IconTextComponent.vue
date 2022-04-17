<template>
  <div class="flex flex-row px-2 py-2">
    <IconBase
      :path="iconPath"
      :class-prop="iconBaseClass"
    />
    <slot name="add-content">
      <div class="inline-block px-4">
        <span :class="titleClass">{{ title }}</span>
        <div :class="contentClass">
          {{ content || '-' }}
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'IconTextComponent',
  props: {
    iconPath: {
      type: String,
      required: true
    },
    iconBaseClass: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    titleClass: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .icon-size-class {
    @apply h-8 w-8 pt-2 fill-current mt-1 text-gray-500;
  }
  .size-font {
    @apply text-sm font-sourceSansPro;
  }

</style>
