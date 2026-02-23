"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { CreateCommentInput, createCommentSchema } from "../comment.schema";

interface CommentFormProps {
  blogId: string;
  initialValue?: string;
  onSubmit: (data: CreateCommentInput) => Promise<void>;
  onCancel?: () => void;
  isPending: boolean;
  mode?: "create" | "edit";
}

export function CommentForm({
  initialValue = "",
  onSubmit,
  onCancel,
  isPending,
  mode = "create",
}: CommentFormProps) {
  const form = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: initialValue,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a comment..."
                  className="resize-none min-h-[80px]"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            {mode === "create" ? "Post Comment" : "Update Comment"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
