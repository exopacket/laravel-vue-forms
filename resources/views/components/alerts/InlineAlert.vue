<template>
  <div :class="'rounded-md p-4 ' + bgColor">
    <div class="flex">
      <div class="flex-shrink-0">
        <Icon :name="iconName" :color="iconColor" size="15" shade="400" />
      </div>
      <div class="ml-3">
        <h3 :class="'text-sm font-medium ' + messageColor">{{ messageText }}</h3>
        <ul :class="'mt-2 text-sm ' + problemsColor" v-if="problemList.length > 0">
          <li v-for="problem in problemList">{{ problem }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/views/components/Icon.vue";
</script>

<script>

export default {
  props: {
    message: {
      type: String
    },
    type: {
      type: String,
      default: "danger"
    },
    problems: {
      type: Array
    }
  },
  computed: {
    iconName() {
      switch(this.type) {
        case "success":
          return "check-circle-fill"
        case "info":
          return "info-circle-fill"
        case "warning":
        case "danger":
        default:
          return "exclamation-circle-fill"
      }
    },
    iconColor() {
      switch(this.type) {
        case "success":
          return "green"
        case "info":
          return "blue"
        case "warning":
          return "yellow"
        case "danger":
        default:
          return "red"
      }
    },
    messageColor() {
      switch(this.type) {
        case "success":
          return "text-green-800"
        case "info":
          return "text-blue-800"
        case "warning":
          return "text-yellow-800"
        case "danger":
        default:
          return "text-red-800"
      }
    },
    problemsColor() {
      switch(this.type) {
        case "success":
          return "text-green-700"
        case "info":
          return "text-blue-700"
        case "warning":
          return "text-yellow-700"
        case "danger":
        default:
          return "text-red-700"
      }
    },
    bgColor() {
      switch(this.type) {
        case "success":
          return "bg-green-100"
        case "info":
          return "bg-blue-100"
        case "warning":
          return "bg-yellow-100"
        case "danger":
        default:
          return "bg-red-100"
      }
    },
    messageText() {
      if(this.problems) {
        if(this.problems.length > 1) {
          return "The following problems were found:"
        }
        if(!this.message) {
          return this.problemList[0]
        }
      }
      return this.message ?? "An unknown error occurred."
    },
    problemList() {
      if(this.problems) {
        if(this.problems.length > 1) {
          return this.problems
        }
      }
      return []
    }
  }
}

</script>

