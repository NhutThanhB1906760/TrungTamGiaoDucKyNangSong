<template>
    <div class="w-full pb-6 grid grid-cols-12 gap-3" v-if="show">
        <va-card v-for="(info, idx) in infoTiles" :key="idx" class="col-span-6 lg:col-span-3 sm:col-span-3 " :color="info.color">
            <va-card-content>
                <h2 class="va-h2 m-0 text-white">{{ info.value }}</h2>
                <p class="text-white">{{  info.text }}</p>
            </va-card-content>
        </va-card>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import AccountService from '@/api_services/account.service'
const infoTiles = ref([
    { text: 'Tài khoản người dùng', value: 0,color: 'success', },
    { text: 'Tài khoản Admin', value: 0,color: 'danger', },
    { text: 'Tài khoản giáo viên', value: 0,color: 'info', },
    { text: 'Tài khoản nhân viên', value: 0,color: 'warning', },

])
const show=ref(false)
onMounted(async () => {
let data= await AccountService.getAll()
let user=data.filter(i=>i.role==3)
let admin=data.filter(i=>i.role==0)
let teacher=data.filter(i=>i.role==2)
let staff=data.filter(i=>i.role==1)
infoTiles.value[0].value=user.length
infoTiles.value[1].value=admin.length
infoTiles.value[2].value=teacher.length
infoTiles.value[3].value=staff.length
show.value=true
})
</script>