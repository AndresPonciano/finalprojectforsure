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

export const options = {
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
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 10)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 10)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Tagoptions = {
  luminosity: 'dark',
  hue: 'green',
}

const tagData = [
  { value: 'Author LastName', count: 12312 },
  { value: 'FirstName LastName', count: 1245 },
  { value: 'Author3 LastName', count: 7654 },
  { value: 'THOMAS LastName', count: 5432 },
  { value: 'Kim LastName', count: 623 },
  { value: 'RADHIKA LastName', count: 2252 },
  { value: 'LI something', count: 97 },
  { value: 'LEE SAI PECK', count: 23162 },
  { value: 'BArRY BOEHM', count: 753642 },
  { value: 'ANNE THOMAS', count: 235213 },
  { value: 'SONIA HAIDUC', count: 1235 },
  { value: 'IKD A NAME', count: 5632 },
  { value: 'ANOTHER NAME', count: 6432 },
  { value: 'AAAAA PLEAE', count: 26423 },
]

const TopProfileData = ({ topPeople }) => {
    console.log(topPeople[0])
    return (
        <div className="flex flex-col items-center bg-gray-200 mx-16">
            top authors are here
          <div className="flex justify-between w-full">
            <h2 className="text-2xl bold p-4">Our most prominent authors</h2>
            <div className="p-4">
              <h2>Filter by topic:</h2>
              <Topicdropdown />

            </div>
          </div>

          <div className="justify-self-center h-1/2 w-1/2">
            <div className="mt-4">
              <Bar options={options} data={data} />
            </div>

            <TagCloud
              minSize={12}
              maxSize={35}
            //   tags={topPeople.map((element) => ({value: element.name, count: element.total_citations+element.h_index}))}
              tags={tagData}
              colorOptions={Tagoptions}
              onClick={(tag) => alert(`'${tag.value}' was selected!`)}
            />
          </div>
        </div>
    )
}

export default TopProfileData;