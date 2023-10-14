<template>
    <va-card class="p-3">
        <h3 class="va-h5 text-blue-400 text-center uppercase">
            đăng ký tài khoản
        </h3>
        <va-form ref="formRef1" class="grid  grid-cols-2 gap-4 mb-6">
            <va-input placeholder="" v-model="data.name" required-mark="" class="col-span-2"
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Họ và tên" />

            <va-date-input v-model="data.birthday" label="Ngày sinh" required-mark="" :rules="[(value) => value !== null|| 'Trường này chưa có giá trị']"/>
            <va-radio value-by="value" v-model="data.sex" :options="['Nam', 'Nữ']" required-mark="" label="Giới tính" :rules="[(value) => value !== null || 'Trường này chưa có giá trị']"/>
            <va-input required-mark="" type="text" v-model="data.email" label="Email" :rules="[(value) => isValidEmail(value) || 'Email chưa đúng']"/>
            <va-input label="Số điện thoại" v-model="data.phone" required-mark="" :rules="[(value) => checkPhone(value) || 'Số điện thoại chưa đúng']"></va-input>
            <div class="col-span-2">
                <h4>Địa chỉ: {{ data.address }}</h4>
                <div class="grid  grid-cols-3 gap-1 ">
                    <va-select v-model="city" label="Tỉnh/Thành phố" :options="dataCity" @change="selCity" />
                    <va-select v-model="quan" label="Quận/Huyện" :options="dataQuan" @change="selQuan" />
                    <va-select v-model="xa" label="Xã/Phường" :options="dataXa" />
                </div>
            </div>
            <div class="col-span-2 grid  grid-cols-2 gap-1">
                <va-value v-slot="isPasswordVisible" :default-value="false">
                    <va-input v-model="data.password" :type="isPasswordVisible.value ? 'text' : 'password'" label="Mật khẩu"
                        placeholder="#########"
                        :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']"
                        @click-append-inner="isPasswordVisible.value = !isPasswordVisible.value">
                        <template #appendInner>
                            <va-icon :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'" size="small"
                                color="primary" />
                        </template>
                    </va-input>
                </va-value>
                <va-value v-slot="isPasswordVisible" :default-value="false">
                    <va-input v-model="rePassword" :type="isPasswordVisible.value ? 'text' : 'password'"
                        label="Nhập lại mật khẩu" placeholder="#########"
                        :rules="[(value) => (value && value == data.password) || 'Nhập lại password chưa đúng']"
                        @click-append-inner="isPasswordVisible.value = !isPasswordVisible.value">
                        <template #appendInner>
                            <va-icon :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'" size="small"
                                color="primary" />
                        </template>
                    </va-input>
                </va-value>
            </div>
            <div class="col-span-2 flex items-center justify-center">

                <va-button class="" @click="validate() && submit()">
                    Đăng ký
                </va-button>
            </div>
        </va-form>

    </va-card>
    <Loading :show="showLoading" />

</template>

<script setup>
import Loading from '@/components/Loading.vue'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import AccountService from '@/api_services/account.service'
import moment from 'moment'
import { useModal } from 'vuestic-ui'
import tinh_tp from './tinh_tp.json'
import quan_huyen from './quan_huyen.json'
import xa_phuong from './xa_phuong.json'
import { useRouter } from 'vue-router'
const router = useRouter()
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

})


const cours = ref()
const data = ref({
    name: null,
    sex: null,
    birthday: null,
    email: null,
    phone: null,
    address: null,
    password: null,
    username:null,
    access:0,
    role:3,

})
const rePassword = ref()

const submit = async () => {
    showLoading.value = true
    // let data = updateForm()
    data.value.username=data.value.phone
    data.value.birthday = moment(data.value.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD')
    if (xa.value) {
        data.value.address = xa.value.path_with_type
    }
    console.log(data.value);
    const course = await AccountService.gegister(data.value)
    if (course) {
        showLoading.value = false
        init({ message: 'Đăng ký thành công', color: 'success' })
        router.push({ name: 'login' })
    }
    else {
        showLoading.value = false
        init({ message: 'Số điện thoại hoặc email đã tồn tại', color: 'danger' })

    }
}
const showLoading = ref(false)
const name = ref(cours.value)
const birth = ref(cours.value)
const sex = ref(cours.value)
const email = ref(cours.value)
const phone = ref(cours.value)
const address = ref(cours.value)


</script>
