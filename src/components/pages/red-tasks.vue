<template>
<task-ui-component v-bind:tasks="tasks" v-bind:selected="selected" v-bind:options="options">
</task-ui-component>
</template>

<script>
import Task from '../ui/task/task'
import {
  mapGetters
} from 'vuex'

export default {
  data() {
    return {
      selected: "",
      options: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'redTasks'
    })
  },
  components: {
    'task-ui-component': Task
  }
}
</script>
