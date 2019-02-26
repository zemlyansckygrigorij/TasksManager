<template>
<div class = "EditTask">
<div>Пользователь {{ $route.params.id }}</div>
	<form >
		<p>Название задачи  - {{task.name}}</p>
		<p><label for="description">Описание задачи <em>*</em></label>
               <br/>
		<textarea id="description" v-model="description" maxlength = "2048" class = "edit_description"> </textarea><br/>
			статус - {{this.statusTask}}<br/>

		</p>  
				<date-picker v-model="date" :lang="lang" id="datepicker"></date-picker><br/>
		<button v-on:click="finishTask">Завершить задачу</button>
		<button v-on:click="saveChange">Сохранить изменения</button>	

		
	</form>
</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  name: 'Task',
  components: { DatePicker },
  data () {
    return {
       
		task: undefined,
		name: '', // объявление переменной,
	    description:'',
		tasks: undefined,
		date:'',
		statusTask:'',
		statusDate: true,
		time1: '',
		time2: '',
		time3: '',
		value:"",
		// custom lang
		lang: {
	    days: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			pickers: ['следующие 7 дней', 'следующие 30 дней', 'предыдущие 7 дней', 'предыдущие 30 дней'],
			placeholder: {
			  date: 'Выберите дату',
			  dateRange: 'Выберите диапазон дат'
			},
		  // custom range shortcuts
		  shortcuts: [
			{
			  text: 'Сегодня',
			  onClick: () => {
				this.time3 = [ new Date(), new Date() ]
			  }
			}
		  ],
		  timePickerOptions:{
			start: '00:00',
			step: '00:30',
			end: '23:30'
		  }
    }
	}
  },

  created: function () {
   let taskId = this.$route.params.id
   console.log('The id is: ' +  taskId);
	if(!localStorage.getItem("tasks")){
		alert("Заданий нет");
		return;
	}
	this.tasks = JSON.parse(localStorage.getItem("tasks"));

	
	let task = this.tasks.filter(function(t) {
		return t.id == taskId;
	})[0];
	this.task = task;
	this.name = task.name;
	this.description = task.description;
	this.date = task.date;
	this.statusTask = task.statusTask;
	
	

},
mounted: function () {},
methods: {
	finishTask: function () {
		this.statusTask = "завершено";
	},
	saveChange: function () {
		
		this.task.name = this.name;
		this.task.statusTask = this.statusTask;
		this.task.description = this.description;
		this.task.date = this.date;
		localStorage.setItem("tasks",JSON.stringify(this.tasks));
	}
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
	width:300px;
	height:100px;
}
.taskDescription{
	width:300px;
	height:100px;
	text-overflow: ellipsis;
}
</style>
