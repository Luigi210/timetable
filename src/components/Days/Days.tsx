import React, { useEffect, useState } from "react";
import styles from "./Days.module.css";
import { TimeTable } from "../Modal";

const days = [
  {
    id: "0",
    name: "Пн",
    engName: "Mon",
  },
  {
    id: "1",
    name: "Вт",
    engName: "Tue",
  },
  {
    id: "2",
    name: "Ср",
    engName: "Wed",
  },
  {
    id: "3",
    name: "Чт",
    engName: "Thu",
  },
  {
    id: "4",
    name: "Пт",
    engName: "Fri",
  },
  {
    id: "5",
    name: "Сб",
    engName: "Sat",
  },
  {
    id: "6",
    name: "Вс",
    engName: "Sun",
  },
];

export const Days: React.FC<{
  data: TimeTable;
  setData: React.Dispatch<React.SetStateAction<TimeTable>>;
}> = ({ data, setData }) => {
  const [dayType, setDayType] = useState<"Mon/Wed/Fri" | "Tue/Thu" | string>(
    "Mon/Wed/Fri"
  );

  const addDay = (day: string) => {
    if (!dayType.includes(day)) {
      setDayType(`${dayType}/${day}`);
    }
  };

  useEffect(() => {
    if (dayType) {
      setData({ ...data, days: dayType.split("/") });
    }
  }, [dayType]);

  return (
    <div className={styles.pickdays}>
      <div
        className={`${styles.dayType} ${styles.rightBordered}`}
        onClick={() => setDayType("Mon/Wed/Fri")}
      >
        ПН/СР/ПТ
      </div>
      <div
        className={`${styles.dayType} ${styles.rightBordered}`}
        onClick={() => setDayType("Tue/Thu")}
      >
        ВТ/ЧТ
      </div>
      {days.map((day) => (
        <div
          key={day.id}
          className={`${styles.dayType} ${
            dayType.includes(day.engName) ? styles.colored : ""
          } ${day.id != "6" ? styles.rightBordered : ""}`}
          onClick={() => addDay(day.engName)}
        >
          <span>{day.name}</span>
        </div>
      ))}
    </div>
  );
};
