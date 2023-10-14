<template>
    <va-card class="p-3">
        <div>
            <h3 class="va-h6 bg-red-500  p-1">
                Lịch học của bạn
            </h3>
            <div v-if="show">
                <div class="va-table-responsive">
                    <table class="va-table">
                        <thead>
                            <tr>
                                <th>Khóa học</th>
                                <th>Tên lớp</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Thời gian học trong tuần</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="item in data" :key="item">
                                <tr>
                                    <td>{{ item?.cours_name }}</td>
                                    <td>{{ item?.class_name }}</td>
                                    <td>{{ moment(item?.startTime).format('DD-MM-YYYY') }}</td>
                                    <td>{{ moment(item?.endTime).format('DD-MM-YYYY') }}</td>

                                    <td>
                                        <template v-for="i in findTime(item.class_id)" :key="i">
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

    </va-card>
</template>

<script setup>
import CoursesService from '@/api_services/courses.service'
import ClassService from '@/api_services/class.service'
import ClassStudyTimeService from '@/api_services/class_studyTime.service'
import StudyTimeService from '@/api_services/study_time.service'
import RegInfoService from '@/api_services/regInfo.service'


import momentT from 'moment-timezone'
import moment from 'moment';
import { ref, computed, onMounted } from 'vue'

onMounted(async () => {
    let regInfo = await RegInfoService.get({ subscribers_id: $cookies.get('user')?.id })
    regInfo = regInfo.filter(i => i.status != 2)
    classTime.value = await ClassStudyTimeService.getAll()
    cours.value = await CoursesService.getAll()
    classStudy.value = await ClassService.getAll()
    classTime.value = await ClassStudyTimeService.getAll()
    time.value = await StudyTimeService.getAll()

    classStudy.value = classStudy.value.filter(i => new Date(i.endTime) > new Date())
    data.value = regInfo.map(a => {
        let b = classStudy.value.find(i => i.id == a.class_id)
        return { ...a, class_name: b.name, cours_id: b.courses_id, startTime: b.startTime, endTime: b.endTime }
    })
    data.value = data.value.map(a => {
        let b = cours.value.find(i => i.id == a.cours_id)
        return { ...a, cours_name: b.name }
    })
    const uniqueObjectsMap = new Map();

    // Duyệt qua mảng đối tượng ban đầu và lọc ra các đối tượng không trùng nhau dựa trên thuộc tính id
    data.value.forEach((obj) => {
        if (!uniqueObjectsMap.has(obj.class_id)) {
            uniqueObjectsMap.set(obj.class_id, obj);
        }
    });

    // Chuyển các đối tượng từ Map thành một mảng mới (đã lọc)
    const uniqueObjectsArray = Array.from(uniqueObjectsMap.values());
    data.value=uniqueObjectsArray
    show.value = true
})

const data = ref([])
const show = ref(false)
const cours = ref()
const classStudy = ref()
const classTime = ref()
const time = ref()

function formatTime(e) {
    return momentT.utc(e, 'HH:mm:ss').tz('Asia/Ho_Chi_Minh').format('HH:mm');
}
function findTime(e) {
    let a = classTime.value.filter(i => i.class_id == e)
    const filteredArray = time.value.filter((itemA) =>
        a.some((itemB) => itemA.id == itemB.studyTime_id)
    );
    console.log(filteredArray);
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

</script>