<template>
    <!-- <va-card class="p-2">
        <va-card-content>
            <va-accordion v-model="basicAccordionValue">
                <va-collapse header="Thêm thông báo lớp học" class="p-4">
                    <div class="mt-2">
                        <editor-text :textHtml="content" />
                    </div>
                    <div class="flex justify-center mt-3">
                        <va-button class="float-right mb-6 block" @click="submit()">
                            Đăng
                        </va-button>
                    </div>
                </va-collapse>
            </va-accordion>
        </va-card-content>
    </va-card> -->
    <div class="my-6">
        <va-divider class="">{{ noti?.length }} thông báo</va-divider>
    </div>
    <template v-for="i in noti" :key="i">
        <va-card class="mb-4 w-11/12 my-0 mx-auto">
            <va-card-title>
                <div class="text-base w-full  flex items-center justify-between">
                    <h5>{{ moment(i.create_at).format('HH:mm DD-MM-YYYY') }}</h5>
                </div>
            </va-card-title>
            <va-card-content>
                <div v-html="i.content"></div>
            </va-card-content>
        </va-card>
    </template>
</template>

<script setup>
import moment from 'moment';
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { ref, defineProps, onMounted } from "vue";
import ClassNotiService from '@/api_services/class_notification.service'
import { useToast } from 'vuestic-ui'
const { init } = useToast()
const props = defineProps({
    class_id: Number,
})
onMounted(() => {
    getData()
})
async function getData() {

    noti.value = await ClassNotiService.get({ class_id: props.class_id })
}

const noti = ref([])
const basicAccordionValue = ref([false])
async function submit() {
    let content = GlobalStore.coursHtml
    if (!content || content == '<p></p>') {
        init({ message: 'Chưa nhập nội dung', color: 'warning' })

    }
    else {
        let add = await ClassNotiService.create({ content: content, class_id: props.class_id })
        if (add) {
            init({ message: 'Thêm thành công', color: 'success' })
            getData()
        }
        else {
            init({ message: 'Thêm thất bại', color: 'danger' })

        }
    }

}
</script>