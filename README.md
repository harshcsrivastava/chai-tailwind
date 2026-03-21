# Lightweight Utility-First CSS Engine[Tailwind Inspired]
This Project is a lightweight utility first css engine which uses javascript to parse the html document and apply the relative css styling to correspondeng element. The project has basic css styles which is commonly used in day to day styling like: margin, padding, width, height, flexbox, background-color, etc.

## How this works? 

Instead of writing traditional CSS, users will write class names following a pattern like `chai-*` (for example: `chai-p-2`, `chai-bg-red`, `chai-bg-[#111]`). The script will scan the DOM, read these class names, convert them into corresponding inline styles, and apply them dynamically.

### Example
- `chai-p-2` → `padding: 2px`  
- `chai-bg-red` → `background-color: red`  

---

## Requirements
Flow of the script: 

- Traverse the DOM after page load  
- Identify all classes starting with `chai-`  
- Parse the class names and extract styling values  
- Apply inline styles using JavaScript  
- Remove or ignore the original `chai-*` classes  

---

## Supported Utilities
Currently supported chai utilities are:

- Spacing
	- `chai-p-*`, `chai-px-*`, `chai-py-*`, `chai-pt-*`, `chai-pr-*`, `chai-pb-*`, `chai-pl-*`
	- `chai-m-*`, `chai-mx-*`, `chai-my-*`, `chai-mt-*`, `chai-mr-*`, `chai-mb-*`, `chai-ml-*`
- Sizing
	- `chai-w-*`, `chai-min-w-*`, `chai-max-w-*`
	- `chai-h-*`, `chai-min-h-*`, `chai-max-h-*`
- Color and text-related utilities
	- `chai-bg-*` (background-color)
	- `chai-color-*` (text color)
	- `chai-spacing-*` (letter-spacing)
	- `chai-indent-*` (text-indent)
	- `chai-line-height-*`
	- Emphasis and text transform/alignment via value token:
		`chai-text-bold`, `chai-text-italic`, `chai-text-underline`,
		`chai-text-uppercase`, `chai-text-lowercase`, `chai-text-capitalize`,
		`chai-text-none`, `chai-text-fullWidth`, `chai-text-left`,
		`chai-text-right`, `chai-text-center`, `chai-text-justify`,
		`chai-text-start`, `chai-text-end`
- Border and radius
	- `chai-border-*`, `chai-border-t-*`, `chai-border-r-*`, `chai-border-b-*`, `chai-border-l-*`
	- `chai-rounded-*`, `chai-rounded-t-*`, `chai-rounded-r-*`, `chai-rounded-b-*`, `chai-rounded-l-*`
	- `chai-rounded-tl-*`, `chai-rounded-tr-*`, `chai-rounded-br-*`, `chai-rounded-bl-*`
- Layout
	- Display: `chai-block`, `chai-inline`, `chai-flex`
	- Also supported: `chai-display-block`, `chai-display-inline`, `chai-display-flex`
	- Flex alignment: `chai-justify-start|end|center|between|around|evenly`
	- Flex items: `chai-items-start|end|center|baseline|stretch`
	- Gap: `chai-gap-*`, `chai-gap-x-*`, `chai-gap-y-*`

