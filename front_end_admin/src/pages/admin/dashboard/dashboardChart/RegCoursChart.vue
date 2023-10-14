<template>
     <va-card v-if="lineChartDataGenerated" class="chart-widget col-span-12">
        <va-card-title>Tổng số lượt đăng ký và hủy theo tháng trong năm</va-card-title>
        <va-card-content>
          <va-chart :data="lineChartDataGenerated" type="line" />
        </va-card-content>
      </va-card>
</template>

<script setup>
import { useChartData } from '../../../../data/charts/composables/useChartData'
import {
    lineChartData,
} from './RegCoursData'
import VaChart from '../../../../components/va-charts/VaChart.vue'

const lineChartDataGenerated = useChartData(lineChartData, 0.7)


</script>