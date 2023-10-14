<template>
<va-card class="p-3">
<template v-for="i in noti" :key="i">
    <div class="mt-3">
        <a :href="i.link" target="_blank" class="hover:text-blue-400 text-lg">{{ i.name }}</a>
    </div>
</template>
</va-card>
</template>

<script setup>
import FilesService from '@/api_services/files.service'
import { useGlobalStore } from '@/stores/global-store'
const GlobalStore = useGlobalStore()
import { ref, defineProps, onMounted } from "vue";
import { useToast } from 'vuestic-ui'
const { init } = useToast()
const props = defineProps({
    cours_id: Number,
})
onMounted(() => {
    getData()
})
async function getData() {

    noti.value = await FilesService.get({ courses_id: props.cours_id })
}

const noti = ref([])
const basicAccordionValue = ref([false])

</script>