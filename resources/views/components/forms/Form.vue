<template>

  <div class="text-left">
    <StackedForm :error="error" :sections="def.sections" :attrs="def.layout.attrs" :ref="def.name" v-if="def.layout.name === 'Stacked'" @submit="submit"/>
    <StackedStepsForm :error="error" :sections="def.sections" :attrs="def.layout.attrs" :ref="def.name" v-if="def.layout.name === 'StackedSteps'" @submit="submit"/>
  </div>

</template>

<script setup>
import StackedForm from "@/views/components/forms/layouts/StackedForm.vue";
import StackedStepsForm from "@/views/components/forms/layouts/StackedStepsForm.vue";
</script>

<script>

import {ApiCall} from "@/js/utils/api-call.js";

export default {
  expose: ['submit', 'submitAsync'],
  props: {
    form: {
      type: Object,
      required: true,
    },
    action: {
      type: String
    }
  },
  data() {
    return {
      def: this.form.default,
      independentSections: this.form.default.layout.attrs.independent ?? false,
      error: null,
      requestPath: this.action ?? null
    }
  },
  methods: {
    async submit(path = null) {
      if(path === null) path = this.requestPath
      if(path === null) return
      this.error = null
      if(this.$refs[this.def.name].validate()) {
        let data = this.$refs[this.def.name].values()
        let res = await new ApiCall(path, data).post()
        res.handle((data) => {
          if(data.type === "error") {
            this.error = {
              message: data.message,
              problems: data.problems
            }
          } else {
            //handle default global notification
          }
        })
      }
    },

    async submitAsync(loaderText, dispatch, path = null) {
      if(path === null) path = this.requestPath
      if(path === null) return
      this.error = null
      if(this.$refs[this.def.name].validate()) {
        let data = this.$refs[this.def.name].values()
        let res = await new ApiCall(path, data).postAsync(loaderText, dispatch)
        res.handle((data) => {
          if(data.type === "error") {
            this.error = {
              message: data.message,
              problems: data.problems
            }
          } else {
            //handle default global notification
          }
        })
      }
    }

  }
}
</script>

<style scoped>

</style>