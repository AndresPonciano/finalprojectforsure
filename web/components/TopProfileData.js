import Topicdropdown from "../components/Topicdropdown";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TagCloud } from "react-tagcloud"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'People\'s total citations and h-index',
    },
  },
};

const Tagoptions = {
  luminosity: 'dark',
  hue: 'blue',
}

const TopProfileData = ({ topPeople, topic, handleTopicChange }) => {

    const graphData = {
      labels: topPeople.map((element) => (element.name)),
      datasets: [
        {
          label: 'total citations',
          data: topPeople.map((element) => (element.total_citations)),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'h_index',
          data: topPeople.map((element) => (element.h_index)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    return (
        <div className="flex flex-col items-center mx-16">
          <div className="flex justify-between w-full bg-gray-600 rounded">
            <h2 className="my-auto p-8 text-3xl font-bold p-4 text-white">Our most prominent authors</h2>
            <div className="p-4">
              <h2 className="text-white mb-2">Filter by topic:</h2>
              <Topicdropdown searchTopic={topic} handleTopicChange={handleTopicChange}/>
            </div>
          </div>

          <div className="flex flex-col items-center h-1/2 w-full bg-gray-100">
            <div className="mt-8 border-4 rounded p-4 w-9/12">
              <Bar options={options} data={graphData} />
            </div>

            <div className="w-1/2 p-4 my-8">
              <TagCloud
                minSize={20}
                maxSize={42}
                tags={topPeople.map((element) => ({value: element.name, count: element.total_citations+element.h_index}))}
                colorOptions={Tagoptions}
                onClick={(tag) => alert(`'${tag.value}' was selected!`)}
              />
            </div>
          </div>
        </div>
    )
}

export default TopProfileData;