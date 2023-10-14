import type { TChartData as ChartData } from 'vue-chartjs/dist/types'
import RegInfoService from '@/api_services/regInfo.service'
async function getData(){
  return await RegInfoService.getAll()
}
let months= []
for (let index = 1; index <= new Date().getMonth()+1; index++) {
  months.push(index)
}
let data=[]
let data1=[]
async function processAsyncData() {
  try {
    const arr = await getData();
    // Lọc dữ liệu từ biến arr
    months.forEach(i=>{
      const filteredData = arr.filter(item => new Date(item.create_at).getMonth()==i&&item.status!==2);
      const filteredData1 = arr.filter(item => new Date(item.create_at).getMonth()==i&&item.status==2);
      data1.push(filteredData1.length)

      data.push(filteredData.length)
    })
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
  }
}

// Gọi hàm processAsyncData để bắt đầu quá trình xử lý dữ liệu
processAsyncData();

export const lineChartData: ChartData<'line'> = {
  labels: months,
  datasets: [
    {
      label: 'Đã đăng ký',
      backgroundColor: 'primary',
      data:data,
    },
    {
      label: 'Đã hủy',
      backgroundColor: 'danger',
      data:data1,
    },
  ],
}
