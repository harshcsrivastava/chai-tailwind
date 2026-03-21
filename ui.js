const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const className = button.getAttribute("data-copy");
        if (!className) return;

        try {
            await navigator.clipboard.writeText(className);
            button.classList.add("is-copied");
            window.setTimeout(() => {
                button.classList.remove("is-copied");
            }, 1200);
        } catch {
            button.classList.add("is-copied");
            window.setTimeout(() => {
                button.classList.remove("is-copied");
            }, 1200);
        }
    });
});

const playgroundInput = document.getElementById("playground-input");
const applyPlaygroundButton = document.getElementById("apply-playground");
const copyPlaygroundButton = document.getElementById("copy-playground");
const playgroundPreview = document.getElementById("playground-preview");

if (playgroundInput && applyPlaygroundButton && playgroundPreview) {
    const previewBaseClasses = [
        "playground-preview",
        "chai-bg-[#1b1d22]",
        "chai-color-[#d9d9df]",
        "chai-p-4",
        "chai-rounded-[0.75rem]",
    ];

    const applyClasses = () => {
        // Restart update animation every time preview is recomputed.
        applyPlaygroundButton.classList.remove("is-updating");
        void applyPlaygroundButton.offsetWidth;
        applyPlaygroundButton.classList.add("is-updating");

        const value = playgroundInput.value.trim();
        const dynamicClasses = value ? value.split(/\s+/).filter(Boolean) : [];
        playgroundPreview.className = [...previewBaseClasses, ...dynamicClasses].join(" ");

        // Reset previous inline styles so every preview reflects only current input.
        playgroundPreview.removeAttribute("style");

        // main.js parses once on load; dynamic updates need manual re-run.
        if (
            typeof identifyCSSPropertyAndValue === "function" &&
            typeof passToHandler === "function"
        ) {
            const classes = playgroundPreview.className.split(/\s+/).filter(Boolean);

            classes.forEach((cls) => {
                if (!cls.startsWith("chai-")) return;
                const property = identifyCSSPropertyAndValue(cls);
                passToHandler(property, playgroundPreview);
            });
        }

        window.setTimeout(() => {
            applyPlaygroundButton.classList.remove("is-updating");
        }, 560);
    };

    applyPlaygroundButton.addEventListener("click", applyClasses);

    if (copyPlaygroundButton) {
        copyPlaygroundButton.addEventListener("click", async () => {
            const classes = playgroundInput.value.trim();
            if (!classes) return;

            const label = copyPlaygroundButton.querySelector(".copy-playground-label");

            try {
                await navigator.clipboard.writeText(classes);
            } catch {
                // Keep silent if clipboard fails in restricted contexts.
            }

            if (!label) return;

            const oldText = label.textContent;
            label.textContent = "Copied!";
            copyPlaygroundButton.classList.add("is-copied");

            window.setTimeout(() => {
                label.textContent = oldText;
                copyPlaygroundButton.classList.remove("is-copied");
            }, 950);
        });
    }

    playgroundInput.addEventListener("input", applyClasses);
    playgroundInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            applyClasses();
        }
    });

    applyClasses();
}
