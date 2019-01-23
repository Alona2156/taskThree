<template>
  <task-ui-component v-bind:tasks="tasks" v-bind:selected="selected">
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
      selected: ""
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'activeTasks'
    })
  },
  components: {
    'task-ui-component': Task
  }
}
</script>
