import { Button } from "@backoffice/ui/components/button";
import { Computer } from "lucide-react";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

export default function PreferencesSettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="border-b pb-6 mb-6">
        <h1 className="text-2xl font-bold">Preferences</h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg font-bold">Color Mode</h2>
        <p className="text-sm text-gray-500 mb-4">
          Choose your preferred color mode.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline">
            <Sun className="w-4 h-4" /> Light
          </Button>
          <Button variant="outline">
            <Moon className="w-4 h-4" /> Dark
          </Button>
          <Button variant="outline">
            <Computer className="w-4 h-4" /> System
          </Button>
        </div>
      </div>
    </div>
  );
}
