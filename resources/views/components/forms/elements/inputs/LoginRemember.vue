<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <input v-model="input" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-[#0f75bc] focus:ring-[#0f75bc]" />
      <label @click="toggle" class="ml-2 block text-sm text-gray-900">Remember me</label>
    </div>

    <div class="text-sm">
      <a :href="forgotLink" class="font-medium text-[#0f75bc] hover:text-[#0f75bc]">Forgot your password?</a>
    </div>
  </div>
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
      input: '',
      forgotLink: this.attrs.forgotLink ?? "#"
    }
  },
  created() {
    this.input = this.attrs.value ?? false
  },
  methods: {
    value() {
      if(this.validate()) return this.input
      return null
    },
    validate() {
      return true;
    },
    toggle() {
      this.input = !this.input
    },
  }
}
</script>