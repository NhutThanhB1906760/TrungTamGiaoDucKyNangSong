import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useGlobalStore = defineStore('global', {
  state: () => (
    {
      isSidebarMinimized: false,
      userName: 'Vasili S',
      coursHtml:'',
    }
  ),

  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },

    changeUserName(userName: string) {
      this.userName = userName
    },
    updateCoursHtml(data:string){
      this.coursHtml=data
    },
  },
})
