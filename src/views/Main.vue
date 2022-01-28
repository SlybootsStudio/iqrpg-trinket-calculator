<template>
  <div class="row mt-3 mb-5">
    <div class="col-12 col-md-8">
      <div class="card mb-3">
        <div class="fw-bold card-header mb-0 pb-0">Skill Levels</div>
        <div class="card-body pb-0">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <FloatInput
                :min="1"
                :value="skillLevel"
                label="Skill Level"
                @eInput="setSkillLevel($event)"
              />
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <FloatInput
                :min="0"
                :value="treasureHunterLevel"
                label="Treasure Hunter Level"
                @eInput="setTreasureHunterLevel($event)"
              />
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <div class="form-floating">
                <select
                  class="form-select form-select-lg text-capitalize"
                  v-model="land"
                >
                  <option
                    v-for="(land, i) in landLevels"
                    :key="i"
                    v-bind:value="i"
                  >
                    <span class="text-capitalize">{{ land }} ({{ i }})</span>
                  </option>
                </select>
                <label class="text-light fw-bold">Land</label>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <FloatInput
                :min="0"
                :max="125"
                :limit="125"
                :value="premiumDrop"
                label="Premium - Drop"
                @eInput="setPremiumDrop($event)"
              />
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <FloatInput
                :min="0"
                :value="clanDropTotem"
                label="Clan - Drop Totem"
                @eInput="setClanDropTotem($event)"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="0" class="card mt-3 mb-3">
        <div class="fw-bold card-header mb-0 pb-0">Resource Boost</div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="form-floating">
                <input
                  disabled
                  type="number"
                  min="0"
                  class="form-control form-control-lg"
                  :value="trinketDropBoostTotal"
                />
                <label class="text-light fw-bold">Trinket (Drop)</label>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <div><span class="fw-bold">Boost Total:</span> {{ boostTotal }}</div>
          <div>
            <a href="#trinkets" class="btn btn-secondary btn-sm">Add Trinket</a>
          </div>
        </div>
      </div>
      <div id="trinkets" class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <div class="fw-bold">Trinkets</div>
          <button
            class="btn btn-sm btn-primary"
            v-if="trinkets.length < 3"
            @click="addTrinket()"
          >
            Add Trinket
          </button>
        </div>
        <div class="card-body">
          <p v-if="trinkets.length == 0">You have no trinket identified.</p>
          <div v-for="(trinket, i) in trinkets" :key="i">
            <div class="mb-3">
              <Trinket
                :resourceBase="trinket.resourceBase"
                :resourceBoost="trinket.resourceBoost"
                :dropBoost="trinket.dropBoost"
                @eInput="updateTrinket(i, $event)"
                @removeTrinket="removeTrinket(i)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card mb-3">
        <div class="card-header fw-bold">Calculation</div>
        <!--
        <div class="card-body">
          <div class="row">
            <div class="col">trinketDropChanceTotal</div>
            <div class="col">{{ trinketDropChanceTotal.toFixed(1) }}</div>
          </div>
          <div class="row">
            <div class="col">dropBoostTotal</div>
            <div class="col">{{ dropBoostTotal.toFixed(1) }}%</div>
          </div>
          <div class="row">
            <div class="col">trinketDropBoostTotal (from trinkets)</div>
            <div class="col">{{ trinketDropBoostTotal.toFixed(1) }}%</div>
          </div>
        </div>
        -->
        <div class="card-body text-center">
          A trinket drop every<br />
          <span class="fw-bold h4">{{ totalOutput.toLocaleString() }}</span
          ><br />
          actions
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import FloatInput from "@/components/FloatInput";

import Trinket from "@/components/Trinket"; // boost, base

export default {
  name: "Main",
  components: {
    FloatInput,
    Trinket
  },
  data() {
    return {
      verbose: 0,
      actions: 100000,
      skillLevel: 1,
      land: 0,
      landLevels: [
        "no land",
        "camp",
        "small village",
        "village",
        "large village",
        "small town",
        "town",
        "large town",
        "small city",
        "city",
        "large city",
        "small kingdom",
        "kingdom",
        "large kingdom",
        "small empire",
        "empire",
        "large empire"
      ],
      trinkets: [], // ask for 3 values (resource boost and base)
      premiumDrop: 0,
      clanDropTotem: 0,
      treasureHunterLevel: 0
    };
  },
  computed: {
    totalOutput() {
      /*
125000 / ( 1 +  trinketdropchance )  / (1 + dropboost )

trinketdropchance : skillLevel + landLevel + TH
boost: clan + premium + trinket


-->

*/
      let total =
        125000 /
        (1 + this.trinketDropChanceTotal / 100) /
        (1 + this.dropBoostTotal / 100);

      total = Math.round(total);
      return total;
    },
    trinketDropChanceTotal() {
      let total = 0;

      total += this.skillLevelTotal * 1; // number. (1-200)
      total += this.land * 2; // number (0-24)
      total += this.treasureHunterLevel * 3; //1-150)

      return total;
    },
    dropBoostTotal() {
      let total = 0;

      total += this.clanDropTotem * 2; // % 20 -> 40%
      total += this.premiumDrop; // % - 0 - 125%
      total += this.trinketDropBoostTotal; // %

      return total;
    },
    skillLevelTotal() {
      /*
      1% <= 100
      2% > 100
*/
      let total = 0;
      total += this.skillLevel;

      if (this.skillLevel > 100) {
        total += this.skillLevel - 100;
      }

      return total;
    },
    trinketDropBoostTotal() {
      let total = 0;

      this.trinkets.map((trinket) => {
        total += trinket.dropBoost;
      });

      return total;
    }
  },
  methods: {
    setSkillLevel(value) {
      this.skillLevel = value;
    },
    setClanDropTotem(value) {
      this.clanDropTotem = value;
    },
    setPremiumDrop(value) {
      this.premiumDrop = value;
    },
    setTreasureHunterLevel(value) {
      this.treasureHunterLevel = value;
    },
    addTrinket() {
      this.trinkets.push({ resourceBase: 0, resourceBoost: 0, dropBoost: 0 }); // useless trinket
    },
    updateTrinket(index, value) {
      console.log("Trinket Update", index, value);
      this.trinkets[index] = value; //object, { resourceBase, resourceBoost, dropBoost }
    },
    removeTrinket(index) {
      //slice out trinket at index
      console.log("Remove Trinket", index);
      this.trinkets.splice(index, 1);
    }
  }
};
/*
Rarity : TH (0.05) + Rarity (1)
-- roll 1d100, if successful, roll again. repeat until fail.

-- rare, epic, legendary, mythical runes.

Actions Per Day
Total Actions
*/
</script>

<style scoped></style>
