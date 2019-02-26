import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListTasks from '@/components/ListTasks'
import CreateTask from '@/components/CreateTask'
import Task from '@/components/Task'
import Main from '@/components/Main'
//import vue-jquery from 'vue-jquery'

Vue.use(Router)
//Vue.use(vue-jquery)
export default new Router({
  routes: [
  /*  { path: '/', redirect: '/createTask' },*/
    {
      path: '/listTasks',
      name: 'ListTasks',
      component: ListTasks
    },
	{
      path: '/createTask',
      name: 'CreateTask',
      component: CreateTask
    },
	{
      path: '/task/:id',
      name: 'Task',
      component: Task
    }
  ]
})
