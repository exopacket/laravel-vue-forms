<template>
  <div v-for="(section, i) in formSections">
    <transition :name="transition">
      <div v-show="(independentSections && i === currentSection) || !independentSections" class="bg-white p-5 rounded-lg shadow-md">
          <div class="pb-3 mb-2" v-show="!(!section.title && !section.subtitle)">
            <h3 class="text-xl font-semibold leading-6 text-gray-900" v-show="section.title">{{ section.title }}</h3>
            <p class="mt-2 max-w-4xl text-sm text-gray-500" v-show="section.subtitle">{{ section.subtitle }}</p>
          </div>
          <nav aria-label="Progress" class="mb-5">
            <ol role="list" class="bg-white divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
            <li v-for="(step, stepIdx) in steps" :key="step.name" class="relative md:flex md:flex-1">
              <a v-if="step.status === 'complete'" :href="step.href" class="group flex w-full items-center">
          <span class="flex items-center px-6 py-4 text-sm font-medium">
            <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
              <CheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <span class="ml-4 text-sm font-medium text-gray-900">{{ step.name }}</span>
          </span>
              </a>
              <a v-else-if="step.status === 'current'" :href="step.href" class="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
          <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
            <span class="text-indigo-600">{{ step.id }}</span>
          </span>
                <span class="ml-4 text-sm font-medium text-indigo-600">{{ step.name }}</span>
              </a>
              <a v-else :href="step.href" class="group flex items-center">
          <span class="flex items-center px-6 py-4 text-sm font-medium">
            <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
              <span class="text-gray-500 group-hover:text-gray-900">{{ step.id }}</span>
            </span>
            <span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
          </span>
              </a>
              <template v-if="stepIdx !== steps.length - 1">
                <!-- Arrow separator for lg screens and up -->
                <div class="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                  <svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                    <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
                  </svg>
                </div>
              </template>
            </li>
          </ol>
          </nav>
          <InlineAlert v-if="problems || alertText" :message="alertText" :problems="problems" :type="alertStyle" class="mb-4"/>
          <FormElement
              v-for="(element) in section.elements"
              :element="element"
              :ref="'el_' + i"
              class="mb-4"
              @submit="handleSubmit"
          />
      </div>
    </transition>
  </div>
</template>

<script setup>
import FormElement from "@/views/components/forms/FormElement.vue";
import InlineAlert from "@/views/components/alerts/InlineAlert.vue";
import { CheckIcon } from '@heroicons/vue/24/solid'

const steps = [


  { id: '01', name: 'Job details', href: '#', status: 'complete' },
  { id: '02', name: 'Application form', href: '#', status: 'current' },
  { id: '03', name: 'Preview', href: '#', status: 'upcoming' },
]
</script>

<script>
export default {
  expose: ['values', 'validate', 'next'],
  props: {
    sections: {
      type: Array,
      required: true
    },
    error: {
      type: Object,
    },
    attrs: {
      type: Object
    },
  },
  data() {
    return {
        formSections: this.sections,
        independentSections: this.attrs.independent,
        currentSection: 0,
        transition: this.attrs.transition ?? "",
        alertText: null,
        problems: null,
        alertStyle: null,
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit')
    },
    next() {
      if(this.sections.length - 1 > this.currentSection) {
        this.currentSection++;
        return true;
      }
      return false;
    },
    values() {
      let formData = []
      this.sections.forEach((section, i) => {
        if(this.independentSections && !(this.currentSection === i)) return
        section.elements.forEach((element, index) => {
          formData.push([element.key, this.$refs['el_' + i][index].value()])
        })
      })
      return formData
    },
    validate() {
      let isValid = true
      this.sections.forEach((section, i) => {
        if(this.independentSections && this.currentSection !== i) return
        section.elements.forEach((element, index) => {
           if(!this.$refs['el_' + i][index].validate()) isValid = false
        })
      })
      return isValid
    },
  },
  created() {
    this.alertStyle = this.error?.style ?? "danger"
    this.alertText = this.error?.message ?? null
    this.problems = this.error?.problems ?? null
  },
  watch: {
    error(value) {
      this.alertStyle = value?.style ?? "danger"
      this.alertText = value?.message ?? null
      this.problems = value?.problems ?? null
    }
  }
}
</script>

<style scoped>
.slide-enter-active,.slide-leave-active {  transition: all 0.75s ease-out;}.slide-enter-to {  position: absolute;  right: 0;}.slide-enter-from {  position: absolute;  right: -100%;}.slide-leave-to {  position: absolute;  left: -100%;}.slide-leave-from {  position: absolute;  left: 0;}
</style>