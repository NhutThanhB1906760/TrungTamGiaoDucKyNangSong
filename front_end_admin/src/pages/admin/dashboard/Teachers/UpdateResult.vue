<template>
    <div class=" ">
        <va-button v-if="edit" color="warning" @click="submit" gradient class="mr-6 mb-2">
            Nhập điểm
        </va-button>
        <va-button v-else color="warning" @click="submit" gradient class="mr-6 mb-2">
            Lưu thay đổi
        </va-button>
    </div>
    <div class="flex items-center flex-wrap gap-4 mb-4">
        <h4>Tỉ lệ tham gia lớp học: {{ number }}%</h4>
        <h4>Giỏi: {{ gioi }}</h4>
        <h4>Khá: {{ kha }}</h4>
        <h4>Trung bình: {{ trungBinh }}</h4>
        <h4>Kém: {{ kem }}</h4>
        <h4>Chưa hoàn thành: {{ not }}</h4>

    </div>
    <div class="va-table-responsive flex items-center justify-center ">
        <!-- <h3 class="va-h6 text-blue-400 text-center uppercase">
            Danh sách lớp 
        </h3> -->
        <table class="va-table va-table--hoverable">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên người đăng ký</th>
                    <th>Số điện thoại</th>
                    <th>Số buổi tham gia</th>
                    <th>Điểm trung bình</th>
                    <!-- <th>Thời gian cập nhật</th> -->

                </tr>
            </thead>
            <tbody v-if="show">
                <tr v-for="(user, i) in noti" :key="user">
                    <td>{{ i + 1 }}</td>
                    <td>{{ user.user_name }}</td>
                    <td>{{ user.phone }}</td>
                    <td>
                        <input :value="user.numberSession" :id="user.subscribers_id" class="border rounded-lg p-1"
                            type="number" />
                    </td>
                    <td>
                        <input :value="user.score" :id="'d' + user.subscribers_id" class="border rounded-lg p-1"
                            type="text" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup>
import { defineProps, ref, onMounted } from "vue";
import RegInfoService from '@/api_services/regInfo.service'
import SubscribersService from '@/api_services/subscribers.service'
import MediumScoreService from '@/api_services/medium_score.service'

import { useToast } from 'vuestic-ui'
const { init } = useToast()

const props = defineProps({
    class_id: Number,
    numberSession: Number
})
const show = ref(false)
const edit = ref(true)
onMounted(() => {
    getData()
})
const number= ref()
const gioi = ref()
const kha = ref()
const trungBinh = ref()
const kem = ref()
const not = ref()
const noti = ref([])
function calculate() {
    gioi.value=0
    kha.value=0
    trungBinh.value=0
    kem.value=0
    not.value=0
number.value=0
    noti.value.forEach(i => {
        number.value += i.numberSession
    })
    number.value = (number.value / (props.numberSession * noti.value.length)) * 100;
    number.value=number.value.toFixed(2)
    noti.value.forEach(i => {
        if (i.score >= 9) {
            gioi.value++
        }
        else if (i.score >= 7) {
            kha.value++
        }
        else if (i.score >= 5) {
            trungBinh.value++
        }
        else if (i.score >= 1) {
            kem.value++
        }
        else {
            not.value++
        }
    })
}
async function getData() {
    show.value = false
    edit.value = true
    noti.value = await RegInfoService.get({ class_id: props.class_id })
    let sub = await SubscribersService.getAll()
    let score = await MediumScoreService.get({ class_id: props.class_id })
    noti.value = noti.value.map(itemA => {
        const matchB = sub.find(itemB => itemB.id === itemA.subscribers_id);
        if (matchB) {
            return { ...itemA, user_name: matchB.name, phone: matchB.phone };
        } else {
            return { ...itemA, user_name: null, phone: null };
        }
    });

    if (score.length > 0) {
        noti.value = noti.value.map(itemA => {
            const matchB = score.find(itemB => itemB.subscribers_id === itemA.subscribers_id);
            if (matchB) {
                return { ...itemA, numberSession: matchB.numberSession, score: matchB.score };
            } else {
                return { ...itemA, numberSession: null, score: null };
            }
        });

        edit.value = false
        calculate()
    }

    console.log(noti.value);
    show.value = true
}
async function createScore(e) {
    let add = await MediumScoreService.create(e)
}
async function editScore(e) {
    let add = await MediumScoreService.update(e)
}
async function submit() {
    let flag = true
    noti.value.forEach(item => {
        let a = document.getElementById(item.subscribers_id).value
        let b = document.getElementById('d' + item.subscribers_id).value
        if (!a || !b) {
            init({ message: 'Còn trường chưa nhập giá trị', color: 'danger' })
            flag = false
            return
        }
    })
    if (flag) {
        noti.value.forEach(item => {
            let a = document.getElementById(item.subscribers_id).value
            let b = document.getElementById('d' + item.subscribers_id).value
            if (edit.value) {
                createScore({ class_id: props.class_id, subscribers_id: item.subscribers_id, numberSession: a, score: b })
            }
            else {
                editScore({ class_id: props.class_id, subscribers_id: item.subscribers_id, numberSession: a, score: b })
            }
        })
        getData()
        init({ message: 'Cập nhật thành công', color: 'success' })

    }
}

</script>
  
<style lang="scss" scoped>
.va-table-responsive {
    overflow: auto;
}
</style>
  