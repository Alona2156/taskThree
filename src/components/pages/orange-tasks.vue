<template>
<task-ui-component
:tasks="tasks"
:selected="selected"
:options="options">
</task-ui-component>
</template>

<script>
import Task from '../ui/task/task'
import {mapGetters} from 'vuex'

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
      tasks: 'orangeTasks'
    })
  },
  components: {
    'task-ui-component': Task
  }
}
</script>
