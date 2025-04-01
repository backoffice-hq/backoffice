import { Separator } from "@backoffice/ui/components/separator";
import AppCard from "./components/app-card";

const applications = [
  {
    name: "Invoice",
    description:
      "Streamline your billing process with automated invoice generation, payment tracking, and financial reporting. Features include recurring invoices, multiple payment methods, and real-time payment status updates.",
    image: "/images/apps/invoice.svg",
  },
  {
    name: "CRM",
    description:
      "Build stronger customer relationships with a comprehensive CRM system. Track customer interactions, manage sales pipelines, and analyze customer data to drive business growth.",
    image: "/images/apps/crm.svg",
  },
  {
    name: "HR",
    description:
      "Simplify human resources management with tools for employee onboarding, time tracking, leave management, and performance reviews. Keep your team organized and compliant.",
    image: "/images/apps/hr.svg",
  },
];

export default function Page() {
  return (
    <>
      <div className="container mx-auto p-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Applications</h1>
          <p className="text-muted-foreground">
            Essential business tools to help you launch, streamline, and grow
            your business operations — all in one open-source platform.
          </p>
          <Separator className="my-12" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {applications.map((application) => (
            <AppCard key={application.name} application={application} />
          ))}
        </div>
      </div>
    </>
  );
}
