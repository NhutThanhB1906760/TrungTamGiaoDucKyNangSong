<template>
    <va-card class="p-4">
        <va-tabs stateful grow v-model="value">
        <template #tabs>
            <va-tab v-for="title in ['Ưu đãi theo thời gian', 'Ưu đãi theo nhóm',]" :key="title" :name="title">
                {{ title }}
            </va-tab>
        </template>
        <va-card class="w-full mt-5">
            <!-- <div v-if="value=='Ưu đãi theo thời gian'">aa</div>
            <div v-else>assa</div> -->
            <promotion-date v-if="value == 'Ưu đãi theo thời gian'" />
            <promotion-group v-else />
        </va-card>
    </va-tabs>
    </va-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PromotionDate from './PromotionDate.vue';
import PromotionGroup from './PromotionGroup.vue'

const value = ref()
onMounted(() => {
    value.value = 'Two'
})
const a = computed(() => {

    console.log(value.value);
})
</script>
