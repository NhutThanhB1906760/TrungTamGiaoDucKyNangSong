<template>
  <va-navbar class="app-layout-navbar flex-row">
    <template #left>
      <div class="left">
        <va-icon-menu-collapsed :class="{ 'x-flip': isSidebarMinimized }" class="va-navbar__item cursor-pointer"
          :color="colors.primary" @click="isSidebarMinimized = !isSidebarMinimized" />
        <router-link to="/">
          <!-- <vuestic-logo  /> -->
          <img v-if="$cookies.get('user').role == 0" class="logo w-24  lg:w-36 "
            src="/Life Skills Education Center-logos_transparent.png" alt="">
          <img v-if="$cookies.get('user').role == 1" class="logo w-24  lg:w-36 "
            src="/lsec-low-resolution-logo-color-staff.png" alt="">
          <img v-if="$cookies.get('user').role == 2" class="logo w-24  lg:w-36 " src="/lsec-low-resolution-logo-teacher.png"
            alt="">

        </router-link>

      </div>
    </template>
    <template #right>
      <div class="flex items-center w-fit whitespace-nowrap">
        <h6 class="mr-4 text-xl font-bold">{{ username }}</h6>
        <va-button icon="close" color="danger" gradient class="" @click="logOut">
          Đăng xuất
        </va-button>
      </div>
    </template>
  </va-navbar>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '../../stores/global-store'
import { useI18n } from 'vue-i18n'
import { useColors } from 'vuestic-ui'
import VuesticLogo from '../VuesticLogo.vue'
import VaIconMenuCollapsed from '../icons/VaIconMenuCollapsed.vue'
import AppNavbarActions from './components/AppNavbarActions.vue'
import PersonnelService from '@/api_services/personnel.service'
import AccountService from '@/api_services/account.service'

const GlobalStore = useGlobalStore()
const { t } = useI18n()

const { isSidebarMinimized } = storeToRefs(GlobalStore)

const { getColors } = useColors()
const colors = computed(() => getColors())
const username = ref()
onMounted(async () => {
  let user = await PersonnelService.get({ id: $cookies.get('user')?.id })
  username.value = user[0].name
})
async function logOut() {
  let logout = await AccountService.logOut()
  if (logout) {
    window.location.href = '/auth/login'

  }
}
</script>

<style lang="scss" scoped>
.va-navbar {
  box-shadow: var(--va-box-shadow);
  z-index: 2;

  @media screen and (max-width: 950px) {
    .left {
      width: 100%;
    }

    .app-navbar__actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}

.left {
  display: flex;
  align-items: center;

  &>* {
    margin-right: 1.5rem;
  }

  &>*:last-child {
    margin-right: 0;
  }
}

.x-flip {
  transform: scaleX(-100%);
}

.app-navbar-center {
  display: flex;
  align-items: center;
  height: 1rem;

  @media screen and (max-width: 1200px) {
    &__github-button {
      display: none;
    }
  }

  @media screen and (max-width: 950px) {
    &__text {
      display: none;
    }
  }
}</style>
