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
You are expected to support multiple commonly used utilities such as:

- Spacing (padding, margin)  
- Colors (background, text)  
- Typography (font size, alignment)  
- Borders and radius  
- Basic layout utilities  

