<template>
<form-slot>
  <div slot="header" id="headerAcc">
    <p><i class="fas fa-user"></i>Alona's tasks management</p>
  </div>
  <div slot="body" id="bodyAcc">
    <svg id="doughnut" width="250px" height="250px">
      <circle v-for="task in tasks" :key="task.title" cx="50%" cy="50%" r="35%" fill="transparent" stroke-width="20%"  v-bind:style="{stroke: task.color, strokeDasharray: task.dasharray, strokeDashoffset: task.dashoffset}" @click="changeText(task)" @mouseenter="chooseChart(task)" @mouseleave="unchooseChart" v-bind:class="{'selected': currentChart === task.title}"></circle>
      <g>
       <circle id="hole" cx="50%" cy="50%" r="36%" fill="white">
       </circle>
       <text x="50%" y="50%" stroke="black" text-anchor="middle">{{currentTaskTitle}}</text>
       <text x="50%" y="50%" stroke="black" text-anchor="middle" dy="25px"> {{currentNumber}} </text>
      </g>
    </svg>
  </div>
</form-slot>
</template>

<script>
import Form from './form-reusable';
import {
  mapGetters
} from 'vuex';


export default {
  data() {
    return {
      circum: 550,
      currentTaskTitle: "All Tasks",
      currentChart: "",
      currentNumber: 0,
      currentTask: ""
    }
  },
  components: {
    'form-slot': Form
  },
  computed: {
    tasks() {
      return [{
        color: this.RedColor,
        title: this.Red,
        dasharray: "",
        dashoffset: "",
        number: this.redNumber
      },
      {
        color: this.OrangeColor,
        title: this.Orange,
        dasharray: "",
        dashoffset: "",
        number: this.orangeNumber
      },
      {
        color: this.YellowColor,
        title: this.Yellow,
        dasharray: "",
        dashoffset: "",
        number: this.yellowNumber
      }
    ]},
    redNumber() {
      return this.redTasks.length;
    },
    orangeNumber() {
      return this.orangeTasks.length;
    },
    yellowNumber() {
      return this.yellowTasks.length;
    },
    ...mapGetters([
      'redTasks',
      'orangeTasks',
      'yellowTasks',
      'Red',
      'Orange',
      'Yellow',
      "RedColor",
      "OrangeColor",
      "YellowColor"
    ]),
    allTasks() {
      return this.redNumber + this.orangeNumber + this.yellowNumber;
    },
    circumPerTask() {
      return (this.circum / this.allTasks);
    },
    allToWatch() {
      return [this.redNumber, this.orangeNumber, this.yellowNumber];
    }
  },
  methods: {
    changeText(task) {
      if (task === "") {
        this.currentTaskTitle = "All tasks";
        this.currentNumber = this.allTasks;
      } else {
        this.currentTask = task;
        this.currentTaskTitle = task.title;
        this.currentNumber = task.number;
      }
    },
    chooseChart(task) {
      this.currentChart = task.title;
    },
    unchooseChart() {
      this.currentChart = "";
    },
    drawDasharray() {
      for (var i = 0; i < this.tasks.length; i++) {
        var stroke = (this.tasks[i].number * this.circumPerTask);
        var gap = (this.circum - stroke);
        this.tasks[i].dasharray = `${stroke} ${gap}`;
      }
    },
    drawDashoffset() {
      var offset = this.circum / 4;
      var dasharraySum = 0;
      for (var i = 0; i < this.tasks.length; i++) {
        if (i !== 0) {
          this.tasks[i].dashoffset = offset - dasharraySum;
          dasharraySum += parseFloat(this.tasks[i].dasharray.split(" ")[0]);
        } else {
          this.tasks[i].dashoffset = offset;
          dasharraySum += parseFloat(this.tasks[i].dasharray.split(" ")[0]);
        }
      }
    },
    drawChart() {
      this.drawDasharray();
      this.drawDashoffset();
    },
    update(){
      this.changeText("");
      this.drawChart();
    }
  },
  watch: {
    allToWatch: function(val) {
      this.update();
    }
  },
  created(){
    this.update();
  }
}
</script>

<style lang="scss">
@import url(//fonts.googleapis.com/css?family=Work+Sans:400);
@import '~@/_colors.scss';
@import '~@/_flex-mixin.scss';

#headerAcc {
    @include flex(center, center);
    padding: 0;
    font-family: Palatino Linotype;
    p {
        padding: 5px;
        margin: 0;
        font-weight: bold;
        font-size: 18px;
        color: black;
        i.fas {
            margin: 10px;
            color: $grass-green;
            border: 2px solid $grass-green;
            padding: 7px;
            border-radius: 50px;
        }
    }
}

#bodyAcc {
    @include flex(center, center);
}

svg {
    border: none;
    margin: 10px;
    font-family: "Work Sans", sans-serif;
    font-size: 20px;
}

svg > circle {
    transition: all 0.3s ease;
    cursor: pointer;
}

.selected {
    opacity: 0.7;
}
</style>
