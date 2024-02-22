import React, { useMemo } from "react";
import styles from "./Hour.module.css";
import { TimeTable } from "../Modal";

export const Hour: React.FC<{
  type: "allHours" | "dayHours";
  data: TimeTable;
  setData: React.Dispatch<React.SetStateAction<TimeTable>>;
}> = ({ type, data, setData }) => {
  const hours = useMemo(() => {
    if (type === "allHours") {
      return data.allHours;
    }
    return data.dayHours;
  }, [type, data]);

  const addHour = () => {
    console.log("ADD");
    if (type === "allHours") {
      setData({ ...data, allHours: data.allHours + 1 });
    } else {
      setData({ ...data, dayHours: data.dayHours + 0.5 });
    }
  };

  const subtractHour = () => {
    if (type === "allHours" && data.allHours > 1) {
      setData({ ...data, allHours: data.allHours - 1 });
    } else if (data.dayHours > 1) {
      setData({ ...data, dayHours: data.dayHours - 0.5 });
    }
  };

  return (
    <div className={styles.hour}>
      <button className={styles.minus} onClick={subtractHour}>
        -
      </button>
      <div className={styles.value}>
        <p>{hours}</p>
      </div>
      <div className={styles.type}>
        <span>{type === "allHours" ? "Всего часов" : "Часов в день"}</span>
      </div>
      <button className={styles.plus} onClick={addHour}>
        +
      </button>
    </div>
  );
};
