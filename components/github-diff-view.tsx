"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  FileEdit,
  PlusCircle,
  MinusCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiffViewProps {
  type: "update" | "add" | "remove";
  sectionName: string;
  currentContent?: string;
  recommendedContent?: string;
  explanation: string;
}

export function GitHubDiffView({
  type,
  sectionName,
  currentContent,
  recommendedContent,
  explanation,
}: DiffViewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const getIcon = () => {
    switch (type) {
      case "update":
        return <FileEdit className="h-4 w-4 text-blue-500" />;
      case "add":
        return <PlusCircle className="h-4 w-4 text-green-500" />;
      case "remove":
        return <MinusCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "update":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Update
          </Badge>
        );
      case "add":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Add
          </Badge>
        );
      case "remove":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Remove
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleCopy = async () => {
    // Only copy the recommended content for updates and additions
    if (type === "update" || type === "add") {
      if (recommendedContent) {
        await navigator.clipboard.writeText(recommendedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  // Only show copy button for updates and additions
  const showCopyButton = type === "update" || type === "add";

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 cursor-pointer gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <span className="font-medium">{sectionName}</span>
          </div>
          <div className="ml-2">{getTypeLabel()}</div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {showCopyButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className="h-8 px-2 flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
          )}
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="flex-1 flex flex-col">
          {/* Explanation */}
          <div className="p-3 text-sm text-gray-700 border-t border-gray-100">
            {explanation}
          </div>

          {/* Diff view */}
          {type === "update" && currentContent && recommendedContent && (
            <div className="text-sm font-mono flex-1 flex flex-col">
              {/* Current content - red */}
              <div className="bg-red-50 p-3 border-t border-red-100 flex-1 overflow-auto">
                <div className="flex">
                  <div className="text-red-700 w-8 flex-shrink-0 select-none">
                    -
                  </div>
                  <div className="text-red-900 whitespace-pre-wrap">
                    {currentContent}
                  </div>
                </div>
              </div>

              {/* Recommended content - green */}
              <div className="bg-green-50 p-3 border-t border-green-100 flex-1 overflow-auto">
                <div className="flex">
                  <div className="text-green-700 w-8 flex-shrink-0 select-none">
                    +
                  </div>
                  <div className="text-green-900 whitespace-pre-wrap">
                    {recommendedContent}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add view - only show recommended content */}
          {type === "add" && recommendedContent && (
            <div className="text-sm font-mono flex-1">
              <div className="bg-green-50 p-3 border-t border-green-100 h-full overflow-auto">
                <div className="flex">
                  <div className="text-green-700 w-8 flex-shrink-0 select-none">
                    +
                  </div>
                  <div className="text-green-900 whitespace-pre-wrap">
                    {recommendedContent}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remove view - only show current content */}
          {type === "remove" && currentContent && (
            <div className="text-sm font-mono flex-1">
              <div className="bg-red-50 p-3 border-t border-red-100 h-full overflow-auto">
                <div className="flex">
                  <div className="text-red-700 w-8 flex-shrink-0 select-none">
                    -
                  </div>
                  <div className="text-red-900 whitespace-pre-wrap">
                    {currentContent}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
