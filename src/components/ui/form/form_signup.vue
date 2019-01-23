<template>
<form-slot>
  <div slot="header" id="header">
    <hr>
    <p> Sign up </p>
    <hr>
  </div>

  <div slot="body" id='body'>
    <input type="text" name="name" id="name" placeholder="Name" v-model="nameInput">
    <input type="text" name="email" id="email" placeholder="E-mail" v-model="emailInput">
    <input type="password" name="password" id="password" placeholder="Password" v-model="passwordInput">
  </div>

  <button slot="button" @click="signupUser">
      Register
    </button>

  <p slot="footer" id="footer">
  </p>
</form-slot>
</template>

<script>
import Form from './form-reusable'
export default {
  data() {
    return {
      nameInput: '',
      emailInput: '',
      passwordInput: ''
    }
  },
  components: {
    'form-slot': Form
  },
  methods: {
    signupUser() {
      var newUser = {
        name: this.nameInput,
        email: this.emailInput,
        password: this.passwordInput
      }
      this.$store.dispatch('postNewUser', newUser);
    }
  }
}
</script>

<style lang="scss">
@import '~@/_colors.scss';
@import '~@/_flex-mixin.scss';

#header > hr {
    width: 60px;
    border: 1px solid $light-grey;
}

#header {
    @include flex(space-between, center);
    grid-row: 1;
    margin: 20px 0;
}

#header > p {
    padding: 5px;
    margin: 0;
    color: $grass-green;
    font-weight: bold;
    font-size: 20px;
}

#body {
  @include flex(center, center, column);
}

@mixin inputStyle () {
    width: 200px;
    border-radius: 5px;
    outline: none;
    font-size: 12px;
}

#body > input {
    @include inputStyle();
    border: 2px solid $light-grey;
    padding: 10px;
    margin-bottom: 25px;
    -webkit-appearance: none;
    &:last-child {
        margin-bottom: 0;
    }
}

#body > input::placeholder {
    color: $light-grey;
}

@for $i from 1 through 3 {
    #body > input(#{$i}) {
        grid-row: $i + 1;
    }
}

.form > button {
    @include inputStyle();
    background-color: $grass-green;
    border: none;
    color: white;
    height: 30px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0;
}

#footer {
    @include flex(center, center);
    color: $mid-grey;
    margin: 0;
}

#footer > a {
    color: $grass-green;
    margin: 0;
    padding: 0;
}
</style>
