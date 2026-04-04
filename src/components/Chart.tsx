import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { fetchTraining } from "../api";
import type { Training } from "../types";
import { groupBy, sumBy } from "lodash";

export default function Chart() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const getTrainings = () => {
    fetchTraining()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

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
    <BarChart
      xAxis={[
        { scaleType: "band", data: activityStats.map((a) => a.activity) },
      ]}
      series={[{ data: activityStats.map((a) => a.minutes) }]}
      height={600}
    />
  );
}
