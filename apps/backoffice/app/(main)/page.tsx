import { Separator } from "@backoffice/ui/components/separator";

export default function Page() {
  return (
    <div className="container mx-auto p-12">
      <h1 className="text-3xl font-bold mb-4">Back Office</h1>
      <p className="text-muted-foreground lg:w-1/2">
        Back Office is a suite of open-source business tools designed to help
        you run your company with ease. It’s fully customizable to fit your
        unique business needs and is suitable for businesses of all sizes — from
        startups to growing enterprises. Best of all, it's completely free.
      </p>
      <Separator className="my-12" />
      {/* Widgets Dashboard */}
    </div>
  );
}
