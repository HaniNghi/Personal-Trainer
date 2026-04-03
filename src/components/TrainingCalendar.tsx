import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState, useEffect } from "react";
import { fetchTraining } from "../api";
import type { Training } from "../types";
import dayjs from "dayjs";

const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {
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

  const events = trainings.map((t) => {
    const start = dayjs(t.date);
    return {
      title: `${t.activity} (${t.customer?.firstname || "Unknown"})`,
      start: start.toDate(),
      end: start.add(t.duration, "minute").toDate(),
    };
  });

  return (
    <div style={{ height: "600px", margin: "20px"}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => event.start}
        endAccessor={(event) => event.end}
        views={["month", "week", "day"]}
      />
    </div>
  );
}
