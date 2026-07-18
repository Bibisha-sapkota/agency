import React, { useMemo, useState } from 'react'

const SCORE_TARGETS = {
  liveHours: 5000,
  charisma: 5000,
  contribution: 3000
}

function clampScore(value) {
  return Math.min(Math.max(Math.round(value), 0), 100)
}

function getScoreColor(score) {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-red-600'
}

function getScoreBarColor(score) {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-red-500'
}

function ScoreCard({ label, score, description }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
        <span className="font-extrabold text-slate-800 text-sm">{label}</span>
      </div>
      <div className="p-5">
        <div className={`text-3xl font-extrabold ${getScoreColor(score)}`}>
          {score}
          <span className="text-base text-slate-600 font-bold">/100</span>
        </div>
        <p className="text-xs text-slate-700 mt-2">{description}</p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getScoreBarColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function AgencyPerformance() {
  const [monthlyLiveHours, setMonthlyLiveHours] = useState(4680)
  const [monthlyCharisma, setMonthlyCharisma] = useState(2450)
  const [monthlyContribution, setMonthlyContribution] = useState(2760)
  const [attendanceRate, setAttendanceRate] = useState(92)
  const [targetCompletion, setTargetCompletion] = useState(78)
  const [pkWins, setPkWins] = useState(18)
  const [pkTotal, setPkTotal] = useState(25)
  const [engagementLikes, setEngagementLikes] = useState(1250)
  const [engagementComments, setEngagementComments] = useState(340)
  const [engagementShares, setEngagementShares] = useState(85)
  const [engagementFollowers, setEngagementFollowers] = useState(156)

  const scores = useMemo(() => {
    const liveHourScore = clampScore((monthlyLiveHours / SCORE_TARGETS.liveHours) * 100)
    const charismaScore = clampScore((monthlyCharisma / SCORE_TARGETS.charisma) * 100)
    const contributionScore = clampScore((monthlyContribution / SCORE_TARGETS.contribution) * 100)
    const attendanceScore = clampScore(attendanceRate)
    const targetAchievementScore = clampScore(targetCompletion)

    const pkWinRate = pkTotal > 0 ? pkWins / pkTotal : 0
    const pkPerformanceScore = clampScore(pkWinRate * 100)

    const engagementTotal = engagementLikes + engagementComments * 2 + engagementShares * 3 + engagementFollowers * 5
    const engagementTarget = 3000
    const engagementScore = clampScore((engagementTotal / engagementTarget) * 100)

    const overallScore = clampScore(
      (liveHourScore +
        charismaScore +
        contributionScore +
        attendanceScore +
        targetAchievementScore +
        pkPerformanceScore +
        engagementScore) / 7
    )

    return {
      liveHourScore,
      charismaScore,
      contributionScore,
      attendanceScore,
      targetAchievementScore,
      pkPerformanceScore,
      engagementScore,
      overallScore,
      pkWinRate: Math.round(pkWinRate * 100)
    }
  }, [
    monthlyLiveHours,
    monthlyCharisma,
    monthlyContribution,
    attendanceRate,
    targetCompletion,
    pkWins,
    pkTotal,
    engagementLikes,
    engagementComments,
    engagementShares,
    engagementFollowers
  ])

  const scoreBreakdown = [
    {
      key: 'liveHour',
      label: 'Live Hour Score',
      score: scores.liveHourScore,
      description: `${monthlyLiveHours.toLocaleString()} of ${SCORE_TARGETS.liveHours.toLocaleString()} target live hours`
    },
    {
      key: 'charisma',
      label: 'Charisma Score',
      score: scores.charismaScore,
      description: `${monthlyCharisma.toLocaleString()} of ${SCORE_TARGETS.charisma.toLocaleString()} target charisma`
    },
    {
      key: 'contribution',
      label: 'Contribution Score',
      score: scores.contributionScore,
      description: `${monthlyContribution.toLocaleString()} of ${SCORE_TARGETS.contribution.toLocaleString()} target contribution`
    },
    {
      key: 'attendance',
      label: 'Attendance Score',
      score: scores.attendanceScore,
      description: `${attendanceRate}% host attendance rate`
    },
    {
      key: 'target',
      label: 'Target Achievement Score',
      score: scores.targetAchievementScore,
      description: `${targetCompletion}% monthly target completion`
    },
    {
      key: 'pk',
      label: 'PK Performance Score',
      score: scores.pkPerformanceScore,
      description: `${pkWins} wins of ${pkTotal} PK battles (${scores.pkWinRate}% win rate)`
    },
    {
      key: 'engagement',
      label: 'Engagement Score',
      score: scores.engagementScore,
      description: `${engagementLikes} likes, ${engagementComments} comments, ${engagementShares} shares, ${engagementFollowers} followers`
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm ring-2 ring-[#E51E25]/20">
          <span className="text-xs font-bold text-slate-800 uppercase">Overall Score</span>
          <div className={`text-4xl font-extrabold mt-2 ${getScoreColor(scores.overallScore)}`}>
            {scores.overallScore}
          </div>
          <p className="text-xs text-slate-700 mt-1">Average of all 7 scores</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <span className="text-xs font-bold text-slate-800 uppercase">Highest Score</span>
          <div className="text-lg font-extrabold text-green-600 mt-2">
            {Math.max(...scoreBreakdown.map((s) => s.score))}/100
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <span className="text-xs font-bold text-slate-800 uppercase">Lowest Score</span>
          <div className="text-lg font-extrabold text-amber-600 mt-2">
            {Math.min(...scoreBreakdown.map((s) => s.score))}/100
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <span className="text-xs font-bold text-slate-800 uppercase">Scores Above 80</span>
          <div className="text-3xl font-extrabold text-slate-800 mt-2">
            {scoreBreakdown.filter((s) => s.score >= 80).length}/7
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h4 className="font-extrabold text-slate-800 text-sm mb-4">Simulate Inputs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>Monthly Live Hours</span>
              <span className="text-[#E51E25]">{monthlyLiveHours.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="6000"
              step="60"
              value={monthlyLiveHours}
              onChange={(e) => setMonthlyLiveHours(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>Monthly Charisma</span>
              <span className="text-[#E51E25]">{monthlyCharisma.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="5500"
              step="50"
              value={monthlyCharisma}
              onChange={(e) => setMonthlyCharisma(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>Monthly Contribution</span>
              <span className="text-[#E51E25]">{monthlyContribution.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="3500"
              step="10"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>Attendance Rate</span>
              <span className="text-[#E51E25]">{attendanceRate}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={attendanceRate}
              onChange={(e) => setAttendanceRate(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>Target Completion</span>
              <span className="text-[#E51E25]">{targetCompletion}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="120"
              step="1"
              value={targetCompletion}
              onChange={(e) => setTargetCompletion(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>PK Wins</span>
              <span className="text-[#E51E25]">{pkWins} / {pkTotal}</span>
            </label>
            <input
              type="range"
              min="0"
              max={pkTotal}
              step="1"
              value={pkWins}
              onChange={(e) => setPkWins(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={pkTotal}
              onChange={(e) => {
                const total = Number(e.target.value)
                setPkTotal(total)
                setPkWins((prev) => Math.min(prev, total))
              }}
              className="w-full accent-slate-400 mt-2"
            />
            <p className="text-[10px] text-slate-600 mt-1">Second slider: total PK battles</p>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>Likes</span>
              <span className="text-[#E51E25]">{engagementLikes.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="3000"
              step="10"
              value={engagementLikes}
              onChange={(e) => setEngagementLikes(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>Comments</span>
              <span className="text-[#E51E25]">{engagementComments}</span>
            </label>
            <input
              type="range"
              min="0"
              max="800"
              step="5"
              value={engagementComments}
              onChange={(e) => setEngagementComments(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase flex justify-between mb-2">
              <span>Shares & Followers</span>
              <span className="text-[#E51E25]">{engagementShares} / {engagementFollowers}</span>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="1"
              value={engagementShares}
              onChange={(e) => setEngagementShares(Number(e.target.value))}
              className="w-full accent-[#E51E25]"
            />
            <input
              type="range"
              min="0"
              max="300"
              step="1"
              value={engagementFollowers}
              onChange={(e) => setEngagementFollowers(Number(e.target.value))}
              className="w-full accent-slate-400 mt-2"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {scoreBreakdown.map((item) => (
          <ScoreCard
            key={item.key}
            label={item.label}
            score={item.score}
            description={item.description}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h4 className="font-extrabold text-slate-800 text-sm">Score Summary</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Score Type</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scoreBreakdown.map((item) => (
                <tr key={item.key} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 font-bold text-slate-800">{item.label}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getScoreBarColor(item.score)}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className={`font-extrabold ${getScoreColor(item.score)}`}>{item.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.score >= 80
                        ? 'bg-green-100 text-green-700'
                        : item.score >= 60
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    }`}>
                      {item.score >= 80 ? 'Excellent' : item.score >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-700 text-xs">{item.description}</td>
                </tr>
              ))}
              <tr className="bg-red-50/30">
                <td className="px-4 py-4 font-extrabold text-[#E51E25]">Overall Performance</td>
                <td className="px-4 py-4">
                  <span className={`text-xl font-extrabold ${getScoreColor(scores.overallScore)}`}>
                    {scores.overallScore}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    scores.overallScore >= 80
                      ? 'bg-green-100 text-green-700'
                      : scores.overallScore >= 60
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  }`}>
                    {scores.overallScore >= 80 ? 'Excellent' : scores.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-700 text-xs">Auto-calculated average of all performance scores</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
