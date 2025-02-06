import { Separator } from "@/components/ui/separator"

export default function BoxStatsHeader () {
  return (
    <>
      <div className="border-b-2 border-black">
            <span className="text-l font-semibold">Regular Season Average</span>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 font-semibold text-sm">Season</div>
            <div className="flex-1 font-semibold text-sm">FG</div>
            <div className="flex-1 font-semibold text-sm">FG%</div>
            <div className="flex-1 font-semibold text-sm">3PT</div>
            <div className="flex-1 font-semibold text-sm">3P%</div>
            <div className="flex-1 font-semibold text-sm">FT</div>
            <div className="flex-1 font-semibold text-sm">FT%</div>
            <div className="flex-1 font-semibold text-sm">OR</div>
            <div className="flex-1 font-semibold text-sm">DR</div>
            <div className="flex-1 font-semibold text-sm">REB</div>
            <div className="flex-1 font-semibold text-sm">AST</div>
            <div className="flex-1 font-semibold text-sm">BLK</div>
            <div className="flex-1 font-semibold text-sm">STL</div>
            <div className="flex-1 font-semibold text-sm">PF</div>
            <div className="flex-1 font-semibold text-sm">TO</div>
            <div className="flex-1 font-semibold text-sm">PTS</div>
          </div>
          <Separator/>
    </>
  )
}