<template>
  <div class="row">
    <div class="col-12 col-sm-6 d-flex">
      <FloatInput
        :step="0.1"
        :value="dropBoost"
        label="Drop Boost (%)"
        @eInput="eInput('dropBoost', $event)"
      />
      <button
        class="btn btn-outline-warning bg-light text-warning ms-3"
        @click="removeTrinket()"
      >
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
import FloatInput from "@/components/FloatInput";

export default {
  name: "Trinket",
  components: {
    FloatInput
  },
  props: {
    resourceBase: Number, // float
    resourceBoost: Number, // float %
    dropBoost: Number // float
  },
  methods: {
    eInput(prop, event) {
      let value = event; //parseInt(event);

      let payload = {
        resourceBase: this.resourceBase, // is an int
        resourceBoost: this.resourceBoost, // is an int
        dropBoost: this.dropBoost // is an int
      };

      payload[prop] = value;
      console.log("Payload", payload);
      this.$emit("eInput", payload);
    },
    removeTrinket() {
      this.$emit("removeTrinket");
    }
  }
};
</script>

<style scoped></style>
