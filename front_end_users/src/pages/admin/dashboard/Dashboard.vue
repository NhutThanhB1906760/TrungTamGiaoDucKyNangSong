<template>
  <div class="">
<CoursDetail/>
<!-- <RegCoursesDetail/> -->

  </div>
</template>

<script setup lang="ts">
import CoursDetail from './users/CoursDetail.vue'
import RegCoursesDetail from './users/RegCoursesDetail.vue'

import { ref, computed, onMounted } from 'vue'
import axios from 'axios';
// import DashboardTabs from './DashboardTabs.vue'
var amount = ref()
var bankCode = ref()
var language = ref()
var coursInfo = {
  content: 'ádas',
  object: 'Trẻ em'
}
const submitForm = async () => {
  try {
    const data = {
      amount: amount.value,
      bankCode: bankCode.value,
      language: language.value,
      href: window.location.href
    }
    console.log(data);

    const response = await axios.post('http://localhost:3000/api/vnpay/create_payment_url', data);
    // const response = await axios.get('http://localhost:8888' );

    // Xử lý phản hồi từ backend tại đây
    console.log('Phản hồi từ backend:', response.data);
    const newTab = window.open(response.data, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      console.error('Failed to open new tab.');
    }

  } catch (error) {
    console.error('Lỗi khi gửi biểu mẫu:', error);
  }
}


</script>

<style lang="scss">
.dashboard {
  .va-card {
    margin-bottom: 0 !important;

    &__title {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
