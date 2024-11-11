<script lang="ts">
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import { IUser } from '@/interface/user';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default defineComponent({
  name: 'DoughnutChart',
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

    
    const regions = ['Norte', 'Nordeste', 'Sul', 'Sudeste', 'Centro-Oeste'];
    const usersGroupedByRegion = computed(() => {
  const groupedData: Record<string, number> = {};
  regions.forEach((region) => {
    groupedData[region] = 0; 
  });

  users.value.forEach((user: IUser) => {
    const region = user.address?.region;
   
    if (region && Object.prototype.hasOwnProperty.call(groupedData, region)) {
      groupedData[region]++; 
    }
  });

  console.log(groupedData); 
  return groupedData;
    });


    const chartData = computed(() => {
      const groupedData = usersGroupedByRegion.value;
      return {
        labels: Object.keys(groupedData),
        datasets: [
          {
            label: 'Usuários por Região',
            data: Object.values(groupedData),
            backgroundColor: [
              '#4CAF50', '#FF9800', '#2196F3', '#F44336', '#9C27B0',
              '#00BCD4', '#8BC34A', '#FF5722', '#3F51B5', '#9E9E9E'
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
    <h2>Distribuição de usuários por Região</h2>
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
