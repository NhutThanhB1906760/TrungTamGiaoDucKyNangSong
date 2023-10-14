<template>
    <va-button size="large" class="mt-2 md:mt-0 lg:mt-0" @click="showModal = true">
        Tài khoản nhân sự
    </va-button>
    <va-modal class="z-50" v-model="showModal" close-button hide-default-actions blur>
        <div>
            <h3 class="va-h5 text-blue-400 text-center uppercase">
                thông tin tài khoản
            </h3>
        </div>
        <va-form ref="formRef" class="grid grid-cols-4 gap-4 mb-2">
            <va-input placeholder="" class="" v-model="username"
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Tên đăng nhập" />
            <va-value v-slot="isPasswordVisible" :default-value="false">
                <va-input v-model="password" :type="isPasswordVisible.value ? 'text' : 'password'"
                    :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Mật khẩu"
                    placeholder="#########" @click-append-inner="isPasswordVisible.value = !isPasswordVisible.value">
                    <template #appendInner>
                        <va-icon :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'" size="small"
                            color="primary" />
                    </template>
                </va-input>
            </va-value>
            <va-select class="" :rules="[(v) => v || 'Trường này chưa có giá trị']" v-model="personnel_id"
                label="Cho nhân sự" :options="opPer" required-mark="" />
            <va-select class="" :rules="[(v) => v || 'Trường này chưa có giá trị']" v-model="role" label="Quyền tài khoản"
                :options="opRole" required-mark="" />
            <div class="col-span-4 flex items-center justify-center">
                <va-button class="mx-2" @click="validate() && submitPos()">
                    Tạo mới
                </va-button>
                <va-button class="" @click="reset()">
                    Reset
                </va-button>
            </div>
        </va-form>
        <va-card class="mt-2 p-2">
            <div class="va-table-responsive">
                <table class="va-table">
                    <thead>
                        <tr>
                            <th>Tên nhân sự</th>
                            <th>Tài khoản</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in accounts" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ opRole.find(i => i.value == item.role).text }}</td>
                            <td>
                                <va-button size="small" icon="clear" color="danger" class="ml-3"
                                    @click="delConfirm(item.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </va-card>
    </va-modal>
    <Loading :show="showLoading" />
</template>
<script setup>
import Loading from '@/components/Loading.vue'
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vuestic-ui'
import PersonnelsService from '@/api_services/personnel.service'
import AccountService from '@/api_services/account.service'
import { useModal } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef')
onMounted(() => {
    getData()
})
async function getData() {
    accounts.value = await AccountService.getAcPer()
    opPer.value = await PersonnelsService.getAll()
    opPer.value = opPer.value.map(({ name, id }) => ({ text: name, value: id }))
    accounts.value = accounts.value.map(itemA => {
        const matchB = opPer.value.find(itemB => itemB.value === itemA.personnel_id);
        if (matchB) {
            return { ...itemA, name: matchB.text };
        } else {
            return { ...itemA, name: null };
        }
    });
}
const accounts = ref([])
const showModal = ref(false)
const showLoading = ref(false)
const username = ref()
const password = ref()
const personnel_id = ref()
const role = ref()
const opPer = ref()
const opRole = [{ value: 0, text: 'Admin' }, { value: 1, text: 'Nhân viên tài chính' }, { value: 2, text: 'Giáo viên' }]
const { confirm } = useModal()
const delConfirm = (id) => {
    confirm('Bạn có chắc muốn xóa?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await AccountService.delete(id)
    if (item) {
        init({ message: 'Xóa thành công', color: 'success' })
        getData()
    }
}
const submitPos = async () => {
    showModal.value = false
    showLoading.value = true

    const cours = await AccountService.gegister({ username: username.value, password: password.value, personnel_id: personnel_id.value.value, role: role.value.value })
    if (cours) {
        showLoading.value = false
        showModal.value = true
        init({ message: 'Thêm thành công', color: 'success' })
        getData()
    }
    else {
        showLoading.value = false
        showModal.value = true

        init({ message: 'Thêm thất bại', color: 'danger' })
    }
}

</script>
