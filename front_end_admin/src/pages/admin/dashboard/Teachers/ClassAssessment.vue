<template>
   
    <div>
        <va-scroll-container class="max-h-[35em]" vertical>
            <va-list>
                <va-list-label> {{data.length }} đánh giá</va-list-label>

                <va-list-item v-for="(contact, index) in data" :key="index" class="list__item">
                    <va-list-item-section avatar>
                        <va-avatar>
                            <!-- <img :src="contact.img" alt=""> -->
                        </va-avatar>
                    </va-list-item-section>

                    <va-list-item-section >
                        <va-list-item-label >
                            {{ contact?.user_name }}

                        </va-list-item-label>

                        <va-list-item-label caption class="w-full flex items-center justify-between">
                            <star-rating :show-rating="false" :rating="contact?.rate" :read-only="true" :star-size="20" />
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
</template>

<script setup>
import StarRating from 'vue-star-rating'
import AssessmentService from '@/api_services/assessment.service'
import { ref, computed, onMounted, defineProps } from 'vue'
import SubscribersService from '@/api_services/subscribers.service'
import moment from 'moment';

import { useToast } from 'vuestic-ui'

const { init } = useToast()
const props = defineProps({
    class_id: Number
})
const rate = ref(0)
const value = ref()
const data = ref([])
const subscribers=ref()
onMounted(() => {
    getData()
})
async function getData() {
    data.value = await AssessmentService.get({ class_id: props.class_id })
    console.log( data.value);
    subscribers.value=await SubscribersService.getAll()
    data.value=  data.value.map(y => {
            const user = subscribers.value.find(e => e.id == y.subscribers_id)
            if (user) {
               return { ...y, user_name: user.name }

            }
            else {
                return { ...y, user_name: null }

            }
        })
}

async function submit() {
    let form = {
        class_id: props.class_id,
        subscribers_id: 1,
        rate: rate.value,
        content: value.value
    }
    console.log(form);
    if (rate.value == 0) {
        init({ message: 'Phải đánh giá ít nhất 1 sao', color: 'danger' })

    }
    else {
        let flag = await AssessmentService.create(form)
        if (flag) {
            init({ message: 'Đánh giá thành công', color: 'success' })
            rate.value=0
            value.value=null
            getData()
        }
        else {
            init({ message: 'Đánh giá thất bại', color: 'danger' })

        }

    }
}
async function delItem(id){
    let flag = await AssessmentService.delete(id)
        if (flag) {
            init({ message: 'Xóa thành công', color: 'success' })
            getData()
        }
        else {
            init({ message: 'Xóa thất bại', color: 'danger' })

        }
}
</script>