import { cn } from "@/lib/utils";
import { Theme } from "@/themes.config";
import React from "react";

interface ModeSkeletonProps {
  mode: Theme;
  selected?: boolean;
  className?: string;
}

const ModeSkeleton: React.FC<ModeSkeletonProps> = ({
  mode,
  selected = false,
  className,
}) => {
  return (
    <div className={cn(mode, className, "w-32 md:w-36 lg:w-48")}>
      <div
        className={cn(
          "scale-100 border-2 items-center rounded-md border-border bg-popover p-1 hover:bg-accent hover:text-accent-foreground",
          selected && "scale-105 border-accent ring-4 shadow-md rounded-lg"
        )}
      >
        <div className="space-y-2 rounded-sm p-2 bg-background">
          <div className="space-y-2 rounded-md p-2 shadow-sm bg-primary">
            <div className="h-2 w-[2em] rounded-lg bg-primary-foreground" />
            <div className="h-2 w-2/3 rounded-lg bg-primary-foreground" />
          </div>
          <div className="flex items-center space-x-2 rounded-md p-2 shadow-sm bg-secondary">
            <div className="h-4 w-4 rounded-full bg-secondary-foreground" />
            <div className="h-2 w-2/3 rounded-lg bg-secondary-foreground" />
          </div>
          <div className="flex items-center space-x-2 rounded-md p-2 shadow-sm bg-accent">
            <div className="h-4 w-4 rounded-full bg-accent-foreground" />
            <div className="h-2 w-2/3 rounded-lg bg-accent-foreground" />
          </div>
        </div>
      </div>
      <span className="block w-full mt-2 p-2 text-center capitalize font-normal">
        {mode}
      </span>
    </div>
  );
};

export default ModeSkeleton;
