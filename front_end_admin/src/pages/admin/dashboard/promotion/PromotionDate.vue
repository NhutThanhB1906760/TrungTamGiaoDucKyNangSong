<template>
<va-card class="p-4">
    <va-button icon="add" size="large" class="mr-3 mb-2" @click="addItem()">
        Thêm ưu đãi
    </va-button>
    <va-modal class="z-50" v-model="showModal" close-button hide-default-actions blur>
        <div>
            <h3 class="va-h5 text-blue-400 text-center uppercase">
                thông tin ưu đãi
            </h3>
        </div>
        <va-form ref="formRef" class="grid grid-cols-4 gap-4 mb-4">
            <va-input placeholder="" class="col-span-2" v-model="name"
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Tên ngày ưu đãi" />
                <va-input placeholder="" type="number" class="col-span-2" v-model="value"
                :rules="[(value) => (value > 0) || 'Trường này chưa có giá trị']" label="Giá trị ưu đãi" />

            <va-date-input v-model="startTime" class="col-span-2" label="Ngày bắt đầu" required-mark=""
                :rules="[value => value || 'Trường này chưa có giá trị']" />
            <va-date-input v-model="endTime" class="col-span-2" label="Ngày kết thúc" required-mark=""
                :rules="[value => value || 'Trường này chưa có giá trị']" />



            <va-card class="mt-2 p-2 col-span-3">
                <h4 class="mb-2">Thêm các khóa học</h4>
                <div class="flex-wrap items-center">
                    <template v-for="item in dataCours" :key="item">
                        <va-checkbox v-model="selection" :array-value="item.id" :label="item.name" class="mr-2" />
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

    <va-data-table :items="items" :columns="columns">
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
            <va-button icon="edit" size="small" @click="editItem(row.rowData)" color="warning" icon-color="#812E9E" class="mr-1" />
            <va-button icon="delete" size="small" @click="delItem(row.rowData.id)" color="danger" icon-color="#ffffff" class="" />
        </template>

        <template #expandableRow="{ rowData }">
            <div class="p-4 bg-slate-300">
                <h4>Các khóa học có ưu đãi</h4>
                <list v-for="i in findCours(rowData.id)">
                    <li class="mb-2">{{ i.name }}</li>
                </list>
                <p v-if="findCours(rowData.id).length == 0">Không có khóa học thuộc ưu đãi này</p>
            </div>
        </template>
    </va-data-table>
    <Loading :show="showLoading" />

</va-card>
</template>
<script setup>
import moment from 'moment';

import Loading from '@/components/Loading.vue'
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import CoursesService from '@/api_services/courses.service'
import PromotionTimeService from '@/api_services/promotion_time.service'

import { useModal } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef')
// const props = defineProps({
//     data: Array,
//     message: Function,
// });
onMounted(() => {
    getCours()
})
const findCours = (id) => {
    return dataCours.value.filter(item => item.promotionTime_id == id)
}
const getCours = async () => {
    items.value = []
    dataCours.value = await CoursesService.getAll()
    items.value = await PromotionTimeService.getAll()
    console.log(dataCours.value);
}
const columns = [
    { key: "name", label: 'Tên ưu đãi', width: 100 },
    { key: "value", label: 'Giá trị ưu đãi (%)', width: 50 },
    { key: "startTime", label: 'Thời gian bắt đầu', width: 50 },
    { key: "endTime", label: 'Thời gian kết thúc', width: 50 },
    { key: "actions", width: 50 },
];
const add = ref()
const items = ref([])
const selection = ref([])
const dataCours = ref()
const showModal = ref(false)
const showLoading = ref(false)
const name = ref()
const value=ref()
const startTime = ref()
const endTime = ref()
const { confirm } = useModal()
const delItem = (id) => {
    confirm('Bạn có chắc muốn xóa?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await PromotionTimeService.delete(id)
    if (item) {
        getCours()
        init({ message: 'Xóa thành công', color: 'success' })
    }
}
const addItem = () => {
    add.value = true
    name.value = null
    startTime.value = null
    endTime.value = null
    value.value=null
    selection.value = []
    showModal.value = true

}
const saveItem = ref([])
const flag = ref()
const editItem = async (e) => {
    flag.value = e
    add.value = false
    name.value = e.name
    value.value=e.value
    startTime.value = e.startTime
    endTime.value = e.endTime
    selection.value = findCours(e.id).map((object) => object.id);
    saveItem.value = selection.value
    showModal.value = true
}
async function submitEdit() {
    showModal.value = false
    showLoading.value = true
    const cours = await PromotionTimeService.update(flag.value.id, { name: name.value, startTime: startTime.value, endTime: endTime.value ,value:value.value})
    if (cours) {
        selection.value.forEach(item => {
            updateCours(item, flag.value.id)
        })
            saveItem.value = saveItem.value.filter((element) => !selection.value.includes(element));
           if(saveItem.value.length>0){
            saveItem.value.forEach(item => {
                updateCours(item, null)
            })
           }
           getCours()
        showLoading.value = false
        
        init({ message: 'Lưu thành công', color: 'success' })
        
    }
    else {
        showLoading.value = false
        showModal.value = true

        init({ message: 'Lưu thất bại', color: 'danger' })
    }
}
const updateCours = async (item, cours) => {
    const flag = await CoursesService.update(item, { promotionTime_id: cours })

}
const submitPos = async () => {
    showModal.value = false
    showLoading.value = true
    const cours = await PromotionTimeService.create({ name: name.value, value:value.value,startTime: startTime.value, endTime: endTime.value })
    if (cours) {
        selection.value.forEach(item => {
            updateCours(item, cours)
        })
        showLoading.value = false
        getCours()
        init({ message: 'Thêm thành công', color: 'success' })
    }
    else {
        showLoading.value = false
        showModal.value = true

        init({ message: 'Thêm thất bại', color: 'danger' })
    }
}
</script>
