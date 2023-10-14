<template>
<va-card class="p-3">
    <div>
                <h3 class="va-h6 bg-red-500  p-1 ">
                    Kết quả học tập
                </h3>
                <div v-if="show">
                    <div class="va-table-responsive">
                        <table class="va-table">
                            <thead>
                                <tr>
                                    <th>Khóa học</th>
                                    <th>Tên lớp</th>
                                    <th>Số buổi tham gia</th>
                                    <th>Điểm trung bình</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="item in data" :key="item">
                                    <tr>
                                        <td>{{ item?.cours_name }}</td>
                                        <td>{{ item?.class_name }}</td>
                                        <td>{{item?.numberSession }}</td>
                                        <td>{{ item?.score }}</td>
                                    </tr>
                                </template>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

</va-card>

</template>

<script setup>
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import MediumScoreService from '@/api_services/medium_score.service'
import { ref, computed, onMounted } from 'vue'

onMounted(async () => {
    let result=await MediumScoreService.get({subscribers_id:$cookies.get('user')?.id})
    cours.value = await CoursesService.getAll()
    classStudy.value = await ClassService.getAll()
    data.value=result.map(a=>{
        let b=classStudy.value.find(i=>i.id==a.class_id)
        return {...a,class_name:b.name,cours_id:b.courses_id}
    })
    data.value=data.value.map(a=>{
        let b=cours.value.find(i=>i.id==a.cours_id)
        return {...a, cours_name:b.name}
    })
    show.value = true
})

const data=ref([])
const show = ref(false)
const cours = ref()
const classStudy = ref()
const classTime=ref()
const time = ref()


</script>