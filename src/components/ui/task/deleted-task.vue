<template>
<ul id="tasks" v-if="grid">
  <li class="task" v-for="(task, index) in tasks" v-on:mouseover="underline(task)" v-on:mouseleave="clearUnderline">
    <button class="restore-button"><i class="fas fa-undo restore-button_icon" v-on:click="restore(task)"></i></button>
    <span class="time-created">{{task.time}}</span>
    <span class="time-done">{{task.timeDone}}</span>
    <div class="task-text" v-bind:class="{'text--underline': task === selected}">{{task.name}}</div>
    <span class="done"></span>
    <button class="delete-button"><i class="far fa-times-circle delete-button_icon" v-on:click="deleteForever(task)"></i></button>
  </li>
</ul>

<ul id="tasks" v-else>
  <li class="task-nogrid" v-for="(task, index) in tasks" v-on:mouseover="underline(task)" v-on:mouseleave="clearUnderline">
    <div id="divIcon-nogrid">
    <button class="restore-button"><i class="fas fa-undo restore-button_icon" v-on:click="restore(task)"></i></button>
    </div>
    <div id="remains-nogrid">
    <span class="time-created-nogrid">{{task.time}}</span>
    <span class="time-done-nogrid">{{task.timeDone}}</span>
    <div class="task-text-nogrid" v-bind:class="{'text--underline': task === selected}">{{task.name}}</div>
    </div>
    <div id="divIcon-nogrid">
    <button class="delete-button"><i class="far fa-times-circle delete-button_icon" v-on:click="deleteForever(task)"></i></button>
    <div id="divIcon-nogrid">
  </li>
</ul>
</template>

<script>
import {gridSupport} from './gridSupport_mixin.js';

export default {
  props: ['tasks', 'selected'],
  mixins: [gridSupport],
  data() {
    return {}
  },
  methods: {
    underline(data) {
      this.selected = data;
    },
    clearUnderline() {
      this.selected = "";
    },
    restore(task) {
      task.status = "active";
      task.timeDone = "";
      var payload = {
        _id: task._id,
        status: task.status,
        timeDone: task.timeDone
      }
      this.$store.dispatch('updateTask', payload);
    },
    deleteForever(task) {
      this.$store.dispatch('deleteTask', task._id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/_grid-mixin.scss';
@import '~@/_flex-mixin.scss';
@import '~@/_column-row.scss';
@import '~@/_colors.scss';

@mixin iconStyle($c, $fz){
  cursor: pointer;
  color: $c;
  margin: 0;
  font-size: $fz;
}

@mixin buttonStyle($js){
  background-color: white;
  border: none;
  outline: none;
  justify-self: $js;
}

.task {
    @include grid(40px auto auto 40px, start, center);
    grid-row-gap: 10px;
    grid-column-gap: 5px;
    border: 2px solid $dark-grey;
    padding: 8px;
}

.task-nogrid {
  @include flex(center, center);
  width: 90%;
  border: 2px solid $dark-grey;
  padding: 8px;
}

#divIcon-nogrid {
    height: 100%;
    width: 40px;
}

#remains-nogrid {
    height: 100%;
    width: calc( 100% - 80px);
    margin-left: 10px;
    margin-right: 10px;
    @include flex(flex-start, center);
    flex-wrap: wrap;
}

.time-created{
  @include column-row(2/span 1, 1/span 1);
}

.time-done {
    @include column-row(3/span 1, 1/span 1);
}

.time-created-nogrid, .time-done-nogrid {
  width: 50%;
  font-size: 12px;
}

.time-done-nogrid {
  text-align: right;
}

.task-text-nogrid {
    width: 95%;
    margin: 10px 0;
    text-align: left;
}

.delete-button_icon {
    @include iconStyle(red, 22px);
}

.restore-button_icon {
    @include iconStyle($bright-green, 18px);
}

.delete-button {
    @include column-row(4/span 1, 1/span 2);
    @include buttonStyle(end);
}

.restore-button {
    @include column-row(1/span 1, 1/span 2);
    @include buttonStyle(start);
}
</style>
