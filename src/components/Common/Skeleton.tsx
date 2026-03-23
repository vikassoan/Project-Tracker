const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded ${className}`}
    />
  );
};

export default Skeleton;