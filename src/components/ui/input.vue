<template>
<div id="input-block" v-bind:style="[mediaquery < 700 ? {'width': '100%'} : {'width': '500px'}]">
  <input id="input" type="text" placeholder="Add new task" v-on:keyup.enter="pushNewTask" v-model="inputText">
  <button id="button" v-on:click="pushNewTask"><span>ADD</span></button>
  <priorities-ui-component v-on:child_choosePriority="choosePriority($event)" style="margin-top: 20px; justify-content: center;">
  </priorities-ui-component>
</div>

</template>

<script>
import Priorities from './priority-colors';
export default {
  data() {
    return {
      inputText: '',
      options: {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    }
  },
  computed: {
    loggedIn(){
      return this.$store.state.userLoggedIn;
    },
    mediaquery(){
      return this.$store.state.mediaquery;
    },
    selectedPriority(){
      return this.$store.state.currentPriority;
    }
  },
  methods: {
    pushNewTask() {
      if (this.inputText.length > 0 && this.loggedIn === true) {
        var newTask = {
          name: this.inputText,
          time: new Date().toLocaleString('en-GB', this.options),
          status: "active",
          priority: this.selectedPriority,
          timeDone: "",
          urgent: false
        };
        this.$store.dispatch('postNewTask', newTask);
      }
      this.inputText = "";
    },
    choosePriority(priority){
      this.$store.dispatch('updateCurrentPriority', (priority._id).valueOf());
    }
  },
  components: {
    'priorities-ui-component': Priorities
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_colors.scss';

#input-block {
    @include flex(center, center);
    flex-wrap: wrap;
}

#input {
    width: calc(100% - 60px);
    border-radius: 0;
    -webkit-appearance: none;
    border: 1px solid $light-grey;
    height: 36px;
    outline: none;
    text-indent: 10px;
    font-size: 12px;
    padding: 0;
}

#input::placeholder {
    color: $dark-grey;
    font-family: Verdana;
}

#button {
    padding: 0;
    border: none;
    background-color: red;
    color: white;
    font-family: Verdana;
    font-weight: bold;
    cursor: pointer;
    height: 38px;
    width: 40px;
    font-size: 12px;
    span {
      @include flex(center, center);
    }
}
</style>
