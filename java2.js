const focusDuration = 25 * 60;
const focusTime = document.querySelector("#focus-time");
const focusStatus = document.querySelector("#focus-status");
const focusToggle = document.querySelector("#focus-toggle");
const focusReset = document.querySelector("#focus-reset");

let remainingSeconds = focusDuration;
let timerInterval = null;
let deadline = null;

function renderFocusTime() {
	const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
	const seconds = String(remainingSeconds % 60).padStart(2, "0");
	focusTime.textContent = `${minutes}:${seconds}`;
}

function pauseFocusTimer() {
	if (!timerInterval) return;

	remainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
	clearInterval(timerInterval);
	timerInterval = null;
	deadline = null;
	renderFocusTime();
}

function startFocusTimer() {
	if (remainingSeconds === 0) remainingSeconds = focusDuration;

	deadline = Date.now() + remainingSeconds * 1000;
	focusToggle.textContent = "Jeda";
	focusStatus.textContent = "Sedang fokus. Satu hal dulu.";

	timerInterval = setInterval(() => {
		remainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
		renderFocusTime();

		if (remainingSeconds === 0) {
			pauseFocusTimer();
			focusToggle.textContent = "Mulai lagi";
			focusStatus.textContent = "Sesi selesai. Waktunya istirahat.";
		}
	}, 250);
}

focusToggle.addEventListener("click", () => {
	if (timerInterval) {
		pauseFocusTimer();
		focusToggle.textContent = "Lanjutkan";
		focusStatus.textContent = "Timer dijeda.";
		return;
	}

	startFocusTimer();
});

focusReset.addEventListener("click", () => {
	pauseFocusTimer();
	remainingSeconds = focusDuration;
	renderFocusTime();
	focusToggle.textContent = "Mulai fokus";
	focusStatus.textContent = "Siap untuk fokus?";
});
