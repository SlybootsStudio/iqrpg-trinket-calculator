<template>
  <div class="row">
    <div class="col-8">
      <div class="form-floating">
        <select
          class="form-select form-select-lg text-capitalize"
          :value="value"
          @input="eInput($event)"
        >
          <option v-for="(tier, i) in tiers" :key="i" :value="i">
            <span class="text-capitalize">{{ tier }}</span>
          </option>
        </select>
        <label class="text-light fw-bold">Rune Type</label>
      </div>
    </div>
    <div class="col text-start h5 mt-3">{{ boost }}%</div>
    <div class="col-2 text-end mt-3">
      <button class="btn btn-link text-warning" @click="removeRune()">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FloatInput",
  props: {
    tiers: Array,
    value: Number,
    boost: Number
  },
  methods: {
    eInput(event) {
      let value = parseInt(event.target.value);
      if (!value) {
        value = 0;
      }
      this.$emit("eInput", value);
    },
    removeRune() {
      this.$emit("remove");
    }
  }
};
</script>
