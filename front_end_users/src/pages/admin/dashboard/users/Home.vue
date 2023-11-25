<template>
    <div class=" flex justify-center mb-6">
        <va-carousel class="w-[80em]" v-model="value" :items="items" :indicators="false" autoscroll infinite
            :autoscroll-interval="3000" vertical arrows height="300px">
            <template #default="{ item }">

                <va-image fit="fill" class="max-h-full col-span-1 bg-gray-300" :src="item" />
            </template>
        </va-carousel>
    </div>
    <div  class="grid grid-cols-12 gap-4 ">
        <div class="md:col-span-8 lg:col-span-8 col-span-12 ">
            <va-card class="p-3 mb-4">
                <h3 class="va-h6 bg-red-500  p-1 uppercase">
                    khóa học
                </h3>
                <div class="grid grid-cols-6 gap-4 ">
                    <template v-for="item in courses" :key="item">
                        <router-link :to="{ name: 'coursDetail', params: { id: item?.id } }"
                            class="lg:col-span-2 md:col-span-2  col-span-3">
                            <va-card class=" uppercase  ">
                                <div class="bg-lime-400 p-2 text-center text-2xl text-white font-bold">{{ item?.name }}
                                </div>
                            </va-card>
                        </router-link>
                    </template>
                </div>
            </va-card>

            <va-card class="p-3" v-if="coursPro.length > 0">
                <h3 class="va-h6 bg-red-500  p-1 uppercase">
                    khóa học có ưu đãi
                </h3>
                <div class="grid grid-cols-6 gap-4 ">
                    <template v-for="item in coursPro" :key="item">
                        <router-link :to="{ name: 'coursDetail', params: { id: item?.id } }"
                            class="lg:col-span-2 md:col-span-2  col-span-3">
                            <va-card class=" uppercase  ">
                                <div class="bg-lime-400 p-2 text-center text-2xl text-white font-bold">{{ item?.name }}
                                </div>
                            </va-card>
                        </router-link>
                    </template>

                </div>
            </va-card>
        </div>

        <div class=" lg:col-span-4  md:col-span-4 col-span-12 ">
            <va-card class="p-3">
                <h3 class="va-h6 bg-red-500  p-1 uppercase">
                    bài viết
                </h3>
                <template v-for="item in posts" :key="item">
                    <router-link :to="{ name: 'postDetail', params: { id: item?.id } }">
                        <div class="grid grid-cols-3 gap-2 items-center">
                            <va-image fit="cover" class="h-20  col-span-1 " :src="item?.link" />
                            <h6 class="col-span-2 text-ellipsis overflow-hidden ">{{ item?.title }}</h6>
                        </div>
                    </router-link>
                    <hr class="my-2">

                </template>

            </va-card>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CoursesService from '@/api_services/courses.service'
import PromotionTimeService from '@/api_services/promotion_time.service'
import PostsService from '@/api_services/posts.service'
import FilesService from '@/api_services/files.service'

const show=ref(false)
onMounted(async () => {
    courses.value = await CoursesService.getAll()
    let promotion = await PromotionTimeService.getAll()
    let arr = courses.value.filter(i => i.promotionTime_id != null)
    coursPro.value = arr.map(i => {
        let a = promotion.find(y => y.id == i.promotionTime_id)
        if (new Date() >= new Date(a.startTime) && new Date() <= new Date(a.endTime)) {
            return { ...i }
        }
    }).filter(item => item !== undefined);
    console.log( coursPro.value);
    let img = await FilesService.getAll()
    posts.value = await PostsService.getAll()
    posts.value = posts.value.map(i => {
        let link = img.find(y => y.posts_id == i.id)
        if (link) {
            return { ...i, link: link.link }
        }
        else {
            return { ...i, link: null }

        }
    })
    posts.value = posts.value.slice(0, 5)
    show.value=true
})
const posts = ref([])
const courses = ref([])
const coursPro = ref([])
const value = ref(0)
const items = [
    "https://doskills.edu.vn/wp-content/uploads/2020/06/Presentation1-e1593578110700.png",
    "https://luatduonggia.vn/wp-content/uploads/2022/12/Ky-nang-song.jpg",
    "https://cdn.kenhsinhvien.vn/data/2021/11/317514_1-4.jpg",
    "https://i0.wp.com/cungdihoc.com/wp-content/uploads/2023/03/life-skills.jpg?resize=1020%2C574&ssl=1",
]
</script>