<template>
  <button @click="clicked" type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-[#0f75bc] hover:opacity-90 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f75bc] focus:ring-offset-2">
    {{ text }}
  </button>
</template>

<script setup>

</script>

<script>
export default {
  expose: ['value', 'validate'],
  props: {
    attrs: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      text: this.attrs.text ?? "Submit"
    }
  },
  methods: {
    clicked() {
      this.$emit('submit')
    }
  }
}
</script>