import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertExamples() {
  return (
    <div className="flex flex-col gap-4">
      {/* ✅ Success / Default Alert */}
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <div>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your changes have been saved successfully.
          </AlertDescription>
        </div>
      </Alert>

      {/* ⚠️ Destructive Alert */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <div>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong. Please try again later.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
