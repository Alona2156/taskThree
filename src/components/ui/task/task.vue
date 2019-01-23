<template>
<ul id="tasks" v-if="grid">
  <li class="task" v-for="(task, index) in tasks" v-on:mouseover="underline(task)" v-on:mouseleave="clearUnderline" v-bind:style="{borderColor: task.priorityColor}">
    <i class="fas fa-exclamation-circle urgent-icon" v-on:click="checkUrgent(task)" v-bind:class="{'check--urgent': task.urgent}"></i>
    <span class="time-created">{{task.time}}</span>
    <span class="time-done">{{task.timeDone}}</span>
    <div class="task-text" v-bind:class="{'text--underline': task === selected, 'text--line-through': task.status==='done'}">{{task.name}}</div>

    <priorities-ui-component v-on:child_choosePriority="choosePriority($event, task)" style="grid-column:2/span 1; grid-row:3/span 1"></priorities-ui-component>

    <label class="check-task"><input class="check-input" type="checkbox" :checked="task.status==='done' " v-on:click = "lineThrough(task)">Done</label>
  </li>
</ul>
<ul v-else id="tasks">
  <li class="task-nogrid" v-for="(task, index) in tasks" v-on:mouseover="underline(task)" v-on:mouseleave="clearUnderline" v-bind:style="{borderColor: task.priorityColor}">
    <div id="divIcon-nogrid">
    <i class="fas fa-exclamation-circle urgent-icon-nogrid" v-on:click="checkUrgent(task)" v-bind:class="{'check--urgent': task.urgent}"></i>
    </div>
    <div id="remains-nogrid">
    <span class="time-created-nogrid">{{task.time}}</span>
    <span class="time-done-nogrid">{{task.timeDone}}</span>
    <div class="task-text-nogrid" v-bind:class="{'text--underline': task === selected, 'text--line-through': task.status==='done'}">{{task.name}}</div>

    <priorities-ui-component v-on:child_choosePriority="choosePriority($event, task)" style="width: 50%"></priorities-ui-component>

    <label class="check-task-nogrid"><input class="check-input" type="checkbox" :checked="task.status==='done' " v-on:click = "lineThrough(task)">Done</label>
    </div>
  </li>
</ul>
</template>

<script>
import Priorities from '../priority-colors'
import {gridSupport} from './gridSupport_mixin.js';

export default {
  props: ['tasks', 'selected'],
  mixins: [gridSupport],
  data() {
    return {
      options: {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    }
  },
  computed: {
    mediaquery(){
      return this.$store.state.mediaquery;
    }
  },
  methods: {
    underline(data) {
      this.selected = data;
    },
    clearUnderline() {
      this.selected = "";
    },
    checkUrgent(data) {
      if (data.urgent === false) {
        data.urgent = true;
      } else {
        data.urgent = false
      }
      var payload = {
        _id: data._id,
        urgent: data.urgent
      }
      this.$store.dispatch('updateTask', payload);
    },
    choosePriority(priority, task) {
      var payload = {
        _id: task._id,
        priority: priority._id
      }
      this.$store.dispatch('updateTask', payload);
    },
    lineThrough(data) {
      data.status = "done";
      data.timeDone = new Date().toLocaleString('en-GB', this.options);
      var payload = {
        _id: data._id,
        status: data.status,
        timeDone: data.timeDone
      }
      this.$store.dispatch('updateTask', payload);
    }
  },
  components: {
    'priorities-ui-component': Priorities
  }
}
</script>

<style lang="scss">
@import '~@/_grid-mixin.scss';
@import '~@/_flex-mixin.scss';
@import '~@/_column-row.scss';
@import '~@/_colors.scss';

#tasks {
    @include flex(center, center, column);
    list-style-type: none;
    width: 100%;
    font-weight: bold;
    margin: 0;
    padding: 0;
}
.task {
    @include grid(40px auto 20%, start, center);
    grid-row-gap: 10px;
    grid-column-gap: 5px;
    box-shadow: 0 0 15px $mid-grey;
    width: 90%;
    padding: 8px;
    margin: 10px;
    border-width: 3px;
    border-style: solid;
}

.task-nogrid {
    @include flex(center, center);
    width: 90%;
    box-shadow: 0 0 15px $mid-grey;
    padding: 8px;
    margin: 10px;
    border-width: 3px;
    border-style: solid;
}

#divIcon-nogrid {
    height: 100%;
    width: 22px;
}

#remains-nogrid {
    height: 100%;
    width: calc( 100% - 22px);
    margin-left: 20px;
    @include flex(flex-start, center);
    flex-wrap: wrap;
}

.urgent-icon {
    @include column-row(1/span 1, 1/span 3);
    font-size: 26px;
    opacity: 0.2;
    cursor: pointer;
}

.urgent-icon-nogrid {
    font-size: 26px;
    opacity: 0.2;
    cursor: pointer;
}

.check--urgent {
    opacity: 0.7;
}

.time-created {
    @include column-row(2/span 1, 1/span 1);
    font-size: 12px;
}

.time-created-nogrid, .time-done-nogrid {
  width: 50%;
  font-size: 12px;
}

.time-done-nogrid {
  text-align: right;
}

.time-done {
    @include column-row(3/span 1, 1/span 1);
    font-size: 12px;
    justify-self: end;
}

.task-text {
      @include column-row(2/span 2, 2/span 1);
      text-align: left;
      width: 95%;
}

.task-text-nogrid {
    width: 95%;
    margin: 10px 0;
    text-align: left;
}

.check-task,
.done {
    @include column-row(3/span 1, 3/span 1);
    justify-self: center;
    color: black;
    letter-spacing: 0.8px;
    cursor: pointer;
    font-size: 16px;
}

.check-task-nogrid {
    color: black;
    letter-spacing: 0.8px;
    cursor: pointer;
    font-size: 16px;
    width: 50%;
    text-align: right;
}

.check-input {
    vertical-align: bottom;
}

.text--underline {
    background-color: red;
    color: white;
}

.text--line-through {
    text-decoration: line-through;
}
</style>
