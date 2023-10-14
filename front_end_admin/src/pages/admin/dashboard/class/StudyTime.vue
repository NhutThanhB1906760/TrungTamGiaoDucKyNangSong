<template>
    <va-button size="large" class="mr-3 mb-2 min-w-fit" @click="showModal = true">
        Cập nhật thời gian học
    </va-button>
    <va-modal class="z-50" v-model="showModal" close-button hide-default-actions blur>
        <div>
            <h3 class="va-h5 text-blue-400 text-center uppercase">
                thông tin thời gian học
            </h3>
        </div>
        <va-form ref="formRef" class="grid  grid-cols-3 gap-4 mb-6">
            <va-select class="w-fit" v-model="selThu" label="Thứ" :options="opThu" required-mark="" :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" />
            <va-time-input v-model="startTime" class="" clearable label="Giờ bắt đầu" required-mark="" :rules="[(value) => value!==null || 'Trường này chưa có giá trị']"/>
            <va-time-input v-model="endTime" class="" clearable label="Giờ kết thúc" required-mark="" :rules="[(value) => value!==null || 'Trường này chưa có giá trị']"/>
            <!-- <va-input placeholder="" class="" v-model="startTime"
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Giờ bắt đầu"/>
            <va-input placeholder="" class="" v-model="endTime"
                :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" label="Giờ kết thúc" /> -->
            <div class="col-span-3 flex items-center justify-center">
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
                            <th>Thứ</th>
                            <th>Giờ bắt đầu</th>
                            <th>Giờ kết thúc</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in data" :key="item.id">
                            <td>{{ item.thu }}</td>
                            <td>{{formatTime( item.startTime) }}</td>
                            <td>{{ formatTime( item.endTime) }}</td>
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
import StudyTimeService from '@/api_services/study_time.service'
import moment from 'moment-timezone'
import { useModal } from 'vuestic-ui'
const { init } = useToast()
const { isValid, validate, reset, resetValidation } = useForm('formRef')
const props = defineProps({
    data: Array,
    message: Function,
});

const showModal = ref(false)
const showLoading = ref(false)
const selThu = ref()
const startTime = ref()
const endTime = ref()
const opThu = ['2', '3', '4', '5', '6', '7', 'Chủ nhật']
const name = ref()
const { confirm } = useModal()
const delConfirm = (id) => {
    confirm('Bạn có chắc muốn xóa?')
        .then((ok) => ok && delCours(id))
}
const delCours = async (id) => {
    let item = await StudyTimeService.delete(id)
    if (item) {
        init({ message: 'Xóa thành công', color: 'success' })
        props.message(true)
    }
}
const submitPos = async () => {
    showModal.value = false
    showLoading.value = true
    const cours = await StudyTimeService.create({ thu: selThu.value, startTime: startTime.value, endTime: endTime.value })
    if (cours) {
        showLoading.value = false
        showModal.value = true
        init({ message: 'Thêm thành công', color: 'success' })
        props.message(true)
    }
    else {
        showLoading.value = false
        showModal.value = true

        init({ message: 'Thêm thất bại', color: 'danger' })
    }
}
function formatTime(e) {
    return moment.utc(e, 'HH:mm:ss').tz('Asia/Ho_Chi_Minh').format('HH:mm');
}
</script>
