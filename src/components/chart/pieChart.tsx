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
  const filteredData = data.filter((d) => d.value > 0)
  const total = filteredData.reduce((sum, d) => sum + d.value, 0)
  const center = size / 2

  if (total === 0) return null

  const getCoordinates = (angle: number, customRadius = radius) => {
    const radian = (angle - 90) * (Math.PI / 180)
    return {
      x: center + customRadius * Math.cos(radian),
      y: center + customRadius * Math.sin(radian),
    }
  }

  let cumulativeAngle = 0

  const segments = filteredData.map((segment) => {
    const valuePercent = segment.value / total
    const startAngle = cumulativeAngle
    const endAngle = cumulativeAngle + valuePercent * 360
    const midAngle = (startAngle + endAngle) / 2
    cumulativeAngle = endAngle

    const isFullCircle = valuePercent === 1

    const label = getCoordinates(midAngle, radius * 0.6)

    if (isFullCircle) {
      return (
        <g key={segment.name}>
          <circle cx={center} cy={center} r={radius} fill={segment.color} />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#000"
          >
            {segment.name}
            <tspan x={center} dy="1.2em">
              100%
            </tspan>
          </text>
        </g>
      )
    }

    const start = getCoordinates(startAngle)
    const end = getCoordinates(endAngle)
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

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
