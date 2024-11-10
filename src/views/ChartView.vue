<script lang="ts">
import { defineComponent } from 'vue';
import BarChart from "@/components/Bar.vue"
import DoughnutChart from "@/components/Doughnut.vue"
import DataUsers from "@/components/DataUsers.vue"
import DoughnutChartOrigin from "@/components/DoughnutUserOrigin.vue"

export default defineComponent({
  name: 'ChartView',
  components: {  
    BarChart, DoughnutChart, DataUsers, DoughnutChartOrigin
  },
});
</script>

<template>
  <section class="container">
    <div>
      <DataUsers />
    </div>
    <BarChart />
    <DoughnutChart />
    <DoughnutChartOrigin />
  </section> 
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
}

.container > * {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .container > * {
    width: 90%;
  }
}
</style>
