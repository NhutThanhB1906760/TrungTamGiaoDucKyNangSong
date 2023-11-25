<template>
    <!-- <RegInfoProcess v-if="data" :data="data" /> -->
    <va-card class="p-3">
        <Loading :show="showLoading" />
        <h3 class="va-h5 text-blue-400 text-center uppercase">
            Danh sách đăng ký chưa thanh toán
        </h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            <va-input v-model="filter" class="col-span-5" placeholder="Tìm kiếm..." />
        </div>
        <va-data-table :items="items" :columns="columns" :per-page="perPage" :current-page="currentPage" :filter="filter"
            @filtered="filtered = $event.items">

            <template #cell(create_at)="row">
                <div>
                    {{ moment(row.rowData.create_at).format('HH:mm DD-MM-YYYY') }}
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
                <!-- <va-button @click="row.toggleRowDetails()" :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
                    preset="secondary" class="">
                    {{ isExpanded ? 'Ẩn' : 'Xem thêm' }}
                </va-button>
                <va-button size="small" icon="edit" @click="editItem(row.rowData)" color="warning" icon-color="#812E9E"
                    class="mr-1" />
                <va-button size="small" icon="delete" @click="delItem(row.rowData.id)" color="danger" icon-color="#ffffff"
                    class="" /> -->
                <va-button color="info" gradient class="" @click="form(row.rowData)">
                    Thu tiền
                </va-button>
            </template>

            <!-- <template #expandableRow="{ rowData }">
                <div class="p-4 bg-slate-300" v-if="rowData.status == 1">
                    <h4>Thông tin thanh toán:</h4>

                    <div>Thời gian thanh toán: {{ moment(getBill(rowData.id).create_at).format('HH:mm DD-MM-YYYY') }}</div>
                    <div v-if="getBill(rowData.id).payment_methods == 0">Hình thức thanh toán: Tiền mặt</div>
                    <div v-else>Hình thức thanh toán: VNPAY</div>
                    <div v-if="getBill(rowData.id).payment_methods == 0">Nhân viên thu tiền: {{
                        getBill(rowData.id).personnel_name }}</div>
                    <div>Số tiền thanh toán: {{ getBill(rowData.id).payment_amount }}</div>

                </div>
            </template> -->
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

    <va-modal class="z-50" v-model="showModal" close-button hide-default-actions blur>
        <div>
            <h3 class="va-h5 text-blue-400 text-center uppercase">
                thông tin đăng ký
            </h3>
        </div>
        <va-form ref="formRef" class="grid grid-cols-4 gap-4 mb-4">
            <va-input placeholder="" class="col-span-2" readonly v-model="time" label="Thời gian đăng ký" />
            <va-input placeholder="" class="col-span-2" readonly v-model="name" label="Tên người đăng ký" />
            <va-input placeholder="" class="col-span-2" readonly v-model="phone" label="Số điện thoại" />
            <va-input placeholder="" class="col-span-2" readonly v-model="cours" label="Khóa học" />
            <va-input placeholder="" class="col-span-2" readonly v-model="classStudy" label="Lớp học" />
            <va-input class="col-span-2" readonly label="Học phí cần đóng" v-model="fee" mask="numeral" placeholder="">
                <template #appendInner>
                    <va-icon name="" color="secondary"><i class="fa-solid fa-dong-sign"></i></va-icon>
                </template> </va-input>

            <va-input class="col-span-4" label="Nhập số tiền đã thu" v-model="collectFee" mask="numeral" placeholder=""
                :rules="[(value) => (value && value == fee) || 'Giá trị nhập chưa đúng']">
                <template #appendInner>
                    <va-icon name="" color="secondary"><i class="fa-solid fa-dong-sign"></i></va-icon>
                </template> </va-input>
            <va-button class="mx-2 col-span-4" @click="validate() && submit()">
                Xác nhận
            </va-button>

        </va-form>
    </va-modal>
</template>
<script setup>
// import RegInfoProcess from './RegInfoProcess.vue'
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import RegInfoService from '@/api_services/regInfo.service'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import SubscribersService from '@/api_services/subscribers.service'
import BillInfoService from '@/api_services/billing_information.service'
import PersonnelService from '@/api_services/personnel.service'
const { isValid, validate, reset } = useForm('formRef')

import { useModal, useForm } from 'vuestic-ui'
import moment from 'moment'
const { init } = useToast()
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
    items.value = await RegInfoService.get({ status: 0 })
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
            return { ...itemA, user_name: matchB.name, phone: matchB.phone };
        } else {
            return { ...itemA, user_name: null, phone: null };
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
    items.value = items.value.map(itemA => ({
        ...itemA,
        fees: itemA.fees_calculated.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

    }));

}
const columns = [
    { key: 'user_name', label: "Tên người đăng ký", sortable: true },
    { key: 'phone', label: "Số điện thoại", sortable: true },
    { key: 'cours_name', label: "Khóa học", sortable: true, },
    { key: 'class_name', label: "Lớp học", sortable: true, },
    { key: 'create_at', label: "Ngày đăng ký", sortable: true },
    { key: 'fees', label: "Học phí cần đóng", sortable: true },
    { key: 'status', label: "Trạng thái", sortable: true, },
    { key: "action", label: ' ' },
];

const time = ref()
const name = ref()
const phone = ref()
const collectFee = ref()
const cours = ref()
const classStudy = ref()
const fee = ref()
const flag = ref()
const showModal = ref(false)
function form(e) {
    console.log(e);
    flag.value = e.id
    name.value = e.user_name
    phone.value = e.phone
    cours.value = e.cours_name
    classStudy.value = e.class_name
    time.value = moment(e.create_at).format('HH:mm DD-MM-YYYY')
    fee.value = e.fees_calculated
    collectFee.value = null
    showModal.value = true

}

async function submit() {
    showModal.value = false
    showLoading.value = true
    let data={
        payment_methods: 0, 
        payment_amount: collectFee.value, 
        personnel_id: $cookies.get('user').id, 
        regInfo_id: flag.value,
        cours_name:cours.value,
        class_name:classStudy.value,

    }
    let sub = await BillInfoService.create(data)
    if (sub ) {
        let reg=await RegInfoService.update(flag.value,{status:1})

        getCourses()
        init({ message: 'Cập nhật thành công', color: 'success' })
        showLoading.value = false

    }
    else {
        showModal.value = true
        showLoading.value = false
        init({ message: 'Cập nhật thất bại', color: 'danger' })

    }
}

const showLoading = ref(false)

</script>
