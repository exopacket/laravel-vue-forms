<template>
  <div>
    <TextInput v-if="el.type === 'text'" :attrs="el" :ref="el.type" @submit="$emit('submit')" />
    <PasswordInput v-else-if="el.type === 'password'" :attrs="el" :ref="el.type" @submit="$emit('submit')" />
    <EmailInput v-else-if="el.type === 'email'" :attrs="el" :ref="el.type" @submit="$emit('submit')" />
    <PhoneInput v-else-if="el.type === 'phone'" :attrs="el" :ref="el.type" @submit="$emit('submit')" />
    <EmailOrPhoneInput v-else-if="el.type === 'contact'" :attrs="el" :ref="el.type" @submit="$emit('submit')" />
    <Checkbox v-else-if="el.type === 'checkbox'" :attrs="el" :ref="el.type" />
    <CheckboxGroup v-else-if="el.type === 'checkbox-group'" :attrs="el" :ref="el.type" />
    <LoginRemember v-else-if="el.type === 'login-remember'" :attrs="el" :ref="el.type" />

    <Row v-else-if="el.type === 'row'">
        <div class="flex">
          <FormElement v-for="child in el.children" :element="child"/>
        </div>
    </Row>
  </div>
</template>

<script setup>
import TextInput from "@/views/components/forms/elements/inputs/TextInput.vue";
import PasswordInput from "@/views/components/forms/elements/inputs/PasswordInput.vue";
import EmailInput from "@/views/components/forms/elements/inputs/EmailInput.vue";
import EmailOrPhoneInput from "@/views/components/forms/elements/inputs/EmailOrPhoneInput.vue";
import PhoneInput from "@/views/components/forms/elements/inputs/PhoneInput.vue";
import Checkbox from "@/views/components/forms/elements/inputs/Checkbox.vue";
import CheckboxGroup from "@/views/components/forms/elements/inputs/CheckboxGroup.vue";
import Row from "@/views/components/forms/elements/containers/Row.vue";

import LoginRemember from "@/views/components/forms/elements/inputs/LoginRemember.vue";
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
    },
  },
}
</script>