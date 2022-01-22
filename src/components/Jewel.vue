<template>
  <div class="row">
    <div class="col-3">
      <div class="form-floating">
        <select
          class="form-select form-select-lg text-capitalize"
          :value="type"
          @input="eInput('type', $event)"
        >
          <option v-for="(tier, i) in types" :key="i" :value="i">
            <span class="text-capitalize">{{ tier }}</span>
          </option>
        </select>
        <label class="text-light fw-bold">Jewel Type</label>
      </div>
    </div>
    <div class="col-3">
      <div class="form-floating">
        <select
          class="form-select form-select-lg text-capitalize"
          :value="rarity"
          @input="eInput('rarity', $event)"
        >
          <option v-for="(tier, i) in rarities" :key="i" :value="i">
            <span class="text-capitalize">{{ tier }}</span>
          </option>
        </select>
        <label class="text-light fw-bold">Jewel Rarity</label>
      </div>
    </div>
    <div class="col-2 text-start mt-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          :value="crafted"
          @input="eInput('crafted', $event)"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Self-crafted
        </label>
      </div>
    </div>
    <div class="col text-start h5 mt-3">{{ boost }}%</div>
    <div class="col-2 text-end mt-3">
      <button class="btn btn-link text-warning" @click="removeJewel()">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Jewel",
  props: {
    rarities: Array,
    types: Array,
    rarity: Number,
    type: Number,
    crafted: Boolean,
    boost: Number
  },
  methods: {
    eInput(prop, event) {
      let value = event.target.value;

      if (prop != "crafted") {
        value = Number(value);
      } else {
        value = event.target.checked;
      }

      console.log("Value!", value);

      let payload = {
        type: this.type, // is an int
        rarity: this.rarity, // is an int
        crafted: this.crafted
      };

      payload[prop] = value;
      this.$emit("eInput", payload);
    },
    removeJewel() {
      this.$emit("remove");
    }
  }
};
</script>

<style scoped></style>
