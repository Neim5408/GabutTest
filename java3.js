const taskInputForShortcut = document.querySelector("#task-input");

document.addEventListener("keydown", event => {
	const target = event.target;
	const isTyping = target instanceof HTMLElement &&
		(target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

	if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !isTyping) {
		event.preventDefault();
		taskInputForShortcut.focus();
	}
});
