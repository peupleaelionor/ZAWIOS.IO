# ZAWIOS — Transparency

## Purpose

This document explains how ZAWIOS makes decisions that affect content, scoring, and user experience. It is intended for users, researchers, and institutional partners who want to understand the system without reverse-engineering it.

---

## Feed Ordering

Signals are ordered by one of four modes (user-selectable):

| Mode | Logic |
|------|-------|
| Tendances | `signalMomentum(votesNow, votesBefore, hoursElapsed)` — recent velocity |
| Récents | `createdAt` descending |
| Populaires | `totalVotes` descending |
| Suivis | User's followed categories and regions, then momentum |

No hidden personalization. No engagement-maximizing black box. The sort key is always visible to the user.

### Signal Curator Agent

The `lib/agents/signal-curator.ts` module scores signals for feed placement. Inputs:

- `dominantCategory` — user's most-voted category (localStorage, no account required)
- `regionAffinity` — user's most-active region
- `signalMomentum` — computed from `lib/signal-analytics.ts`
- `regionalDivergence` — signals with high divergence are surfaced more

The output is a sorted array. No ML model. No user profiling sent to a server.

---

## Reputation Scoring

```
score += reputationWeight × (1 if correct, 0 if incorrect)
precision = correct_committed / total_committed
decisiveness = committed_votes / total_votes
```

`reputationWeight` is a function of `totalVotes` on the signal (larger signals carry more weight):

| Total votes | Weight |
|-------------|--------|
| < 1,000     | 0.5    |
| 1,000–4,999 | 0.75   |
| 5,000–19,999| 1.0    |
| 20,000–49,999| 1.5   |
| ≥ 50,000    | 2.0    |

NEUTRAL votes are never counted as correct or incorrect. They do not improve or damage reputation.

---

## Polarization Guard

The `lib/agents/polarization-guard.ts` module monitors signal health:

- If `polarizationIndex > 0.75` (i.e., YES+NO > 75% of all votes), the signal is flagged "haute polarisation"
- The divergence score (`max(regions) - min(regions)`) is shown prominently when > 30 points
- No signals are removed automatically by this agent — it only surfaces indicators

---

## Analytics Indices

All indices are documented in `docs/data-model.md`. Summary:

| Index | Formula | Visible to |
|-------|---------|------------|
| Polarization | (YES+NO)/100 | All users |
| Consensus | 1 - \|YES%-50\|/50 | All users |
| Decisiveness | committed/total | All users |
| Regional Divergence (score) | max-min across regions | All users |
| Regional Divergence (detail) | per-region breakdown | Pro+ |
| Historical trend | vote evolution over time | Pro+ |
| Neutral trend | neutral% over time | Pro+ |
| Precision Rate | correct/committed | All users (own profile) |

---

## What We Do Not Do

- **No A/B testing on content ordering** without disclosure
- **No shadow-banning** — a flagged signal is either visible or explicitly removed
- **No differential treatment** based on plan tier in feed ordering (Pro users see the same signals, just with more analytics)
- **No data sold** to third parties
- **No advertising** — ever
- **No algorithmic amplification** of emotionally charged content

---

## Agent Inventory

| Agent | Location | Purpose |
|-------|----------|---------|
| Signal Curator | `lib/agents/signal-curator.ts` | Feed scoring |
| Engagement Stabilizer | `lib/agents/engagement-stabilizer.ts` | Detect anomalous voting patterns |
| Polarization Guard | `lib/agents/polarization-guard.ts` | Surface high-divergence signals |
| Reputation Balancer | `lib/agents/reputation-balancer.ts` | Prevent tier concentration in top rankings |
| Viral Trigger | `lib/agents/viral-trigger.ts` | Share suggestion logic |
| Content Integrity | `lib/agents/content-integrity.ts` | Duplicate and bias detection |

All agents are pure functions. None modify data directly. None send requests to external APIs. Their outputs are recommendations — human moderation or user action is always required to act on them.

---

## Change Log

| Date | Change |
|------|--------|
| 2026-04 | Initial transparency document published |
| 2026-04 | Tri-state voting (NEUTRAL) introduced |
| 2026-04 | Regional divergence detail moved to Pro tier |
| 2026-04 | Feed ordering modes documented publicly |
