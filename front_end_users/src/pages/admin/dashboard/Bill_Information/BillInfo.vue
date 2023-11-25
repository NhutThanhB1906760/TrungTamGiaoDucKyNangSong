<template>
    <va-card class="w-fit p-4 my-0 mx-auto">
        <h3 class=" va-h4 text-green-500 text-center uppercase">
            thanh toán học phí thành công
        </h3>
        <hr>
        <div class="lg:text-3xl text-lg">
            <h6>Thời gian thanh toán: {{ moment(new Date()).format('HH:mm DD-MM-YYYY') }}</h6>
            <h6>Hình thức thanh toán: VNPAY</h6>
            <h6>Số tiền thanh toán: {{ money.toLocaleString('vi-VN', {
                style:
                    'currency', currency: 'VND'
            }) }}</h6>
            <h6>Khóa học đăng ký: {{ regInfo }}</h6>
        </div>
    </va-card>
</template>

<script setup>
import { useRoute } from "vue-router";
import moment from 'moment'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import RegInfoService from '@/api_services/regInfo.service'
import BillInfoService from '@/api_services/billing_information.service'

import { ref, computed, onMounted, defineProps } from 'vue'
const props = defineProps([
    'vnp_Amount'
])
const money = ref(0)
const id = ref()
const route = useRoute();
const regInfo = ref()
// Lấy giá trị của tham số từ URL
onMounted(async () => {
    money.value = Number(route.query.vnp_Amount / 100)
    id.value = route.query.vnp_OrderInfo
    console.log(id.value);
    let reg = await RegInfoService.get({ id: id.value })
    let classInfo = await ClassService.get({ id: reg[0].class_id })
    let cours = await CoursesService.get({ id: classInfo[0].courses_id })
    console.log(reg);
    regInfo.value = cours[0].name + ' - Lớp ' + classInfo[0].name

    let data={
        payment_methods:1,
        payment_amount:money.value,
        regInfo_id:id.value,
        cours_name:cours[0].name,
        class_name:classInfo[0].name
    }
    let updateReg=await RegInfoService.update(id.value,{status:1})
    let createBill =await BillInfoService.create(data)
})

</script>