<template>
<div id="login-icon" class="iconContainer" v-bind:style="iconMQ" v-if="mediaquery < 951 && userLoggedIn" @click="logOut">
  <i class="fas fa-sign-out-alt"></i>
</div>
<div id="login-icon" class="iconContainer" v-bind:style="iconMQ" v-else-if="mediaquery < 951 && !userLoggedIn" @click="toggleLoginForm">
  <i class="fas fa-sign-in-alt"></i>
</div>
</template>

<script>
import {iconMixin} from './icon_mixin.js';
import {iconStyleMixin} from './icon_style_mixin.js';

export default {
  mixins: [iconMixin, iconStyleMixin],
  data(){
    return {
      left: 20
    }
  },
  methods: {
    logOut(){
      this.$store.dispatch('logoutUser');
    }
  }
}
</script>

<style lang="scss">
@import '~@/_icon.scss';

#login-icon {
    top: 90px;
    padding: 8px 9px;
}
</style>
