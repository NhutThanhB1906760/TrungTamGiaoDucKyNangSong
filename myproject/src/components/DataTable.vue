<template>
    <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        <va-input v-model="filter" class="col-span-5" placeholder="Filter..." />
    </div>
    <va-data-table :items="items" :columns="columns" :per-page="perPage" :current-page="currentPage" :filter="filter"
        @filtered="filtered = $event.items">
        
        <template #cell(Action)="row">
            <div>
                <va-button size="small" icon="edit" @click="editItem(row.rowData)" color="warning" icon-color="#812E9E" class="mr-1" />
                <va-button size="small" icon="delete" @click="delItem(row.rowData.id)" color="danger" icon-color="#ffffff" class="" />
                <!-- <button @click="editItem(row.rowData.id)">Edit </button> -->
            </div>
        </template>
        <template #bodyAppend>
            <tr>
                <td colspan="6">
                    <div class="flex justify-center mt-4">
                        <va-pagination v-model="currentPage" :pages="pages" :visible-pages="4" />
                    </div>
                </td>
            </tr>
        </template>
    </va-data-table>
</template>

<script setup>
import { defineProps,ref,computed } from 'vue'

const props = defineProps({
    data: Array,
    col:Array,
    edit: Function,
    del:Function
})


var items = ref(props.data)
var filter = ref('')
var filtered = props.data
var perPage = ref(5)
var currentPage = ref(1)
const pages = computed(() => {
    return perPage.value && perPage.value !== 0
        ? Math.ceil(filtered.length / perPage.value)
        : filtered.length;
})

const columns = props.col

const editItem=(e)=>{
    props.edit(e)
}
const delItem=(e)=>{
    props.del(e)
}
</script>