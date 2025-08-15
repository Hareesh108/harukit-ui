import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function page() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Button variant="outline">Hover me</Button>
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </div>
    </div>
  );
}
