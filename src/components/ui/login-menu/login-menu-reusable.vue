<template>
  <transition v-bind:name="transitionName">
    <div id="login-menu" v-if="show" v-bind:class="loginMenuClass">
      <ul class="heading">
        <li v-for="item in items" @click="changeTab(item.title), loginUser(item.title)">
          <p>{{item.title}}</p><i :class="[item.icon, {'green': selectedTab === item.title}]"></i>
       </li>
     </ul>
     <slot></slot>
   </div>
   </transition>
</template>

<script>
import {eventBus} from 'main';

export default {
  props: ['items', 'selected'],
  data() {
    return {
      selectedTab: this.selected,
      show: true,
      transitionName: "",
      windowHeight: ''
    }
  },
  computed: {
    mediaquery(){
      return this.$store.state.mediaquery;
    },
    loginMenuClass(){
      if (this.mediaquery > 951){
        return 'login-menu';
      }
      else if (this.windowHeight < 480){
        return 'login-menu-top';
      }
      else if (this.windowHeight > 480) {
        return 'screenCenter';
      }
    }
  },
  methods: {
    changeTab(itemTitle) {
      this.selectedTab = itemTitle;
      var title = itemTitle.toLowerCase().replace(/\s/g, "");
      this.currentTab = `form-${title}-ui-component`;
      this.$emit('call_changeTab', this.currentTab);
    },
    loginUser(itemTitle){
      if (itemTitle === "Log in"){
        var logUser = {};
        this.$store.dispatch('loginUser', logUser);
      }
    }
  },
  created() {
    eventBus.$on('toggleLoginForm', (show) =>{
      this.show = show;
    });
    eventBus.$on('updateMQ', (mq) => {
      if (mq > 951) {
        this.show = true;
        this.transitionName = "";
      }
      else {
        this.show = false;
        this.transitionName = "slideSide";
      }
    });
    this.windowHeight = window.innerHeight;
    if (this.mediaquery < 951){
      this.transitionName = "slideSide";
      this.show = false;
    }
  }
}

</script>

<style lang="scss">
@import '~@/_colors.scss';
@import '~@/_flex-mixin.scss';
@import '~@/_column-row.scss';
@import '~@/_screenCenter.scss';

#login-menu {
    width: 340px;
    @include flex(center, flex-start, column);
    position: absolute;
    z-index: 80;
    height: 480px;
}

.login-menu {
    right: 30px;
    top: calc(50% - 240px);
}

.login-menu-top {
  top: 5px;
  right: 0;
  left: 0;
  margin: auto;
}

.heading {
    @include flex(space-around, center);
    box-shadow: 0px 0px 5px grey;
    width: 300px;
    list-style-type: none;
    font-family: Palatino Linotype;
    background-color: white;
}

.heading > li {
    @include flex(center, center);
    cursor: pointer;
}

.heading > li > i {
    margin-left: 5px;
    transition: all 0.3s;
}

.green {
    color: $grass-green;
    animation: iconAnimate 0.3s;
}

@keyframes iconAnimate {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(1);
    }
}
</style>
