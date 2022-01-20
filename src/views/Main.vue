<template>
  <div class="alert alert-secondary mt-3 mb-3">
    <div class="row">
      <div class="col-12 col-md-4 mb-3">
        <div class="form-floating">
          <select class="form-select form-select-lg" v-model="currentToolLevel">
            <option
              v-for="(level, i) in toolLevels"
              :key="i + 1"
              v-bind:value="i + 1"
            >
              {{ i + 1 }}
            </option>
          </select>
          <label class="text-light fw-bold">Current tool level</label>
        </div>
      </div>
      <div class="col-12 col-md-4 mb-3">
        <div class="form-floating">
          <select class="form-select form-select-lg" v-model="targetToolLevel">
            <option
              v-for="(level, i) in toolLevels"
              :key="i + 1"
              v-bind:value="i + 1"
            >
              {{ i + 1 }}
            </option>
          </select>
          <label class="text-light fw-bold">Target tool level</label>
        </div>
      </div>
      <div class="col-12 col-md-4 mb-3">
        <div class="form-floating">
          <input
            type="number"
            min="0"
            step="1"
            class="form-control form-control-lg"
            v-model="pricePer"
          />
          <label class="text-light fw-bold">Gold per components</label>
        </div>
      </div>
      <div class="col-12 col-md-4 mb-3">
        <span>+{{ expGained }}% exp</span><br />
        <span>+{{ resourceGained }} base resource</span>
      </div>
      <div class="col-12 col-md-4 mb-3">
        <div class="form-floating">
          <input
            disabled
            class="form-control form-control-lg"
            :value="componentsNeeded.toLocaleString()"
          />
          <label class="fw-bold text-light">Components needed</label>
        </div>
      </div>

      <div class="col-12 col-md-4 mb-3">
        <div class="form-floating">
          <input
            disabled
            class="form-control form-control-lg"
            :value="totalCost.toLocaleString()"
          />
          <label class="fw-bold text-light">Total Gold</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import comp from "@/components/comp.vue";

export default {
  name: "Main",
  components: {
    //    comp,
  },
  data() {
    return {
      pricePer: 50000,
      currentToolLevel: 1,
      targetToolLevel: 2,
      toolLevels: [
        0, 10, 30, 75, 175, 400, 800, 1500, 2500, 4000, 6000, 8500, 11500,
        15000, 19000, 23500, 28500, 34000, 40000, 47000, 55000, 65000, 77000
      ]
    };
  },
  computed: {
    levelDifference() {
      return this.targetToolLevel - this.currentToolLevel;
    },
    expGained() {
      return this.levelDifference * 5;
    },
    resourceGained() {
      return this.levelDifference * 2;
    },
    totalCost() {
      return this.componentsNeeded * this.pricePer;
    },
    componentsNeeded() {
      //let currentComponents = this.toolLevels[this.currentToolLevel - 1];
      //let targetComponents = this.toolLevels[this.targetToolLevel - 1];

      let currentComponents = this.getTotalComponents(
        this.currentToolLevel - 1
      );

      let targetComponents = this.getTotalComponents(this.targetToolLevel - 1);

      let needed = targetComponents - currentComponents;
      return needed;
    }
  },
  methods: {
    getTotalComponents(level) {
      let total = this.toolLevels[level];

      if (level > 0) {
        total += this.getTotalComponents(level - 1);
      }

      return total;
    }
  }
};
</script>

<style scoped></style>
