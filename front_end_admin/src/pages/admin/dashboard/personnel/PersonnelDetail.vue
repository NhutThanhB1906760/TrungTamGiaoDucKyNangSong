<template>
    <va-card class="p-3" v-if="show">

        <div>
            <h3 class="va-h5 text-blue-400 text-center uppercase">
                Thông tin nhân sự
            </h3>
        </div>
        <va-form ref="formRef" class="grid grid-cols-2 gap-4 mb-6">
            <va-input placeholder="" v-model="name" required-mark=""
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Tên nhân sự" />

            <va-date-input v-model="birth" label="Ngày sinh" required-mark=""
                :rules="[(value) => value !== null || 'Trường này chưa có giá trị']" />
            <va-radio value-by="value" v-model="sex" :options="['Nam', 'Nữ']" required-mark="" label="Giới tính"
                :rules="[(value) => value !== null || 'Trường này chưa có giá trị']" />
            <va-input required-mark="" type="text" v-model="email" label="Email"
                :rules="[(value) => isValidEmail(value) || 'Email chưa đúng']" />
            <va-input label="Số điện thoại" v-model="phone" required-mark=""
                :rules="[(value) => checkPhone(value) || 'Số điện thoại chưa đúng']" placeholder=""></va-input>
            <va-input placeholder="" class="" v-model="degree" required-mark=""
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Bằng cấp" />
            <va-select v-model="position" label="Chức vụ" :options="dataPos" required-mark=""
                :rules="[(v) => v || 'Trường này chưa có giá trị']" />

            <div class="col-span-2">
                <h4>Địa chỉ: {{ address }}</h4>
                <div class="grid  grid-cols-3 gap-1 ">
                    <va-select v-model="city" label="Tỉnh/Thành phố" :options="dataCity" @change="selCity" />
                    <va-select v-model="quan" label="Quận/Huyện" :options="dataQuan" @change="selQuan" />
                    <va-select v-model="xa" label="Xã/Phường" :options="dataXa" />
                </div>
            </div>
            <div class="col-span-2">
                <h4>Thêm ảnh đại diện:</h4>
                <va-file-upload v-model="files" type="single" file-types="image/*" />
                <ShowFiles :files="dataFiles" :message="updateFiles" />

                <va-avatar v-if="dataFiles.length > 0" :src="dataFiles[0]?.link" size="large" font-size="30px"
                    class="mr-6"></va-avatar>
            </div>
            <div class="col-span-2 flex items-center justify-center">
                <va-button v-if="items.length == 0" class="mr-2" @click="validate() && submit()">
                    Tạo mới
                </va-button>
                <va-button v-else class="mr-2" @click="validate() && submitEdit()">
                    Lưu thay đổi
                </va-button>
                <va-button class="" @click="reset()">
                    Reset
                </va-button>
            </div>
        </va-form>


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
import { useRoute } from "vue-router";
const route = useRoute(); // Lấy thông tin về route từ Vue Router

// Lấy giá trị 'id' từ URL path
const id = ref(route.params.id);

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
function checkPhone(e) {
    const phoneRegex = /^(?:\+84|0)[1-9]\d{8,9}$/;

    return phoneRegex.test(e);
}
function isValidEmail(email) {
  // Biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Sử dụng phương thức test() của regex để kiểm tra email
  return emailRegex.test(email);
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
    positions.value = await PositionService.getAll()
    dataPos.value = positions.value.map(({ name, id }) => ({ text: name, value: id }))
    items.value = await PersonnelService.get({ id: id.value })
    if (items.value.length == 0) {
        addCours()
    }
    else {
        editCours(items.value[0])
    }
    show.value = true

}
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
