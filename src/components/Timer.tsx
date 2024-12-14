import { createSignal, onCleanup } from "solid-js";
import { DateTime } from "luxon";

interface JobsIF {
  id: number;
  title: string;
  time: DateTime;
}

const [timer, setTimer] = createSignal(
  DateTime.fromObject({ hour: 0, minute: 0, second: 0 })
);

const [timerEnabled, setTimerEnabled] = createSignal(false);

const [jobs, setJobs] = createSignal<JobsIF[] | null>([]);

function pushJob(newJob: JobsIF) {
  setJobs((prevJobs) => [...(prevJobs || []), newJob]);
}

let timerInterval: ReturnType<typeof setInterval> | undefined;

function initTimer() {
  setTimer(DateTime.fromObject({ hour: 0, minute: 0, second: 0 }));
}

function handleTimer() {
  if (!timerEnabled()) {
    setTimerEnabled(true);
    timerInterval = setInterval(() => {
      setTimer(timer().plus({ second: 1 }));
    }, 1000);
  } else {
    if (timerInterval !== undefined) {
      clearInterval(timerInterval);
      pushJob({
        id: 1,
        title: "test",
        time: timer(),
      });
      initTimer();
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

export function Timer() {
  return (
    <>
      <div class="bg-neutral-950 hover:brightness-110">
        {
          // Row 1
        }
        <div class="flex justify-between">
          {
            // Project Container
          }
          <div class="flex items-center bg-neutral-900">
            <div class="px-6 h-full">
              <h1>Benzel-Busch</h1>
            </div>
            <div class="px-6">+</div>
          </div>
          {
            // Timer Container
          }
          <div class="text-right">
            <h6 class="text-neutral-800">{timer().toFormat("DD")}</h6>
            <h1 class="text-3xl text-neutral-300 font-bold">
              {timer().toFormat("HH:mm:ss")}
            </h1>
          </div>
        </div>
        {
          // Row 2
        }
        <div class="text-right">
          <button
            onClick={handleTimer}
            class={`px-6 py-3 rounded-sm ${
              !timerEnabled() ? "bg-green-800" : "bg-red-800"
            } hover:brightness-150 text-neutral-300 font-bold text-lg transition-colors duration-100`}
          >
            {timerEnabled() ? "Stop" : "Start"}
          </button>
        </div>
      </div>
      <div>{jobs()?.length}</div>
    </>
  );
}
