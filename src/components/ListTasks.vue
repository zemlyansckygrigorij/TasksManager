<template>

 <div class = "list-tasks">
	
	<div class = "task" v-for="task in tasks" > 
		название - {{task.name}}<br/> 
		описание<br/>
		<div class ="taskDescription">
			{{task.description}}
		</div>
		<br/>
		статус-{{task.statusTask}}
		<br/>  
		дата выполнения - {{task.datePrint}}
		<br/> 
		<p v-if="!task.statusDate">
			просрочено
		</p>  
		<br/> 
		
		<router-link :to="{ name: 'Task', params: { id:  task.id }}">Редактировать</router-link>
		<br/>	<br/>
		<hr>
	</div>	<br/>	<br/>
	<button v-on:click="getOutDateTasks"> просроченные задачи </button><br/> 
	<button v-on:click="getFinishTasks">выполненные задачи</button><br/> 
	<button v-on:click="getWorkTasks">рабочие задачи </button><br/> 
	<button v-on:click="reset">сброс </button>
</div>	
</template>

<script>
export default {
  name: 'ListTasks',
  data () {
    return {
      tasks: undefined
    }
  },
  created: function () { 
	if(!localStorage.getItem("tasks")){
		alert('Заданий нет !');
		return;
	}
	if(localStorage.getItem("tasks").length>0){
		this.tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	 // Get today's date
	let todaysDate = new Date();
	this.tasks.forEach(function(item, i, arr) {
		/*  check date*/
		let inputDate = new Date(item.date	);
		// call setHours to take the time out of the comparison
		if(inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) {
		// Date equals today's date
			item.statusDate=false;
		}
	});		
},
 methods: {
    
	getOutDateTasks: function(){
		this.tasks = this.tasks.filter(function(item) {
			return	item.statusDate==false;
		});
	},
	getFinishTasks: function(event){
		this.tasks = JSON.parse(localStorage.getItem("tasks")).filter(function(item) {
			return	item.statusTask== "завершено";
		});
	},
	getWorkTasks: function(event){
		this.tasks = JSON.parse(localStorage.getItem("tasks")).filter(function(item) {
			return	item.statusTask== "в работе";
		});
	},
	reset: function(event){
		this.tasks = JSON.parse(localStorage.getItem("tasks"));
	}
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-tasks{
	margin:20px;
}
task{
	margin:20px;
	display: -webkit-flex; 
	-webkit-flex-direction: column;
	display: flex;
	flex-direction:column;
    left:25%;

}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.edit_description{

	/*width:300px;*/
	height:100px;
}
.taskDescription{
	
	height:100px;
	text-overflow: ellipsis;

}
button{
background: #3498db;
  background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
  background-image: -moz-linear-gradient(top, #3498db, #2980b9);
  background-image: -ms-linear-gradient(top, #3498db, #2980b9);
  background-image: -o-linear-gradient(top, #3498db, #2980b9);
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  -webkit-border-radius: 28;
  -moz-border-radius: 28;
  border-radius: 28px;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  width:300px;
  }
  
</style>
