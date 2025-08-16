import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function page() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Button variant="outline">Hover me</Button>
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </div>

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
            <TooltipContent side="right">
              Helpful explanation here
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
