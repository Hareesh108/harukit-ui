# Tooltip

A popup that displays information when hovering over an element.

## Usage

```tsx
import { Tooltip } from "@repo/ui/tooltip";

<Tooltip content="More info">
  <button>Hover me</button>
</Tooltip>
```

## Props

| Name     | Type     | Description                  |
|----------|----------|------------------------------|
| content  | string   | Tooltip text                 |
| children | node     | Element to hover             |

## Example

```tsx
<Tooltip content="Tooltip text">
  <span>Hover here</span>
</Tooltip>
