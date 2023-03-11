<template>
  <div>
    <TextInput v-if="el.type === 'text'" :attrs="el" :ref="el.type" />
    <PasswordInput v-else-if="el.type === 'password'" :attrs="el" :ref="el.type" />
    <EmailInput v-else-if="el.type === 'email'" :attrs="el" :ref="el.type" />
    <PhoneInput v-else-if="el.type === 'phone'" :attrs="el" :ref="el.type" />
    <EmailOrPhoneInput v-else-if="el.type === 'contact'" :attrs="el" :ref="el.type" />
  </div>
</template>

<script setup>
import TextInput from "@/views/components/forms/elements/TextInput.vue";
import PasswordInput from "@/views/components/forms/elements/PasswordInput.vue";
import EmailInput from "@/views/components/forms/elements/EmailInput.vue";
import EmailOrPhoneInput from "@/views/components/forms/elements/EmailOrPhoneInput.vue";
import PhoneInput from "@/views/components/forms/elements/PhoneInput.vue";
</script>

<script>
export default {
  expose: ['validate', 'value'],
  props: {
    element: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      el: this.element
    }
  },
  methods: {
    validate() {
      return this.$refs[this.el.type].validate()
    },
    value() {
      return this.$refs[this.el.type].value()
    }
  },
}
</script>

<style scoped>

</style>