import { Card, CardContent } from "@/components/ui/card";

interface InfoCardProps {
  message?: string;
  icon?: React.ReactNode;
}

export function InfoCard({
  message = "Changes will be visible immediately. Make sure to review your content before saving.",
  icon,
}: InfoCardProps) {
  return (
    <Card className="mt-6 bg-blue-50/50 dark:bg-blue-950/20 border-0">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          {icon || (
            <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
          )}
          <p className="text-sm text-blue-700 dark:text-blue-300">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
