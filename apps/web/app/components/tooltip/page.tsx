import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function AlertExamples() {
  return (
    <TooltipProvider>
      <div className="flex gap-6">
        <Tooltip>
          <TooltipTrigger>
            <Button className="px-4 py-2 rounded bg-blue-600 text-white">
              Hover me
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">This is a tooltip!</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <span className="underline cursor-help">What’s this?</span>
          </TooltipTrigger>
          <TooltipContent side="right">Helpful explanation here</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
