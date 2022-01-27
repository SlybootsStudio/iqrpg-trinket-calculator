<template>
  <div class="alert alert-info mt-3">
    <b>This is a work-in-progress</b>. This calculator demonstrates the
    relationship between all the different factors for determining income, but
    the equation is currently incomplete.
  </div>
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
                label="Gathering Skill Level"
                @eInput="setSkillLevel($event)"
              />
              <div v-if="verbose" class="text-end mt-3">
                {{ skillLevelTotal }} resource
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <div class="form-floating">
                <select
                  class="form-select form-select-lg text-capitalize"
                  v-model="rcLevel"
                >
                  <option
                    v-for="(level, i) in rcLevels"
                    :key="i"
                    v-bind:value="i"
                  >
                    <span class="text-capitalize">{{ level }}</span>
                  </option>
                </select>
                <label class="text-light fw-bold">Runecrafting Level</label>
              </div>
              <div v-if="verbose" class="text-end text-small mt-3">
                {{ rcLevel * 5 }}% Bonus
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <div class="form-floating">
                <select
                  class="form-select form-select-lg text-capitalize"
                  v-model="jcLevel"
                >
                  <option
                    v-for="(level, i) in jcLevels"
                    :key="i"
                    v-bind:value="i"
                  >
                    <span class="text-capitalize">{{ level }}</span>
                  </option>
                </select>
                <label class="text-light fw-bold">Jewelrycrafting Level</label>
              </div>
              <div v-if="verbose" class="text-end text-small mt-3">
                {{ jcLevel * 5 }}% Bonus
              </div>
            </div>
          </div>
        </div>
        <div v-if="0" class="card-footer d-flex justify-content-between">
          <div><span class="fw-bold">Total:</span> {{ baseTotal }}</div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header fw-bold mb-0 pb-0">Modifiers</div>
        <div class="card-body pb-0">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <FloatInput
                :min="1"
                :max="26"
                :value="toolLevel"
                label="Tool Level"
                @eInput="setToolLevel($event)"
              />
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <FloatInput
                :min="1"
                :max="100"
                :limit="100"
                :value="skillShardResource"
                label="Skill Shard (Resources)"
                @eInput="setSkillShardResource($event)"
              />
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <FloatInput
                :min="1"
                :value="heroics"
                label="Heroic Potions"
                @eInput="setHeroics($event)"
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
                :value="premiumResource"
                label="Premium - Resource"
                @eInput="setPremiumResource($event)"
              />
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <FloatInput
                :min="0"
                :value="clanResourceTotem"
                label="Clan - Resource Totem"
                @eInput="setClanResourceTotem($event)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header fw-bold mb-0 pb-0">Potions</div>
        <div class="card-body pb-0">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <div class="form-floating">
                <select
                  class="form-select form-select-lg text-capitalize"
                  v-model="potionIndex"
                >
                  <option
                    v-for="(potion, i) in potions"
                    :key="i"
                    v-bind:value="i"
                  >
                    <span class="text-capitalize">{{ potion }}</span>
                  </option>
                </select>
                <label class="text-light fw-bold">Potion</label>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="globalBoost"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Global Boost
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--
    <div class="col-12 col-md-4 mb-3">
          <div class="form-floating">
            <input
              disabled
              type="number"
              min="0"
              step="1"
              class="form-control form-control-lg"
              :value="jewelsTotal"
            />
            <label class="text-light fw-bold">Jewels</label>
          </div>
        </div>
        <div class="col-12 col-md-4 mb-3">
          <div class="form-floating">
            <input
              disabled
              type="number"
              min="0"
              step="1"
              class="form-control form-control-lg"
              :value="runesTotal"
            />
            <label class="text-light fw-bold">Runes</label>
          </div>
        </div>-->
      <!--  // (Premium + Clan + Trinket (Boost) + Potions) -->
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
                  :value="trinketBoostTotal"
                />
                <label class="text-light fw-bold">Trinket (Boost)</label>
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
      <!--
    <div class="col-12 col-md-4">
          <div class="form-floating">
            <input
              disabled
              type="number"
              min="0"
              step="1"
              class="form-control form-control-lg"
              :value="trinketBaseTotal"
            />
            <label class="text-light fw-bold">Trinket (Base)</label>
          </div>
        </div>-->

      <div id="runes" class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <div class="fw-bold">Runes</div>
          <button
            class="btn btn-sm btn-primary"
            v-if="runes.length < 5"
            @click="addRune()"
          >
            Add Rune
          </button>
        </div>
        <div class="card-body">
          <p v-if="runes.length == 0">You have no runes identified.</p>
          <div v-for="(rune, i) in runes" :key="i">
            <div class="mb-3">
              <Rune
                :value="rune"
                :tiers="runeTiers"
                :boost="runeResources[rune] * (1 + (rcLevel * 5) / 100)"
                @eInput="updateRune(i, $event)"
                @remove="removeRune(i)"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="jewels" class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <div class="fw-bold">Jewels</div>
          <button class="btn btn-sm btn-primary" @click="addJewel()">
            Add Jewel
          </button>
        </div>
        <div class="card-body">
          <p v-if="jewels.length == 0">You have no jewels identified.</p>
          <div v-for="(jewel, i) in jewels" :key="i">
            <div class="mb-3">
              <Jewel
                :rarity="jewel.rarity"
                :type="jewel.type"
                :rarities="jewelRarityLabels"
                :types="jewelTypes"
                :crafted="jewel.crafted"
                :boost="getJcBoost(jewel)"
                @eInput="updateJewel(i, $event)"
                @remove="removeJewel(i)"
              />
            </div>
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
        <div class="card-body">
          <div class="row">
            <div class="col">Base</div>
            <div class="col">{{ baseTotal.toFixed(1) }}</div>
          </div>
          <div class="row">
            <div class="col">Resource</div>
            <div class="col">{{ resourceTotal.toFixed(1) }}</div>
          </div>
          <div class="row">
            <div class="col">Resource Boost</div>
            <div class="col">{{ boostTotal.toFixed(1) }}%</div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row fw-bold h4">
            <div class="col">Total</div>
            <div class="col">{{ totalOutput.toFixed(1) }}</div>
          </div>
        </div>
      </div>
      <div class="card card-body">
        <div class="row">
          <div class="col">Total Rune Boost</div>
          <div class="col">{{ runesTotal.toFixed(1) }}%</div>
        </div>
        <div class="row">
          <div class="col">Total Jewel Boost</div>
          <div class="col">{{ jewelsTotal.toFixed(1) }}%</div>
        </div>
        <div class="row">
          <div class="col">Total Trinket Resource</div>
          <div class="col">{{ trinketBaseTotal.toFixed(1) }}%</div>
        </div>
        <div class="row">
          <div class="col">Total Trinket Boost</div>
          <div class="col">{{ trinketBoostTotal.toFixed(1) }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import comp from "@/components/comp.vue";

// RESOURCE FORMULA
// (Base + Base Resources/Gold) *
// (Tool + Skill Shard + Heroic + Land + Jewels + Runes) *
// (Premium + Clan + Trinket + Potions) * Global

// After level 100, different boost/scaling

// GOLD FORMULA
// (Base + Base Gold) *
// (Heroic + Land  ) *
// (Premium + Clan + Trinket) * Global
//

/*
- Heroics should cap to 28, and increase cap once per month.
- Land should be a dropdown with the title of the land.
- Clan is going to be level, and then we will calculate boost
- Resource Training, Minor

- Use Case
-- 


-- Per Kill * 300 * (1 + Clanmanship / 100)
-- Clanmanship 300 - 300%

If my goal was X million Per Hour / OR as a clan rush

- Clanmanship (mastery premium, aptitude)
- Mob (armor, weapon, jewel, rune)
- Premium Boost - 10 credits, 3150 total.
- 1st 1% Gain 17m.
- Heroic Potion
-- 40m....60m
-
// (Premium + Clan + Trinket + Potions) * Global
*/

// RESOURCE FORMULA
// (Base + Base Resources + Trinket (Base)) *
// (Tool + Skill Shard + Heroic + Land + Jewels + Runes) *
// (Premium + Clan + Trinket (Boost) + Potions) * Global

// Jewels
// if self crafted, you get a boost.
// if so, they get a % increase.
// 10% < 100
// 15% >= 100

// Runes
// Your RC level
// overlord - 3.2%
// 5, 10, 15 -- 60, 80, 100
// lvl 120 - 20% boost - 3.84%
// lvl 140 - 25%

//
//
//
import FloatInput from "@/components/FloatInput";

import Rune from "@/components/Rune"; // type
import Jewel from "@/components/Jewel"; // -- type, rarity, self-crafted
import Trinket from "@/components/Trinket"; // boost, base

export default {
  name: "Main",
  components: {
    FloatInput,
    Rune,
    Jewel,
    Trinket
  },
  data() {
    return {
      verbose: 0,
      skillLevel: 1,
      toolLevel: 1,
      skillShardResource: 0,
      heroics: 0,
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
      runeTiers: [
        "no rune",
        "t1",
        "t2",
        "t3",
        "t4",
        "Warrior",
        "Gladiator",
        "Warlord",
        "Overlord",
        "Greater Rune of the Warlord"
      ],
      runeResources: [0, 0, 0, 0, 0, 0.4, 0.8, 1.6, 3.2, 6.4],
      jewelTypes: ["Sapphire", "Ruby", "Emerald", "Diamond"], // multipliers 1, 2, 3, 4
      jewelRarities: [0, 0, 0.2, 0.7, 2.5, 5], // common, uncommon, rare, epic, legendary, mystic
      jewelRarityLabels: [
        "Common (White)",
        "Uncommon (Green)",
        "Rare (Blue)",
        "Epic (Yellow)",
        "Legendary (Orange)",
        "Mythic (Red)"
      ],
      jewels: [], // how many and of what type, sapphires, rubies, emeralds, diamonds
      runes: [], // array of Integers (0-9)
      trinkets: [], // ask for 3 values (resource boost and base)
      premiumResource: 0,
      clanResourceTotem: 0,
      potionIndex: 0,
      potions: ["none", "training (15%)", "minor (20%)"], // training, minor
      jcLevels: ["0-59", "60-79", "80-99", "100-119", "120-139", "140+"],
      jcLevel: 0,
      rcLevels: ["0-59", "60-79", "80-99", "100-119", "120-139", "140+"],
      rcLevel: 0,
      globalBoost: false
    };
  },
  computed: {
    totalOutput() {
      // (Level + Base Resources + Trinket (Base)) *
      // (Tool + Skill Shard + Heroic + Land + Jewels + Runes) *
      // (Premium + Clan + Trinket (Boost) + Potions) * Global

      let total = this.baseTotal;

      total *= 1 + this.resourceTotal / 100;
      total *= 1 + this.boostTotal / 100;

      if (this.globalBoost) {
        total *= 1.25;
      }
      return total;
    },
    baseTotal() {
      // (Level + Trinket (Base))
      let total = 0;

      total += this.skillLevelTotal;

      total += this.trinketBaseTotal;

      return total;
    },
    resourceTotal() {
      // (Tool + Skill Shard + Heroic + Land + Jewels + Runes)
      let total = 0;

      total += (this.toolLevel - 1) * 2; // tool 1 gives nothing

      total += this.skillShardResource;

      total += this.heroics;

      total += this.land;

      total += this.jewelsTotal;

      total += this.runesTotal;

      return total;
    },
    boostTotal() {
      // (Premium + Clan + Trinket (Boost) + Potions)

      let total = 0;

      total += this.premiumResource; // % - 0 - 125

      total += this.clanResourceTotem * 2; // %

      total += this.trinketBoostTotal; // %

      if (this.potionIndex == 1) {
        total += 15;
      }

      if (this.potionIndex == 2) {
        total += 20;
      }
      //total += this.potion
      // training is 15%
      // minor is 20%
      //

      return total;
    },
    skillLevelTotal() {
      /*
      The base res is divided by 10 to get the resources amount,
      and I believe a random number is generated between 1 and 10 to determine the extra resource.

      so 550 = 5 with a 50% chance of 6.
*/
      let base = 550;
      base += this.skillLevel * 40;

      if (this.skillLevel > 90) {
        const bonusLevels = this.skillLevel - 90;

        base += Math.pow(bonusLevels, 2.15);
      }

      //base += Math.round(Math.random());

      return base / 100;
    },
    jewelsTotal() {
      let total = 0;

      this.jewels.map((jewel) => {
        total += this.getJcBoost(jewel);
      });

      return total;
    },
    trinketBaseTotal() {
      let total = 0;

      this.trinkets.map((trinket) => {
        total += trinket.resourceBase;
      });

      return total;
    },
    trinketBoostTotal() {
      let total = 0;

      this.trinkets.map((trinket) => {
        total += trinket.resourceBoost;
      });

      return total;
    },
    runesTotal() {
      let total = 0;

      this.runes.map((rune) => {
        total += this.runeResources[rune] * (1 + (this.rcLevel * 5) / 100);
      });

      return total;
    }
  },
  methods: {
    getJcBoost(jewel) {
      let total = 0;
      let bonus = 100;
      if (jewel.crafted) {
        bonus += this.jcLevel * 5;
      }
      total +=
        this.jewelRarities[jewel.rarity] * (jewel.type + 1) * (bonus / 100);

      return total;
    },
    setSkillLevel(value) {
      this.skillLevel = value;
    },
    setToolLevel(value) {
      this.toolLevel = value;
    },
    setSkillShardResource(value) {
      this.skillShardResource = value;
    },
    setHeroics(value) {
      this.heroics = value;
    },
    setPremiumResource(value) {
      this.premiumResource = value;
    },
    setClanResourceTotem(value) {
      this.clanResourceTotem = value;
    },
    addRune() {
      this.runes.push(0);
    },
    updateRune(index, value) {
      console.log("Rune Update", index, value);
      this.runes[index] = value;
    },
    removeRune(index) {
      //slice out rune at index
      this.runes.splice(index, 1);
    },
    addJewel() {
      this.jewels.push({ rarity: 0, type: 0, crafted: false }); // common sapphire
    },
    updateJewel(index, value) {
      console.log("Jewel Update", index, value);
      this.jewels[index] = value; //object, { rarity, type }
    },
    removeJewel(index) {
      //slice out jewel at index
      this.jewels.splice(index, 1);
    },
    addTrinket() {
      this.trinkets.push({ resourceBase: 0, resourceBoost: 0 }); // useless trinket
    },
    updateTrinket(index, value) {
      console.log("Trinket Update", index, value);
      this.trinkets[index] = value; //object, { resourceBase, resourceBoost }
    },
    removeTrinket(index) {
      //slice out trinket at index
      console.log("Remove Trinket", index);
      this.trinkets.splice(index, 1);
    }
  }
};
</script>

<style scoped></style>
