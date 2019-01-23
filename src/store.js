import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

Vue.use(Vuex);

function getPriorityProp(state, propName, index){
  var prop;
  state.priorities.forEach((p) =>{
    if (state.priorities.indexOf(p) === index){
      if (propName === "level"){
        prop = p.level;
      }
      else if (propName === "color"){
        prop = p.color;
      }
    }
  })
  return prop;
}


export const store = new Vuex.Store({
  state: {
    allTasks: [],
    userLoggedIn: false,
    priorities: [],
    currentPriority: "",
    mediaquery: 0
  },
  getters: {
    activeTasks: state => {
      return state.allTasks.filter(allTask => allTask.status === "active");
    },
    deletedTasks: state => {
      return state.allTasks.filter(allTask => allTask.status === "done");
    },
    Red: state => {
      return getPriorityProp(state, "level", 0);
    },
    Orange: state => {
      return getPriorityProp(state, "level", 1);
    },
    Yellow: state => {
      return getPriorityProp(state, "level", 2);
    },
    RedColor: state => {
      return getPriorityProp(state, "color", 0);
    },
    OrangeColor: state => {
      return getPriorityProp(state, "color", 1);
    },
    YellowColor: state => {
      return getPriorityProp(state, "color", 2);
    },
    redTasks: (state, getters) => {
      return getters.activeTasks.filter(activeTask => activeTask.priorityLevel === getters.Red);
    },
    orangeTasks: (state, getters) => {
      return getters.activeTasks.filter(activeTask => activeTask.priorityLevel === getters.Orange);
    },
    yellowTasks: (state, getters) => {
      return getters.activeTasks.filter(activeTask => activeTask.priorityLevel === getters.Yellow);
    },
    urgentTasks: (state, getters) => {
      return getters.activeTasks.filter(activeTask => activeTask.urgent === true);
    }
  },
  mutations: {
    loadTasks(state, tasks) {
      state.allTasks = [];
      tasks.forEach((task) =>{
        task.priorityColor = task.priority.color;
        task.priorityLevel = task.priority.level;
        state.allTasks.push(task);
      })
    },
    loadPriorities(state, priorities){
      state.priorities = priorities;
        if (priorities.length > 0){
          state.currentPriority = priorities[0]._id;
        }
    },
    userLogIn(state, logIn) {
      state.userLoggedIn = logIn;
    },
    updateCurrentPriority(state, payload){
      state.currentPriority = payload;
    }
  },
  actions: {
    loadTasks({
      commit
    }) {
      axios.get('http://localhost:3001/tasks/get-tasks')
        .then(response => {
          commit('loadTasks', response.data);
        })
        .catch(error => {
          console.log(error);
        })
    },
    loadPriorities({
      commit
    }) {
        axios.get('http://localhost:3001/priorities/get-priorities')
        .then(response =>{
          commit('loadPriorities', response.data);
         })
        .catch(error =>{
          console.log(error);
        });
    },
    defaultPriorities({commit, dispatch}){
      axios.post('http://localhost:3001/priorities/post-priorities', {})
      .then(response =>{
        console.log(response.data);
      })
      .catch(error =>{
        console.log(error);
      });
    },
    updateCurrentPriority({commit}, payload){
      commit('updateCurrentPriority', payload);
    },
    postNewTask({
      commit
    }, newTask) {
      axios.post('http://localhost:3001/tasks/post-new-task', newTask)
        .then(response => {
          commit('loadTasks', response.data);
        })
        .catch(error => {
          console.log(error);
        })
    },
    updateTask({
      commit
    }, newField) {
      axios.patch('http://localhost:3001/tasks/update-task', newField)
        .then(response => {
          commit('loadTasks', response.data)
        })
        .catch(error => {
          console.log(error);
        })
    },
    updatePriority({
      commit, dispatch
    }, newPriority){
      axios.patch('http://localhost:3001/priorities/update-priority', newPriority)
      .then(response => {
        commit('loadPriorities', response.data);
        dispatch('loadTasks');
      })
      .catch(error => {
        console.log(error);
      })
    },
    deleteTask({
      commit,
      dispatch
    }, taskId) {
      axios.delete('http://localhost:3001/tasks/delete-task', {
          params: {
            _id: taskId
          }
        })
        .then(response => {
          dispatch('loadTasks');
        })
        .catch(error => {
          console.log(error);
        })
    },
    postNewUser({
      commit, dispatch
    }, newUser) {
      axios.post('http://localhost:3001/users/signup-user', newUser)
        .then(response => {
          dispatch('defaultPriorities');
          dispatch('loginUser', newUser);
        })
        .catch(error => {
          console.log(error);
        })
    },
    loginUser({
      commit, dispatch
    }, logUser) {
      axios.post('http://localhost:3001/users/login-user', {data: logUser, withCredentials: true})
        .then(response => {
          if (response.status !== 204){
            commit('userLogIn', true);
            dispatch('loadTasks');
            dispatch('loadPriorities');
          }
        })
        .catch(error => {
          commit('userLogIn', false);
          console.log(error);
        })
    },
    logoutUser({
      commit, dispatch
    }) {
      axios.get('http://localhost:3001/users/logout-user')
      .then(response =>{
        commit('userLogIn', false);
        dispatch('loadTasks');
        dispatch('loadPriorities');
      })
      .catch(error =>{
        console.log(error);
      })
    }
  }
})
