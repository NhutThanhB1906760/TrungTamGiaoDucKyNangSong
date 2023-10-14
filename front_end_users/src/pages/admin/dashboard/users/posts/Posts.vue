<template>
    <div class=" mb-3" v-for="post in posts" :key="post">
        <router-link :to="{ name: 'postDetail', params: { id: post?.id } }">
            <va-card class="h-40 grid grid-cols-6 gap-3">
                <va-image class="col-span-2 w-full max-h-full object-cover h-40" fit="cover" :src="post?.link" />

                <div class="col-span-4">
                    <va-card-title>{{ moment(post?.create_at).format('DD/MM/YYYY') }}</va-card-title>
                    <va-card-content class="text-2xl font-bold">
                        {{ post?.title }}
                    </va-card-content>
                    <!-- <div class="col-span-2 text-ellipsis overflow-hidden" v-html="post?.content"></div> -->

                </div>
            </va-card>

        </router-link>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PostsService from '@/api_services/posts.service'
import FilesService from '@/api_services/files.service'
import moment from 'moment';


const posts = ref([])

onMounted(async () => {
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
})
</script>