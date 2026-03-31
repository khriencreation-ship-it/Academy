'use client'

interface BarData { day: string; count: number }
interface PieData { name: string; value: number; color: string }

interface Props {
  type: 'bar' | 'pie'
  data: BarData[] | PieData[]
}

function BarChart({ data }: { data: BarData[] }) {
  const max = Math.max(...data.map(d => d.count), 1)
  return (
    <div className="flex items-end gap-2 h-36 w-full">
      {data.map((d, i) => {
        const pct = (d.count / max) * 100
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
            <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
              {d.count}
            </span>
            <div className="w-full relative flex items-end" style={{ height: 96 }}>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#7c3aed] to-purple-400 transition-all duration-700"
                style={{ height: `${Math.max(pct, d.count === 0 ? 2 : 4)}%`, minHeight: d.count === 0 ? 3 : 8 }}
              />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{d.day}</span>
          </div>
        )
      })}
    </div>
  )
}

function PieChart({ data }: { data: PieData[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-28 h-28 rounded-full border-8 border-gray-100 flex items-center justify-center">
          <span className="text-gray-300 text-xs font-semibold">No data</span>
        </div>
      </div>
    )
  }

  // Build SVG pie chart
  const size = 120
  const radius = 52
  const cx = size / 2
  const cy = size / 2
  let cumulative = 0

  const slices = data.map(d => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2
    cumulative += d.value
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + radius * Math.cos(startAngle)
    const y1 = cy + radius * Math.sin(startAngle)
    const x2 = cx + radius * Math.cos(endAngle)
    const y2 = cy + radius * Math.sin(endAngle)
    const large = d.value / total > 0.5 ? 1 : 0
    return {
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`,
      color: d.color,
      name: d.name,
      value: d.value,
    }
  })

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <path key={i} d={s.d} fill={s.color} className="hover:opacity-90 transition-opacity cursor-pointer" />
        ))}
        {/* Center hole */}
        <circle cx={cx} cy={cy} r={28} fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1f2937">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="8" fill="#9ca3af">total</text>
      </svg>
    </div>
  )
}

export default function AdminCharts({ type, data }: Props) {
  if (type === 'bar') return <BarChart data={data as BarData[]} />
  return <PieChart data={data as PieData[]} />
}
