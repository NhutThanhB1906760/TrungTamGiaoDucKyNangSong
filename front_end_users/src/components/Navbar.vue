<template>
    <div class="">

        <nav class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex  h-16 items-center justify-between">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button-->
                        <button type="button" @click="isActive = !isActive"
                            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu" aria-expanded="false">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open main menu</span>
                            <!--
              Icon when menu is closed.
  
              Menu open: "hidden", Menu closed: "block"
            -->
                            <svg v-if="!isActive" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <!--
              Icon when menu is open.
  
              Menu open: "block", Menu closed: "hidden"
            -->
                            <svg v-else class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex flex-shrink-0 items-center text-4xl font-bold text-blue-600">
                            <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"> -->
                            <router-link :to="{name:'home'}">
                                LSEC

                            </router-link>
                        </div>
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4 text-lg">
                                <template v-for="i in menu" :key="i">

                                    <router-link :to="{ name: i.namePath }"
                                        class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium">{{
                                            i.text }}</router-link>

                                </template>
                                <va-dropdown trigger="hover" placement="bottom-left" class="flex items-center">
                                    <template #anchor>
                                        <p
                                            class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium">
                                            Khóa học</p>
                                    </template>

                                    <va-dropdown-content>
                                        <template v-for="i in courses" :key="i">
                                            <div class="mb-2">
                                                <router-link :to="{ name: 'coursDetail', params: { id: i?.id } }"
                                                    class="text-black  hover:text-green-400 rounded-md  text-md font-medium">{{
                                                        i?.name }}</router-link>

                                            </div>

                                        </template>

                                    </va-dropdown-content>
                                </va-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                        <!-- Profile dropdown -->
                        <div class="relative ml-3">
                            <div>
                                <button type="button" v-if="user"
                                    class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">Open user menu</span>
                                    <va-dropdown trigger="hover" placement="bottom-left">
                                        <template #anchor>
                                            <div class="flex items-center">
                                                <va-avatar>
                                                    <img class="h-8 w-8 rounded-full" :src="img[0]?.link" alt="">

                                                </va-avatar>
                                                <h6 class="text-white text-lg font-bold ml-1">{{ user?.name }}</h6>
                                            </div>
                                        </template>


                                        <va-dropdown-content>
                                            <template v-for="i in privateLogin" :key="i">
                                                <div class="mb-2">
                                                    <router-link :to="{ name: i.namePath }"
                                                        class="text-black  hover:text-green-400 rounded-md  text-md font-medium">{{
                                                            i.text }}</router-link>

                                                </div>
                                            </template>
                                            <div class="text-black  hover:text-green-400 rounded-md  text-md font-medium cursor-pointer"
                                                @click="logOut">Đăng xuất</div>

                                        </va-dropdown-content>
                                    </va-dropdown>

                                </button>
                                <div v-else class="flex items-center sm:w-[10em] ">
                                    <router-link :to="{ name: 'login' }">
                                        <va-button color="info"  gradient class="w-full  whitespace-nowrap">
                                            Đăng nhập
                                        </va-button>
                                    </router-link>
                                    <router-link :to="{ name: 'register' }">
                                        <va-button color="danger" gradient class="ml-3 w-full whitespace-nowrap">
                                            Đăng ký
                                        </va-button>
                                    </router-link>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div :class="{ hidden: !isActive, }" id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2 z-50">
                    <template v-for="i in menu" :key="i">
                        <div>
                            <router-link :to="{ name: i.namePath }"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">{{
                                    i.text }}</router-link>
                        </div>
                    </template>
                    <va-dropdown trigger="hover" placement="bottom-left" class="flex items-center">
                        <template #anchor>
                            <p class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium">
                                Khóa học</p>
                        </template>

                        <va-dropdown-content>
                            <template v-for="i in courses" :key="i">
                                <div class="mb-2">
                                    <router-link :to="{ name: 'coursDetail', params: { id: i?.id } }"
                                        class="text-black  hover:text-green-400 rounded-md  text-md font-medium">{{
                                            i?.name }}</router-link>

                                </div>

                            </template>

                        </va-dropdown-content>
                    </va-dropdown>

                </div>
            </div>
        </nav>
    </div>
</template>

<script setup >
import { ref, computed, onMounted } from 'vue'
const isActive = ref(false)
import SubscribersService from '@/api_services/subscribers.service'
import FilesService from '@/api_services/files.service'
import CoursesService from '@/api_services/courses.service'
import AccountService from '@/api_services/account.service'

onMounted(async () => {
    let id_user = $cookies.get('user')
    if (id_user) {
        user.value = await SubscribersService.get({ id: id_user.id })
        user.value = user.value[0]
        img.value = await FilesService.get({ subscribers_id: id_user.id })
    }

    courses.value = await CoursesService.getAll()

    console.log(user.value);
})
const courses = ref([])
const user = ref()
const img = ref([])
let privateLogin = [
    { namePath: 'privateInfo', text: 'Thông tin cá nhân' },
    { namePath: 'RegInfo', text: 'Thông tin đăng ký' },
    { namePath: 'classView', text: 'Lớp học của bạn' },
    { namePath: 'schedule', text: 'Lịch học' },
    { namePath: 'studyResult', text: 'Kết quả học tập' },
]
let menu = [
    { namePath: 'home', text: 'Trang chủ' },
    // { namePath: 'dashboard', text: 'Khóa học' },
    { namePath: 'introduce', text: 'Giới thiệu' },
    { namePath: 'posts', text: 'Bài viết' },

]

async function logOut() {
    let logout = await AccountService.logOut()
    if (logout) {
        window.location.href = '/home'

    }
}
</script>