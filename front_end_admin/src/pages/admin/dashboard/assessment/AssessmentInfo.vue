<template>
    <AssessmentProgress v-if="data" :data="data"/>
    <va-card class="p-3">
        <Loading :show="showLoading" />
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
            <template #cell(action)="{ row, isExpanded }">
                <va-button @click="row.toggleRowDetails()" :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
                    preset="secondary" class="">
                    {{ isExpanded ? 'Ẩn' : 'Xem thêm' }}
                </va-button>
                <!-- <va-button size="small" icon="edit" @click="editItem(row.rowData)" color="warning" icon-color="#812E9E"
                    class="mr-1" /> -->
                <va-button size="small" icon="delete" @click="delItem(row.rowData.id)" color="danger" icon-color="#ffffff"
                    class="" />
            </template>

            <template #expandableRow="{ rowData }">
                <div class="p-4 bg-slate-300">
                    <h4>Nội dung đánh giá:</h4>

                    <div  v-html="rowData.content"></div>
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
import AssessmentProgress from './AssessmentProgress.vue'
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import AssessmentService from '@/api_services/assessment.service'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import SubscribersService from '@/api_services/subscribers.service'

import { useModal } from 'vuestic-ui'
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
const data=ref()
const getCourses = async () => {
    items.value = []
    items.value = await AssessmentService.getAll()
    data.value= items.value 
    let cours =await CoursesService.getAll()
    let classRoom=await ClassService.getAll()
    let user=await SubscribersService.getAll()

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
            return { ...itemA, class_name: matchB.name,cours_name: matchB.cours_name   };
        } else {
            return { ...itemA, class_name: null ,cours_name:null};
        }
    });

}
const columns = [
    { key: 'cours_name', label: "Khóa học", sortable: true,  },
    { key: 'class_name', label: "Lớp học", sortable: true,  },
    { key: 'rate', label: "Tỉ lệ đánh giá (sao)", sortable: true,  },
    { key: 'create_at', label: "Ngày đánh giá" ,sortable: true},
    { key: 'user_name', label: "Tên người đánh giá" ,sortable: true},
    { key: "action", label: ' ' },
];

const { confirm } = useModal()
const delItem = (id) => {
    confirm('Bạn có chắc muốn xóa?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await AssessmentService.delete(id)
    if (item) {
        init({ message: 'Xóa thành công', color: 'success' })
        getCourses()
    }
}
const showLoading = ref(false)

</script>
