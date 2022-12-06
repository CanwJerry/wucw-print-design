<template>
  <div class="Wbutton">
    <button
      class="w-btn"
      @click="handleClick"
    >
      <slot>登录</slot>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Wbutton'
  }
</script>

<script setup>
  const props = defineProps({
    content: {
      type: String,
      default: ''
    }
  })

  const emits = defineEmits(['click']);

  const handleClick = () => {
    emits('click');
  }

</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>