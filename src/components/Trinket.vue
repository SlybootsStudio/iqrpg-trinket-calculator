<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
      <FloatInput
        :step="0.1"
        :value="resourceBase"
        label="Resource Base"
        @eInput="eInput('resourceBase', $event)"
      />
    </div>
    <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
      <FloatInput
        :step="0.1"
        :value="resourceBoost"
        label="Resource Boost"
        @eInput="eInput('resourceBoost', $event)"
      />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-4 mt-3 mb-3 text-end">
      <button class="btn btn-link text-warning" @click="removeTrinket()">
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
    resourceBoost: Number // float %
  },
  methods: {
    eInput(prop, event) {
      let value = event; //parseInt(event);

      let payload = {
        resourceBase: this.resourceBase, // is an int
        resourceBoost: this.resourceBoost // is an int
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
