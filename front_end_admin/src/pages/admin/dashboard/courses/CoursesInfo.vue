<template>
    <va-card class="p-3">
        <va-button icon="add" size="large" class="mr-3 mb-2" @click="addCours">
            Thêm khóa học
        </va-button>
        <va-modal v-model="showModal" close-button hide-default-actions blur>
            <div>
                <h3 class="va-h5 text-blue-400 text-center uppercase">
                    Thông tin khóa học
                </h3>
            </div>
            <va-form ref="formRef" class="grid  grid-cols-4 gap-4 mb-6">
                <va-input placeholder="" class="col-span-4" v-model="name"
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']"
                    label="Tên khóa học" />
                <!-- <va-input v-model="title" :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']"
                    label="Chủ đề khóa học" class=" col-span-2" /> -->
                <va-input placeholder="" class="col-span-2" v-model="object"
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']"
                    label="Đối tượng học viên" />
                <va-input v-model="numberSession" class="col-span-2" type="number"
                    :rules="[(value) => (value && value > 0) || 'Trường này chưa có giá trị']" label="Số buổi học" />
                <va-input class="col-span-4" label="Học phí" v-model="fee" mask="numeral" placeholder=""
                    :rules="[(value) => (value && value > 0) || 'Trường này chưa có giá trị']">
                    <template #appendInner>
                        <va-icon name="" color="secondary"><i class="fa-solid fa-dong-sign"></i></va-icon>
                    </template> </va-input>

                <!-- <va-select  :rules="[value => options.includes(value)  || 'Trường này chưa có giá trị']" v-model="object" label="Khóa học dành cho đối tượng" :options="options" /> -->
                <div class="col-span-4">
                    <h4>Nội dung khóa học:</h4>
                    <editor-text :textHtml="content" />
                </div>
                <div class="col-span-4">
                    <h4>Thêm tài liệu khóa học:</h4>
                    <va-file-upload v-model="files" dropzone />
                </div>
                <div v-if="!add" class="col-span-4">
                    <h4>Tài liệu khóa học:</h4>
                    <ShowFiles :files="dataFiles" :message="updateFiles" />
                </div>
                <div class="col-span-4 flex items-center justify-center">
                    <va-button v-if="add" class="mr-2" @click=" submit()">
                        Tạo mới
                    </va-button>
                    <va-button v-else class="" @click="  submitEdit()">
                        Lưu thay đổi
                    </va-button>
                    <va-button class="" @click="reset()">
                        Reset
                    </va-button>
                </div>
            </va-form>
        </va-modal>
        <Loading :show="showLoading" />
        <DataTableVue v-if="show" :data="data" :col="columns" :edit="editCours" :del="delConfirm" />
    </va-card>
</template>
<script setup>
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import EditorText from '@/components/EditorText.vue'
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import CoursesService from '@/api_services/courses.service'
import FilesService from '@/api_services/files.service'
import DataTableVue from '@/components/DataTable.vue'
import ShowFiles from '@/components/ShowFiles.vue'
import ClassService from '@/api_services/class.service'

import { useModal } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset } = useForm('formRef')
// const props = defineProps({
//     cours: Object
// });
const show=ref(false)
const add = ref()
const cours = ref()
const addCours = () => {
    add.value = true
    cours.value = {}
    dataFiles.value = []
    name.value = null
    title.value = null
    fee.value = null
    numberSession.value = null
    object.value = null
    content.value = null
    GlobalStore.updateCoursHtml(null)
    showModal.value = true
}
const editCours = (e) => {
    add.value = false
    cours.value = e
    console.log(cours.value);
    name.value = cours.value.name
    title.value = cours.value.title
    fee.value = cours.value.fee
    numberSession.value = cours.value.numberSession
    object.value = cours.value.object
    content.value = cours.value.content
    GlobalStore.updateCoursHtml(cours.value.content)
    console.log(cours.value.content);
    getFile(e.id)
    showModal.value = true
}
var perPage = ref(3)
var currentPage = ref(1)
const dataFiles = ref([])
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
const data = ref([])
const getCourses = async () => {
    show.value=false

    items.value = []
    data.value=[]
    items.value = await CoursesService.getAll()
    data.value = items.value.map(item => ({
        ...item, // Copy tất cả các thuộc tính từ đối tượng gốc
        feeChange: item.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), // Định dạng lại thuộc tính "cost"
    }));
    let numberClass=await ClassService.getAll()

    data.value = data.value.map(itemA => {
        const matchB = numberClass.filter(itemB => itemB.courses_id === itemA.id);
        return { ...itemA, numberClass: matchB.length };

    });
    show.value=true
    console.log( data.value);
}
const columns = [
    { key: "id", sortable: true, width: "60px" },
    { key: 'name', label: "Tên khóa học", sortable: true,  },
    // { key: 'title', label: "Chủ đề khóa học", sortable: true,  },
    { key: 'numberSession', label: "Số buổi học", sortable: true, },
    { key: 'object', label: "Đối tượng học", sortable: true, },
    { key: 'feeChange', label: "Học phí",sortable: true },
    { key: 'numberClass', label: "Số lớp",sortable: true },

    { key: "Action", label: 'Sửa/Xóa' },
];
const getFile = async (id) => {
    dataFiles.value = await FilesService.get({ courses_id: id })
}
const files = ref([])
const updateFiles = (e) => {
    if (e) {
        getFile(cours.value.id)
    }
}
const updateForm = () => {
    const data = {
        name: name.value,
        title: title.value,
        numberSession: numberSession.value,
        fee: fee.value,
        object: object.value,
        content: GlobalStore.coursHtml
    }
    console.log(data);
    return data
}
const createFiles = async () => {
    if (files.value.length > 0) {
        let form = new FormData
        form.append('courses_id', cours.value.id)
        files.value.forEach(element => {
            form.append('files', element)
            // console.log(element);
        });
        const file = await FilesService.create(form)
    }
}
const { confirm } = useModal()
const delConfirm = (id) => {
    confirm('Bạn có chắc muốn xóa khóa học này?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await CoursesService.delete(id)
    if (item) {
        getCourses()

        init({ message: 'Xóa thành công', color: 'success' })
    }
}
const submit = async () => {
    showModal.value = false
    showLoading.value = true
    let data = updateForm()
    const cours = await CoursesService.create(data)
    if (cours) {
        createFiles()
        showModal.value = false
        showLoading.value = false
        init({ message: 'Thêm khóa học thành công', color: 'success' })
        getCourses()
    }
    else {
        showLoading.value = false
        showModal.value = true
        init({ message: 'Thêm khóa học thất bại', color: 'danger' })

    }
}
const submitEdit = async () => {
    showModal.value = false
    showLoading.value = true
    let data = updateForm()
    const course = await CoursesService.update(cours.value.id, data)
    if (course) {
        createFiles()
        getCourses()
        showModal.value = false
        showLoading.value = false
        init({ message: 'Lưu khóa học thành công', color: 'success' })
    }
    else {
        showLoading.value = false
        showModal.value = true
        init({ message: 'Lưu khóa học thất bại', color: 'danger' })

    }
}
const showLoading = ref(false)
const name = ref(cours.name)
const title = ref(cours.title)
const fee = ref(cours.fee)
const numberSession = ref(cours.numberSession)
const object = ref(cours.object)
const content = ref(cours.content)
const options = ref(["Trẻ em", "Người trưởng thành", "Sinh viên"])
var showModal = ref(false)

</script>
