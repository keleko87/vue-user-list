<template>
  <button @click="$emit('trigger')"><slot></slot></button>
</template>

<script>
export default {
  name: 'button-modal',
}
</script>
