import { COLORS } from "../assets/styles/globalStyles";

export function generateMarkedDates({ data = [], selected, valueKey = 'value' }) {
  const marks = {};

  data.forEach((d, i) => {
    const prev = data[i - 1];
    const diff = prev ? d[valueKey] - prev[valueKey] : 0;

    marks[d.date] = {
      marked: true,
      dotColor:
        diff > 0 ? "#E74C3C" : diff < 0 ? "#2980B9" : "#AAAAAA", // 상승/하락/유지
      selected: d.date === selected,
      selectedColor: COLORS.primary,
    };
  });

  if (selected) {
    marks[selected] = {
      ...(marks[selected] || {}),
      selected: true,
    };
  }

  return marks;
}
