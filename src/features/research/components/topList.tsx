import { Label } from '@/components/ui/label'

export const TopList = () => {
  return (
    <section className="px-4 py-2">
      <div className="flex items-center justify-between">
        <Label className="text-2xl font-unbounded">Top3</Label>
        <Label className=" text-xs opacity-50">03/13 09:00 ~ 03/14 09:00</Label>
      </div>
    </section>
  )
}
