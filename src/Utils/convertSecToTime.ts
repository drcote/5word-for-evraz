function convertSecToTime(totalSec: number): string {
  const hour = Math.trunc(totalSec / 3600);
  const min = Math.trunc((totalSec - hour * 3600) / 60);
  const sec = totalSec - hour * 3600 - min * 60;

  return (
    (hour < 10 ? "0" : "") +
    hour.toString() +
    ":" +
    (min < 10 ? "0" : "") +
    min.toString() +
    ":" +
    (sec < 10 ? "0" : "") +
    sec.toString()
  );
}

export default convertSecToTime;
