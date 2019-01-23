<template>
<div id="routing" v-bind:style="[priorities.length? {'height':'auto'} : {'height':'30px'}]">
  <router-link v-if="priorities.length" v-for="route in routes" :to="route.url" v-bind:class="{'selected':  selected === route.title}" @click.native="chooseRoute(route)">{{route.title}}</router-link>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      selected: "All"
    }
  },
  computed: {
    ...mapGetters([
      'Red',
      'Orange',
      'Yellow'
    ]),
    priorities(){
      return this.$store.state.priorities;
    },
    mediquery(){
      return this.$store.state.mediaquery;
    },
    routes(){
    return [{
      url: '/',
      title: 'All'
    },
    {
        url: "/red",
        title: this.Red
      },
      {
        url: '/orange',
        title: this.Orange
      },
      {
        url: '/yellow',
        title: this.Yellow
      },
      {
        url: '/urgent',
        title: 'Urgent'
      },
      {
        url: '/trash',
        title: 'Trash'
      }
    ]
  }
  },
  methods: {
    chooseRoute(route) {
      this.selected = route.title;
    }
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';

#routing {
    @include flex(space-around, center);
    flex-wrap: wrap;
    padding: 5px;
    margin: 10px 0 5px 0;
    background-color: red;
    width: 100%;
}

#routing > a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    letter-spacing: 1px;
    cursor: pointer;
    padding: 5px 10px;
}

.selected {
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: rgba(70, 70, 70, 0.5);
}
</style>
