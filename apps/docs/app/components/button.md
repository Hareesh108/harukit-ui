# Button

A basic button component for user interactions.

## Usage

```tsx
import { Button } from "@repo/ui/button";

<Button>Click me</Button>
```

## Props

| Name     | Type     | Description                  |
|----------|----------|------------------------------|
| children | node     | Button label                 |
| onClick  | function | Click event handler          |
| disabled | boolean  | Disable the button           |

## Example

```tsx
<Button onClick={() => alert('Clicked!')}>Click me</Button>
```
