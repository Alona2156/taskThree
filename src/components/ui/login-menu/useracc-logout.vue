<template>
<logout-menu-ui-component v-bind:items="items" v-bind:selected="selected" v-on:call_changeTab="changeTab($event)">
  <useraccount-ui-component></useraccount-ui-component>
</logout-menu-ui-component>
</template>

<script>
import Logout_menu from './login-menu-reusable';
import {
  mapState
} from 'vuex';
import Useracc from '../form/form_useracc';



export default {
  data() {
    return {
      items: [{
          title: "User",
          icon: "fas fa-user-circle"
        },
        {
          title: "Log out",
          icon: "fas fa-sign-out-alt"
        }
      ],
      selected: 'User'
    }
  },
  components: {
    'logout-menu-ui-component': Logout_menu,
    'useraccount-ui-component': Useracc
  },
  methods: {
    changeTab(tab) {
      if (tab === "form-logout-ui-component") {
        this.$store.dispatch('logoutUser');
      }
    }
  }
}
</script>

<style lang="scss">

</style>
