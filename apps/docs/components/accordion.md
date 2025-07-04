# Accordion

A collapsible content container for showing and hiding sections of related content.

## Usage

```tsx
import { Accordion } from "@repo/ui/accordion";

<Accordion>
  <Accordion.Item title="Section 1">Content 1</Accordion.Item>
  <Accordion.Item title="Section 2">Content 2</Accordion.Item>
</Accordion>
```

## Props

| Name   | Type     | Description                  |
|--------|----------|------------------------------|
| items  | array    | List of accordion items      |
| onOpen | function | Callback when opened         |

## Example

```tsx
<Accordion>
  <Accordion.Item title="FAQ 1">Answer 1</Accordion.Item>
  <Accordion.Item title="FAQ 2">Answer 2</Accordion.Item>
</Accordion>
