<template>
    <va-card class="h-[36.5em]">
        <va-card-title>Thống kê doanh thu của năm</va-card-title>
        <div class="p-3">
            <va-select v-model="value" :options="yearsArray" label="Chọn năm" @update:modelValue="update" />
        </div>
        <va-card-content>

            <Bar v-if="show" id="my-chart-id" :chart-options="chartOptions" :chart-data="chartData" />
        </va-card-content>
    </va-card>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import RegInfoService from '@/api_services/regInfo.service'
import BillInfoService from '@/api_services/billing_information.service'

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const show = ref(false)
const yearsArray = ref([])
const value = ref(new Date().getFullYear())
const bill = ref([])
const props = defineProps({
    message:Function,
});
onMounted(async () => {

    bill.value = await BillInfoService.getAll()
    const currentYear = new Date().getFullYear();

    for (let year = 2021; year <= currentYear; year++) {
        yearsArray.value.push(year);
    }
    update()
})

function update() {
    show.value = false
    props.message(value.value)
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let data = []
    let year = bill.value.filter(y => new Date(y.create_at).getFullYear() == value.value)
    month.forEach(i => {
        let item = year.filter(y => new Date(y.create_at).getMonth()+1 == i)
        if (item.length == 0) {
            data.push(0)
        }
        else {
            const totalCost = item.reduce((accumulator, product) => {
                return accumulator + product.payment_amount;
            }, 0);
            data.push(totalCost)
        }
    })
    chartData.value.labels = month
    chartData.value.datasets[0].data = data
    show.value = true
}
let chartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Doanh thu',
            backgroundColor: '#f87979',
            data: []
        }
    ]
})
let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
}


</script>