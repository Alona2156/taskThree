<template>
<div id="signup-icon" class="iconContainer user-icon" v-bind:style="iconMQ" v-if="mediaquery < 951 && userLoggedIn" @click="toggleLoginForm">
  <i class="fas fa-user-circle"></i>
</div>
<div id="signup-icon" class="iconContainer" v-bind:style="iconMQ" v-else-if="mediaquery < 951 && !userLoggedIn" @click="toggleLoginForm">
  <i class="fas fa-user-plus"></i>
</div>
</template>

<script>

import {iconMixin} from './icon_mixin.js';
import {iconStyleMixin} from './icon_style_mixin.js';

export default {
  mixins: [iconMixin, iconStyleMixin],
  data(){
    return {
      left: 80
    }
  }
}
</script>

<style lang="scss">
@import '~@/_icon.scss';

#signup-icon {
    top: 150px;
    padding: 8px 7px;
}

.user-icon {
  padding: 6px 7px !important;
  i {
    font-size: 25px !important;
  }
}
</style>
