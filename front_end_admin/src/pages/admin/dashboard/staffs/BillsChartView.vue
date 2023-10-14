<template>
    <div class="grid grid-cols-12 gap-3 ">
        <div class="lg:col-span-7 md:col-span-7 col-span-12">
            <RevenueChartVue :message="message" />
        </div>
        <div class="lg:col-span-5 md:col-span-5 col-span-12">
            <va-card class="mb-2 text-3xl font-bold text-center ">
                <va-card-title>Tổng số doanh thu năm {{ data }}</va-card-title>

                <va-card-content class="text-orange-500">
                    {{ total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}

                </va-card-content>
            </va-card>
            <PaymentMethodChart />
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";

import RevenueChartVue from './RevenueChart.vue';
import PaymentMethodChart from './PaymentMethodChart.vue';
import BillInfoService from '@/api_services/billing_information.service'

const data = ref(new Date().getFullYear())
const total = ref(0)
const bill=ref([])
onMounted(async () => {
    bill.value=await BillInfoService.getAll()
    update()
})
function update(){
    let filter = bill.value.filter(y => new Date(y.create_at).getFullYear() == data.value)
    total.value = filter.reduce((accumulator, product) => {
        return accumulator + product.payment_amount;
    }, 0);
}
const message = (e) => {
    data.value = e
    update()
}
</script>