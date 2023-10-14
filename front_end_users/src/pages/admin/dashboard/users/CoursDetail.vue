<template>
    <div class="grid grid-cols-12 gap-4 " v-if="show">
        <va-card class="md:col-span-8 lg:col-span-8 col-span-12 p-3">
            <div>
                <h3 class="va-h4 text-blue-400 text-center uppercase">
                    {{ cours?.name }}
                </h3>
            </div>
            <div>
                <h3 class="va-h6 ">
                    Số buổi học: {{ cours?.numberSession }}
                </h3>
                <h3 class="va-h6 ">
                    Đối tượng học viên: {{ cours?.object }}
                </h3>
            </div>
            <div>
                <h3 class="va-h6 bg-red-500  p-1">
                    Nội dung khóa học
                </h3>
                <div v-html="cours?.content"></div>
            </div>
            <div>
                <h3 class="va-h6 bg-red-500  p-1">
                    Lớp học
                </h3>
                <div>
                    <div class="va-table-responsive">
                        <table class="va-table">
                            <thead>
                                <tr>
                                    <th>Tên lớp</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Hình thức học</th>
                                    <th>Số lượng</th>
                                    <th>Thời gian học trong tuần</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="item in classStudy" :key="item">
                                    <tr>
                                        <td>{{ item?.name }}</td>
                                        <td>{{ moment(item?.startTime).format('DD-MM-YYYY') }}</td>
                                        <td>{{ moment(item?.endTime).format('DD-MM-YYYY') }}</td>
                                        <td>{{ item?.expression }}</td>
                                        <td>{{ item?.quantity }}</td>

                                        <td>
                                            <template v-for="i in findTime(item.id)" :key="i">
                                                <div class="mb-1">{{ 'Thứ ' + i.thu + ': ' + formatTime(i.startTime) + ' - '
                                                    +
                                                    formatTime(i.endTime) }}
                                                </div>
                                            </template>
                                        </td>

                                    </tr>
                                </template>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="va-h6 bg-red-500  p-1">
                    Các đánh giá khóa học
                </h3>
                <div>
                    <va-scroll-container class="max-h-56 relative" vertical>
                        <va-list>
                            <va-list-label> {{ getAssessment().length }} đánh giá</va-list-label>

                            <va-list-item v-for="(contact, index) in getAssessment()" :key="index" class="list__item">
                                <va-list-item-section avatar>
                                    <va-avatar>
                                        <!-- <img :src="contact.img" alt=""> -->
                                    </va-avatar>
                                </va-list-item-section>

                                <va-list-item-section>
                                    <va-list-item-label>
                                        {{ contact?.user_name }}
                                    </va-list-item-label>

                                    <va-list-item-label caption class="w-full flex items-center justify-between">
                                        <star-rating :show-rating="false" :rating="contact?.rate" :read-only="true"
                                            :star-size="20" />
                                        <h6>{{ moment(contact?.create_at).format('HH:mm DD-MM-YYYY') }}</h6>
                                    </va-list-item-label>
                                    <va-list-item-label caption>
                                        <p>{{ contact?.content }}</p>

                                    </va-list-item-label>
                                </va-list-item-section>
                            </va-list-item>

                        </va-list>
                    </va-scroll-container>
                </div>
            </div>
        </va-card>


        <va-card class=" lg:col-span-4  md:col-span-4 col-span-12 p-3">
            <div>
                <h3 class="va-h5 text-blue-400 text-center uppercase">
                    Đăng ký lớp học
                </h3>

            </div>
            <div>
                <h3 class="va-h6 bg-amber-300  p-1">
                    Học phí khóa học
                </h3>
                <div class=" ">
                    <div v-if="discount < cours?.fee" class=" flex items-center justify-evenly">
                        <h3 class="va-h6 text-red-600 line-through">
                            {{ cours?.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                        </h3>
                        <h3 class="va-h5 text-orange-600 ">
                            {{ discount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                        </h3>
                    </div>

                    <h3 v-else class="va-h5 text-red-600 text-center">
                        {{ cours?.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                    </h3>

                </div>
            </div>
            <div v-if="discount < cours?.fee">
                <h3 class="va-h6 bg-amber-300  p-1">
                    Thời gian ưu đãi
                </h3>
                <div class="flex items-center justify-evenly">
                    <h6>Từ {{ moment(promotion?.startTime).format('DD/MM/YYYY') }} - {{
                        moment(promotion?.endTime).format('DD/MM/YYYY') }}</h6>
                    <h5 class="text-orange-400 va-h6">Giảm {{ promotion?.value }}%</h5>
                </div>
            </div>
            <div>
                <div>
                    <h3 class="va-h6 bg-amber-300  p-1">
                        Tìm lớp học theo thời gian
                    </h3>
                    <div>
                        <va-form ref="formRef" class="grid grid-cols-6 gap-2">
                            <va-time-input class="col-span-2" v-model="startTime" clearable label="Giờ bắt đầu"
                                :rules="[(value) => value || 'Trường này chưa có giá trị']" />
                            <va-time-input class="col-span-2" v-model="endTime" clearable label="Giờ kết thúc"
                                :rules="[(value) => value || 'Trường này chưa có giá trị']" />
                            <va-button @click="validate() && submitClass()" color="primary" class="col-span-2">
                                Tìm kiếm
                            </va-button>
                        </va-form>

                    </div>
                    <div v-if="selectClass.length > 0">
                        <div class="va-table-responsive">
                            <table class="va-table">
                                <thead>
                                    <tr>
                                        <th>Tên lớp</th>
                                        <th>Thời gian học trong tuần</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ selectClass[0]?.name }}</td>
                                        <td>
                                            <template v-for="i in selectClass" :key="i">
                                                <div class="mb-1">{{ 'Thứ ' + i.thu + ': ' + i.startTime + '- '
                                                    +
                                                    i.endTime }}
                                                </div>
                                            </template>
                                        </td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <div class="flex justify-center">
                <va-button @click="showModal = true" size="large" color="danger" class=" block  mt-4 text-center">
                    Đăng ký ngay
                </va-button>
            </div>
        </va-card>

    </div>

    <va-modal v-model="showModal" hide-default-actions close-button no-outside-dismiss blur>
        <div class="p-2">
            <h3 class="va-h5 text-blue-400 text-center uppercase">
                thông tin đăng ký
            </h3>
            <div>
                <h6 class="va-h6">Thời gian đăng ký: {{ moment(new Date()).format('HH:mm DD/MM/YYYY') }}</h6>
                <h6 class="va-h6">Khóa học: {{ cours?.name }}</h6>
                <h4 class="va-h6">Học phí: {{ cours?.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                </h4>
                <h6 class="va-h6" v-if="promotion">Giảm học phí: {{ promotion.value }}%</h6>
                <h6 class="va-h6">Học phí cần đóng: {{ discount?.toLocaleString('vi-VN', {
                    style: 'currency', currency: 'VND'
                }) }}</h6>
                <p>Sau khi đăng ký khóa thành công, bạn có thể thanh toán học phí bằng tiền mặt tại trung tâm hoặc thanh
                    toán trực tuyến qua VNPAY. Ngoài ra, bạn có thể hủy đăng ký nếu như không có nhu cầu học nữa.</p>
            </div>

            <va-form ref="formRef" class=" w-full">
                <va-select class="mr-4 mt-1" :rules="[(value) => value || 'Trường này chưa có giá trị']"
                    v-model="selectItem" label="Chọn lớp" :options="opClass" required-mark="" />
                <div class="flex justify-center">
                    <va-button @click="validate() && submitReg()" size="large" color="primary" class="block mt-2">
                        Xác nhận
                    </va-button>
                </div>
            </va-form>


        </div>
    </va-modal>
    <Loading :show="showLoading" />
</template>

<script setup>
import Loading from '@/components/Loading.vue'
import StarRating from 'vue-star-rating'
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import ClassStudyTimeService from '@/api_services/class_studyTime.service'
import StudyTimeService from '@/api_services/study_time.service'
import PromotionTimeService from '@/api_services/promotion_time.service'
import SelectClassService from '@/api_services/selectClass.service'
import RegInfoService from '@/api_services/regInfo.service'
import AssessmentService from '@/api_services/assessment.service'
import SubscribersService from '@/api_services/subscribers.service'
import { useRoute } from "vue-router";

import { useForm } from 'vuestic-ui'

import { useModal } from 'vuestic-ui'
import { useToast } from 'vuestic-ui'

const { init } = useToast()

const { isValid, validate, reset, resetValidation } = useForm('formRef')

import momentT from 'moment-timezone'
import moment from 'moment';
import { ref, computed, onMounted, watch } from 'vue'
const route = useRoute(); // Lấy thông tin về route từ Vue Router

// Lấy giá trị 'id' từ URL path
const id = ref(route.params.id);
watch(route, (to, from) => {
    if (to.params.id !== from.params.id) {
        // Thực hiện xử lý tương ứng với việc thay đổi tham số

        // Gọi hàm hoặc thực hiện xử lý khác tại đây
    }
    id.value = to.params.id;
    console.log(to.params.id);
    getData()
    selectClass.value=[]
});

onMounted(async () => {
    getData()
})

async function getData() {
    classTime.value = await ClassStudyTimeService.getAll()
    cours.value = await CoursesService.get({ id: id.value })
    cours.value = cours.value[0]
    classStudy.value = await ClassService.get({ courses_id: cours.value.id })
    classAll.value = classStudy.value
    classStudy.value = classStudy.value.filter(i => new Date(i.startTime) > new Date())
    opClass.value = classStudy.value.map(({ name, id }) => ({ text: name, value: id }))
    subscribers.value = await SubscribersService.getAll()
    assessment.value = await AssessmentService.getAll()
    time.value = await StudyTimeService.getAll()
    promotion.value = await PromotionTimeService.get({ id: cours.value.promotionTime_id })
    promotion.value = promotion.value[0]
    console.log(cours.value.promotionTime_id)
    if (cours.value.promotionTime_id != null) {
        if (new Date() >= new Date(promotion.value.startTime) && new Date() <= new Date(promotion.value.endTime)) {
            discount.value = cours.value.fee - (cours.value.fee * (promotion.value.value / 100))
            // console.log(promotion.value/100);
        }
        else {
            discount.value = cours.value.fee
        }
    }
    else {
        discount.value = cours.value.fee
    }
    // getAssessment()
    show.value = true

}
function getAssessment() {
    let arr = []
    classAll.value.forEach(item => {
        let arrAssessment = assessment.value.filter(i => i.class_id == item.id)
        arrAssessment.map(y => {
            const user = subscribers.value.find(e => e.id == y.subscribers_id)
            if (user) {
                arr.push({ ...y, user_name: user.name })

            }
            else {
                arr.push({ ...y, user_name: null })

            }
        })
    })
    console.log(sortByCreatedAtDescending(arr));

    return sortByCreatedAtDescending(arr)
}
function sortByCreatedAtDescending(arr) {
    return arr.sort((a, b) => {
        const dateA = new Date(a.create_at);
        const dateB = new Date(b.create_at);

        // Sắp xếp từ cao đến thấp (giảm dần)

        return dateB - dateA;
    });
}
const classAll = ref()
const assessment = ref()
const subscribers = ref()
const showLoading = ref(false)
const selectItem = ref()
const opClass = ref([])
const discount = ref(0)
const show = ref(false)
const promotion = ref()
const cours = ref()
const classStudy = ref()
const time = ref()
const classTime = ref([])
const startTime = ref()
const endTime = ref()
const selectClass = ref([])
const showModal = ref(false)
async function submitClass() {
    showLoading.value = true
    let arr = []
    classStudy.value.forEach(element => {
        let filTime = findTime(element.id)
        filTime.forEach(i => {
            let tem = { id: element.id, name: element.name, thu: i.thu, startTime: formatTime(i.startTime), endTime: formatTime(i.endTime) }
            arr.push(tem)
        })
    });
    let data = {
        startTime: changeTime(startTime.value),
        endTime: changeTime(endTime.value),
        training_data: arr
    }
    console.log(data);
    let select = await SelectClassService.get(data)
    selectClass.value = arr.filter(y => y.id == select)
    showLoading.value = false

    console.log(select);
}
function changeTime(e) {
    const dateTime = new Date(e);

    // Lấy giờ và phút từ đối tượng Date
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    // Định dạng chuỗi "HH:mm"
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
function formatTime(e) {
    return momentT.utc(e, 'HH:mm:ss').tz('Asia/Ho_Chi_Minh').format('HH:mm');
}
function findTime(e) {
    console.log(classTime.value);
    let a = classTime.value.filter(i => i.class_id === e)
    const filteredArray = time.value.filter((itemA) =>
        a.some((itemB) => itemA.id == itemB.studyTime_id)
    );
    return filteredArray.sort(customCompare)
}
function customCompare(a, b) {
    const order = ['2', '3', '4', '5', '6', '7', 'Chủ nhật'];

    const thuA = a.thu;
    const thuB = b.thu;

    const indexA = order.indexOf(thuA);
    const indexB = order.indexOf(thuB);

    // Sắp xếp theo thứ tự được định nghĩa trong mảng 'order'
    return indexA - indexB;
}
import { useRouter } from 'vue-router'
const router = useRouter()
async function submitReg() {
    if (!$cookies.get('user')) {
        router.push({ name: 'login' })
        return
    }
    showModal.value = false
    showLoading.value = true
    let data = {
        class_id: selectItem.value.value,
        subscribers_id: $cookies.get('user')?.id,
        fees_calculated: discount.value,
        status: 0
    }
    let flag = await RegInfoService.create(data)
    console.log(flag);
    if (flag) {
        init({ message: 'Đăng ký thành công', color: 'success' })

    }
    else if (!flag) {
        init({ message: 'Số lượng đăng ký của lớp đã đầy!', color: 'danger' })
    }
    else {
        init({ message: 'Đăng ký thất bại', color: 'danger' })

    }
    showLoading.value = false
}
</script>