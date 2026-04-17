# ZAWIOS — Data Model

## Signal

```typescript
interface Signal {
  id: string
  title: string
  description: string
  category: SignalCategory   // news|tech|business|crypto|sports|...
  region: SignalRegion       // global|africa|france|europe|usa|rdc|belgique
  status: 'active' | 'resolved'
  yesPercent: number         // 0–100, sum with no+neutral = 100
  noPercent: number
  neutralPercent: number     // tri-state voting
  totalVotes: number
  createdBy: string | null
  trending?: boolean
  hot?: boolean
  resolvedResult?: boolean   // true=YES won, false=NO won
  timeAgo: string
  regionalBreakdown?: RegionalBreakdown
}
```

## RegionalBreakdown

```typescript
interface RegionalBreakdown {
  global: number   // YES% globally
  africa: number
  france: number
  europe: number
  usa: number
}
```

Values represent YES% among committed (non-neutral) voters in that region.

## Vote

Three states:
- `yes` — committed positive position
- `no` — committed negative position
- `neutral` — analytical abstention

Only `yes` and `no` votes affect reputation/precision scores.
`neutral` votes are counted separately for polarization analysis.

## Reputation

```
score += signal.reputationWeight × (1 if correct, 0 if incorrect)
precision = correct_committed / total_committed
decisiveness = committed_votes / total_votes
```

## Analytics Metrics

| Metric | Formula | Range |
|--------|---------|-------|
| Polarization Index | (YES+NO)/100 | 0–1 |
| Regional Divergence | max(regions) - min(regions) | 0–100 |
| Consensus Score | 1 - |YES%-50|/50 | 0–1 |
| Decisiveness Rate | committed/total | 0–1 |
| Precision Rate | correct/committed | 0–1 |
