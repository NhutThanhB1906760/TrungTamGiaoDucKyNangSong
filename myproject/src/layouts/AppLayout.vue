<template>
  <div class="app-layout">
    <navbar />

    <div class="app-layout__content">
      <div class="app-layout__sidebar-wrapper" :class="{ minimized: isSidebarMinimized }">
        <div v-if="isFullScreenSidebar" class="flex justify-end">
          <va-button class="px-4 py-4" icon="md_close" preset="plain" color="dark" @click="onCloseSidebarButtonClick" />
        </div>
        <sidebar :width="sidebarWidth" :minimized="isSidebarMinimized" :minimized-width="sidebarMinimizedWidth"
          :animated="!isMobile" />
      </div>
      <div class="app-layout__page">
        <div class="p-2 md:px-6 md:py-9">
          <router-view />

        </div>
      </div>
    </div>
  </div>
  <div id="voice" class="hidden"></div>
  <speech-to-text @message-sent="handleMessage" class="fixed z-50  bottom-1 right-1" />
</template>


<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate } from 'vue-router'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useGlobalStore } from '../stores/global-store'
import speechToText from '../components/Speech_to_text.vue'

import Navbar from '../components/navbar/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar.vue'
import alanBtn from '@alan-ai/alan-sdk-web';

const GlobalStore = useGlobalStore()

const mobileBreakPointPX = 640
const tabletBreakPointPX = 768

const sidebarWidth = ref('16rem')
const sidebarMinimizedWidth = ref(undefined)

const isMobile = ref(false)
const isTablet = ref(false)
const { isSidebarMinimized } = storeToRefs(GlobalStore)
const checkIsTablet = () => window.innerWidth <= tabletBreakPointPX
const checkIsMobile = () => window.innerWidth <= mobileBreakPointPX

const onResize = () => {
  isSidebarMinimized.value = checkIsTablet()

  isMobile.value = checkIsMobile()
  isTablet.value = checkIsTablet()
  sidebarMinimizedWidth.value = isMobile.value ? '0' : '4.5rem'
  sidebarWidth.value = isTablet.value ? '100%' : '16rem'
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

onBeforeRouteUpdate(() => {
  if (checkIsTablet()) {
    // Collapse sidebar after route change for Mobile
    isSidebarMinimized.value = true
  }
})

onResize()

const isFullScreenSidebar = computed(() => isTablet.value && !isSidebarMinimized.value)

const onCloseSidebarButtonClick = () => {
  isSidebarMinimized.value = true
}

//Alan AI
const router = useRouter()
const courses = [
  { name: 'kỹ năng sống', cost: 12 },
  { name: 'KỸ NĂNG MỀM', cost: 10 },
]
const convert = (str) => {
  const cleanedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  // Chuyển đổi "đ" thành "d"
  return cleanedStr;
}
function moveRouter(e) {
  router.push({ name: e })
}
// var alanBtnInstance = alanBtn({
//   key: 'e7892e1996d09e6958b023fbf8e565932e956eca572e1d8b807a3e2338fdd0dc/stage',
//   onCommand: function (commandData) {
//     if (commandData && commandData.command === 'openURL') {

//       if (commandData.target === '_blank') {
//         console.log(commandData.url);
//         // router.push({ name: 'login' })


//         // window.open(commandData.url, '_newtab' + Math.floor(Math.random() * 999999));
//       } else {
//         console.log(commandData.url);
//         console.log(commandData.text);
//         TTS(commandData.text)
//         moveRouter(commandData.url)
//         // window.location.href = commandData.url;
//       }
//     }
//     if (commandData.command === 'info_courses') {
//       console.log(commandData);
//       // TTS(commandData.text)
//       alanBtnInstance.callProjectApi("info_courses", courses,
//         function (error, result) { });
//     }
//     if (commandData.command === 'checkCourse') {
//       console.log(commandData);
//       let course = courses.find((element) => convert(element.name.toLowerCase()).includes(convert(commandData.data.toLowerCase())))
//       alanBtnInstance.callProjectApi("checkCourse", course,
//         function (error, result) { });
//     }
//     if (commandData.command === 'list') {
//       console.log(commandData);
//     }
//   },
// });
const TTS = (text) => {
  axios.post('https://api.fpt.ai/hmi/tts/v5', text, {
    headers: {
      'api-key': 'st22CIMLCOYoRZOwFJS8cNFyJNaKrAuD',
      'speed': '', // Thay đổi tốc độ (nếu cần)
      'voice': 'banmai', // Thay đổi giọng (nếu cần)
    },
  })
    .then(response => {
      // Xử lý dữ liệu âm thanh ở đây (ví dụ: phát nó hoặc lưu vào máy)
      console.log(response.data.async);
      var audio = document.createElement('audio');
      audio.src = response.data.async
      audio.autoplay = true;
      // audio.className = 'hidden'

      var div = document.getElementById('voice');
      div.appendChild(audio);
    })
    .catch(error => {
      console.error('Lỗi khi chuyển đổi văn bản thành giọng nói:', error);
    });
}
const handleMessage = (mes) => {
  sendData(mes)
}
function sendData(mes) {
  alanBtnInstance.activate();
  alanBtnInstance.sendText(mes);
  // alanBtnInstance.callProjectApi("greetUser", "home",
  //   function (error, result) { });
};
</script>

<style lang="scss">
$mobileBreakPointPX: 640px;
$tabletBreakPointPX: 768px;

.app-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__navbar {
    min-height: 4rem;
  }

  &__content {
    display: flex;
    height: calc(100vh - 4rem);
    flex: 1;

    @media screen and (max-width: $tabletBreakPointPX) {
      height: calc(100vh - 6.5rem);
    }

    .app-layout__sidebar-wrapper {
      position: relative;
      height: 100%;
      background: #ffffff;

      @media screen and (max-width: $tabletBreakPointPX) {
        &:not(.minimized) {
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          z-index: 999;
        }

        .va-sidebar:not(.va-sidebar--minimized) {
          .va-sidebar__menu {
            padding: 0;
          }
        }
      }
    }
  }

  &__page {
    flex-grow: 2;
    overflow-y: scroll;
  }
}
</style>
