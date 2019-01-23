<template>
  <transition v-bind:name="transitionName">
  <div id="colorPicker" class="screenCenter" v-bind:style="[mediaquery < 521? {'transform': 'rotate(-90deg)', 'right': '10px'} : {}]" v-if="colorPicker">
  <div id="mainColors">
    <div class="mainColor" v-for="mainColor in mainColors" v-bind:style="{backgroundColor: mainColor.hex}" @click="chooseColor(mainColor)"></div>
  </div>

  <div id="chosenColor" v-bind:style="{backgroundColor: currentColor}">
    <span style="color: white">{{currentColorName}}</span>
    <span style="color: black">{{currentColorName}}</span>
  </div>

  <div id="shadeColors">
    <div id="shadeSample" v-bind:style="{backgroundColor: currentColor}"></div>
    <div class="shadeColor" v-for="shade in currentShades" v-bind:style="{backgroundColor: shade}" @click="chooseShade(shade)">
    </div>
  </div>

  <div id="submit" v-bind:style="{borderColor: currentColor}">
    <span style="color: black">{{currentColor}}</span>
    <span style="cursor:pointer" v-bind:style="{color: currentColor}">Color</span>
  </div>

</div>
</transition>
</template>

<script>
import {eventBus} from 'main';

export default {
  data(){
    return {
      transitionName: "",
      colorPicker: false,
      currentColor: "#f44336",
      currentColorName: "red",
      currentShades: ["#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c", "#ff8a80", "#ff5252", "#ff1744", "#d50000"],
      mainColors: [{
        name: "red",
        hex: "#f44336",
        shades: ["#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c", "#ff8a80", "#ff5252", "#ff1744", "#d50000"]
      },
      {
        name: "pink",
        hex: "#e91e63",
        shades: ["#e91e63", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f", "#ff80ab", "#ff4081", "#f50057", "#c51162"]
      },
      {
        name: "purple",
        hex: "#9c27b0",
        shades: [
          "#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c", "#ea80fc", "#e040fb", "#d500f9", "#aa00ff"
        ]
      },
      {
        name: "deepPurple",
        hex: "#673ab7",
        shades: ['#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#512da8', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea']
      },
      {
        name: "indigo",
        hex: "#3f51b5",
        shades: ['#e8eaf6', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe']
      },
      {
        name: "blue",
        hex: "#2196f3",
        shades: ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff']
      },
      {
        name: "lightBlue",
        hex: "#03a9f4",
        shades: ['#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea']
      },
      {
        name: "cyan",
        hex: "#00bcd4",
        shades: ['#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4']
      },
      {
        name: "teal",
        hex: "#009688",
        shades: ['#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#004d40', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5']
      },
      {
        name: "green",
        hex: "#4caf50",
        shades: ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853']
      },
      {
        name: "lightGreen",
        hex: "#8bc34a",
        shades: ['#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17']
      },
      {
        name: "lime",
        hex: "#cddc39",
        shades: ['#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00']
      },
      {
        name: "yellow",
        hex: "#ffeb3b",
        shades: ['#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600']
      },
      {
        name: "amber",
        hex: "#ffc107",
        shades: ['#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00']
      },
      {
        name: "orange",
        hex: "#ff9800",
        shades: ['#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00']
      },
      {
        name: "deepOrange",
        hex: "#ff5722",
        shades: ['#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00']
      },
      {
        name: "brown",
        hex: "#795548",
        shades: ['#efebe9', '#d7ccc8', '#bcaaa4', '#a1887f', '#8d6e63', '#795548', '#6d4c41', '#5d4037', '#4e342e', '#3e2723', '#fff9d4', '#DED29E', '#c1a87d', '#685642']
      },
      {
        name: "blueGrey",
        hex: "#607d8b",
        shades: ['#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#455a64', '#37474f', '#263238', '#287AA9', '#3087B4', '#2F4E6F', '#143D55']
      },
      {
        name: "grey",
        hex: "#9e9e9e",
        shades: ["#fafafa", '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#616161', '#424242', '#212121', '#9caca5', '#979aaa', '#9d8694', '#a19882']
      }
    ]
    }
  },
  computed: {
    mediaquery(){
      return this.$store.state.mediaquery;
    }
  },
  methods: {
    chooseColor(mainColor) {
      this.currentColor = mainColor.hex;
      this.currentColorName = mainColor.name;
      this.currentShades = mainColor.shades;
      eventBus.$emit('updateCurrentColor', this.currentColor);
    },
    chooseShade(shade) {
      this.currentColor = shade;
      eventBus.$emit('updateCurrentColor', this.currentColor);
    }
  },
  created(){
    eventBus.$on('showColorPicker', (colorPicker) => {
      this.colorPicker = colorPicker;
    });
    eventBus.$on('updateMQ', (mq) => {
      if (mq < 521) {
        this.transitionName = "slideRotated";
      }
      else {
        this.transitionName = "slide";
      }
    });
    if (this.mediaquery < 521){
      this.transitionName = "slideRotated";
    }
    else {
      this.transitionName = "slide";
    }
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_column-row.scss';
@import '~@/_screenCenter.scss';

#colorPicker {
    @include flex(flex-start, center, column);
    background-color: rgba(220, 220, 220, 1);
    z-index: 120;
    width: 521px;
    height: 160px;
    padding: 4px;
    #mainColors {
        display: flex;
        .mainColor {
            width: 27px;
            height: 27px;
            cursor: pointer;
        }
    }
}

#chosenColor {
    @include flex(space-between, center);
    width: 513px;
    height: 27px;
    margin: 4px 0;
    * {
        margin: 0 10px;
    }
}

#shadeColors {
    display: flex;
    #shadeSample {
        width: 61px;
        height: 61px;
        margin-right: 5px;
    }
    .shadeColor {
        width: 31px;
        height: 61px;
        margin-left: 1px;
        cursor: pointer;
    }
}

#submit {
    @extend #chosenColor;
    border: 2px solid transparent;
    box-sizing: border-box;
    background-color: white;
    font-weight: bold;
}
</style>
