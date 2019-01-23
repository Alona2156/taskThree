<template>
  <transition v-bind:name="transitionName">
  <div id="settings" v-if="show && priorities.length" v-bind:class="[mediaquery > 1400? 'settings' : 'settings-mq']">
     <div id="heading">
       <i class="fas fa-cogs"></i> Settings
     </div>
     <ul id="themes">
       <li v-for="priority in priorities" v-bind:style="{borderColor: priority.color}" @click=
 "openSettings(priority)">{{priority.level}}</li>
     </ul>
   </div>
   </transition>
</template>

<script>
import {eventBus} from 'main';

export default {
  data() {
    return {
      show: true,
      transitionName: ""
    }
  },
  computed: {
    priorities(){
      return this.$store.state.priorities;
    },
    mediaquery(){
      return this.$store.state.mediaquery;
    }
  },
  methods: {
    openSettings(priority) {
      this.popup = true;
      this.currentLevel = priority.level;
      this.currentColor = priority.color;
      this.currentPriority = priority;
      eventBus.$emit('updatePopup', [this.popup, this.currentPriority]);
    }
  },
  created(){
    eventBus.$on('updatePriority', ([priorityColor, priorityLevel]) =>{
      this.priorities.forEach((priority) => {
        if (priority.color === this.currentPriority.color && priority.level === this.currentPriority.level){
          var payload = {
            _id: this.currentPriority._id,
            color: priorityColor,
            level: priorityLevel
          }
          this.$store.dispatch('updatePriority', payload);
        }
      })
    });
    eventBus.$on('toggleSettingsBlock', (show) =>{
      this.show = show;
    });
    eventBus.$on('updateMQ', (mq) => {
      if (mq > 1400) {
        this.show = true;
        this.transitionName = "";
      }
      else {
        this.show = false;
        this.transitionName = "slideSide";
      }
    });
    if (this.mediaquery < 1400){
      this.transitionName = "slideSide";
      this.show = false;
    }
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_colors.scss';

#settings {
  z-index: 90;
  width: 250px;
  height: 270px;
  box-shadow: 0px 0px 5px grey;
  border-radius: 10px;
  top: 190px;
  background-color: white;
  position: absolute;
  #heading {
    @include flex(center, center);
    margin: 0px;
    padding: 20px;
    font-size: 20px;
    i {
      font-size: 26px;
      margin-right: 10px;
      color: green;
    }
  }
}

.settings {
  left: 70px;
}

.settings-mq {
  right: 90px;
}

#themes {
  @include flex(flex-start, center, column);
  padding: 0px;
  li {
    @include flex(center, center);
    width: 60%;
    list-style-type: none;
    border-top: 4px solid transparent;
    padding: 15px;
    background-color: rgba(220, 220, 220, 0.1);
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
