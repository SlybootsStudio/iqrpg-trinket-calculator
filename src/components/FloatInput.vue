<template>
  <div class="form-floating">
    <input
      class="form-control form-control-lg"
      :type="type"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="eInput($event)"
    />
    <label class="text-light fw-bold">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "FloatInput",
  props: {
    type: {
      type: String,
      default: "Number"
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: null
    },
    limit: {
      type: Number,
      default: null
    },
    value: Number,
    label: String
  },
  methods: {
    eInput(event) {
      let value = Number(event.target.value);
      if (!value) {
        value = 0;
      }

      if (this.limit !== null) {
        if (value > this.limit) {
          value = this.limit;
        }
      }
      this.$emit("eInput", value);
    }
  }
};
</script>

<style scoped></style>
