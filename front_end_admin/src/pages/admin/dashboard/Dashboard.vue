<template>
  <div class="">


    <!-- <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
      <va-input v-model.number="perPage" type="number" placeholder="Items..." label="Items per page" />
      <va-input v-model.number="currentPage" type="number" placeholder="Page..." label="Current page" />
      <va-input v-model="filter" class="sm:col-span-2 md:col-span-3" placeholder="Filter..." />
    </div>

    <va-data-table :items="items" :columns="columns" :per-page="perPage" :current-page="currentPage" selectable
      :filter="filter" @filtered="filtered = $event.items">
      <template #cell(Action)="row">
        <div>
          <button @click="editItem(row.rowData.id)">Edit </button>
        </div>
      </template>
      <template #bodyAppend>
        <tr>
          <td colspan="6">
            <div class="flex justify-center mt-4">
              <va-pagination v-model="currentPage" :pages="pages" :visible-pages="4" />
            </div>
          </td>
        </tr>
      </template>
    </va-data-table> -->
    <!-- <testDataTable/> -->

    <!-- <form @submit.prevent="submitForm">
      <input type="number" v-model="amount">
      <input type="radio" v-model="bankCode" value="">
      <input type="radio" v-model="bankCode" value="VNPAYQR">
      <input type="radio" v-model="bankCode" value="VNBANK" checked>
      <input type="radio" v-model="bankCode" value="INTCARD">
      <h1>Ngon ngu</h1>
      <input type="radio" v-model="language" value="vn" checked>
      <input type="radio" v-model="language" value="en">
      <button type="submit">Gửi</button>
    </form> -->

    <!-- <test-auto-complete />
    <dashboard-charts />

    <dashboard-info-block /> -->


    <!-- <courses-info /> -->

    <!-- <personnel-infor /> -->
    <!-- <promotion-date/> -->
    <!-- <promotion-group/> -->
    <!-- <promotion-info/> -->
    <!-- <class-info/> -->
    <!-- <subscribers-info/> -->
    <!-- <posts-info/> -->
    <!-- <assessment-info/> -->
    <!-- <reg-cours-info/> -->
    <!-- <collect-fee/> -->

    <!-- <class-teacher/> -->
    <AccountNumber />
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-8 lg:col-span-8"><RegCoursChart /></div>
      <div class="col-span-12 md:col-span-4 lg:col-span-4"><CoursesChart /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CoursesChart from './dashboardChart/CoursesChart.vue'
import RegCoursChart from './dashboardChart/RegCoursChart.vue'
import AccountNumber from './dashboardChart/AccountNumber.vue'
import BillsChartViewVue from './staffs/BillsChartView.vue';
import RevenueChart from './staffs/RevenueChart.vue';
import PaymentMethodChartVue from './staffs/PaymentMethodChart.vue';
import { ref, computed, onMounted } from 'vue'
const isActive = ref(false)
function change() {
  isActive.value = !isActive.value
  console.log(isActive.value);

}
import axios from 'axios';
import ClassTeacher from './Teachers/ClassTeacher.vue'
import CollectFee from './staffs/CollectFee.vue'
import RegCoursInfo from './RegisterCoursesInfo/RegCoursInfo.vue'
import AssessmentInfo from './assessment/AssessmentInfo.vue'
import PostsInfo from './posts/PostsInfo.vue'
import SubscribersInfo from './subscribers/subscribersInfo.vue'
import ClassInfo from './class/ClassInfo.vue'
import PromotionInfo from './promotion/PromotionInfo.vue'
import PromotionDate from './promotion/PromotionDate.vue';
import PromotionGroup from './promotion/PromotionGroup.vue'
import PersonnelInfor from './personnel/PersonnelInfor.vue';
import DashboardCharts from './DashboardCharts.vue'
import DashboardInfoBlock from './DashboardInfoBlock.vue'
import testDataTable from './testDataTable.vue';
import testAutoComplete from './testAutoComplete.vue'
import CoursesInfo from './courses/CoursesInfo.vue'
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

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623 x156",
    website: "kale.biz",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
  },
  {
    id: 6,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
  },
  {
    id: 7,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
  },
  {
    id: 8,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    phone: "024-648-3804",
    website: "ambrose.net",
  }
];

const columns = [
  { key: "id", sortable: true, width: "60px" },
  { key: "username", sortable: true, width: "120px" },
  { key: "name", sortable: true, width: "170px" },
  { key: "email", sortable: true, width: "250px" },
  { key: "phone" },
  { key: "phone", label: "điện thoại" },
  { key: "Action" },
];


var items = ref(users)
var perPage = ref(3)
var currentPage = ref(1)
var filter = ref('')
var filtered = users

const pages = computed(() => {
  return perPage.value && perPage.value !== 0
    ? Math.ceil(filtered.length / perPage.value)
    : filtered.length;
})

const editItem = (i: any) => {
  console.log(i);

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
