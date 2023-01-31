<template>
  <forecaster :busy="busy" @submit="handleSubmit" />
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      busy: false,
    }
  },
  methods: {
    ...mapActions('forecaster', ['searchLocation']),
    async handleSubmit(payload) {
      this.busy = true
      await this.searchLocation(payload)
      this.busy = false
    },
  },
}
</script>
