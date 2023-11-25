<template >
    <va-card class="p-4">

        <h3 class="va-h5 text-blue-400 text-center uppercase">
            Danh sách lớp giảng dạy
        </h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            <va-input v-model="filter" class="col-span-5" placeholder="Tìm kiếm..." />
        </div>
        <va-data-table :items="classStudy" :columns="columns" :per-page="perPage" :current-page="currentPage"
            :filter="filter" @filtered="filtered = $event.items">
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
            <template #cell(actions)="{ row, isExpanded }" class="flex items-center">
                <va-button @click="row.toggleRowDetails()" :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
                    preset="secondary" class="">
                    {{ isExpanded ? 'Ẩn' : 'Xem thêm' }}
                </va-button>
                <va-button size="small" @click="open(row.rowData)" color="primary" class="">Mở lớp học</va-button>
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
                    <h4>Thời gian học:</h4>
                    <list>
                        <template v-for="item in findTime(rowData.id)" :key="item">
                            <li class="mb-2">{{ 'Thứ ' + item.thu + ': ' + formatTime(item.startTime) + '-' +
                                formatTime(item.endTime) }}</li>
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

    <VaModal v-model="showModal" fullscreen stateful hide-default-actions style="--va-modal-padding: 0px" max-width="100%">
        <div class="min-h-screen relative pl-0 md:pl-32">
            <div class="content">
                <div class="float-right w-3/4 md:w-full mr-6 lg:mr-12 ">
                    <h3 class="va-h5 text-blue-400 text-center  uppercase ">
                        {{ itemCours + ' - ' + 'Lớp: ' + itemClass?.name }}
                    </h3>
                    <va-scroll-container vertical class="h-[25em] lg:h-[35em]">

                        <div>
                            <ClassInform v-if="activeElement=='Thông báo lớp học'" :class_id="itemClass?.id"/>
                            <ClassAssessment v-else-if="activeElement=='Đánh giá lớp học'" :class_id="itemClass?.id"/>
                            <UpdateResult v-else :class_id="itemClass?.id" :numberSession="itemClass?.numberSession"/>
                            <!-- <ClassChart :class_id="itemClass?.id"/> -->
                        </div>
                    </va-scroll-container>

                </div>
            </div>

            <va-sidebar class="absolute " :minimized="minimized" animated="left">

                <va-accordion>
                    <!-- <va-checkbox v-model="minimized" class="ml-5" label="Đóng" /> -->
                    <i class="fa-solid fa-arrow-right fa-lg cursor-pointer ml-5" v-if="minimized" @click="minimized=false"></i>
                    <i class="fa-solid fa-arrow-left fa-lg cursor-pointer ml-5" v-else @click="minimized=true"></i>
                    <template v-for="item in items">
                        <va-collapse v-if="item.children" class="cursor-pointer" :key="item.title + 'collapse'" body-color="#00000022">
                            <template #header="{ value: isCollapsed }">
                                <va-sidebar-item :active="item.children.some((child) => child.title === activeElement)">
                                    <va-sidebar-item-content >
                                        <va-icon :name="item.icon" />
                                        <va-sidebar-item-title>{{ item.title }}</va-sidebar-item-title>
                                        <va-spacer />
                                        <va-icon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
                                    </va-sidebar-item-content>
                                </va-sidebar-item>
                            </template>

                            <template #body>
                                <va-sidebar-item v-for="child in item.children" :key="child.title"
                                    :active="child.title === activeElement" @click="activeElement = child.title">
                                    <va-sidebar-item-content>
                                        <va-icon :name="child.icon" />
                                        <va-sidebar-item-title>{{ child.title }}</va-sidebar-item-title>
                                    </va-sidebar-item-content>
                                </va-sidebar-item>
                            </template>
                        </va-collapse>

                        <va-sidebar-item v-else :key="item.title + 'item'" :active="item.title === activeElement"
                            @click="activeElement = item.title">
                            <va-sidebar-item-content>
                                <va-icon :name="item.icon" />
                                <va-sidebar-item-title>{{ item.title }}</va-sidebar-item-title>
                            </va-sidebar-item-content>
                        </va-sidebar-item>
                    </template>
                </va-accordion>

                <!-- <va-spacer /> -->


            </va-sidebar>
        </div>
    </VaModal>

    <Loading :show="showLoading" />
</template>
    
<script setup>
import moment from 'moment';
import Loading from '@/components/Loading.vue'
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import PersonnelService from '@/api_services/personnel.service'
import RegInfoService from '@/api_services/regInfo.service'

import StudyTimeService from '@/api_services/study_time.service'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import ClassStudyTimeService from '@/api_services/class_studyTime.service'
import momentT from 'moment-timezone'
import ClassInform from './ClassInform.vue'
import UpdateResult from './UpdateResult.vue';
import ClassAssessment from './ClassAssessment.vue';

import ClassChart from './ClassChart.vue';
import { useModal } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef')

onMounted(() => {
    getData()
    // Định nghĩa một hàm so sánh tùy chỉnh


    // return data.sort(customCompare);
})
const activeElement = ref('Thông báo lớp học')
let items = ref([
    { title: "Thông báo lớp học", icon: "info" },
    { title: "Kết quả học tập", icon: "edit", },
    { title: "Đánh giá lớp học", icon: "star", },

    // { title: "Xem thống kê", icon: "insert_chart", },

])
let minimized = ref(false)

function formatTime(e) {
    return momentT.utc(e, 'HH:mm:ss').tz('Asia/Ho_Chi_Minh').format('HH:mm');
}
function customCompare(a, b) {
    const order = ['2', '3', '4', '5', '6', '7', 'Chủ nhật'];

    const thuA = a.thu;
    const thuB = b.thu;

    const indexA = order.indexOf(thuA);
    const indexB = order.indexOf(thuB);

    return indexA - indexB;
}
const itemCours = ref()
const itemClass = ref()
const studyTime = ref()
const classStudy = ref([])
const classTime = ref()
const cours = ref()
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
    { key: "name", label: 'Tên lớp', sortable: true,width: 30 },
    { key: "cours_name", label: 'Khóa học', sortable: true },
    { key: "quantityReg", label: 'Số lượng đăng ký', sortable: true,width: 10 },
    { key: "startTime", label: 'Ngày bắt đầu', sortable: true },
    { key: "endTime", label: 'Ngày kết thúc', sortable: true },
    { key: "expression", label: 'Hình thức', },
    // { key: "endTime", label: 'Thời gian kết thúc', width: 50 },
    { key: "actions", width: 50 },
];

function findTime(e) {
    let time = classTime.value.filter(i => i.class_id === e)
    const filteredArray = studyTime.value.filter((itemA) =>
        time.some((itemB) => itemA.id == itemB.studyTime_id)
    );
    return filteredArray.sort(customCompare)
}
function open(e) {
    itemCours.value = e.cours_name,
        itemClass.value = e

    showModal.value = true
}
const getData = async () => {
    studyTime.value = []
    classStudy.value = []
    classStudy.value = await ClassService.get({personnel_id:$cookies.get('user').id})
    classTime.value = await ClassStudyTimeService.getAll()
    cours.value = await CoursesService.getAll()
    studyTime.value = await StudyTimeService.getAll()
    let number = await RegInfoService.getAll()
    classStudy.value = classStudy.value.map(itemA => {
        const matchB = cours.value.find(itemB => itemB.id === itemA.courses_id);
        if (matchB) {
            return { ...itemA, cours_name: matchB.name,numberSession:matchB.numberSession };
        } else {
            return { ...itemA, cours_name: null };
        }
    });
    classStudy.value = classStudy.value.map(itemA => {
        const matchB = number.filter(itemB => itemB.class_id === itemA.id);
        return { ...itemA, quantityReg: matchB.length };

    });
    console.log(classStudy.value);
}


</script>

<style>
.content {
    width: 100%;
    height: 100%;
    background-color: var(--va-background-primary);
}
</style>