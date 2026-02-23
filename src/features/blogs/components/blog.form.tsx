"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBlogSchema,
  updateBlogSchema,
  CreateBlogInput,
  UpdateBlogInput,
} from "@/features/blogs/blog.schema";
import { BlogFormProps } from "@/features/blogs/blog.types";
import {
  Loader2,
  Sparkles,
  FileText,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export function BlogForm({
  mode,
  initialData,
  onSubmit,
  isPending,
}: BlogFormProps) {
  const schema = mode === "create" ? createBlogSchema : updateBlogSchema;

  const form = useForm<CreateBlogInput | UpdateBlogInput>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "create"
        ? {
            title: "",
            content: "",
            isPublished: false,
          }
        : {
            title: initialData.title,
            content: initialData.content,
            isPublished: initialData.isPublished,
          },
  });

  const handleSubmit = async (data: CreateBlogInput | UpdateBlogInput) => {
    if (mode === "create") {
      await onSubmit(data as CreateBlogInput);
    } else {
      await onSubmit(data as UpdateBlogInput);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter an engaging title..."
                  className="text-lg border-2 focus:border-blue-500 transition-colors"
                  {...field}
                  value={field.value || ""}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {form.formState.errors.title?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Content
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your amazing story here..."
                  className="min-h-[400px] resize-y text-base leading-relaxed border-2 focus:border-blue-500 transition-colors"
                  {...field}
                  value={field.value || ""}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {form.formState.errors.content?.message}
              </FormMessage>
              <p className="text-sm text-gray-500 mt-2">
                {field.value?.length || 0} characters •{" "}
                {Math.ceil((field.value?.split(" ").length || 0) / 200)} min
                read
              </p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border-2 p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FormLabel className="text-base font-semibold m-0">
                    {mode === "create"
                      ? "Publish Immediately"
                      : "Publication Status"}
                  </FormLabel>
                  {field.value ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {mode === "create"
                    ? "Your blog will be visible to everyone immediately"
                    : field.value
                      ? "Your blog is currently public and visible to everyone"
                      : "Your blog is in draft mode and only visible to you"}
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                  className="data-[state=checked]:bg-blue-600"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg py-6"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {isPending ? (
            mode === "create" ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                Creating your masterpiece...
              </>
            ) : (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating your blog...
              </>
            )
          ) : mode === "create" ? (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Create Blog
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Update Blog
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
