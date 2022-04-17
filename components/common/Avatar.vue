<template>
  <div :class="divClass">
    <img
      :src="imagePath"
      :class="imageClass"
    >
    <slot name="add-content">
      <div v-if="userName" class="inline-block pt-2">
        <span class="text-sm text-black default-font"> {{ userName }} </span>
        <div class="text-tiny text-gray-600 default-font">
          {{ jobTitle }}
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'AvatarItem',
  props: {
    imagePath: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: '',
      required: false
    },
    jobTitle: {
      type: String,
      required: false,
      default: ''
    },
    imageClass: {
      type: String,
      required: false,
      default: 'border-4 border-blue-500'
    },
    divClass: {
      type: String,
      required: false,
      default: 'flex'
    }
  }
}
</script>

<style scoped>
.rounded-image {
  @apply rounded-full;
}
.center {
  @apply items-center justify-center;
}
  .rounded-image-transform {
    @apply rounded-full transform;
  }
  .scale75 {
    @apply scale-75;
  }
  .h-w-16 {
    @apply h-16 w-16;
  }
</style>
