import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProTipsCardProps {
  tips?: string[];
}

export function ProTipsCard({
  tips = [
    "Use engaging titles that grab attention",
    "Break up text with headings and paragraphs",
    "Proofread before publishing",
  ],
}: ProTipsCardProps) {
  return (
    <Card className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-0">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Pro Tips for Great Blogs
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
