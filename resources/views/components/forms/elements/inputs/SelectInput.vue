<template>
  <div>
    <div class="flex justify-between" v-if="!(!title && !cornerText)">
      <label class="block text-sm font-medium leading-6 text-gray-900">{{ title }}</label>
      <span class="text-sm leading-6 text-gray-500" v-if="cornerText">{{ cornerText }}</span>
    </div>
    <div class="relative mt-2 rounded-md">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" v-if="prependIcon || selectedIcon || loadingOptions">
        <Icon v-if="!loadingOptions" :name="(prependIcon) ? prependIcon : selectedIcon" shade="400" color="gray" size="18"/>
        <CircleLoader v-if="loadingOptions" px="18" />
      </div>
      <Listbox as="div" v-model="input" @update:model-value="this.validationError = null" :disabled="loadingOptions">
        <div class="relative mt-2 text-left">
          <ListboxButton :class="style + ' ' + ((prependIcon || selectedIcon || loadingOptions) ? 'pl-10' : '')">
            <span :class="[(!input) ? 'text-gray-400' : '', 'block truncate text-left']">{{(!input && placeholder) ? placeholder : (selectedText ?? 'Select a ' + title) }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Icon name="chevron-expand" color="gray" shade="400" size="18" />
            </span>
          </ListboxButton>

          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <ListboxOption v-slot="{ active, selected }" value="create" v-if="createOption">
                <li :class="[active ? 'bg-[#0f75bc] text-white' : 'text-gray-900 bg-gray-100', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                  <span :class="['text-white absolute inset-y-0 left-0 flex items-center pl-2']">
                      <Icon name="plus" color="slate" shade="700" size="22" />
                  </span>
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate pl-6']">Create new {{ title }}</span>
                  <span v-if="active && selected" :class="['text-white absolute inset-y-0 right-0 flex items-center pr-4']">
                      <Icon name="check" color="white" size="26" />
                  </span>
                  <span v-else-if="selected" :class="['text-white absolute inset-y-0 right-0 flex items-center pr-4']">
                      <Icon name="check" color="[#0f75bc]" size="26" />
                  </span>
                </li>
              </ListboxOption>
              <ListboxOption v-slot="{ active, selected }" value="empty" v-if="emptyOption">
                <li :class="[active ? 'bg-[#0f75bc] text-white' : 'text-gray-900 bg-gray-100', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                  <span :class="['text-white absolute inset-y-0 left-0 flex items-center pl-2']">
                      <Icon name="slash-circle" color="slate" shade="700" size="18" />
                  </span>
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate pl-6']">Continue without a {{ title }}</span>
                  <span v-if="active && selected" :class="['text-white absolute inset-y-0 right-0 flex items-center pr-4']">
                      <Icon name="check" color="white" size="26" />
                  </span>
                  <span v-else-if="selected" :class="['text-white absolute inset-y-0 right-0 flex items-center pr-4']">
                      <Icon name="check" color="[#0f75bc]" size="26" />
                  </span>
                </li>
              </ListboxOption>
              <div class="border-b border-gray-200 my-2"></div>
              <ListboxOption as="template" v-for="option in options" :value="option" v-slot="{ active, selected }">
                <li :class="[active ? 'bg-[#0f75bc] text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ option[textKey] }}</span>
                  <span v-if="active && selected" :class="['text-white absolute inset-y-0 right-0 flex items-center pr-4']">
                      <Icon name="check" color="white" size="26" />
                  </span>
                  <span v-else-if="selected" :class="['text-white absolute inset-y-0 right-0 flex items-center pr-4']">
                      <Icon name="check" color="[#0f75bc]" size="26" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
      <div class="pointer-events-none absolute inset-y-0 right-6 flex items-center pr-3" v-if="validationError">
        <Icon name="exclamation-circle-fill" shade="600" color="red" size="18"/>
      </div>
    </div>
    <p class="mt-2 text-sm text-red-600" v-if="validationError">{{ validationError }}</p>
    <p class="mt-2 text-sm text-gray-500" v-if="!validationError && helpText">{{ helpText }}</p>
  </div>
</template>

<script setup>
import Icon from "@/views/components/Icon.vue";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import CircleLoader from "@/views/components/loaders/CircleLoader.vue";
</script>

<script>

import {mapGetters} from "vuex";

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
      input: null,
      emptyOption: this.attrs.emptyOption ?? false,
      placeholder: this.attrs.placeholder ?? "",
      helpText: this.attrs.helpText ?? "",
      cornerText: this.attrs.cornerText ?? "",
      required: this.attrs.required ?? false,
      validationError: null,
      prependIcon: this.attrs.prependIcon ?? null,
      getOptions: this.attrs.getOptions ?? null,
      getOptionsLoading: this.attrs.getOptionsLoading ?? null,
      getOptionsValues: this.attrs.getOptionsValues ?? null,
      definedOptions: this.attrs.options ?? [],
      createOption: this.attrs.createOption ?? null,
      textKey: this.attrs.optionKey ?? "text",
      valueKey: this.attrs.optionValue ?? "id",
      style: "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0f75bc] focus:outline-none focus:ring-[#0f75bc] sm:text-sm"
    }
  },
  computed: {
    loadingOptions() {
      if(this.getOptionsLoading) return this.$store.getters[this.getOptionsLoading]
      else return false
    },
    options() {
      if(!this.loadingOptions) {
        if(!this.getOptions) return this.definedOptions
        else return this.$store.getters[this.getOptionsValues]
      }
      return [];
    },
    selectedIcon() {
      if(this.input) {
        if(this.input === 'create') {
          return "plus"
        } else if(this.input === 'empty') {
          return "slash-circle"
        } else {
          return this.input.icon ?? null;
        }
      }
      return null;
    },
    selectedText() {
      if(this.input) {
        if(this.input === 'create') {
          return "Create new " + this.title
        } else if(this.input === 'empty') {
          return "Continue without a " + this.title
        } else {
          return this.input[this.textKey]
        }
      }
      return null;
    }
  },
  async created() {
    this.input = this.attrs.value ?? null
    if(this.getOptions && this.getOptionsLoading) {
      this.$store.dispatch(this.getOptions)
    }
  },
  methods: {
    value() {
      if(this.validate()) return this.input.value
      return null
    },
    validate() {
      if(this.required && !this.input) return this.invalid(this.title + " is required.")
      return true;
    },
    invalid(msg, clear = false) {
      if(clear) this.value = ""
      this.validationError = msg
      return false;
    },
  }
}
</script>