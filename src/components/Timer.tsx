import { createSignal, onCleanup } from "solid-js";
import { DateTime } from "luxon";

interface TimerProps {}

const [timer, setTimer] = createSignal(
  DateTime.fromObject({ hour: 0, minute: 0, second: 0 })
);

const [timerEnabled, setTimerEnabled] = createSignal(false);

let timerInterval: ReturnType<typeof setInterval> | undefined;

function handleTimer() {
  if (!timerEnabled()) {
    setTimerEnabled(true);
    timerInterval = setInterval(() => {
      setTimer(timer().plus({ second: 1 }));
    }, 1000);
  } else {
    if (timerInterval !== undefined) {
      clearInterval(timerInterval);
      timerInterval = undefined;
    }
    setTimerEnabled(false);
  }
}

onCleanup(() => {
  if (timerInterval !== undefined) {
    clearInterval(timerInterval);
  }
});

export function Timer(props: TimerProps) {
  return (
    <>
      <div class="bg-neutral-950 px-3 py-6 hover:brightness-105">
        <h1 class="text-3xl text-neutral-300 font-bold mb-6 cursor-pointer hover:brightness-150">
          {timer().toFormat("HH:mm:ss")}
        </h1>
        <button
          onClick={handleTimer}
          class={`px-6 py-3 ${!timerEnabled() ? "bg-green-800" : "bg-red-800"} hover:brightness-150 text-neutral-300 font-bold text-xl transition-colors duration-100`}
        >
          {timerEnabled() ? "Stop" : "Start"}
        </button>
      </div>
    </>
  );
}
