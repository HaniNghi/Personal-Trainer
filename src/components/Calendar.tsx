import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState, useEffect } from "react";
import { fetchTraining } from "../api";
import type { Training } from "../types";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  // Fetch trainings from your API
  const getTrainings = () => {
    fetchTraining()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const events = trainings.map((training) => ({
    title: `${training.activity} (${training.customer?.firstname || "Unknown"})`,
    start: training.date.toDate(), // convert Dayjs → Date
    end: training.date.add(training.duration, "minute").toDate(),
  }));

  return (
    <div style={{ height: "600px", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
      />
    </div>
  );
}
