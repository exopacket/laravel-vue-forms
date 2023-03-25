<template>
  <div class="absolute right-0 top-0 z-50 mr-16 mt-[89px]">
    <div style="height: 60px; min-width: 275px" class="flex items-center w-full max-w-xs py-3 pl-4 pr-5 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
      <Icon v-if="alertStyle === 2 || alertStyle === 'success'" name="check-square-fill" size="24" color="green" shade="400" />
      <Icon v-if="alertStyle === 3 || alertStyle === 'danger'" name="x-square-fill" size="24" color="red" shade="400" />
      <Icon v-if="alertStyle === 4 || alertStyle === 'info'" name="info-square-fill" size="24" color="[#0f75bc]" />
      <Icon v-if="alertStyle === 5 || alertStyle === 'warning'" name="exclamation-square-fill" size="24" color="yellow" shade="400" />
      <CircleLoader v-if="alertStyle === 1 || isLoading" px="24" />
      <div :class="'pl-4 text-sm font-weight-normal' + textColor">{{ message }}</div>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/views/components/Icon.vue";
import CircleLoader from "@/views/components/loaders/CircleLoader.vue";
</script>

<script>
import {mapState} from "vuex";

export default {
  name: "Toast",
  computed: {

    ...mapState({
      toastMessage: state => state.alerts.toastMessage,
      isLoading: state => state.alerts.toastLoading,
      alertStyle: state => state.alerts.toastStyle
    }),
    message() {
      if(this.isLoading && !this.toastMessage) return "Loading..."
      else return this.toastMessage
    },
    textColor() {
      if(this.isLoading) {
        return ' text-slate-500';
      } else if(this.alertStyle === 2 || this.alertStyle === 'success') {
        return ' text-green-700'
      } else if(this.alertStyle === 3 || this.alertStyle === 'danger') {
        return ' text-red-700'
      } else if(this.alertStyle === 4 || this.alertStyle === 'info') {
        return ' text-[#0f75bc]'
      } else if(this.alertStyle === 5 || this.alertStyle === 'warning') {
        return ' text-yellow-700'
      } else {
        return ' text-slate-700'
      }
    }
  }
}
</script>

