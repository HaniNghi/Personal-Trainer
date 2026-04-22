import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { fetchTraining } from "../api";
import type { Training } from "../types";
import { groupBy, sumBy } from "lodash";
import dayjs from "dayjs";

export default function Chart() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const getTrainings = () => {
    fetchTraining()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const byDate = Object.entries(
    groupBy(trainings, (t) => dayjs(t.date).format("YYYY-MM-DD")),
  ).map(([date, group]) => ({
    date,
    minutes: sumBy(group, "duration"),
  }));

  // sort dates properly
  byDate.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

  useEffect(() => {
    getTrainings();
  }, []);

  const activityStats = Object.values(groupBy(trainings, "activity")).map(
    (group) => ({
      activity: group[0].activity,
      minutes: sumBy(group, "duration"),
    }),
  );
  return (
    <>
      <BarChart
        xAxis={[
          { scaleType: "band", data: activityStats.map((a) => a.activity) },
        ]}
        series={[{ data: activityStats.map((a) => a.minutes) }]}
        height={400}
        width={800}
      />
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: byDate.map(
              (d) => dayjs(d.date).format("DD MMM"), // nicer display
            ),
          },
        ]}
        series={[
          {
            data: byDate.map((d) => d.minutes),
          },
        ]}
        height={400}
        width={800}
      />
    </>
  );
}
