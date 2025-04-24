"use client";
import { Card, CardContent } from "@backoffice/ui/components/card";
import { cn } from "@backoffice/ui/lib/utils";
import { Building, Download } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from "@backoffice/ui/components/dialog";
import { Button } from "@backoffice/ui/components/button";
import AppIcon from "./app-icon";

interface Application {
  name: string;
  description: string;
  image: string;
}

export default function AppCard({ application }: { application: Application }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="w-full max-w-md p-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:border-primary/20 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
            <AppIcon name={application.name} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xl font-semibold">{application.name}</h3>
            </div>
            <div className="flex items-center text-muted-foreground/50 text-sm">
              <Building className="h-3.5 w-3.5 mr-1" />
              <span>Back Office</span>
            </div>
          </div>
        </div>

        <CardContent className="px-0 pb-0">
          <p className="text-muted-foreground line-clamp-4 text-sm">
            {application.description}
          </p>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogContent className="sm:max-w-md fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]"
          >
            <DialogHeader className="text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                  <AppIcon name={application.name} />
                </div>
                <div>
                  <DialogTitle>{application.name}</DialogTitle>
                  <div className="flex items-center text-muted-foreground/50 text-sm mt-1">
                    <Building className="h-3.5 w-3.5 mr-1" />
                    <span>Back Office</span>
                  </div>
                </div>
              </div>
              <DialogDescription className="text-sm">
                {application.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Install
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </> 
  );
}
