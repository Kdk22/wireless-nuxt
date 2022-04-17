<template>
  <span class="text-red-400  text-tiny capitalize default-font"> {{ errorText }}</span>
</template>

<script>
export default {
  name: 'InputValidation',
  props: {
    errorText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
