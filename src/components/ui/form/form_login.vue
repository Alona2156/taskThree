<template>
  <form-slot>
    <div slot="header" id="header">
      <hr>
      <p> Log in </p>
      <hr>
    </div>

    <div slot="body" id='body'>
      <input type="text" name="email" id="email" placeholder="E-mail" v-model="emailInput">
      <input type="password" name="password" id="password" placeholder="Password" v-model="passwordInput">
    </div>

    <button slot="button" @click="loginUser">
      Log in
    </button>

    <p slot="footer" id="footer">
    </p>
  </form-slot>
</template>

<script>
  import Form from './form-reusable'
  export default {
    data(){
      return{
        emailInput: '',
        passwordInput: '',
        windowHeight: ""
      }
    },
    components: {
      'form-slot': Form
    },
    methods: {
      loginUser(){
        var logUser = {
          email: this.emailInput,
          password: this.passwordInput
        }
        this.$store.dispatch('loginUser', logUser);
      }
    },
      created(){
        this.windowHeight = window.innerHeight;
      }
  }
</script>

<style lang="scss">
</style>
