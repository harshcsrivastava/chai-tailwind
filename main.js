// ******************** Spacing (padding, margin)  ************************

const paddingAndMarginMap = {
    p: ["padding"],
    px: ["padding-left", "padding-right"],
    py: ["padding-top", "padding-bottom"],
    pt: ["padding-top"],
    pb: ["padding-bottom"],
    pl: ["padding-left"],
    pr: ["padding-right"],
    m: ["margin"],
    mx: ["margin-left", "margin-right"],
    my: ["margin-top", "margin-bottom"],
    mt: ["margin-top"],
    mb: ["margin-bottom"],
    ml: ["margin-left"],
    mr: ["margin-right"],
};

// ======================= Padding & Margin Classes =======================

function paddingAndMargin(property, elem) {
    const { prop, val } = property;

    const properties = paddingAndMarginMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}

// ******************** Size (width, height)  ************************

const widthAndHeightMap = {
    w: ["width"],
    "min-w": ["min-width"],
    "max-w": ["max-width"],
    h: ["height"],
    "min-h": ["min-height"],
    "max-h": ["max-height"],
};

// ======================= Width & Height Classes =======================

function widthAndHeight(property, elem) {
    const { prop, val } = property;

    const properties = widthAndHeightMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}

// ******************** Colors & Typography (background, emphasis, alignment)  ************************
// Background
const backgroundColorAndTextStylingMap = {
    bg: ["background-color"],
    color: ["color"],
    spacing: ["letter-spacing"],
    indent: ["text-indent"],
    "line-height": ["line-height"],
};

// Text-Transform
const textStylingMap = {
    bold: ["font-weight", "bold"],
    italic: ["font-style", "italic"],
    underline: ["text-decoration", "underline"],
    uppercase: ["text-transform", "uppercase"],
    lowercase: ["text-transform", "lowercase"],
    capitalize: ["text-transform", "capitalize"],
    none: ["text-transform", "none"],
    fullWidth: ["text-transform", "full-width"],
    left: ["text-align", "left"],
    right: ["text-align", "right"],
    center: ["text-align", "center"],
    justify: ["text-align", "justify"],
    start: ["text-align", "start"],
    end: ["text-align", "end"],
};

// ======================= Backgroud Color Classes =======================
function backgroundColorAndTextStyling(property, elem) {
    const { prop, val } = property;

    const properties = backgroundColorAndTextStylingMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}

// ======================= Text Styling Classes =======================
function textStyling(property, elem) {
    const { prop, val } = property;

    const to = textStylingMap[val];

    elem.style.setProperty(to[0], to[1]);
}

// ******************** Borders and radius  ************************

const borderAndRadiusMap = {
    border: ["border-width"],
    "border-t": ["border-top-width"],
    "border-r": ["border-right-width"],
    "border-b": ["border-bottom-width"],
    "border-l": ["border-left-width"],
    rounded: ["border-radius"],
    "rounded-t": ["border-top-left-radius", "border-top-right-radius"],
    "rounded-r": ["border-top-right-radius", "border-bottom-right-radius"],
    "rounded-b": ["border-bottom-left-radius", "border-bottom-right-radius"],
    "rounded-l": ["border-top-left-radius", "border-bottom-left-radius"],
    "rounded-tl": ["border-top-left-radius"],
    "rounded-tr": ["border-top-right-radius"],
    "rounded-br": ["border-bottom-right-radius"],
    "rounded-bl": ["border-bottom-left-radius"],
};

// ======================= Border & Radius Classes =======================
function borderAndRadius(property, elem) {
    const { prop, val } = property;

    const properties = borderAndRadiusMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}

// ******************** Layout Utility (display)  ************************

const displayMap = {
    block: ["display", "block"],
    inline: ["display", "inline"],
    flex: ["display", "flex"],
};

// ======================= Display Classes =======================
function display(property, elem) {
    const { prop, val } = property;

    const key = prop === "display" ? val : prop;
    const to = displayMap[key];

    if (!to) return;

    elem.style.setProperty(to[0], to[1]);
}

// Flexbox Justify & Align Content
const justifyAndAlignMap = {
    "justify-start": ["justify-content", "flex-start"],
    "justify-end": ["justify-content", "flex-end"],
    "justify-center": ["justify-content", "center"],
    "justify-between": ["justify-content", "space-between"],
    "justify-around": ["justify-content", "space-around"],
    "justify-evenly": ["justify-content", "space-evenly"],
    "items-start": ["align-items", "flex-start"],
    "items-end": ["align-items", "flex-end"],
    "items-center": ["align-items", "center"],
    "items-baseline": ["align-items", "baseline"],
    "items-stretch": ["align-items", "stretch"],
};

// Gap
const gapMap = {
    gap: ["gap"],
    "gap-x": ["column-gap"],
    "gap-y": ["row-gap"],
};

// ======================= Justify Content Classes =======================
function justifyAndAlign(property, elem) {
    const { prop, val } = property;
    const to = justifyAndAlignMap[prop + "-" + val];

    elem.style.setProperty(to[0], to[1]);
}

// ======================= Gap Classes =======================
function gap(property, elem) {
    const { prop, val } = property;

    const properties = gapMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}

// ******************** Parser and Controller Logic  ************************

// DOMContentLoad allows the script to run only when the DOM Tree is loaded
document.addEventListener("DOMContentLoaded", () => {
    const chaiElem = document.querySelectorAll('[class*="chai-"]');

    chaiElem.forEach((elem) => {
        const classes = elem.className.split(" "); // ["chai-w-4" ,"chai-h-3"]

        classes.forEach((cls) => {
                //received element like chai-black
                // triming to extract property
                const property = identifyCSSPropertyAndValue(cls);

                passToHandler(property, elem);
        });
    });
});

function identifyCSSPropertyAndValue(value) {
    // if value = chai-black, using splice
    const trimmed = value.slice(5);
    // finding last index so that i can extract the value from last
    const lastHyphen = trimmed.lastIndexOf("-");

    // Handles single-token utilities like chai-flex or chai-block
    if (lastHyphen === -1) {
        return {
            prop: trimmed,
            val: trimmed,
        };
    }

    const raw = trimmed.slice(lastHyphen + 1);
    const num = Number(raw);
    let val;

    if (!isNaN(num)) {
        val = `${num * 0.25}rem`;
    } else if (raw.startsWith("[") && raw.endsWith("]")) {
        // Parsing Custom value like [400px] or HEX Code
        val = raw.slice(1, -1);
    } else {
        val = raw;
    }

    const prop = trimmed.slice(0, lastHyphen);

    return {
        prop,
        val,
    };
}

function passToHandler(property, elem) {
    if (!property || typeof property !== "object") return;

    const { prop, val } = property;

    if (paddingAndMarginMap[prop]) {
        paddingAndMargin(property, elem);
    } else if (widthAndHeightMap[prop]) {
        widthAndHeight(property, elem);
    } else if (borderAndRadiusMap[prop]) {
        borderAndRadius(property, elem);
    } else if (Object.keys(backgroundColorAndTextStylingMap).includes(prop)) {
        backgroundColorAndTextStyling(property, elem);
    } else if (displayMap[prop] || (prop === "display" && displayMap[val])) {
        display(property, elem);
    } else if (Object.keys(justifyAndAlignMap).includes(`${prop}-${val}`)) {
        justifyAndAlign(property, elem);
    } else if (gapMap[prop]) {
        gap(property, elem);
    } else if (Object.keys(textStylingMap).includes(val)) {
        textStyling(property, elem);
    } else {
        console.log("Unused ", property);
    }
}

// ******************** Animation Script written by AI  ************************

function setupScrollReveal() {
    const revealTargets = document.querySelectorAll(
        ".page-header, .demo-section",
    );

    revealTargets.forEach((elem, index) => {
        elem.classList.add("reveal-on-scroll");
        elem.style.setProperty("--reveal-delay", `${index * 90}ms`);
    });

    if (!("IntersectionObserver" in window)) {
        revealTargets.forEach((elem) => elem.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -40px 0px",
        },
    );

    revealTargets.forEach((elem) => observer.observe(elem));
}

setupScrollReveal();
