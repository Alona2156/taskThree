<template>
<div id="app" v-bind:style="[mediaquery < 1400 ? {'justify-content': 'flex-start', 'align-content': 'flex-start', 'margin-left': '10px', 'margin-right': '10px', 'width': '520px'} : {'justify-content': 'center', 'margin-left': '380px', 'width' : '520px'}, mediaquery < 951? {'width': 'calc(100% - 100px)'} : {}, mediaquery < 700 ? {'width': 'calc(100% - 20px)'} : {}]">
  <show-button-ui-component></show-button-ui-component>
  <color-picker-ui-component></color-picker-ui-component>
  <settings-ui-component></settings-ui-component>

  <grouping-ui-component></grouping-ui-component>

  <settings-icon-ui-component></settings-icon-ui-component>
  <login-icon-ui-component></login-icon-ui-component>
  <signup-icon-ui-component></signup-icon-ui-component>

  <logout-menu-ui-component v-if="userLoggedIn"></logout-menu-ui-component>
  <login-menu-ui-component v-else></login-menu-ui-component>

</div>
</template>

<script>
import Grouping from './components/ui/inputMenuTasksContainer/grouping'
import LoginMenu from './components/ui/login-menu/signup-login'
import LogoutMenu from './components/ui/login-menu/useracc-logout'
import showButton from './components/ui/color-picker/show-button'
import ColorPicker from './components/ui/color-picker/color-picker'
import Settings from './components/ui/color-picker/settings'
import SettingsIcon from './components/ui/icons/settings-icon'
import LoginIcon from './components/ui/icons/form_login-icon'
import SignupIcon from './components/ui/icons/form_signup-icon'

import {
  mapState
} from 'vuex'

import {eventBus} from 'main';

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    'grouping-ui-component': Grouping,
    'login-menu-ui-component': LoginMenu,
    'logout-menu-ui-component': LogoutMenu,
    'show-button-ui-component': showButton,
    'color-picker-ui-component': ColorPicker,
    'settings-ui-component': Settings,
    'settings-icon-ui-component': SettingsIcon,
    'login-icon-ui-component': LoginIcon,
    'signup-icon-ui-component': SignupIcon
  },
  created() {
    if (this.userLoggedIn) {
      this.$store.dispatch('loadTasks');
    }
    this.$store.state.mediaquery = window.innerWidth;
    window.addEventListener('resize', update_mediaquery.bind(this));
    function update_mediaquery(){
      this.$store.state.mediaquery = window.innerWidth;
      eventBus.$emit('updateMQ', this.$store.state.mediaquery);
    }
  },
  computed: {
    ...mapState(['userLoggedIn', 'mediaquery'])
  }
}
</script>

<style lang="scss">
@import '~@/_grid-mixin.scss';
@import '~@/_flex-mixin.scss';
@import '~@/_column-row.scss';
@import '~@/_body.scss';
@import '~@/_transitions.scss';

#app {
    @include flex(center, center);
    margin-bottom: 15px;
}
</style>
