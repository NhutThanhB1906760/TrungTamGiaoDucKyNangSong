<template>
    <va-card class="p-3">
        <h3 class="va-h5 text-blue-400 text-center uppercase">
            thông tin cá nhân
        </h3>
        <va-form ref="formRef1" class="grid  grid-cols-2 gap-4 mb-6">
                <va-input placeholder="" v-model="data.name" required-mark="" class="col-span-2"
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Họ và tên" />
                
                <va-date-input v-model="data.birthday" label="Ngày sinh" required-mark=""
                    />
                <va-radio value-by="value"  v-model="data.sex" :options="['Nam', 'Nữ']" required-mark="" label="Giới tính" />
                <va-input required-mark="" type="email" v-model="data.email" label="Email" :rules="[(value) => isValidEmail(value) || 'Email chưa đúng']" ></va-input>
                <va-input label="Số điện thoại" v-model="data.phone" required-mark="" 
                    placeholder="" :rules="[(value) => checkPhone(value) || 'Số điện thoại chưa đúng']"
                   ></va-input>
                <div class="col-span-2">
                    <h4>Địa chỉ: {{ data.address }}</h4>
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
                    
                    <va-button class="" @click="validate()&& submitEdit()">
                        Lưu thay đổi
                    </va-button>
                </div>
            </va-form>

    </va-card>
</template>

<script setup>
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import SubscribersService from '@/api_services/subscribers.service'
import FilesService from '@/api_services/files.service'
import ShowFiles from '@/components/ShowFiles.vue'
import moment from 'moment'
import { useModal } from 'vuestic-ui'
import tinh_tp from './tinh_tp.json'
import quan_huyen from './quan_huyen.json'
import xa_phuong from './xa_phuong.json'

const { init } = useToast()
import { useForm } from 'vuestic-ui'

const { isValid, validate, reset, resetValidation } = useForm('formRef1')
// const props = defineProps({
//     cours: Object
// });
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

const city = ref()
const quan = ref()
const xa = ref()
const dataCity = ref()
const dataQuan = ref()
const dataXa = ref()
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
    getFile($cookies.get('user')?.id)
})

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
    des.value = e?.description
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



const dataFiles = ref([])
let show=ref()
const data=ref({})
const getCourses = async () => {
    show.value=false
    let sub=await SubscribersService.get({id:$cookies.get('user')?.id})
    data.value={
        name:sub[0].name,
        sex:sub[0].sex,
        phone:sub[0].phone,
        email:sub[0].email,
        birthday:new Date(sub[0].birthday),
        address:sub[0].address,

    }
    show.value=true

}
const getFile = async (id) => {
    dataFiles.value = await FilesService.get({ subscribers_id: id })
    console.log(dataFiles.value);
}
const updateFiles = (e) => {
    if (e) {
        getFile($cookies.get('user')?.id)
    }
}
const files = ref([])

const updateForm = () => {
    const data = {
        name: name.value,
        birthday:  moment(birth.value, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        sex: sex.value,
        email: email.value,
        phone: phone.value,
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
        form.append('subscribers_id', $cookies.get('user')?.id)
        form.append('files', files.value)
        const file = await FilesService.create(form)
        files.value = []
    }
}
const submitEdit = async () => {
    showModal.value = false
    showLoading.value = true
    // let data = updateForm()
    if (xa.value) {
        data.value.address = xa.value.path_with_type
    }
    const course = await SubscribersService.update($cookies.get('user')?.id, data.value)
    if (course) {
        createFiles()
        getCourses()
        showModal.value = false
        showLoading.value = false
        init({ message: 'Cập nhật thành công', color: 'success' })
    }
    else {
        showLoading.value = false
        showModal.value = true
        init({ message: 'Cập nhật thất bại', color: 'danger' })

    }
}
const showLoading = ref(false)
const name = ref(cours.value)
const birth = ref(cours.value)
const sex = ref(cours.value)
const email = ref(cours.value)
const phone = ref(cours.value)
const address = ref(cours.value)

var showModal = ref(false)

</script>
