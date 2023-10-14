<template>
    <va-card class="p-3">
        <div>
            <h3 class="va-h4 text-blue-400 text-center uppercase">
                {{ post?.title }}
            </h3>
        </div>
        <h6>Ngày đăng:  {{ moment(post?.create_at).format('DD/MM/YYYY') }}</h6>
        <hr>
        <div class="mt-4" v-html="post?.content"></div>
    </va-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PostsService from '@/api_services/posts.service'
import FilesService from '@/api_services/files.service'
import moment from 'moment';

import { useRoute } from "vue-router";
const route = useRoute(); // Lấy thông tin về route từ Vue Router

// Lấy giá trị 'id' từ URL path
const id = ref(route.params.id);
const post = ref([])

onMounted(async () => {
    post.value = await PostsService.get({ id: id.value })
    post.value = post.value[0]
})
</script>