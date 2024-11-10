<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import { IUser, StateEnum } from '@/interface/user'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#FFFFFF'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#FFFFFF'
            }
          },
          y: {
            ticks: {
              color: '#FFFFFF'              
            }
          }
        },
        elements: {
          line: {
            borderColor: '#FFFFFF'
          }
        }
      }
    }
  },
  setup() {
    const store = useStore();
    store.dispatch('GET_USERS_API');
    const users = computed(() => store.state.users as IUser[]);


    const usersGroupedByState = computed(() => {
      const groupedData: Record<string, number> = {};

      const stateAbbrToFull = Object.keys(StateEnum).reduce((acc, key) => {
        const state = StateEnum[key as keyof typeof StateEnum];
        acc[key as keyof typeof StateEnum] = state;
        return acc;
      }, {} as Record<keyof typeof StateEnum, string>);

      users.value.forEach((user: IUser) => {
        const stateAbbr = user.address.state as unknown as keyof typeof StateEnum;

        if (stateAbbrToFull[stateAbbr]) {
          const fullState = stateAbbrToFull[stateAbbr];
          if (!groupedData[fullState]) {
            groupedData[fullState] = 0;
          }
          groupedData[fullState]++;
        }
      });

      return groupedData;
    });

    const chartData = computed(() => {
      const groupedData = usersGroupedByState.value;
      return {
        labels: Object.keys(groupedData),
        datasets: [
          {
            label: 'Usuários por Estado',
            data: Object.values(groupedData),
            backgroundColor: '#4CAF50',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            barThickness: 30 
          }
        ]
      };
    });

    return {
      users,
      usersGroupedByState,
      chartData
    }
  }
});
</script>

<template>
  <section class="container">
    <h2>Distribuição de usuários por Estado</h2>
    <Bar
      id="my-chart-id"
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
