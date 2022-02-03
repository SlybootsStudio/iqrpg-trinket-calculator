<template>
  <div class="row mt-3">
    <div class="col-12 col-md-8">
      <div class="alert alert-secondary mb-3 pb-1">
        <div class="fw-bold mb-3">Skill Levels</div>
        <div class="row mb-0 pb-0">
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
              :max="125"
              :limit="125"
              :value="premiumDrop"
              label="Premium - Drop"
              @eInput="setPremiumDrop($event)"
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
              :value="clanDropTotem"
              label="Clan - Drop Totem"
              @eInput="setClanDropTotem($event)"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
            <FloatInput
              :min="0"
              :max="150"
              :limit="150"
              :value="treasureHunterLevel"
              label="Treasure Hunter Level"
              @eInput="setTreasureHunterLevel($event)"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="form-floating">
              <select
                class="form-select form-select-lg text-capitalize"
                v-model="treasureHunterRarity"
              >
                <option
                  v-for="(rarity, i) in treasureHunterRarities"
                  :key="i"
                  v-bind:value="i"
                >
                  <span class="text-capitalize">{{ rarity }}</span>
                </option>
              </select>
              <label class="text-light fw-bold">Treasure Hunter Rarity</label>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-secondary mb-3 pb-1">
        <div class="d-flex justify-content-between">
          <div class="fw-bold">Trinkets</div>
          <button
            class="btn btn-sm btn-primary fw-bold"
            v-if="trinkets.length < 3"
            @click="addTrinket()"
          >
            Add Trinket
          </button>
        </div>
        <div class="">
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
      <div class="alert alert-secondary mb-3">
        <div class="text-center">
          A trinket drop every<br />
          <span class="fw-bold h4">{{ totalOutput.toLocaleString() }}</span
          ><br />
          actions
        </div>
        <br />
        <div class="row">
          <div class="col-7">Two trinket chance</div>
          <div class="col">{{ twoTrinketChance.toLocaleString() }}%</div>
        </div>
        <div class="row mb-5">
          <div class="col-7">Rarity increase chance</div>
          <div class="col">{{ rarityChance.toLocaleString() }}%</div>
        </div>
        <div class="row">
          <div class="col-7">Rare</div>
          <div class="col">{{ rareChance.toLocaleString() }}%</div>
        </div>
        <div class="row">
          <div class="col-7">Epic</div>
          <div class="col">{{ epicChance.toLocaleString() }}%</div>
        </div>
        <div class="row">
          <div class="col-7">Legendary</div>
          <div class="col">{{ legendaryChance.toLocaleString() }}%</div>
        </div>
        <div class="row">
          <div class="col-7">Mythic</div>
          <div class="col">{{ mythicChance.toLocaleString() }}%</div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="row mb-3">
    <div class="col-3">
      <FloatInput
        :value="actions"
        label="Actions Per Day"
        @eInput="setActions($event)"
      />
    </div>
  </div>
  <hr />
  <p>
    A trinket every {{ actionsPerTrinket.toLocaleString() }} actions, or
    {{ (actionsPerTrinket / actions).toLocaleString() }} days.
  </p>
  <p>
    A rare trinket every {{ actionsPerRare.toLocaleString() }} actions, or
    {{ (actionsPerRare / actions).toLocaleString() }} days.
  </p>
  <p>
    An epic trinket every {{ actionsPerEpic.toLocaleString() }} actions, or
    {{ (actionsPerEpic / actions).toLocaleString() }} days.
  </p>
  <p>
    A legendary trinket every
    {{ actionsPerLegendary.toLocaleString() }} actions, or
    {{ (actionsPerLegendary / actions).toLocaleString() }} days.
  </p>
  <p>
    An mythic trinket every {{ actionsPerMythic.toLocaleString() }} actions, or
    {{ (actionsPerMythic / actions).toLocaleString() }} days.
  </p>

  <div class="mb-5"></div>
</template>

<script>
import FloatInput from "@/components/FloatInput";

import Trinket from "@/components/Trinket"; // boost, base
/*
To show action rare, epic, legendary ONLY chance, subtract out the chance for the 'level up'
*/
export default {
  name: "Main",
  components: {
    FloatInput,
    Trinket
  },
  data() {
    return {
      verbose: 0,
      actions: 10000,
      skillLevel: 100,
      land: 10,
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
      treasureHunterRarities: [
        "common (white)",
        "uncommon (green)",
        "rare (blue)",
        "epic (yellow)",
        "legendary (orange)",
        "mythic (red)"
      ],
      trinkets: [], // ask for 3 values (resource boost and base)
      premiumDrop: 100,
      clanDropTotem: 30,
      treasureHunterLevel: 100,
      treasureHunterRarity: 5
    };
  },
  computed: {
    monthofActions() {
      return this.actions * 30;
    },
    actionsPerTrinket() {
      let actions = this.totalOutput / (1 + this.twoTrinketChance / 100);
      //actions *= this.rareChance / 100;
      return Math.round(actions);
    },
    actionsPerRare() {
      let actions = this.actionsPerTrinket;
      actions /= this.rareChance / 100;
      return Math.round(actions);
    },
    actionsPerEpic() {
      let actions = this.actionsPerTrinket;
      actions /= this.epicChance / 100;
      return Math.round(actions);
    },
    actionsPerLegendary() {
      let actions = this.actionsPerTrinket;
      actions /= this.legendaryChance / 100;
      return Math.round(actions);
    },
    actionsPerMythic() {
      let actions = this.actionsPerTrinket;
      actions /= this.mythicChance / 100;
      return Math.round(actions);
    },
    twoTrinketChance() {
      let chance = 0;
      chance += this.treasureHunterLevel >= 50 ? 10 : 0;
      chance += this.treasureHunterLevel >= 75 ? 20 : 0;
      chance += this.treasureHunterLevel >= 100 ? 30 : 0;
      chance += this.treasureHunterLevel >= 150 ? 40 : 0;

      return chance;
    },
    rarityChance() {
      let chance = 0;
      chance += this.treasureHunterLevel * 0.05;
      chance += this.treasureHunterRarity;

      return chance;
    },
    rareChance() {
      let chance = 100;
      chance -= this.epicChance;
      chance -= this.legendaryChance;
      chance -= this.mythicChance;

      return chance;
    },
    epicChance() {
      let chance = 0;
      chance += this.rarityChance;
      chance -= this.legendaryChance;
      chance -= this.mythicChance;
      return chance;
    },

    legendaryChance() {
      let chance = 0;
      chance += Math.pow(this.rarityChance, 2);
      chance = chance / 100;

      chance -= this.mythicChance;

      return chance;
    },
    mythicChance() {
      let chance = 0;
      chance += Math.pow(this.rarityChance, 3);

      chance = chance / 10000;

      return chance;
    },
    totalOutput() {
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
    },
    setActions(value) {
      this.actions = value;
    }
  }
};
// "ActionsForMythicDrop/(((EpicDrop%/MythicDrop%)*EpicEssense)+((LegendaryDrop%/MythicDrop%)*LegendaryEssense)+((MythicDrop%/MythicDrop%)*MythicEssense))"
</script>
