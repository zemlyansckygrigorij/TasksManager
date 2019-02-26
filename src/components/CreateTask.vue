<template>

<div class = "create_Task">
		<form >
			<p><label for="name">Название задачи <em>*</em></label><br/><input class = "create_name" type="text" id="name"  v-model="name"> </p>
			<p><label for="description">Описание задачи <em>*</em></label><br/>

			<textarea id="description" v-model="description" maxlength = "2048" class = "create_description"> </textarea>

			</p>  
			<date-picker v-model="date" :lang="lang" id="datepicker"></date-picker><br/>
			
			  <button v-on:click="createTask">Создать событие</button>
		 </form>
</div>
</template>

<script>
//import DatePicker from './DatePicker.vue';
//import $ from 'jquery';  // подключаем jQuery
import DatePicker from 'vue2-datepicker'
export default {
  name: 'CreateTask',
 // components: {'datePicker': DatePicker },
  components: { DatePicker },
  data () {
    return {
        msg: 'Welcome to Your Vue.js App',
	    name: '', // объявление переменной,
	    description:'',
		tasks: [],
		date:'',
		datePrint:'',
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
	if(localStorage.getItem("tasks")){
		this.tasks = JSON.parse(localStorage.getItem("tasks"));
	}
  },
   mounted: function () {},
   methods: {
    createTask: function () {
		if(this.date==''){
			alert("Введите дату события");
			return;
		}
		
		if(this.name==''){
			alert("Введите название события");
			return;
		}
		if(this.description==''){
			alert("Введите описание события");
			return;
		}
		
		let i = 0;
		
		if(this.tasks.length > 0){
			i = this.tasks[this.tasks.length-1].id+1;
		}
		/*  check date*/
		let inputDate = new Date(this.date	);

       // Get today's date
		let todaysDate = new Date();

		// call setHours to take the time out of the comparison
		if(inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) {
		// Date equals today's date
			alert("Нельзя вставлять прошедшую дату");
			return;
		}
		let month = this.date.getMonth()+1;
		let year = this.date.getFullYear();
		let day = this.date.getDate();
		this.datePrint =day +"/"+month+"/"+year;
		this.tasks.push({
			id:i,
		    name: this.name,
			description: this.description,
			statusTask: "в работе",
			date: this.date	,
			statusDate: true,
            datePrint: this.datePrint
		
		});
		localStorage.setItem("tasks",JSON.stringify(this.tasks));
		
		this.name ='';
		this.description ='';
		document.getElementById("datepicker").value = '';
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
.create_description{
	width:300px;
	height:100px;
}
</style>
