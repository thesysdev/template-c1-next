export const SkeletonCircle = ({ className }: { className?: string }) => (
  <div
    className={`h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer ${className}`}
  />
);

export const SkeletonPill = ({ className }: { className?: string }) => (
  <div className={`h-8 w-full bg-gray-200 rounded-md ${className}`} />
);
