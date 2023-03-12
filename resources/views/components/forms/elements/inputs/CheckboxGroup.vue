<template>
  <div class="space-y-5">
    <div class="relative flex items-start">
      <div class="flex h-6 items-center">
        <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label class="font-medium text-gray-900">Comments</label>
        <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
      </div>
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
      title: this.attrs.title ?? "",
      input: '',
      placeholder: this.attrs.placeholder ?? "",
      helpText: this.attrs.helpText ?? "",
      cornerText: this.attrs.cornerText ?? "",
      required: this.attrs.required ?? false,
      validationError: null,
      prependIcon: this.attrs.prependIcon ?? null,
      style: "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0f75bc] focus:outline-none focus:ring-[#0f75bc] sm:text-sm"
    }
  },
  created() {
    this.input = this.attrs.value ?? ""
  },
  methods: {
    value() {
      if(this.validate()) return this.input
      return null
    },
    validate() {
      const trimmed = this.input.trim()
      if(trimmed === '' && this.required)
        return this.invalid(this.title + " is required.")
      return true;
    },
    invalid(msg, clear = false) {
      if(clear) this.value = ""
      this.validationError = msg
      return false;
    },
    onChange() {
      this.validationError = null
    },
  }
}
</script>