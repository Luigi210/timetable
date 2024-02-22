import { useEffect, useState } from "react";
import { Days } from "./Days";
import { Hour } from "./Hour";
import styles from "./Modal.module.css";
import { Range } from "./Range";
import { converDateToString, convertMinutesToHours } from "../utils";

type ModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TimeTable = {
  color: string;
  type: string;
  break?: string;
  teacher?: string;
  days: string[];
  dayHours: number;
  allHours: number;
  timeRange: {
    from: string;
    to: string;
  };
  dateRange: {
    from: string;
    to: string;
  };
  room?: string;
};

export const Modal: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [data, setData] = useState<TimeTable>({
    type: "academic",
    days: [],
    color: "",
    dayHours: 1,
    allHours: 3,
    timeRange: {
      from: "07:00",
      to: "",
    },
    dateRange: {
      from: converDateToString(new Date()),
      to: "",
    },
  });

  const handleSelectUndefinedValues = (
    value: string,
    type: "break" | "teacher" | "room"
  ) => {
    if (type === "break") {
      if (value === "novalue") {
        const { break: br, ...rest } = data;
        setData(rest);
      } else {
        setData({ ...data, break: value });
      }
    } else if (type === "teacher") {
      if (value === "novalue") {
        const { teacher: teacher, ...rest } = data;
        setData(rest);
      } else {
        setData({ ...data, teacher: value });
      }
    } else {
      if (value === "novalue") {
        const { room: room, ...rest } = data;
        setData(rest);
      } else {
        setData({ ...data, room: value });
      }
    }
  };

  useEffect(() => {
    let breakCounts = 0;

    const [day, month, year] = data.dateRange.from
      .split(".")
      .map((value) => parseInt(value));
    const date = new Date(year, month - 1, day);
    const dayOfTheWeek = date.getDay();
    const minutes =
      60 * parseInt(data.timeRange.from.split(":")[0]) +
      parseInt(data.timeRange.from.split(":")[1]);
    setData({
      ...data,
      timeRange: {
        ...data.timeRange,
        to:
          data.type === "academic"
            ? convertMinutesToHours(minutes + 45 * data.dayHours)
            : convertMinutesToHours(minutes + 60 * data.dayHours),
      },
      dateRange: {
        ...data.dateRange,
        to: converDateToString(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() +
              data.days.length * Math.floor(data.allHours / data.dayHours)
          )
        ),
      },
    });
    console.log(
      // new Date(
      //   date.getFullYear(),
      //   date.getMonth() + 1,
      //   date.getDate() +
      //     data.days.length * Math.floor(data.allHours / data.dayHours)
      // )
      data.days.length,
      Math.floor(data.allHours / data.dayHours),
      data.days.length * Math.floor(data.allHours / data.dayHours)
    );
  }, [data.type, data.dayHours, data.break, data.allHours, data.days]);

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h4 className={styles.heading}>Редактирования расписания</h4>
          </div>
          <div className={styles.modalContainer}>
            <div className={styles.school}>
              <div className={styles.schoolName}>
                <p>Онлайн Школа</p>
              </div>
              <div className={styles.color}>
                <p>Цвет группы:</p>
                <select
                  className={styles.select}
                  onChange={(e) => setData({ ...data, color: e.target.value })}
                >
                  <option value="white">Белый</option>
                  <option value="gray">Серый</option>
                </select>
              </div>
            </div>
            <div className={styles.content}>
              <select
                className={styles.select}
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                <option value="academic">Академическое</option>
                <option value="astronomy">Астрономическое</option>
              </select>

              <Hour type="allHours" setData={setData} data={data} />
              <Range from={data.dateRange.from} to={data.dateRange.to} />
              <Days data={data} setData={setData} />

              <select
                className={styles.select}
                onChange={(e) =>
                  handleSelectUndefinedValues(e.target.value, "break")
                }
              >
                <option value={"novalue"}>Без перерыва</option>
                <option value={0}>0 мин</option>
                <option value={5}>5 мин</option>
                <option value={10}>10 мин</option>
                <option value={15}>15 мин</option>
                <option value={20}>20 мин</option>
                <option value={30}>30 мин</option>
              </select>

              <Hour type="dayHours" setData={setData} data={data} />
              <Range from={data.timeRange.from} to={data.timeRange.to} />

              <select
                className={`${styles.select} ${styles.teachers}`}
                onChange={(e) =>
                  handleSelectUndefinedValues(e.target.value, "teacher")
                }
              >
                <option value={"novalue"}>
                  Выберите преподавателя на этоя время
                </option>
                <option value={"Асан"}>Асан</option>
                <option value={"Артем"}>Артем</option>
              </select>
              <select
                className={`${styles.select} ${styles.room}`}
                onChange={(e) =>
                  handleSelectUndefinedValues(e.target.value, "room")
                }
              >
                <option value={"novalue"}>Аудитория</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
              <div className={styles.optional}>
                <p>
                  Выбор <b>преподавателя</b> и <b>аудитории</b> не обязателен
                </p>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Отмена
              </button>
              <button
                className={styles.addTimeTable}
                // onClick={() => setIsOpen(false)}
              >
                Добавить расписание
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
