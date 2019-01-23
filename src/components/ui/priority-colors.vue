<template>
<ul class="priority-colors" v-bind:style="listSyle">
  <li v-bind:class="elClass" v-for="priority in priorities" v-bind:style="{backgroundColor: priority.color}" @click="$emit('child_choosePriority', priority)">
  </li>
</ul>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    priorities(){
      return this.$store.state.priorities;
    },
    mediaquery(){
      return this.$store.state.mediaquery;
    },
    touchSupport(){
      return window.ontouchstart;
    },
    listStyle(){
      if (this.mediaquery < 700 || this.touchSupport !== undefined){
        return {height: '35px'};
      }
      else {
        return {height: '15px'};
      }
    },
    elClass(){
      if (this.mediaquery < 700 || this.touchSupport !== undefined){
        return 'priority-colors-text-mq';
      }
      else {
        return 'priority-colors-text';
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';

.priority-colors {
    list-style-type: none;
    @include flex(flex-start, center);
    width: 180px;
    padding: 0;
}


.priority-colors-text {
    margin: 0px 5px 0px 0px;
    height: 15px;
    width: 15px;
    cursor: pointer;
}

.priority-colors-text-mq {
  margin: 0px 20px 0px 0px;
  height: 30px;
  width: 30px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 50%;
}

</style>
