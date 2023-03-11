<template>
  <div>
    <div class="flex justify-between" v-if="!(!title && !cornerText)">
      <label class="block text-sm font-medium leading-6 text-gray-900">{{ title }}</label>
      <span class="text-sm leading-6 text-gray-500" v-if="cornerText">{{ cornerText }}</span>
    </div>
    <div class="relative mt-2 rounded-md">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" v-if="prependIcon">
        <Icon :name="prependIcon" shade="400" color="gray" size="18"/>
      </div>
      <input type="text"
             :class="style + ' ' + (prependIcon !== null ? 'pl-10' : '')"
             :placeholder="placeholder"
             v-model="input"
             @input="onChange"
      />
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="validationError">
        <Icon name="exclamation-circle-fill" shade="600" color="red" size="18"/>
      </div>
    </div>
    <p class="mt-2 text-sm text-red-600" v-if="validationError">{{ validationError }}</p>
    <p class="mt-2 text-sm text-gray-500" v-if="!validationError && helpText">{{ helpText }}</p>
  </div>
</template>

<script setup>
import Icon from "@/views/components/Icon.vue";
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