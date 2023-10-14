<template>
    <template v-for="file in files">
        <div class="flex items-center mb-1">
        <a :href="file.link" target="_blank"  >{{ file.name }}</a>
        <va-button size="small" icon="clear" color="danger" class="ml-3" @click="deteleFile(file.id)">
        </va-button>
    </div>
    </template>
</template>
<script setup>
import {defineProps} from 'vue'
import FilesService from '@/api_services/files.service'
// const { init } = useToast()

const props = defineProps({
    files: Array,
    message: Function,
});
const deteleFile=async(id)=>{
const file=await FilesService.delete(id)
if(file){
props.message(true)
}
}
</script>