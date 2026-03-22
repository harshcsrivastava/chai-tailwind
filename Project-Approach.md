# Project Approach

I used the briefing in the Masterji project description and started with two basic questions:

## What do I have to build?
I read the problem statement twice to clearly understand the requirement.

Objective: build a lightweight utility-first CSS engine inspired by Tailwind. It should parse classes that start with `chai-` and apply the corresponding styles as inline CSS on that element.

The script should scan the entire document and apply all supported utilities.

## How did I approach the project?
1. Selected all elements that contain classes starting with `chai-` using `.querySelectorAll()`.
2. Used `[class*='chai-']` as an attribute selector and stored matching elements in `chaiElem`.
3. While looping through each class (e.g., `chai-p-2`), passed it to `identifyCSSPropertyAndValue()`.
4. `identifyCSSPropertyAndValue()` returns `{ prop, val }`. Initially, parsing logic was repeated across multiple functions, so I refactored it into a single modular function.
5. Passed the parsed result to `passToHandler(property, elem)`, which routes it to the correct utility handler.
6. Inside each handler, destructured the input as `{ prop, val }`.
7. Mapped `prop` to actual CSS properties using structured maps like `textStylingMap` and `widthAndHeightMap`.
8. Added validation checks to ensure only supported properties are applied.
9. Applied styles to each matched element as inline CSS.
10. Once this core flow was stable, adding more utility classes became straightforward.

### Challenges I faced
- Initially, I wasn’t sure how to efficiently target class attributes, so I started with `.querySelectorAll("*")`.
- The parsing logic was initially based only on splitting by hyphen, and each utility had its own parser. This became difficult to maintain as the project grew.
- Early versions had separate handlers for height, width, margin, and padding. As the number of utilities increased, I grouped related utilities into shared maps and handlers to keep the code cleaner and more scalable.
- Refactor: Added DOMContentLoaded event listener to ensure CSS loads only after the DOM is fully parsed(whether script is in HEAD or BODY)

## What I Learned

- **DOM Manipulation** – Selecting and working with elements using selectors like `[class*='chai-']`
- **Class Parsing** – Converting utility classes into CSS properties and values
- **Dynamic Styling** – Applying targeted inline styles using JavaScript
- **Code Structuring** – Using maps and handler functions for scalability

Most of the logic felt like standard JavaScript as I felt it instinctly due github-classrooms assignment
, but this project helped me apply it in a more practical way.

## 🎥 Demo Video

[![Watch the video](https://img.youtube.com/vi/Y7qlJ3jeDPE/maxresdefault.jpg)](https://youtu.be/Y7qlJ3jeDPE)

👉 Click the image above to watch the demo