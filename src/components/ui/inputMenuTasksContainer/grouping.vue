<template>
  <div id="tasksContainer" v-bind:style="[mediaquery < 700 ? {'margin-top': '80px'} : {}]">
  <h2 id="heading"> TODO list </h2>
  <input-ui-component></input-ui-component>
    <route-menu-ui-component></route-menu-ui-component>
    <div id='view'>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Input from '../input'
import RouteMenu from '../routing_menu'

export default {
  data(){
    return {
    }
  },
  computed: {
    mediaquery(){
      return this.$store.state.mediaquery;
    }
  },
  components: {
    'input-ui-component': Input,
    'route-menu-ui-component': RouteMenu
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_column-row.scss';
#tasksContainer {
  @include flex(center, center, column);
  width: 100%;
}

#view {
  width: 100%;
}

#heading {
    @include flex(center, center);
    margin: 0;
}
</style>
