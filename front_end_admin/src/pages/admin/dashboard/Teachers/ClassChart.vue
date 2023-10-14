<template>
    <va-card>
        <va-card-title>Thống kê tỉ lệ tham gia lớp học</va-card-title>
        <va-card-content>
            <div class="flex items-center mb-2">
                <va-progress-bar  size="1.5rem" color="warning" content-inside show-percent />
            </div>
        </va-card-content>
    </va-card>

    <va-card >
        <va-card-title>Thống kê số lượng loại của lớp học</va-card-title>

        <va-card-content>
            
                <Bar   id="my-chart-id" :chart-options="chartOptions" :chart-data="chartData" />
        </va-card-content>
    </va-card>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import RegInfoService from '@/api_services/regInfo.service'
import SubscribersService from '@/api_services/subscribers.service'
import MediumScoreService from '@/api_services/medium_score.service'

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
let chartData =  {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      }
let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
}
const props = defineProps({
    class_id: Number
})
async function getData() {

}
</script>