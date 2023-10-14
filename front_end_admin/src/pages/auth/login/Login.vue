<template>
  <va-form ref="formRef1" tag="form" @submit.prevent="validate() && onsubmit()">
    <va-input v-model="email" class="mb-4" type="text" label="Tên đăng nhập"
      :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" />

    <va-input v-model="password" class="mb-4" type="password" label="Mật khẩu"
      :rules="[(value) => (value && value.length > 0) || 'Trường này chưa có giá trị']" />

    <!-- <div class="auth-layout__options flex items-center justify-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="t('auth.keep_logged_in')" />
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
        t('auth.recover_password')
      }}</router-link>
    </div> -->

    <div class="flex justify-center mt-4">
      <va-button class="my-0" type="submit" @click="validate() && onsubmit()">Đăng nhập</va-button>
    </div>
  </va-form>
</template>

<script setup lang="ts">
import { useForm } from 'vuestic-ui'
import { ref, computed, onMounted } from 'vue'
import AccountService from '@/api_services/account.service'

import { useRouter } from 'vue-router'
const { isValid, validate, reset, resetValidation } = useForm('formRef1')
import { useToast } from 'vuestic-ui'

const { init } = useToast()
const email = ref('')
const password = ref('')
const keepLoggedIn = ref(false)
const emailErrors = ref<string[]>([])
const passwordErrors = ref<string[]>([])
const router = useRouter()

const formReady = computed(() => !emailErrors.value.length && !passwordErrors.value.length)

async function onsubmit() {
  const data = {
    password: password.value,
    username: email.value,
  }
  console.log(data);

  const course = await AccountService.Login(data)
  if (course) {

    $cookies.set("user", JSON.stringify(course), 86400);
    // JSON.parse(a)
    if ($cookies.get("user").role == 0) {
      window.location.href = '/admin'
    }
    else if ($cookies.get("user").role == 1) {
      window.location.href = '/staff'

    }
    else {
      window.location.href = '/teacher'

    }
  }
  else {
    init({ message: 'Tên đăng nhập hoặc mật khẩu chưa đúng', color: 'danger' })

  }
}
</script>
