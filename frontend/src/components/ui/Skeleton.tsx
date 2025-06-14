export default function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-gray/20 dark:bg-gray/30 ${className}`} />
}
