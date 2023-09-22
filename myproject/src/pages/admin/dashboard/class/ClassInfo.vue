<template >
<va-card class="p-4">
    <div class="flex items-center">
        <va-button icon="add" size="large" class="mr-3 mb-2" @click="addItem()">
        Thêm lớp học
    </va-button>
    <RoomInfo :data="rooms" :message="message" />
    <StudyTime :data="studyTime" :message="message" />
    </div>

    
    <va-modal class="z-50" v-model="showModal" close-button hide-default-actions blur>
        <div>
            <h3 class="va-h5 text-blue-400 text-center uppercase">
                thông tin lớp học
            </h3>
        </div>
        <va-form ref="formRef" class="grid grid-cols-4 gap-4 mb-4">
            <va-input placeholder="" class="col-span-2" v-model="name"
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Tên lớp học" />
            <va-input placeholder="" type="number" class="col-span-2" v-model="quantity"
                :rules="[(value) => (value > 0) || 'Trường này chưa có giá trị']" label="Số buổi học" />
            <va-date-input v-model="startTime" class="col-span-2" label="Ngày bắt đầu" required-mark=""
                :rules="[value => value || 'Trường này chưa có giá trị']" />
            <va-date-input v-model="endTime" class="col-span-2" label="Ngày kết thúc" required-mark=""
                :rules="[value => value || 'Trường này chưa có giá trị']" />
            <va-select class="" v-model="expression" label="Hình thức"
                :options="['Trực tiếp (offline)', 'Trực tuyến (online)']" required-mark="" />
            <va-select class="" v-model="courses_id" label="Thuộc khóa học" :options="opCours" required-mark="" />
            <va-select class="" v-model="personnel_id" label="Giáo viên giảng dạy" :options="opTeacher" required-mark="" />
            <va-select class="" v-model="rooms_id" label="Phòng học" :options="opRoom" required-mark="" />
            <va-card class="mt-2 p-2 col-span-4">
                <h4 class="mb-2">Thời gian học trong tuần</h4>
                <div class="flex-wrap items-center">
                    <template v-for="item in studyTime" :key="item">
                        <va-checkbox v-model="selection" :array-value="item.id"
                            :label="'Thứ ' + item.thu + ': ' + item.startTime + '-' + item.endTime" class="mr-2" />
                    </template>
                </div>
            </va-card>
            <va-button class="mx-2 col-span-4" v-if="add" @click="submitPos()">
                Tạo mới
            </va-button>
            <va-button class="mx-2  col-span-4" v-else @click="submitEdit()">
                Lưu thay đổi
            </va-button>
        </va-form>
    </va-modal>

    <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        <va-input v-model="filter" class="col-span-5" placeholder="Filter..." />
    </div>
    <va-data-table :items="classStudy" :columns="columns" :per-page="perPage" :current-page="currentPage" :filter="filter"
        @filtered="filtered = $event.items">
        <template #cell(startTime)="row">
            <div>
                {{ moment(row.rowData.startTime).format('DD-MM-YYYY') }}
            </div>
        </template>
        <template #cell(endTime)="row">
            <div>
                {{ moment(row.rowData.endTime).format('DD-MM-YYYY') }}
            </div>
        </template>
        <template #cell(actions)="{ row, isExpanded }">
            <va-button @click="row.toggleRowDetails()" :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
                preset="secondary" class="">
                {{ isExpanded ? 'Ẩn' : 'Xem thêm' }}
            </va-button>
            <va-button size="small" icon="edit" @click="editItem(row.rowData)" color="warning" icon-color="#812E9E" class="mr-1" />
            <va-button size="small" icon="delete" @click="delItem(row.rowData.id)" color="danger" icon-color="#ffffff" class="" />
        </template>

        <template #expandableRow="{ rowData }">
            <div class="p-4 bg-slate-300">
                <h4>Thông tin thêm</h4>
                <list>
                    <li class="mb-2">Giáo viên giảng dạy: {{ getTeacher(rowData.personnel_id) }}</li>
                    <li class="mb-2">Phòng học: {{ getRoom(rowData.rooms_id) }}</li>
                    <li class="mb-2">Thuộc khóa học: {{ getCours(rowData.courses_id) }}</li>
                </list>
                <h4>Thời gian học:</h4>
                <list title="Thời gian học:">
                    <template v-for="item in findTime(rowData.id)" :key="item">
                        <li class="mb-2">{{ 'Thứ ' + item.thu + ': ' + item.startTime + '-' + item.endTime }}</li>
                    </template>
                </list>
                <!-- <p v-if="findCours(rowData.id).length == 0">Không có khóa học thuộc ưu đãi này</p> -->
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
    </va-data-table>

</va-card>
    <Loading :show="showLoading" />
</template>

<script setup>
import moment from 'moment';
import Loading from '@/components/Loading.vue'
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import PersonnelService from '@/api_services/personnel.service'
import RoomsService from '@/api_services/rooms.service'
import StudyTimeService from '@/api_services/study_time.service'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import ClassStudyTimeService from '@/api_services/class_studyTime.service'

import { useModal } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef')

import RoomInfo from './RoomInfo.vue'
import StudyTime from './StudyTime.vue'
onMounted(() => {
    getData()
    // Định nghĩa một hàm so sánh tùy chỉnh
    

    // return data.sort(customCompare);
})
function customCompare(a, b) {
        const order = ['2', '3', '4', '5', '6', '7', 'Chủ nhật'];

        const thuA = a.thu;
        const thuB = b.thu;

        const indexA = order.indexOf(thuA);
        const indexB = order.indexOf(thuB);

        // Sắp xếp theo thứ tự được định nghĩa trong mảng 'order'
        return indexA - indexB;
    }

const selection = ref([])
const add = ref()
const rooms = ref()
const studyTime = ref()
const teachers = ref()
const classStudy = ref([])
const classTime = ref()
const cours = ref()
const name = ref()
const startTime = ref()
const endTime = ref()
const expression = ref()
const quantity = ref()
const courses_id = ref()
const personnel_id = ref()
const rooms_id = ref()
const opCours = ref()
const opTeacher = ref()
const opRoom = ref()
const showModal = ref(false)
const showLoading = ref(false)

var perPage = ref(5)
var currentPage = ref(1)
var filter = ref('')
var filtered = classStudy.value
const pages = computed(() => {
    return perPage.value && perPage.value !== 0
        ? Math.ceil(classStudy.value.length / perPage.value)
        : classStudy.value.length;
})
const columns = [
    { key: "name", label: 'Tên lớp', width: 100 },
    { key: "quantity", label: 'Số lượng', width: 50 },
    { key: "startTime", label: 'Ngày bắt đầu', width: 50 },
    { key: "endTime", label: 'Ngày kết thúc', width: 50 },
    { key: "expression", label: 'Hình thức', width: 50 },
    // { key: "endTime", label: 'Thời gian kết thúc', width: 50 },
    { key: "actions", width: 50 },
];
function getTeacher(e) {
    let name = teachers.value.filter(i => i.id === e)
    return name[0].name
}
function getCours(e) {
    let name = cours.value.filter(i => i.id === e)
    return name[0].name
}
function getRoom(e) {
    let name = rooms.value.filter(i => i.id === e)
    return name[0].name
}
function findTime(e) {
    let time = classTime.value.filter(i => i.class_id === e)
    const filteredArray = studyTime.value.filter((itemA) =>
        time.some((itemB) => itemA.id == itemB.studyTime_id)
    );
    return filteredArray.sort(customCompare)
}
const { confirm } = useModal()
const delItem = (id) => {
    confirm('Bạn có chắc muốn xóa?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await ClassService.delete(id)
    if (item) {
        getData()
        init({ message: 'Xóa thành công', color: 'success' })
    }
}
const getData = async () => {
    rooms.value = []
    studyTime.value = []
    classStudy.value = []
    classStudy.value = await ClassService.getAll()
    classTime.value = await ClassStudyTimeService.getAll()
    teachers.value = await PersonnelService.get({ position_id: 16 })

    cours.value = await CoursesService.getAll()
    rooms.value = await RoomsService.getAll()
    studyTime.value = await StudyTimeService.getAll()
    opCours.value = cours.value.map(({ name, id }) => ({ text: name, value: id }))
    opTeacher.value = teachers.value.map(({ name, id }) => ({ text: name, value: id }))
    opRoom.value = rooms.value.map(({ name, id }) => ({ text: name, value: id }))

    console.log(classStudy.value);
}
const addItem = () => {
    add.value = true
    name.value = null
    startTime.value = null
    endTime.value = null
    expression.value = null
    quantity.value = null
    courses_id.value = null
    personnel_id.value = null
    rooms_id.value = null
    selection.value = []
    showModal.value = true
}
const flag = ref()
const saveItem = ref([])
const editItem = async (e) => {
    flag.value = e.id
    add.value = false
    const cours = opCours.value.filter(item => e?.courses_id == item.value)
    const per = opTeacher.value.filter(item => e?.personnel_id == item.value)
    const room = opRoom.value.filter(item => e?.rooms_id == item.value)
    name.value = e.name
    startTime.value = e.startTime
    endTime.value = e.endTime
    expression.value = e.expression
    quantity.value = e.quantity
    selection.value = findTime(e.id).map((object) => object.id);
    courses_id.value = cours[0]
    personnel_id.value = per[0]
    rooms_id.value = room[0]
    saveItem.value = selection.value
    showModal.value = true
}
function formatForm() {
    const form = {
        name: name.value,
        startTime: startTime.value,
        endTime: endTime.value,
        expression: expression.value,
        quantity: quantity.value,
        courses_id: courses_id.value.value,
        personnel_id: personnel_id.value.value,
        rooms_id: rooms_id.value.value,
    }
    return form
}
async function submitEdit() {
    showModal.value = false
    showLoading.value = true
    const cours = await ClassService.update(flag.value, formatForm())
    if (cours) {
        selection.value.forEach(items => {
            var check = classTime.value.find((item) => item.class_id == flag.value && item.studyTime_id == items);
            if (!check) {
                updateClassTime(flag.value, items)

            }
        })
        saveItem.value = saveItem.value.filter((element) => !selection.value.includes(element));
        console.log(saveItem.value);

        if (saveItem.value.length > 0) {
            saveItem.value.forEach(items => {
                var check = classTime.value.find((item) => item.class_id == flag.value && item.studyTime_id == items);
                if (check) {
                    del(check.id)
                }
                console.log(check);
            })
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        getData()
        showLoading.value = false

        init({ message: 'Lưu thành công', color: 'success' })

    }
    else {
        showLoading.value = false
        showModal.value = true

        init({ message: 'Lưu thất bại', color: 'danger' })
    }
}
const del = async (id) => {
    const flag = await ClassStudyTimeService.delete(id)
}
const message = (e) => {
    if (e) {
        getData()
    }
}
async function updateClassTime(id, time) {
    const add = await ClassStudyTimeService.create({ class_id: id, studyTime_id: time })
}
const submitPos = async () => {
    showModal.value = false
    showLoading.value = true
    const cours = await ClassService.create(formatForm())
    if (cours) {
        selection.value.forEach(item => {
            updateClassTime(cours, item)
        })
        showLoading.value = false
        getData()
        init({ message: 'Thêm thành công', color: 'success' })
    }
    else {
        showLoading.value = false
        showModal.value = true

        init({ message: 'Thêm thất bại', color: 'danger' })
    }
}


</script>