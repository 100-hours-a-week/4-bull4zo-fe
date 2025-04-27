// src/components/Button.tsx

interface ButtonProps {
  label: string
  onClick?: () => void
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600" onClick={onClick}>
      {label}
    </button>
  )
}
