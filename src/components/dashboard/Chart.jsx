import { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import supabase from "../../supabase/supabase";
import { get, set } from "idb-keyval";
const Chart = ({ user }) => {
  const [error, setError] = useState(null);

  const getData = async (user) => {
    let dates = [];
    let today = new Date();

    for (let i = 0; i <= 6; i++) {
      let pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      let date = pastDate.toISOString().split("T")[0];
      dates.push(date);
    }

    const { data, error } = await supabase.rpc("count_tasks_last_7_days", {
      user_id_input: user.identities[0].id,
    });

    if (error) {
      console.log(error);
    }

    let formatData = {};
    data.forEach((d) => {
      formatData[d.task_date] = d.task_count;
    });

    let counts = dates.map((d) => {
      return formatData[d] || 0;
    });

    dates = dates.reverse();
    counts = counts.reverse();

    await set("chartData", { dates, counts });

    setState((prev) => ({
      ...prev,
      series: [
        {
          name: "Tasks",
          data: counts,
        },
      ],
      options: {
        ...prev.options,
        xaxis: {
          categories: dates, // You can format these to 'Mon', etc. if needed
          labels: {
            style: {
              colors: "#6b7280",
            },
          },
        },
      },
    }));
  };

  const getOfflineData = async () => {
    const data = await get("chartData");
    if (!data) {
      setError("There is no data saved last time.");
    }
    if (data) {
      setState((prev) => ({
        ...prev,
        series: [
          {
            name: "Tasks",
            data: data.counts,
          },
        ],
        options: {
          ...prev.options,
          xaxis: {
            categories: data.dates, // You can format these to 'Mon', etc. if needed
            labels: {
              style: {
                colors: "#6b7280",
              },
            },
          },
        },
      }));
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      getData(user);
    }

    if (!navigator.onLine) {
      getOfflineData();
    }
  }, []);

  const [state, setState] = useState({
    series: [
      {
        name: "Tasks",
        data: [],
      },
    ],
    options: {
      colors: ["#c25e32"],

      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#c25e32"],
      },
      markers: {
        size: 5,
        colors: ["#c25e32"], // Tailwind blue-500
        strokeColors: "#ffffff",
        strokeWidth: 2,
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6B7280",
          },
        },
      },
      legend: {
        labels: {
          colors: "#4B5563",
        },
      },
      grid: {
        borderColor: "#E5E7EB", // Tailwind gray-200
        row: {
          colors: ["transparent"],
          opacity: 0.5,
        },
      },
      tooltip: {
        theme: "dark",
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#6b7280",
          },
        },
      },
    },
  });

  return (
    <div className=" w-full flex justify-center items-center max-sm:px-4 mt-10 max-sm:scale-90 flex-col gap-4 ">
      <h1 className="text-lg max-sm:text-base font-bold text-primary mb-6">
        Tasks Completed in the Last 7 Days
      </h1>
      <div className="bg-surface-light dark:bg-surface-dark max-w-3xl w-3xl max-sm:w-full p-6 rounded-lg border-2 border-border-light dark:border-border-dark shadow-lg shadow-border-light dark:shadow-border-dark">
        <div id="chart" className="w-full ">
          {error && <p>{error}</p>}
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
