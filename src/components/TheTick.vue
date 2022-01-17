<template>
  <div class="progress position-relative" style="width: 100px">
    <div
      class="progress-bar js-action-bar"
      role="progressbar"
      :style="{ width: `${progress}%`, '-webkit-transition': `${transition}` }"
    >
      <span
        class="justify-content-center d-flex position-absolute w-100 text-white"
        ><!--{{ actionsRemaining }} Actions Remaining-->Timer</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "TheTick",
  data: function () {
    return {
      progress: 0,
      transition: `none`,
      actionsRemaining: 3,
      tick: 6000,
      step: 100,
      interval: null,
      beginTs: new Date(),
    };
  },
  methods: {
    clearTransition() {
      this.progress = 100;
      this.transition = "none";
    },
    beginTransition() {
      this.progress = 0;
      this.transition = "width 6s linear 0s";
    },
    doTick() {
      console.log("doTick...");
      // Animate the Actions Bar
      this.clearTransition();
      setTimeout(() => this.beginTransition(), 10);

      //      this.$store.commit('TICK', 3);
      //this.$store.dispatch("doTick", 1);

      //emit now.

      /* SetInterval would be better,
       but this works with the transition without having to recalculate each tick */
      setTimeout(() => this.doTick(), 6000);
    },
  },

  mounted: function () {
    // Start the bar full. Delay a tick, otherwise constant refresh would 'doTick'
    this.progress = 100;
    setTimeout(() => this.doTick(), 10);
  },
};
</script>

<style>
.js-action-bar-2 {
  transition: width 3s linear 0s;
  width: 0;
}
</style>
