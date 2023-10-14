<template>
    <va-card class="p-3 mb-4 whitespace-nowrap">
        <h3 class="mb-3">Số lượng đánh giá: {{ data.length }}</h3>

        <div class="flex items-center mb-2 ">
        <h4>Đánh giá 5 sao:</h4>
        <va-progress-bar :model-value="starFine" size="1.5rem" color="warning" content-inside >{{ starFine }}</va-progress-bar>
    </div>
    <div class="flex items-center mb-2">
        <h4>Đánh giá 4 sao:</h4>
        <va-progress-bar :model-value="starFour" size="1.5rem" color="warning" content-inside  >{{ starFour }}</va-progress-bar>
    </div>
    <div class="flex items-center mb-2">
        <h4>Đánh giá 3 sao:</h4>
        <va-progress-bar :model-value="starThree" size="1.5rem" color="warning" content-inside  >{{ starThree }}</va-progress-bar>
    </div>
    <div class="flex items-center mb-2">
        <h4>Đánh giá 2 sao:</h4>
        <va-progress-bar :model-value="starTwo" size="1.5rem" color="warning" content-inside  >{{ starTwo }}</va-progress-bar>
    </div>
    <div class="flex items-center mb-2">
        <h4>Đánh giá 1 sao:</h4>
        <va-progress-bar :model-value="starOne" size="1.5rem" color="warning" content-inside  >{{ starOne }}</va-progress-bar>
    </div>
    </va-card>
</template>

<script setup>
import { defineProps,ref } from "vue";
const props = defineProps({
    data: Array
})
const starFine=ref(props.data.filter(i=>i.rate==5).length)
const starFour=ref(props.data.filter(i=>i.rate==4).length)
const starThree=ref(props.data.filter(i=>i.rate==3).length)
const starTwo=ref(props.data.filter(i=>i.rate==2).length)
const starOne=ref(props.data.filter(i=>i.rate==1).length)

</script>