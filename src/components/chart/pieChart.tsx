interface PieSegment {
  name: string
  value: number
  color: string
}

interface SvgPieChartProps {
  data: PieSegment[]
  size?: number
  radius?: number
}

export const PieChart = ({ data, size = 200, radius = 90 }: SvgPieChartProps) => {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const center = size / 2
  let cumulativeAngle = 0

  const getCoordinates = (angle: number, customRadius = radius) => {
    const radian = (angle - 90) * (Math.PI / 180)
    const x = center + customRadius * Math.cos(radian)
    const y = center + customRadius * Math.sin(radian)
    return { x, y }
  }

  const segments = data.map((segment) => {
    const valuePercent = segment.value / total
    const startAngle = cumulativeAngle
    const endAngle = cumulativeAngle + valuePercent * 360
    const midAngle = (startAngle + endAngle) / 2
    cumulativeAngle = endAngle

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
    const start = getCoordinates(startAngle)
    const end = getCoordinates(endAngle)
    const label = getCoordinates(midAngle, radius * 0.6)

    const d = [
      `M ${center} ${center}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z',
    ].join(' ')

    return (
      <g key={segment.name}>
        <path d={d} fill={segment.color} stroke="white" strokeWidth="0" />
        <text
          x={label.x}
          y={label.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#000"
        >
          {segment.name}
          <tspan x={label.x} dy="1.2em">
            {Math.round(valuePercent * 100)}%
          </tspan>
        </text>
      </g>
    )
  })

  return (
    <svg width={size} height={size}>
      {segments}
    </svg>
  )
}
