<template>
    <va-card class="p-3">
        <Loading :show="showLoading" />
        <h3 class="va-h5 text-blue-400 text-center uppercase">
            danh sách đăng ký khóa học
        </h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            <va-input v-model="filter" class="col-span-5" placeholder="Filter..." />
        </div>
        <va-data-table :items="items" :columns="columns" :per-page="perPage" :current-page="currentPage" :filter="filter"
            @filtered="filtered = $event.items">

            <template #cell(create_at)="row">
                <div>
                    {{ moment(row.rowData.create_at).format('HH:mm DD-MM-YYYY') }}
                </div>
            </template>
            <template #cell(fees_calculated)="row">
                <div>
                    {{ row.rowData.fees_calculated.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                </div>
            </template>
            <template #cell(status)="row">
                <div>
                    <strong class="text-yellow-400" v-if="row.rowData.status == 0">Chưa thanh toán</strong>
                    <strong class="text-blue-400" v-else-if="row.rowData.status == 1">Đã thanh toán</strong>
                    <strong class="text-red-400" v-else>Đã hủy</strong>
                </div>
            </template>
            <template #cell(action)="{ row, isExpanded }">
                <va-button @click="row.toggleRowDetails()" :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
                    preset="secondary" class="">
                    {{ isExpanded ? 'Ẩn' : 'Xem thêm' }}
                </va-button>
                <va-button size="small" v-if="row.rowData.status == 0" @click="payment(row.rowData)" color="primary"
                    class="mr-1">Thanh toán</va-button>
                <va-button size="small" v-if="row.rowData.status == 0" @click="delItem(row.rowData.id)" color="danger"
                    class="">Hủy X</va-button>
            </template>

            <template #expandableRow="{ rowData }">
                <div class="p-4 bg-slate-300" v-if="rowData.status == 1">
                    <h4>Thông tin thanh toán:</h4>

                    <div>Thời gian thanh toán: {{ moment(getBill(rowData.id)?.create_at).format('HH:mm DD-MM-YYYY') }}</div>
                    <div v-if="getBill(rowData.id)?.payment_methods == 0">Hình thức thanh toán: Tiền mặt</div>
                    <div v-else>Hình thức thanh toán: VNPAY</div>
                    <div v-if="getBill(rowData.id)?.payment_methods == 0">Nhân viên thu tiền: {{
                        getBill(rowData.id)?.personnel_name }}</div>
                    <div>Số tiền thanh toán: {{ getBill(rowData.id)?.payment_amount.toLocaleString('vi-VN', {
                        style:
                            'currency', currency: 'VND'
                    }) }}</div>

                </div>
            </template>
            <template #bodyAppend>
                <tr>
                    <td colspan="12">
                        <div class="flex justify-center mt-4">
                            <va-pagination v-model="currentPage" :pages="pages" :visible-pages="4" />
                        </div>
                    </td>
                </tr>
            </template>
        </va-data-table>
    </va-card>
</template>
<script setup>
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
const { init } = useToast()

import RegInfoService from '@/api_services/regInfo.service'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import SubscribersService from '@/api_services/subscribers.service'
import BillInfoService from '@/api_services/billing_information.service'
import PersonnelService from '@/api_services/personnel.service'
import axios from 'axios'
import { useModal } from 'vuestic-ui'
import moment from 'moment'
// const props = defineProps({
//     cours: Object
// });

var perPage = ref(5)
var currentPage = ref(1)
var items = ref([])
var filter = ref('')
var filtered = items.value

const pages = computed(() => {
    return perPage.value && perPage.value !== 0
        ? Math.ceil(items.value.length / perPage.value)
        : items.value.length;
})
onMounted(() => {
    getCourses()
})
function getBill(id) {
    return billInfo.value.find(i => i.regInfo_id == id)
}
const data = ref()
const billInfo = ref()
const getCourses = async () => {
    items.value = []
    items.value = await RegInfoService.get({ subscribers_id: $cookies.get('user')?.id })
    data.value = items.value
    billInfo.value = await BillInfoService.getAll()
    let per = await PersonnelService.getAll()
    billInfo.value = billInfo.value.map(itemA => {
        const matchB = per.find(itemB => itemB.id === itemA.personnel_id);
        if (matchB) {
            return { ...itemA, personnel_name: matchB.name };
        } else {
            return { ...itemA, personnel_name: null };
        }
    });
    let cours = await CoursesService.getAll()
    let classRoom = await ClassService.getAll()
    let user = await SubscribersService.getAll()

    items.value = items.value.map(itemA => {
        const matchB = user.find(itemB => itemB.id === itemA.subscribers_id);
        if (matchB) {
            return { ...itemA, user_name: matchB.name };
        } else {
            return { ...itemA, user_name: null };
        }
    });
    classRoom = classRoom.map(itemA => {
        const matchB = cours.find(itemB => itemB.id === itemA.courses_id);
        if (matchB) {
            return { ...itemA, cours_name: matchB.name };
        } else {
            return { ...itemA, cours_name: null };
        }
    });
    items.value = items.value.map(itemA => {
        const matchB = classRoom.find(itemB => itemB.id === itemA.class_id);
        if (matchB) {
            return { ...itemA, class_name: matchB.name, cours_name: matchB.cours_name };
        } else {
            return { ...itemA, class_name: null, cours_name: null };
        }
    });

}
const columns = [
    // { key: 'user_name', label: "Tên người đăng ký", sortable: true },
    { key: 'cours_name', label: "Khóa học", sortable: true, },
    { key: 'class_name', label: "Lớp học", sortable: true, },
    { key: 'create_at', label: "Ngày đăng ký", sortable: true },
    { key: 'fees_calculated', label: "Học phí cần đóng", sortable: true },
    { key: 'status', label: "Trạng thái", sortable: true, },
    { key: "action", label: ' ' },
];

const { confirm } = useModal()
const delItem = (id) => {
    confirm('Bạn có chắc muốn hủy?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await RegInfoService.update(id, { status: 2 })
    if (item) {
        init({ message: 'Hủy thành công', color: 'success' })
        getCourses()
    }
}

const payment = async (e) => {
    try {
        console.log(e);
        const data = {
            amount: e.fees_calculated,
            bankCode: 'NCB',
            language: 'vn',
            href: 'http://127.0.0.1:3001/user/billInfo',
            reg_id: e.id
        }
        console.log(data);

        const response = await axios.post('http://localhost:3000/api/vnpay/create_payment_url', data).then(response => {
            console.log('Phản hồi từ backend:', response.data);
            const newTab = window.location.href=response.data
            if (newTab) {
                newTab.focus();
            } else {
                console.error('Failed to open new tab.');
            }
        });

        // Xử lý phản hồi từ backend tại đây


    } catch (error) {
        console.error('Lỗi khi gửi biểu mẫu:', error);
    }
}

const showLoading = ref(false)

</script>
