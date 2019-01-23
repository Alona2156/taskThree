<template>
  <task-ui-component v-bind:tasks="tasks" v-bind:selected="selected">
  </task-ui-component>
</template>

<script>
import Task from '../ui/task/deleted-task'
import {
  mapGetters
} from 'vuex'

export default {
  data() {
    return {
      selected: ""
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'deletedTasks'
    })
  },
  components: {
    'task-ui-component': Task
  }
}
</script>

<style>
.task {
  border: 3px solid grey;
}
</style>
