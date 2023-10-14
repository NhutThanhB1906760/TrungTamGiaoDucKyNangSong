<template>
    <va-card class="">
        <va-card-title>Thống kê số lượng đăng ký của khóa học</va-card-title>
        <va-card-content>

            <Pie v-if="show" :chart-options="chartOptions" :chart-data="chartData" />
        </va-card-content>
    </va-card>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import RegInfoService from '@/api_services/regInfo.service'
import BillInfoService from '@/api_services/billing_information.service'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)
const show = ref(false)
const yearsArray = ref([])
const value = ref(new Date().getFullYear())
const bill = ref([])

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

onMounted(async () => {

    bill.value = await CoursesService.getAll()
    let classStudy = await ClassService.getAll()
    let reg = await RegInfoService.getAll()
    let labels = bill.value.map(item => item.name)
    let value = []
    bill.value.forEach(item => {
        let total = 0
        let temp = classStudy.filter(i => i.courses_id == item.id)
        temp.forEach(y => {
            let number = reg.filter(z => z.class_id == y.id)
            total += number.length
        })
        value.push(total)
    })
    const uniqueColors = [];
    const backgroundColors = [];

    for (let i = 0; i < labels.length; i++) {
        let color;
        do {
            color = getRandomColor();
        } while (uniqueColors.includes(color));

        uniqueColors.push(color);
        backgroundColors.push(color);
    }
    chartData.value.labels = labels
    chartData.value.datasets[0].backgroundColor = backgroundColors
    chartData.value.datasets[0].data=value
    show.value=true
})

function update() {
    show.value = false
    props.message(value.value)
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let data = []
    let year = bill.value.filter(y => new Date(y.create_at).getFullYear() == value.value)
    month.forEach(i => {
        let item = year.filter(y => new Date(y.create_at).getMonth() == i)
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
            backgroundColor: [],
            data: []
        }
    ]
})
let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
}


</script>