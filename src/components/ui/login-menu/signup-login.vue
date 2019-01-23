<template>
<login-menu-ui-component v-bind:items="items" v-bind:selected="selected" v-on:call_changeTab="changeTab($event)">
<transition name="fade" mode="out-in">
  <keep-alive>
    <component v-bind:is="currentTab" v-on:call_changeTab="changeTab($event)"></component>
  </keep-alive>
</transition>
</login-menu-ui-component>
</template>

<script>
import Login_menu from './login-menu-reusable'
import Form_login from '../form/form_login'
import Form_signup from '../form/form_signup'
import {
  mapState
} from 'vuex'


export default {
  data() {
    return {
      items: [{
          title: "Sign up",
          icon: "fas fa-user-plus"
        },
        {
          title: "Log in",
          icon: "fas fa-sign-in-alt"
        }
      ],
      selected: 'Sign up',
      currentTab: 'form-signup-ui-component'
    }
  },
  components: {
    'login-menu-ui-component': Login_menu,
    'form-login-ui-component': Form_login,
    'form-signup-ui-component': Form_signup
  },
  methods: {
    changeTab(Tab){
      this.currentTab = Tab;
    }
  }
}
</script>

<style lang="scss">
</style>
