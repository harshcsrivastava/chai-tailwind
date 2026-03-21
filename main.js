// ******************** Spacing (padding, margin)  ************************

// Padding
const paddingMap = {
    p: ["padding"],
    px: ["padding-left", "padding-right"],
    py: ["padding-top", "padding-bottom"],
    pt: ["padding-top"],
    pb: ["padding-bottom"],
    pl: ["padding-left"],
    pr: ["padding-right"],
};

// Margin
const marginMap = {
    m: ["margin"],
    mx: ["margin-left", "margin-right"],
    my: ["margin-top", "margin-bottom"],
    mt: ["margin-top"],
    mb: ["margin-bottom"],
    ml: ["margin-left"],
    mr: ["margin-right"],
};

// ======================= Padding Classes =======================

function padding(property, elem) {
    const { prop, val } = property;

    const properties = paddingMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}

// ======================= Margin Classes =======================

function margin(property, elem) {
    const { prop, val } = property;

    const properties = marginMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}


// ******************** Size (width, height)  ************************

// Width
const widthMap = {
    w: ["width"],
    "min-w": ["min-width"],
    "max-w": ["max-width"],
};

// Height
const heightMap = {
    h: ["height"],
    "min-h": ["min-height"],
    "max-h": ["max-height"],
};

// ======================= Width Classes =======================

function width(property, elem) {
    const { prop, val } = property;

    const properties = widthMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}

// ======================= Height Classes =======================
function height(property, elem) {
    const { prop, val } = property;

    const properties = heightMap[prop];

    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}



// ******************** Colors (background, text)  ************************
// Background
const backgroundColorMap = {
    bg: ["background-color"],
    color: ["color"]
};


// Text-Emphasis
const textEmphasisMap = {
    bold: ["font-weight", "bold"],
    italic: ["font-style", "italic"],
    underline: ["text-decoration", "underline"],
};


// ======================= Backgroud Color Classes =======================
function backgroundColor(property, elem) {
    const { prop, val } = property;

    const properties = backgroundColorMap[prop];
    console.log(property);
    
    if (!properties) return;

    properties.forEach((p) => {
        elem.style.setProperty(p, val);
    });
}

// ======================= Bold Classes =======================
function bold(property, elem) {
    const { prop, val } = property;

    const to = textEmphasisMap[val];
    elem.style.setProperty(to[0], to[1]);
}

// ======================= Italic Classes =======================
function italic(property, elem) {
    const { prop, val } = property;
    const to = textEmphasisMap[val];

    elem.style.setProperty(to[0], to[1]);
}

// ======================= Underline Classes =======================
function underline(property, elem) {
    const { prop, val } = property;
    
    const to = textEmphasisMap[val];

    elem.style.setProperty(to[0], to[1]);
}




// ******************** Layout Utility (flexbox)  ************************

// Flexbox Justify Content
const justifyMap = {
    "justify-start": ["justify-content", "flex-start"],
    "justify-end": ["justify-content", "flex-end"],
    "justify-center": ["justify-content", "center"],
    "justify-between": ["justify-content", "space-between"],
    "justify-around": ["justify-content", "space-around"],
    "justify-evenly": ["justify-content", "space-evenly"],
};

// Flexbox items Content

const alignItemsMap = {
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

// ======================= Flex Classes =======================
function flexbox(property, elem) {
    const { prop, val } = property;
    elem.style.setProperty("display", val);
}

// ======================= Justify Content Classes =======================
function justify(property, elem) {
    const { prop, val } = property;
    const to = justifyMap[prop + "-" + val];

    elem.style.setProperty(to[0], to[1]);
}

// ======================= Align Items Classes =======================
function alignItems(property, elem) {
    const { prop, val } = property;
    const to = alignItemsMap[prop + "-" + val];

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


const chaiElem = document.querySelectorAll('[class*="chai-"]');

chaiElem.forEach((elem) => {
    const classes = elem.className.split(" ");

    classes.forEach((cls) => {
        if (cls.startsWith("chai-")) {
            //received element like chai-black
            // triming to extract property
            const property = identifyCSSPropertyAndValue(cls);

            passToHandler(property, elem);
        }
    });
});

function identifyCSSPropertyAndValue(value) {
    // if value = chai-black, using splice
    const trimmed = value.slice(5);
    // finding last index so that i can extract the value from last
    const lastHyphen = trimmed.lastIndexOf("-");

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

    if (paddingMap[prop]) {
        padding(property, elem);
    } else if (marginMap[prop]) {
        margin(property, elem);
    } else if (widthMap[prop]) {
        width(property, elem);
    } else if (heightMap[prop]) {
        height(property, elem);
    } else if (["bg", "color"].includes(prop) ) {
        backgroundColor(property, elem);
    } else if (val.startsWith("flex")) {
        flexbox(property, elem);
    } else if (prop.startsWith("justify")) {
        justify(property, elem);
    } else if (prop.startsWith("items")) {
        alignItems(property, elem);
    } else if (gapMap[prop]) {
        gap(property, elem);
    } else if (val.startsWith("bold")) {
        bold(property, elem);
    } else if (val.startsWith("italic")) {
        italic(property, elem);
    } else if (val.startsWith("underline")) {
        underline(property, elem);
    } else {
        console.log("Unused ", property);
    }
}



// ******************** Animation Script written by AI  ************************


function setupScrollReveal() {
    const revealTargets = document.querySelectorAll(".page-header, .demo-section");

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
        }
    );

    revealTargets.forEach((elem) => observer.observe(elem));
}

setupScrollReveal();
