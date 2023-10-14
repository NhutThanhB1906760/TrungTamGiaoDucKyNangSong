<template>
   
    <va-card >
        <va-card-title>Thống kê hình thức thanh toán</va-card-title>

        <va-card-content>
            <Doughnut v-if="show" :chart-data="data" :chart-options="options" />

        </va-card-content>
    </va-card>
</template>
  
<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { defineProps, ref, onMounted } from "vue";
import RegInfoService from '@/api_services/regInfo.service'
import BillInfoService from '@/api_services/billing_information.service'
const show = ref(false)
const bill = ref([])

ChartJS.register(ArcElement, Tooltip, Legend)
onMounted(async () => {
    bill.value = await BillInfoService.getAll()
    let dataitem = []
    let money = bill.value.filter(i => i.payment_methods == 0)
    dataitem.push(money.length)
    let vnpay = bill.value.filter(i => i.payment_methods == 1)
    dataitem.push(vnpay.length)
    data.value.datasets[0].data = dataitem
    show.value = true
})

const data = ref({
    labels: ['Tiền mặt', 'VNPAY'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651'],
            data: []
        }
    ]
})

const options = {
    responsive: true,
    maintainAspectRatio: false
}

</script>
  