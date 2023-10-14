<template>
    <va-card class="p-3">
        <h3 class="va-h5 text-blue-400 text-center uppercase">
            đăng nhập
        </h3>
        <va-form ref="formRef1" class="grid  grid-cols-2 gap-4 mb-6">
            <va-input placeholder="" v-model="data.username" required-mark="" class="col-span-2"
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Số điện thoại" />
            <va-value v-slot="isPasswordVisible" :default-value="false">
                <va-input v-model="data.password" :type="isPasswordVisible.value ? 'text' : 'password'" label="Mật khẩu"
                    placeholder="#########" class="col-span-2"
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']"
                    @click-append-inner="isPasswordVisible.value = !isPasswordVisible.value">
                    <template #appendInner>
                        <va-icon :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'" size="small"
                            color="primary" />
                    </template>
                </va-input>
            </va-value>
            <div class="col-span-2 flex items-center justify-center">

                <va-button class="" @click="validate() && submit()">
                    Đăng nhập
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
import AccountService from '@/api_services/account.service'
import moment from 'moment'
import { useToast } from 'vuestic-ui'

const { init } = useToast()
import { useForm } from 'vuestic-ui'

const { isValid, validate, reset, resetValidation } = useForm('formRef1')
// const props = defineProps({
//     cours: Object
// });

const data = ref({
    password: null,
    username: null,
})

const submit = async () => {
    showLoading.value = true
    // let data = updateForm()
    console.log(data.value);
    const course = await AccountService.login(data.value)
    if (course) {
        
        $cookies.set("user",JSON.stringify(course),86400);
        // JSON.parse(a)

        console.log($cookies.get('user'));
        showLoading.value = false
        window.location.href = '/home'
    }
    else {
        showLoading.value = false
        init({ message: 'Số điện thoại hoặc mật khẩu chưa đúng', color: 'danger' })

    }
}
const showLoading = ref(false)


</script>
