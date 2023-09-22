<template>
    <va-card class="p-4">
        <h3 class="va-h5 text-blue-400 text-center uppercase">
            Thông tin người đăng ký
        </h3>

        <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            <va-input v-model="filter" class="col-span-5" placeholder="Filter..." />
        </div>
        <va-data-table :items="subscribers" :columns="columns" :per-page="perPage" :current-page="currentPage"
            :filter="filter" @filtered="filtered = $event.items">
            <template #cell(birthday)="row">
                <div>
                    {{ moment(row.rowData.startTime).format('DD-MM-YYYY') }}
                </div>
            </template>
            <template #cell(reg)="row">
                <div>
                    {{ getReg(row.rowData.id).length }}
                </div>
            </template>
            <template #cell(actions)="{ row, isExpanded }">
                <va-button @click="row.toggleRowDetails()" :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
                    preset="secondary" class="">
                    {{ isExpanded ? 'Ẩn' : 'Xem thêm' }}
                </va-button>
                <!-- <va-button size="small" icon="delete" @click="delItem(row.rowData.id)" color="danger" icon-color="#ffffff"
                    class="" /> -->
            </template>

            <template #expandableRow="{ rowData }">
                <div class="p-4 bg-slate-300">
                    <!-- <h4>Thông tin thêm</h4>
                    <list>
                        <li class="mb-2">Giáo viên giảng dạy: {{ getTeacher(rowData.personnel_id) }}</li>
                        <li class="mb-2">Phòng học: {{ getRoom(rowData.rooms_id) }}</li>
                        <li class="mb-2">Thuộc khóa học: {{ getCours(rowData.courses_id) }}</li>
                    </list> -->
                    <h4>Thông tin đăng ký khóa học</h4>
                    <list>
                        <template v-for="item in getReg(rowData.id)" :key="item">
                            <li class="mb-2">{{ 'Ngày đăng ký: ' + moment(item.create_at).format('DD-MM-YYYY') + ' - ' +
                                getNameClass(item.class_id) }}</li>
                        </template>
                    </list>
                    <!-- <p v-if="findCours(rowData.id).length == 0">Không có khóa học thuộc ưu đãi này</p> -->
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
import moment from 'moment';
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import SubscribersService from '@/api_services/subscribers.service'
import RegInfoService from '@/api_services/regInfo.service'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import { useModal } from 'vuestic-ui'
const { init } = useToast()
onMounted(() => {
    getData()
})
async function getData() {
    subscribers.value = []
    regInfo.value = []
    subscribers.value = await SubscribersService.getAll()
    regInfo.value = await RegInfoService.getAll()
    coursData.value=await CoursesService.getAll()
    classData.value=await ClassService.getAll()
}
function getReg(id) {
    let info = regInfo.value.filter(i => i.subscribers_id == id);
    return info
}
const getNameClass= (id) =>{
    let className= classData.value.filter(i=>i.id==id)
    let cours =coursData.value.filter(i=>i.id==className[0].courses_id)
    console.log(className,cours);
    let name='Lớp '+className[0].name + " - Khóa học " + cours[0].name
    console.log(name);
    return name
}
const subscribers = ref([])
const regInfo = ref()
const coursData=ref()
const classData=ref()
var perPage = ref(5)
var currentPage = ref(1)
var filter = ref('')
var filtered = subscribers.value
const pages = computed(() => {
    return perPage.value && perPage.value !== 0
        ? Math.ceil(subscribers.value.length / perPage.value)
        : subscribers.value.length;
})
const columns = [
    { key: "name", label: 'Tên người đăng ký',sortable:true, width: 100 },
    { key: "birthday", label: 'Ngày sinh', width: 50 },
    { key: "sex", label: 'Giới tính', width: 50 },
    { key: "phone", label: 'Số điện thoại', width: 50 },
    { key: "email", label: 'Email', },
    { key: "address", label: 'Địa chỉ', with: 250 },
    { key: "reg", label: 'Số lần đăng ký', with: 50 },
    { key: "actions",label: 'xem chi tiết'},
];
const { confirm } = useModal()
const delItem = (id) => {
    confirm('Bạn có chắc muốn xóa?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await SubscribersService.delete(id)
    if (item) {
        getData()
        init({ message: 'Xóa thành công', color: 'success' })
    }
}
</script>