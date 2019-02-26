<script>
import DatePicker from 'vue2-datepicker'
 
export default {
  components: { DatePicker },
  data() {
    return {
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
        }
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
}
</script> 
<template>
  <div>
    <date-picker v-model="value" :lang="lang"></date-picker>
  </div>
</template>