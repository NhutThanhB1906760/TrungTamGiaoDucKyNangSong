<template>
    <va-card class="p-3">
        <div class="flex items-center">
            <va-button icon="add" size="large" class="mr-3 mb-2" @click="addCours">
                Thêm nhân sự
            </va-button>
            <PositionInfoVue :data="positions" :message="message" />
        </div>

        <va-modal v-model="showModal" close-button hide-default-actions blur>
            <div>
                <h3 class="va-h5 text-blue-400 text-center uppercase">
                    Thông tin nhân sự
                </h3>
            </div>
            <va-form ref="formRef1" class="grid  grid-cols-2 gap-4 mb-6">
                <va-input placeholder="" v-model="name" required-mark=""
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Tên nhân sự" />
                <!-- <va-input v-model="title" :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']"
                    label="Ngày sinh" class="mb-1" /> -->
                <va-date-input v-model="birth" label="Ngày sinh" required-mark=""
                    :rules="[value => value || 'Trường này chưa có giá trị']" />
                <va-radio v-model="sex" :options="['Nam', 'Nữ']" required-mark="" label="Giới tính" />
                <va-input required-mark="" type="email" v-model="email" label="Email" />
                <va-input label="Số điện thoại" v-model="phone" required-mark="" pattern="/^(?:\+84|0)[1-9]\d{8,9}$/"
                    placeholder=""></va-input>
                <va-input placeholder="" class="" v-model="degree" required-mark=""
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Bằng cấp" />
                <va-select track-by="value" v-model="position" label="Chức vụ" :options="dataPos" required-mark="" />

                <div class="col-span-2">
                    <h4>Địa chỉ: {{ address }}</h4>
                    <div class="grid  grid-cols-3 gap-1 ">
                        <va-select v-model="city" label="Tỉnh/Thành phố" :options="dataCity" @change="selCity" />
                        <va-select v-model="quan" label="Quận/Huyện" :options="dataQuan" @change="selQuan" />
                        <va-select v-model="xa" label="Xã/Phường" :options="dataXa" />
                    </div>
                </div>
                <div class="col-span-2">
                    <h4>Thông tin khác:</h4>
                    <editor-text :textHtml="des" />
                </div>

                <div class="col-span-2 flex items-center justify-center">
                    <va-button v-if="add" class="mr-2" @click=" submit()">
                        Tạo mới
                    </va-button>
                    <va-button v-else class="" @click=" submitEdit()">
                        Lưu thay đổi
                    </va-button>
                    <va-button class="" @click="reset()">
                        Reset
                    </va-button>
                </div>
            </va-form>
        </va-modal>
        <Loading :show="showLoading" />
        <DataTableVue v-if="items.length > 0" :data="items" :col="columns" :edit="editCours" :del="delConfirm" />
    </va-card>
</template>
<script setup>
import EditorText from '@/components/EditorText.vue'

import PositionInfoVue from './PositionInfo.vue'
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import PersonnelService from '@/api_services/personnel.service'
import DataTableVue from '@/components/DataTable.vue'
import PositionService from '@/api_services/position.service'
import { useModal } from 'vuestic-ui'
import tinh_tp from './tinh_tp.json'
import quan_huyen from './quan_huyen.json'
import xa_phuong from './xa_phuong.json'

const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef1')
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
    getPos()
    getCourses()
})
const message = (e) => {
    if (e) {
        getPos()
    }
}
const getPos = async () => {
    positions.value = []
    positions.value = await PositionService.getAll()
    dataPos.value = positions.value.map(({ name, id }) => ({ text: name, value: id }))
}
const positions = ref()
const add = ref()
const cours = ref()
const form=(e)=>{
    city.value=null
    quan.value=null
    xa.value=null
    const pos=dataPos.value.filter(item=>e?.position_id==item.value)
    name.value = e?.name
    birth.value = null
    sex.value = e?.sex
    email.value = e?.email
    phone.value = e?.phone
    des.value = e?.description
    degree.value = e?.degree
    position.value = pos[0]
    address.value = e?.address
    if(e){
        birth.value = new Date(e.birthday)

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


const getCourses = async () => {
    items.value = []
    items.value = await PersonnelService.getAll()
}
const columns = [
    { key: "id", sortable: true, width: "60px" },
    { key: 'name', label: "Tên nhân sự", sortable: true, width: "250px" },
    { key: 'sex', label: "Giới tính", sortable: true, },
    { key: 'degree', label: "Bằng cấp", sortable: true, width: "150px" },
    { key: 'email', label: "Email" ,},
    { key: 'phone', label: "Điện thoại" },
    { key: "Action", label: 'Sửa/Xóa' },
];
const getFile = async (id) => {
    dataFiles.value = await FilesService.get({ courses_id: id })
}
const files = ref([])
const updateFiles = (e) => {
    if (e) {
        getFile()
    }
}
const updateForm = () => {
    const data = {
        name: name.value,
        birthday: birth.value,
        sex: sex.value,
        email: email.value,
        phone: phone.value,
        description: GlobalStore.coursHtml,
        degree: degree.value,
        position_id: position.value.value,
        address: address.value
    }
    if(xa.value){
        data.address=xa.value.path_with_type
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
const submit = async () => {
    showModal.value = false
    showLoading.value = true
    let data = updateForm()
    const cours = await PersonnelService.create(data)
    if (cours) {
        createFiles()
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
    const course = await PersonnelService.update(cours.value.id, data)
    if (course) {
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
const name = ref(cours.value)
const birth = ref(cours.value)
const sex = ref(cours.value)
const email = ref(cours.value)
const phone = ref(cours.value)
const position = ref(cours.value)
const address = ref(cours.value)
const des = ref(cours.value)
const degree = ref(cours.value)

var showModal = ref(false)

</script>
