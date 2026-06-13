const STATUS_STYLES = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  preparing: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'out-for-delivery': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/30',
  completed: 'bg-green-500/10 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const label = status.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${style} whitespace-nowrap`}>
      {label}
    </span>
  );
}
