<template>
    <va-card class="p-3 mb-4 whitespace-nowrap">
        <h3 class="mb-3">Số lượng đăng ký khóa học: {{ data.length }}</h3>
        <div class="flex items-center mb-2 ">
        <h4>Đã thanh toán:</h4>
        <va-progress-bar :model-value="starFine" size="1.5rem" color="primary" content-inside  >{{ starFine }}</va-progress-bar>
    </div>
    <div class="flex items-center mb-2">
        <h4>Chưa thanh toán:</h4>
        <va-progress-bar :model-value="starFour" size="1.5rem" color="warning" content-inside  >{{ starFour }}</va-progress-bar>
    </div>
    <div class="flex items-center mb-2">
        <h4>Đã hủy:</h4>
        <va-progress-bar :model-value="starThree" size="1.5rem" color="danger" content-inside   >{{ starThree }}</va-progress-bar>
    </div>
    </va-card>
</template>

<script setup>
import { defineProps,ref } from "vue";
const props = defineProps({
    data: Array
})
const starFine=ref(props.data.filter(i=>i.status==1).length)
const starFour=ref(props.data.filter(i=>i.status==0).length)
const starThree=ref(props.data.filter(i=>i.status==2).length)

</script>