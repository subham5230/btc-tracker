export const historyOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: false,
    lineWeight: 1.4,
  },

  animation: {
    duration: 0,
  },
  maintainAspectRatio: false,
  responsive: true, 
  scales: {
    xAxes: [
      {
        type: "time",
        distribution: "linear",
      },
    ],
  },
};
