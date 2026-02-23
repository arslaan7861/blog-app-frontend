"use client";

import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: "all" | "published" | "draft";
  onFilterChange: (value: "all" | "published" | "draft") => void;
}

export function BlogsFilters({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}: BlogsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search blogs by title or content..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-white dark:bg-gray-800 border-2 focus:border-blue-500 pl-10"
        />
      </div>
      <Select
        value={filter}
        onValueChange={(value: "all" | "published" | "draft") =>
          onFilterChange(value)
        }
      >
        <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-gray-800 border-2">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Blogs</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="draft">Drafts</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
