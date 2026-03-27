import React from "react";
import { Skeleton as SkeletonBase } from "@/components/ui/skeleton";
export default function HandleSkeleton({
  loading,
  children,
}: {
  loading: boolean;
  children: any;
}) {
  return loading ? (
    <div className="max-w-[100px]">
      {" "}
      <SkeletonBase />
    </div>
  ) : (
    children
  );
}
