const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const taskList = document.querySelector("#task-list");

function animateListItems(items) {
	if (reduceMotion.matches || document.visibilityState !== "visible") return;

	items.forEach((item, index) => {
		item.animate(
			[
				{ opacity: 0 },
				{ opacity: 1 }
			],
			{
				duration: 280,
				delay: Math.min(index * 45, 180),
				easing: "cubic-bezier(0.2, 0.7, 0.2, 1)"
			}
		);
	});
}

const page = document.querySelector(".page");
let pageHasAnimated = false;

function animatePage() {
	if (reduceMotion.matches || pageHasAnimated) return;
	pageHasAnimated = true;

	page.animate(
		[
			{ opacity: 0 },
			{ opacity: 1 }
		],
		{ duration: 420, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" }
	);
}

if (document.visibilityState === "visible") {
	animatePage();
} else {
	document.addEventListener("visibilitychange", function startWhenVisible() {
		if (document.visibilityState !== "visible") return;
		animatePage();
		animateListItems([...taskList.children]);
		document.removeEventListener("visibilitychange", startWhenVisible);
	});
}

animateListItems([...taskList.children]);

const taskObserver = new MutationObserver(records => {
	const newItems = records.flatMap(record => [...record.addedNodes])
		.filter(node => node instanceof HTMLElement && node.matches(".task-item, .empty-state"));
	animateListItems(newItems);
});

taskObserver.observe(taskList, { childList: true });
