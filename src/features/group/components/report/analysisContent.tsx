import React from 'react'
import { useGroupAnalysisQuery } from '@/api/services/group/queries'
import { Label } from '@/components/ui/label'

interface Props {
  data: ReturnType<typeof useGroupAnalysisQuery>['data']
}

export const ReportContentAnalysis = ({ data }: Props) => {
  if (!data.analysis) {
    return null
  }

  return (
    <div className="px-5">
      <h2 className="text-lg font-medium mb-2">요약</h2>
      <div className="flex flex-col gap-4 p-2">
        <div className="flex flex-row gap-4 items-center">
          <ReportContentAnalysisTitle>분위기</ReportContentAnalysisTitle>
          <div className="flex flex-row gap-2">
            {data.analysis.sentiment.emotion.map((emotion, idx) => (
              <Label className="bg-purple-200 px-2 py-1 rounded-[4px]" key={idx}>
                {emotion}
              </Label>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <ReportContentAnalysisTitle>키워드</ReportContentAnalysisTitle>
          <div className="flex flex-row gap-2">
            {data.analysis.sentiment.topKeywords.map((keyword, idx) => (
              <Label className="bg-amber-200 px-2 py-1 rounded-[4px]" key={idx}>
                {keyword}
              </Label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <ReportContentAnalysisTitle>투표 요약</ReportContentAnalysisTitle>
          <ReportContentAnalysisText>
            {data.analysis.overview.voteSummary}
          </ReportContentAnalysisText>
        </div>
        <div className="flex flex-col gap-1">
          <ReportContentAnalysisTitle>댓글 요약</ReportContentAnalysisTitle>
          <ReportContentAnalysisText>
            {data.analysis.overview.commentSummary}
          </ReportContentAnalysisText>
        </div>
        <div className="flex flex-col gap-1">
          <ReportContentAnalysisTitle>총평</ReportContentAnalysisTitle>
          <ReportContentAnalysisText>
            <ol className="list-disc px-2">
              {data.analysis.modelReview.map((review, idx) => (
                <li className="mb-1" key={idx}>
                  {review}
                </li>
              ))}
            </ol>
          </ReportContentAnalysisText>
        </div>
      </div>
    </div>
  )
}

const ReportContentAnalysisTitle = ({ children }: { children: React.ReactNode }) => {
  return <Label className="text-[1rem]">{children}</Label>
}
const ReportContentAnalysisText = ({ children }: { children: React.ReactNode }) => {
  return <p className="px-2 text-sm">{children}</p>
}
