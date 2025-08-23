import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AlertExamples() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Jane Doe</CardTitle>
        <CardDescription>Frontend Developer @ TechCorp</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Passionate about building accessible and beautiful web experiences.
          Loves React, Tailwind, and everything UI.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Follow</Button>
      </CardFooter>
    </Card>
  );
}
