<template>
    <va-card class="p-3">
        <va-button icon="add" size="large" class="mr-3 mb-2" @click="addCours">
            Thêm bài viết
        </va-button>
        <va-modal v-model="showModal" close-button hide-default-actions blur>
            <div>
                <h3 class="va-h5 text-blue-400 text-center uppercase">
                    Thông tin bài viết
                </h3>
            </div>
            <va-form ref="formRef" class="grid sm:grid-cols-1 grid-cols-2 gap-4 mb-6">
                <va-input placeholder="" class="col-span-2" v-model="title"
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']"
                    label="Chủ đề bài viết" />

                <div class="col-span-2">
                    <h4>Nội dung bài viết:</h4>
                    <editor-text :textHtml="content" />
                </div>
                <div class="col-span-2">
                    <h4>Thêm ảnh:</h4>
                    <va-file-upload v-model="files" type="gallery" file-types="image/*" />
                    <va-button class="mr-3 mb-2" @click="saveImg">
                        Lưu ảnh
                    </va-button>
                </div>
                <div class="col-span-2">
                    <h4>Ảnh đã cập nhật:</h4>
                    <ShowFiles :files="dataFiles" :message="updateFiles" />

                    <!-- <template v-for="file in dataFiles">
                        <div class="flex items-center mb-1">
                            <a :href="file.link" target="_blank">{{ file.name }}</a>
                            <va-button size="small" icon="clear" color="danger" class="ml-3" @click="deteleFile(file.id)">
                            </va-button>
                        </div>
                    </template> -->

                </div>
                <div class="col-span-2 flex items-center justify-center">
                    <va-button v-if="add" class="mr-2" @click="submit()">
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
                <va-button size="small" icon="edit" @click="editItem(row.rowData)" color="warning" icon-color="#812E9E"
                    class="mr-1" />
                <va-button size="small" icon="delete" @click="delItem(row.rowData.id)" color="danger" icon-color="#ffffff"
                    class="" />
            </template>

            <template #expandableRow="{ rowData }">
                <div class="p-4 bg-slate-300">
                    <h4>Nội dung bài viết:</h4>
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
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import EditorText from '@/components/EditorText.vue'
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import PostsService from '@/api_services/posts.service'
import FilesService from '@/api_services/files.service'
import ShowFiles from '@/components/ShowFiles.vue'
import { useModal } from 'vuestic-ui'
import moment from 'moment'
import { useToast } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset } = useForm('formRef')
// const props = defineProps({
//     cours: Object
// });

const add = ref()
const cours = ref()
const addCours = () => {
    add.value = true
    cours.value = {}
    title.value = null
    content.value=null
    files.value = []
    dataFiles.value = []
    showModal.value = true
}
const flag=ref()
const editItem = (e) => {
    add.value = false
    cours.value = e
    flag.value=e.id
    console.log(cours.value);
    title.value = cours.value.title
    content.value = cours.value.content
console.log(content.value);
    getFile(e.id)
    showModal.value = true
}
var perPage = ref(5)
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
const getCourses = async () => {
    items.value = []
    items.value = await PostsService.getAll()
    console.log(items.value);
}
const columns = [
    { key: 'title', label: "Chủ đề bài viết", sortable: true,  },
    { key: 'create_at', label: "Ngày tạo" ,sortable: true},
    { key: "action", label: ' ' },
];
const getFile = async (id) => {
    
    if (id) {
        dataFiles.value = await FilesService.get({ posts_id: id })
    }
    else{
        dataFiles.value = await FilesService.get({ test: 1 })
    }
}
const files = ref([])
const updateFiles = (e) => {
    if (e) {
        getFile()
    }
}
const updateForm = () => {
    const data = {
        title: title.value,
        content: GlobalStore.coursHtml,
    }
    console.log(data);
    return data
}
const createFiles = async () => {
    if (files.value.length > 0) {
        let form = new FormData
        form.append('test', 1)
        files.value.forEach(element => {
            form.append('files', element)
            // console.log(element);
        });
        const file = await FilesService.create(form)
        init({ message: 'Thêm ảnh thành công', color: 'success' })
        getFile()
    }
    else {
        init({ message: 'Chưa thêm ảnh để lưu', color: 'danger' })
    }
}
function saveImg() {
    createFiles()
}
const { confirm } = useModal()
const delItem = (id) => {
    confirm('Bạn có chắc muốn xóa?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await PostsService.delete(id)
    if (item) {
        init({ message: 'Xóa thành công', color: 'success' })
        getCourses()
    }
}
async function editFile(id, p) {
    const file = await FilesService.update(id, { posts_id: p, test: 0 })

}
const submit = async () => {
    showModal.value = false
    showLoading.value = true
    let data = updateForm()
    console.log(data);
    const cours = await PostsService.create(data)
    if (cours) {
        console.log(dataFiles.value);
        dataFiles.value.forEach(i => {
            editFile(i.id, cours[0])
        })
        showModal.value = false
        showLoading.value = false
        init({ message: 'Thêm thành công', color: 'success' })
        getCourses()
    }
    else {
        showLoading.value = false
        showModal.value = true
        init({ message: 'Thêm thất bại', color: 'danger' })

    }
}
const submitEdit = async () => {
    showModal.value = false
    showLoading.value = true
    let data = updateForm()
    const course = await PostsService.update(cours.value.id, data)
    if (course) {
        dataFiles.value.forEach(i => {
            editFile(i.id, flag.value)
        })
        getCourses()
        showModal.value = false
        showLoading.value = false
        init({ message: 'Lưu thành công', color: 'success' })
    }
    else {
        showLoading.value = false
        showModal.value = true
        init({ message: 'Lưu thất bại', color: 'danger' })

    }
}
const showLoading = ref(false)
const title = ref(cours.title)
const content = ref(cours.content)
var showModal = ref(false)

</script>
