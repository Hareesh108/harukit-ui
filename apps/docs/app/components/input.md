# Input

A basic input field for user text entry.

## Usage

```tsx
import { Input } from "@repo/ui/input";

<Input placeholder="Type here..." />
```

## Props

| Name        | Type     | Description                  |
|-------------|----------|------------------------------|
| value       | string   | Input value                  |
| onChange    | function | Change event handler         |
| placeholder | string   | Placeholder text             |

## Example

```tsx
<Input value={value} onChange={e => setValue(e.target.value)} />
```
