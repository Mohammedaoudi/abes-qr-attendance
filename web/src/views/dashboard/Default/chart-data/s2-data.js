import axios from 'axios';

const predefinedNames = ['2ITE', 'ISIC', 'GC', 'G2E', 'GI', 'CCN', '2AP'];

// Initialize ChartData.series with predefined names and empty data arrays
const ChartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: predefinedNames.map(name => ({
    name: name,
    data: Array(12).fill(0) // Initialize with 12 zeros for each month
  }))
};

axios.get('http://localhost:3001/api1/v1/liste/absencesByFiliereBySem/2')
  .then(response => {
    const dataa = response.data;
    console.log('API response:', dataa);

    dataa.forEach((item) => {
      console.log('hn',item.filiere)
      const dataIndex = predefinedNames.indexOf(item.filiere.toString());
      if (dataIndex !== -1) {
        console.log(`Updating series for ${item.filiere} at index ${dataIndex}`);
        console.log('Absence data:', Object.values(item.absences));
        ChartData.series[dataIndex].data = Object.values(item.absences).map(value => parseInt(value));
      } else {
        console.log(`Filiere ${item.filiere} not found in predefinedNames`);
      }
    });

    console.log('ChartData with updated series:', ChartData.series);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

export default ChartData;
