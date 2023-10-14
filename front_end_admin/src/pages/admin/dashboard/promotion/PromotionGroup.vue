<template>
    <va-card class="p-4">
        <va-button icon="add" size="large" class="mr-3 mb-2" @click="addItem()">
            Thêm nhóm ưu đãi
        </va-button>
        <va-modal class="z-50" v-model="showModal" close-button hide-default-actions blur>
            <div>
                <h3 class="va-h5 text-blue-400 text-center uppercase">
                    thông tin nhóm ưu đãi
                </h3>
            </div>
            <va-form ref="formRef" class="grid grid-cols-4 gap-4 mb-4">
                <va-input placeholder="" class="col-span-2" v-model="name"
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']"
                    label="Tên ngày ưu đãi" />
                <va-input placeholder="" type="number" class="col-span-2" v-model="value"
                    :rules="[(value) => (value > 0) || 'Trường này chưa có giá trị']" label="Giá trị ưu đãi" />

                <va-input placeholder="" type="number" class="col-span-2" v-model="min"
                    :rules="[(value) => (value > 0) || 'Trường này chưa có giá trị']" label="Số lượng tối thiểu" />
                <va-input placeholder="" type="number" class="col-span-2" v-model="max"
                    :rules="[(value) => (value > 0) || 'Trường này chưa có giá trị']" label="Số lượng tối đa" />



                <va-card class="mt-2 p-2 col-span-4">
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
import PromotionGroupsService from '@/api_services/promotion_groups.service'
import Courses_proGroupsService from '@/api_services/courses_proGroups.service'

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
    var a = coursGroup.value.filter(item => item.promotionGroups_id == id)
    const filteredArray = dataCours.value.filter((itemA) =>
        a.some((itemB) => itemA.id == itemB.courses_id)
    );
    return filteredArray

}
const getCours = async () => {
    items.value = []
    dataCours.value = await CoursesService.getAll()
    items.value = await PromotionGroupsService.getAll()
    coursGroup.value = await Courses_proGroupsService.getAll()
    console.log(dataCours.value);
}
const columns = [
    { key: "name", label: 'Tên ưu đãi', width: 100 },
    { key: "value", label: 'Giá trị ưu đãi (%)', width: 50 },
    { key: "min", label: 'Số lượng tối thiểu', width: 50 },
    { key: "max", label: 'Số lượng tối đa', width: 50 },
    { key: "actions", width: 50 },
];
const coursGroup = ref()
const add = ref()
const items = ref([])
const selection = ref([])
const dataCours = ref()
const showModal = ref(false)
const showLoading = ref(false)
const name = ref()
const value = ref()
const min = ref()
const max = ref()
const { confirm } = useModal()
const delItem = (id) => {
    confirm('Bạn có chắc muốn xóa?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await PromotionGroupsService.delete(id)
    if (item) {
        getCours()
        init({ message: 'Xóa thành công', color: 'success' })
    }
}
const addItem = () => {
    add.value = true
    name.value = null
    min.value = null
    max.value = null
    value.value = null
    selection.value = []
    showModal.value = true

}
const saveItem = ref([])
const flag = ref()
const editItem = async (e) => {
    flag.value = e
    add.value = false
    name.value = e.name
    value.value = e.value
    min.value = e.min
    max.value = e.max
    selection.value = findCours(e.id).map((object) => object.id);
    saveItem.value = selection.value
    showModal.value = true
}
async function submitEdit() {
    showModal.value = false
    showLoading.value = true
    const cours = await PromotionGroupsService.update(flag.value.id, { name: name.value, min: min.value, max: max.value, value: value.value })
    if (cours) {
      selection.value.forEach(items => {
            var check = coursGroup.value.find((item) => item.courses_id == items && item.promotionGroups_id == flag.value.id);
            if (!check) {
                updateCours(flag.value.id,items )

            }
        })
        saveItem.value = saveItem.value.filter((element) => !selection.value.includes(element));
        console.log(saveItem.value);

        if (saveItem.value.length > 0) {
             saveItem.value.forEach(items => {
                var check = coursGroup.value.find((item) => item.courses_id == items && item.promotionGroups_id == flag.value.id);
                if (check) {
                    del(check.id)
                }
                console.log(check);
            })
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
    const flag = await Courses_proGroupsService.create({ promotionGroups_id: item, courses_id: cours })
}
const del = async (id) => {
    const flag = await Courses_proGroupsService.delete(id)
}
const submitPos = async () => {
    showModal.value = false
    showLoading.value = true
    const cours = await PromotionGroupsService.create({ name: name.value, value: value.value, min: min.value, max: max.value })
    if (cours) {
        selection.value.forEach(item => {
            updateCours(cours, item)
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
    