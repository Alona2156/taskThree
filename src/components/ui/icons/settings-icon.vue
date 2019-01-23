<template>
<div id="settings-icon" class="iconContainer" v-bind:style="iconMQ" v-if="mediaquery < 1400 && priorities.length" @click="toggleSettingsBlock">
  <i class="fas fa-cogs"></i>
</div>
</template>

<script>
import {eventBus} from 'main';
import {iconStyleMixin} from './icon_style_mixin.js';

export default {
  mixins: [iconStyleMixin],
  data() {
    return {
      show: false,
      left: 140
    }
  },
  computed: {
    mediaquery() {
      return this.$store.state.mediaquery;
    },
    priorities() {
      return this.$store.state.priorities;
    }
  },
  methods: {
    toggleSettingsBlock() {
      if (this.show === false){
        this.show = true;
      }
      else {
        this.show = false;
        eventBus.$emit('closeSettingsBlocks', this.show);
      }
      eventBus.$emit('toggleSettingsBlock', this.show);
    }
  }
}
</script>

<style lang="scss">
@import '~@/_icon.scss';

#settings-icon {
    top: 30px;
    padding: 8px 7px;
}
</style>
