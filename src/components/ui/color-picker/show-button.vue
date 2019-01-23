<template>
    <transition v-bind:name="transitionName">
    <div id="editPopup" v-if="popup" v-bind:class="[mediaquery > 1400 ? 'editPopup' : 'editPopup-mq']">
      <div id="color" v-bind:style="{backgroundColor: currentColor}" @click="showColorPicker"></div>
      <input type="text" name="" id="" v-model="currentLevel">
      <button id="submit" @click="closeSettings">Ok</button>
    </div>
    </transition>
</template>

<script>
import {eventBus} from 'main';

export default {
  data(){
    return{
      transitionName: "fade",
      popup: false,
      colorPicker: false,
      currentColor: "red",
      currentLevel: ""
    }
  },
  computed: {
    mediaquery() {
      return this.$store.state.mediaquery;
    }
  },
  methods: {
    showColorPicker(){
      this.colorPicker = true;
      eventBus.$emit("showColorPicker", this.colorPicker);
    },
    closeSettings(){
      this.popup = false;
      this.colorPicker = false;
      eventBus.$emit("showColorPicker", this.colorPicker);
      eventBus.$emit('updatePriority', [this.currentColor, this.currentLevel]);
    }
  },
  created(){
    eventBus.$on('updateCurrentColor', (currentColor) =>{
      this.currentColor = currentColor;
    });
    eventBus.$on('updatePopup', ([popup, currentPriority]) =>{
      this.popup = popup;
      this.currentColor = currentPriority.color;
      this.currentLevel = currentPriority.level;
    });
    eventBus.$on('closeSettingsBlocks', (show) =>{
      this.popup = false;
      this.colorPicker = false;
      eventBus.$emit("showColorPicker", this.colorPicker);
    })
    eventBus.$on('updateMQ', (mq) => {
      if (mq > 1400) {
        this.transitionName = "fade";
      }
      else {
        this.transitionName = "slideSide";
      }
    });
    if (this.mediaquery < 1400){
      this.transitionName = "slideSide";
    }
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_colors.scss';

#editPopup{
  @include flex(center, flex-start, column);
  box-shadow: 0px 0px 5px grey;
  width: 250px;
  height: 120px;
  z-index: 100;
  background-color: white;
  margin-bottom: 10px;
  position: absolute;
  #color {
    border: 1px solid transparent;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 10px;
  }
  input[type=text]{
    padding: 5px;
    margin-left: 10px;
  }
  button {
    background-color: green;
    color: white;
    border: none;
    padding: 5px;
    width: 60px;
    font-weight: bold;
    cursor: pointer;
    margin: 10px;
  }
}

.editPopup {
  left: 70px;
  top: 30px;
}

.editPopup-mq {
  right: 90px;
  top: 60px;
}

</style>
