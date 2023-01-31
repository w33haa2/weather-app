<template>
  <form
    class="pb-2 flex flex-col md:flex-row gap-2 max-w-lg"
    @submit.prevent="submit"
  >
    <form-group label-for="password" label="Location" class="w-full">
      <form-input id="password" v-model="location" block type="text" required />
    </form-group>
    <div class="flex items-end">
      <form-button
        :disabled="busy"
        :busy="busy"
        type="submit"
        class="button button__primary"
        >Generate!</form-button
      >
    </div>
  </form>
</template>

<script>
import FormGroup from '../../Common/FormGroup'
import FormInput from '../../Common/Inputs/FormInput'
import FormButton from '../../Common/FormButton'
export default {
  components: { FormButton, FormInput, FormGroup },
  props: {
    busy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      location: '',
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.location)
    },
  },
}
</script>
