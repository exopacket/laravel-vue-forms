<template>
  <div>
    <TextInput v-if="el.type === 'text'" :attrs="el" :ref="el.key" @submit="$emit('submit')" />
    <PasswordInput v-else-if="el.type === 'password'" :attrs="el" :ref="el.key" @submit="$emit('submit')" />
    <EmailInput v-else-if="el.type === 'email'" :attrs="el" :ref="el.key" @submit="$emit('submit')" />
    <PhoneInput v-else-if="el.type === 'phone'" :attrs="el" :ref="el.key" @submit="$emit('submit')" />
    <EmailOrPhoneInput v-else-if="el.type === 'contact'" :attrs="el" :ref="el.key" @submit="$emit('submit')" />
    <SelectInput v-if="el.type === 'select'" :attrs="el" :ref="el.key" />
    <Checkbox v-else-if="el.type === 'checkbox'" :attrs="el" :ref="el.key" />
    <CheckboxGroup v-else-if="el.type === 'checkbox-group'" :attrs="el" :ref="el.key" />
    <LoginRemember v-else-if="el.type === 'login-remember'" :attrs="el" :ref="el.key" />

    <Row v-else-if="el.type === 'row'">
        <div class="flex space-x-3">
          <FormElement v-for="(child, index) in el.children" :element="child" :style="(el.width && el.width[index]) ? 'width: ' + el.width[index] : ''" :ref="child.key"/>
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
import SelectInput from "@/views/components/forms/elements/inputs/SelectInput.vue";
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
      if(this.el.type === 'row') {
        let validated = true;
        for(let i=0; i<this.el.children.length; i++) {
          const id = this.el.children[i].key;
          if(!this.$refs[id][0].validate()) validated = false
        }
        return validated
      } else {
        return this.$refs[this.el.key].validate()
      }
    },
    value() {
      if(this.el.type == 'row') {
        let values = []
        for(let i=0; i<this.el.children.length; i++) {
          const id = this.el.children[i].key;
          let val = this.$refs[id][0].value()
          if(Array.isArray(val)) values.concat(this.$refs[id][0].value())
          else values.push(this.$refs[id][0].value())
        }
        return values
      } else {
        return this.$refs[this.el.key].value()
      }
    },
  },
}
</script>