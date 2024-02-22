export const convertMinutesToHours = (value: number) => {
  const hours = Math.floor(value / 60);
  const minutes = Math.floor(value % 60);
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes % 60 < 10 ? "0" + minutes : minutes
  }`;
};
