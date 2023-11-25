<template>
    <va-card class="p-3">
        <div class="flex items-center mb-2  whitespace-nowrap flex-wrap ">
            <router-link :to="{ name: 'personnelInfo', params: { id: 0 } }">
                <va-button icon="add" size="large" class=" mr-2" @click="addCours">
                    Thêm nhân sự
                </va-button>
            </router-link>

            <PositionInfoVue class="" :data="positions" :message="message" />
            <Accounts class="" />
        </div>
        <Loading :show="showLoading" />
        <!-- <DataTableVue v-if="items.length > 0" :data="items" :col="columns" :edit="editCours" :del="delConfirm" /> -->
        <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            <va-input v-model="filter" class="col-span-5" placeholder="Tìm kiếm..." />
        </div>
        <va-data-table :items="items" :columns="columns" :per-page="perPage" :current-page="currentPage" :filter="filter"
            @filtered="filtered = $event.items">

            <template #cell(avartar)="row">
                <div>
                    <va-avatar :src="row.rowData?.file_link" size="medium" font-size="30px" class="mr-6"></va-avatar>
                </div>
            </template>
            <template #cell(birthday)="row">
                <div>
                    {{ moment(row.rowData.birthday).format('DD-MM-YYYY') }}
                </div>
            </template>
            <template #cell(Action)="{ row, isExpanded }">
                <va-button @click="row.toggleRowDetails()" :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
                    preset="secondary" class="">
                    {{ isExpanded ? 'Ẩn' : 'Xem thêm' }}
                </va-button>
                <router-link :to="{ name: 'personnelInfo', params: { id: row.rowData.id } }">
                    <va-button size="small" icon="edit" @click="editCours(row.rowData)" color="warning" icon-color="#812E9E"
                        class="mr-1" />
                </router-link>

                <va-button size="small" icon="delete" @click="delConfirm(row.rowData.id)" color="danger"
                    icon-color="#ffffff" class="" />
            </template>

            <template #expandableRow="{ rowData }">
                <div class="p-4 bg-slate-300">
                    <h4>Địa chỉ: {{ rowData.address }}</h4>
                    <h4>Bằng cấp: {{ rowData.degree }}</h4>
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
import Accounts from './Accounts.vue'
import PositionInfoVue from './PositionInfo.vue'
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import PersonnelService from '@/api_services/personnel.service'
import PositionService from '@/api_services/position.service'
import FilesService from '@/api_services/files.service'
import ShowFiles from '@/components/ShowFiles.vue'
import moment from 'moment';
import { useModal } from 'vuestic-ui'
import tinh_tp from './tinh_tp.json'
import quan_huyen from './quan_huyen.json'
import xa_phuong from './xa_phuong.json'

const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef')
// const props = defineProps({
//     cours: Object
// });
const city = ref()
const quan = ref()
const xa = ref()
const dataCity = ref()
const dataQuan = ref()
const dataXa = ref()
const dataPos = ref()
const getAdd = (e) => {
    const outputArray = []
    for (const key in e) {
        if (e.hasOwnProperty(key)) {
            const item = e[key];
            outputArray.push(item);
        }
    }
    return outputArray
    // dataCity.value = outputArray.map(({ name, code }) => ({ text:name, code }));
}
const selCity = computed(() => {
    dataQuan.value = getAdd(quan_huyen)
    dataQuan.value = dataQuan.value.filter(item => item.parent_code == city.value?.code)
    dataQuan.value = dataQuan.value.map(({ name, code }) => ({ text: name, code }));
    console.log(dataQuan.value);
})
const selQuan = computed(() => {
    dataXa.value = getAdd(xa_phuong)
    dataXa.value = dataXa.value.filter(item => item.parent_code == quan.value?.code)
    dataXa.value = dataXa.value.map(({ name, code, path_with_type }) => ({ text: name, code, path_with_type }));
    console.log(dataXa.value);
})
onMounted(() => {
    // getCourses()
    dataCity.value = getAdd(tinh_tp).map(({ name, code }) => ({ text: name, code }));
    // getPos()
    getCourses()
})
const message = (e) => {
    if (e) {
        getCourses()
    }
}
const getPos = async () => {

}
const positions = ref()
const add = ref()
const cours = ref()
const form = (e) => {
    city.value = null
    quan.value = null
    xa.value = null
    cours.value = e?.id
    const pos = dataPos.value.filter(item => e?.position_id == item.value)
    name.value = e?.name
    birth.value = null
    sex.value = e?.sex
    email.value = e?.email
    phone.value = e?.phone
    degree.value = e?.degree
    position.value = pos[0]
    address.value = e?.address
    dataFiles.value = []
    if (e) {
        birth.value = new Date(e.birthday)
        getFile(e.id)
    }
    showModal.value = true

}
const addCours = () => {
    add.value = true
    cours.value = null
    dataFiles.value = []
    form(null)
}
const editCours = (e) => {
    add.value = false
    form(e)
}

const dataFiles = ref([])
var items = ref([])
let show = ref()

const getCourses = async () => {
    show.value = false
    items.value = []
    // positions.value = []
    positions.value = await PositionService.getAll()
    dataPos.value = positions.value.map(({ name, id }) => ({ text: name, value: id }))
    items.value = await PersonnelService.getAll()
    let img = await FilesService.getAll()
    items.value = items.value.map(itemA => {
        const matchB = positions.value.find(itemB => itemB.id === itemA.position_id);
        if (matchB) {
            return { ...itemA, position_name: matchB.name };
        } else {
            return { ...itemA, position_name: null };
        }
    });
    items.value = items.value.map(itemA => {
        const matchB = img.find(itemB => itemB.personnel_id === itemA.id);
        if (matchB) {
            return { ...itemA, file_id: matchB.id, file_link: matchB.link };
        } else {
            return { ...itemA, file_id: null, file_link: null };
        }
    });
    show.value = true
    console.log(items.value);

}
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
const columns = [
    { key: "avartar", label: "Ảnh" },
    { key: 'name', label: "Tên nhân sự", sortable: true, },
    { key: 'sex', label: "Giới tính", sortable: true, },
    { key: 'birthday', label: "Ngày sinh", sortable: true, },
    { key: 'degree', label: "Bằng cấp", sortable: true, },
    { key: 'email', label: "Email", },
    { key: 'phone', label: "Điện thoại", sortable: true, },
    { key: 'position_name', label: "Chức vụ", sortable: true, },
    { key: "Action", label: 'Sửa/Xóa' },
];
const getFile = async (id) => {
    dataFiles.value = await FilesService.get({ personnel_id: id })
    console.log(dataFiles.value);
}
const updateFiles = (e) => {
    if (e) {
        getFile(cours.value)
    }
}
const files = ref([])

const updateForm = () => {
    const data = {
        name: name.value,
        birthday: moment(birth.value, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        sex: sex.value,
        email: email.value,
        phone: phone.value,
        degree: degree.value,
        position_id: position.value.value,
        address: address.value
    }
    if (xa.value) {
        data.address = xa.value.path_with_type
    }
    console.log(data);
    return data
}

const { confirm } = useModal()
const delConfirm = (id) => {
    confirm('Bạn có chắc muốn xóa khóa học này?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await PersonnelService.delete(id)
    if (item) {
        init({ message: 'Xóa thành công', color: 'success' })
        getCourses()
    }
}
const createFiles = async () => {
    console.log(files.value);
    if (files.value) {
        let form = new FormData
        form.append('personnel_id', cours.value)
        form.append('files', files.value)
        const file = await FilesService.create(form)
        files.value = []
    }
}
const submit = async () => {
    showModal.value = false
    showLoading.value = true
    let data = updateForm()
    const id = await PersonnelService.create(data)
    if (id) {
        cours.value = id[0]

        createFiles()
        getCourses()
        showModal.value = false
        showLoading.value = false
        init({ message: 'Thêm thành công', color: 'success' })
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
    const course = await PersonnelService.update(cours.value, data)
    if (course) {
        createFiles()
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
const name = ref()
const birth = ref()
const sex = ref()
const email = ref()
const phone = ref()
const position = ref()
const address = ref()
const degree = ref()

var showModal = ref(false)

</script>
