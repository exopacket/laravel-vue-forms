<template>

  <div>
    <StackedForm :error="error" :sections="def.sections" :attrs="def.layout.attrs" :ref="def.name" v-if="def.layout.name === 'Stacked'" />
  </div>

</template>

<script setup>
import StackedForm from "@/views/components/forms/layouts/StackedForm.vue";
</script>

<script>

import {ApiCall} from "@/js/utils/api-call.js";

export default {
  expose: ['submit'],
  props: {
    form: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      def: this.form.default,
      independentSections: this.form.default.layout.attrs.independent ?? false,
      error: null,
    }
  },
  methods: {
    async submit(path) {
      this.error = null
      if(this.$refs[this.def.name].validate()) {
        let data = this.$refs[this.def.name].values()
        let res = await new ApiCall(path, data).push("remember", true).post()
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