<script lang="ts">
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import { IUser } from '@/interface/user';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default defineComponent({
  name: 'DoughnutChartOrigin',
  components: { Doughnut },
  data() {
    return {
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#FFFFFF'
            }
          },
          tooltip: {
            backgroundColor: '#333',
            bodyColor: '#FFFFFF',
            titleColor: '#FFFFFF'
          }
        }
      }
    };
  },
  setup() {
    const store = useStore();
    store.dispatch('GET_USERS_API');
    const users = computed(() => store.state.users as IUser[]);

    
    const origins = ['física', 'digital'];
    const usersGroupedByRegion = computed(() => {
    const groupedData: Record<string, number> = {};
      origins.forEach((origins) => {
      groupedData[origins] = 0; 
    });

  users.value.forEach((user: IUser) => {
    const origin = user.origin;
    if (origin && Object.prototype.hasOwnProperty.call(groupedData, origin)) {
      groupedData[origin]++; 
    }
  });

    return groupedData;
    });


    const chartData = computed(() => {
      const groupedData = usersGroupedByRegion.value;
      return {
        labels: Object.keys(groupedData),
        datasets: [
          {
            label: 'Usuários por origem',
            data: Object.values(groupedData),
            backgroundColor: [
              '#4CAF50', '#FF9800'
            ],
            borderColor: '#FFFFFF',
            borderWidth: 1
          }
        ]
      };
    });

    return {
      users,
      usersGroupedByRegion,
      chartData
    };
  }
});
</script>

<template>
  <section class="container">
    <h2>Distribuição de usuários por origem</h2>
    <Doughnut
      id="my-doughnut-chart"
      :options="chartOptions"
      :data="chartData"
    />
  </section>
</template>

<style scoped>
.container {
  width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #333; 
}

h2 {
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 20px;
}
</style>
