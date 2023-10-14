<template >
    <va-card class="p-4">

        <h3 class="va-h5 text-blue-400 text-center uppercase">
            lớp học đã đăng ký
        </h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            <va-input v-model="filter" class="col-span-5" placeholder="Filter..." />
        </div>
        <va-data-table :items="data" :columns="columns" :per-page="perPage" :current-page="currentPage" :filter="filter"
            @filtered="filtered = $event.items">
            <template #cell(status)="row">
                <div>
                    {{ check(row.rowData) }}
                </div>
            </template>
            <template #cell(actions)="{ row, isExpanded }">
                <va-button size="small" @click="open(row.rowData)" color="primary" class="mb-4">Mở lớp học</va-button>
                <!-- <va-button size="small" icon="delete" @click="delItem(row.rowData.id)" color="danger" icon-color="#ffffff"
                    class="" /> -->
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
        <div class="min-h-screen relative ">
            <div class="content">
                <div class="float-right w-3/4 mr-6 lg:mr-12">
                    <h3 class="va-h5 text-blue-400 text-center  uppercase ">
                        {{ itemCours + ' - ' + 'Lớp: ' + itemClass?.className }}
                    </h3>
                    <va-scroll-container vertical class="h-[25em] lg:h-[35em]">

                        <div>
                            <ClassInform v-if="activeElement == 'Thông báo lớp học'" :class_id="itemClass?.class_id"  />
                            <ClassDocuments v-else-if="activeElement=='Tài liệu khóa học'" :cours_id="itemClass?.courses_id"/>
                            <ClassAssessment v-else :class_id="itemClass?.class_id" />
                        </div>
                    </va-scroll-container>

                </div>
            </div>

            <va-sidebar class="absolute " :minimized="minimized" animated="left">

                <va-accordion>
                    <va-checkbox v-model="minimized" class="ml-5" label="Đóng" />
                    <template v-for="item in items">
                        <va-collapse v-if="item.children" class="cursor-pointer" :key="item.title + 'collapse'"
                            body-color="#00000022">
                            <template #header="{ value: isCollapsed }">
                                <va-sidebar-item :active="item.children.some((child) => child.title === activeElement)">
                                    <va-sidebar-item-content>
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

import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import RegInfoService from '@/api_services/regInfo.service'
import ClassInform from './UserClassInform.vue'
import ClassDocuments from './ClassDocuments.vue'
import ClassAssessment from './ClassAssessment.vue'

import { useModal } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef')

onMounted(() => {
    getData()
})
const activeElement = ref('Thông báo lớp học')
let items = ref([
    { title: "Thông báo lớp học", icon: "info" },
    { title: "Tài liệu khóa học", icon: "book" },
    { title: "Đánh giá lớp học", icon: "star", },
    // { title: "Xem thống kê", icon: "insert_chart", },

])
function check(e){
    console.log(e);
    if(new Date(e.startTime)> new Date()){
        return 'Chưa bắt đầu'
    }
    else if(new Date(e.startTime)<= new Date()&& new Date(e.endTime)> new Date()){
        return "Đang diễn ra"
    }
    else{
        return "Đã kết thúc"
    }
}
let minimized = ref(false)
const data = ref([])
const itemCours = ref()
const itemClass = ref()
const classStudy = ref([])
const cours = ref()
const showModal = ref(false)
const showLoading = ref(false)
var perPage = ref(5)
var currentPage = ref(1)
var filter = ref('')
var filtered = classStudy.value
const pages = computed(() => {
    return perPage.value && perPage.value !== 0
        ? Math.ceil(data.value.length / perPage.value)
        : data.value.length;
})
const columns = [
    { key: "cours_name", label: 'Khóa học', sortable: true },
    { key: "className", label: 'Tên lớp', sortable: true },
    { key: "teacherName", label: 'Giáo viên', },

    { key: "status", label: 'Trạng thái' },

    // { key: "endTime", label: 'Thời gian kết thúc', width: 50 },
    { key: "actions",  label: ' ',width: 50 },
];


function open(e) {
    console.log(e.className);
    itemCours.value = e.cours_name,
    itemClass.value = e

    showModal.value = true
}
const getData = async () => {
    classStudy.value = []
    let reg = await RegInfoService.get({ subscribers_id: $cookies.get('user')?.id })
    classStudy.value = await ClassService.getAll()
    cours.value = await CoursesService.getAll()
    let teacher = await PersonnelService.getAll()
    data.value = reg.map(i => {
        let className = classStudy.value.find(y => y.id == i.class_id)
        return { ...i, startTime:className.startTime,endTime:className.endTime,className: className.name, courses_id: className.courses_id,personnel_id:className.personnel_id };

    })
    data.value = data.value.map(itemA => {
        const matchB = cours.value.find(itemB => itemB.id === itemA.courses_id);
        const teacherName = teacher.find(i => i.id == itemA.personnel_id)
        return { ...itemA, cours_name: matchB.name, teacherName: teacherName.name,courses_id:matchB.id };

    });
    console.log(data.value);
}
</script>

<style>
.content {
    width: 100%;
    height: 100%;
    background-color: var(--va-background-primary);
}
</style>