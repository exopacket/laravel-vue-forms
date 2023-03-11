<template>
  <div v-for="(section, i) in formSections">
    <transition :name="transition">
      <div v-show="(independentSections && i === currentSection) || !independentSections">
          <div class="border-b border-gray-200 pb-3 mb-5" v-show="!(!section.title && !section.subtitle)">
            <h3 class="text-base font-semibold leading-6 text-gray-900" v-show="section.title">{{ section.title }}</h3>
            <p class="mt-2 max-w-4xl text-sm text-gray-500" v-show="section.subtitle">{{ section.subtitle }}</p>
          </div>
          <InlineAlert v-if="problems || alertText" :message="alertText" :problems="problems" :type="alertStyle" class="mb-4"/>
          <FormElement
              v-for="(element) in section.elements"
              :element="element"
              :ref="'el_' + i"
              class="mb-4"
          />
      </div>
    </transition>
  </div>
</template>

<script setup>
import FormElement from "@/views/components/forms/FormElement.vue";
import InlineAlert from "@/views/components/alerts/InlineAlert.vue";
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