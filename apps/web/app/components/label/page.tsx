import * as React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LabelExamples() {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="name">Name</Label>
      <Input id="name" />
    </div>
  );
}
