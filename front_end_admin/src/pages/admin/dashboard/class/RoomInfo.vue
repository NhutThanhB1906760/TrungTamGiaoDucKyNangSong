<template>
    <va-button  size="large" class="mr-3 mb-2 min-w-fit" @click="showModal=true">
        Cập nhật phòng học
    </va-button>
    <va-modal class="z-50" v-model="showModal" close-button hide-default-actions blur>
        <div>
            <h3 class="va-h5 text-blue-400 text-center uppercase">
                thông tin phòng học
            </h3>
        </div>
        <va-form ref="formRef" class="flex items-center">
            <va-input placeholder="" class="col-span-2" v-model="name"
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Tên phòng học" />
            <div class="col-span-2 flex items-center justify-center">
                <va-button  class="mx-2"  @click="validate()&& submitPos()">
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
                            <th>Tên phòng học</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in data" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>
                                <va-button size="small" icon="clear" color="danger" class="ml-3" @click="delConfirm(item.id)"/>
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
import RoomsService from '@/api_services/rooms.service'
import { useModal } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef')
const props = defineProps({
data: Array,
message:Function,
});
const showModal=ref(false)
const showLoading = ref(false)
const name=ref()
const { confirm } = useModal()
const delConfirm = (id) => {
confirm('Bạn có chắc muốn xóa?')
    .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
let item = await RoomsService.delete(id)
if (item) {
    init({ message: 'Xóa thành công', color: 'success' })
    props.message(true)
}
}
const submitPos = async () => {
showModal.value=false
showLoading.value = true
const cours = await RoomsService.create({name:name.value})
if (cours) {
    showLoading.value = false
    showModal.value=true
    init({ message: 'Thêm thành công', color: 'success' })
    props.message(true)
}
else {
    showLoading.value = false
    showModal.value=true

    init({ message: 'Thêm thất bại', color: 'danger' })
}
}
</script>
