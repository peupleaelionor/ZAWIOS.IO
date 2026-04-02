'use client'

import { Button } from '@/components/ui/button'
import { IconArrows, IconShield, IconZap } from '@/components/ui/icons'
import Link from 'next/link'
import { trackUpgradeClick } from '@/lib/analytics'
import type { PlanTier } from '@/types'
import { getUpgradePath, getPlan } from '@/lib/plans'

interface UpgradePromptProps {
  currentPlan?: PlanTier
  feature: string
  source: string
  compact?: boolean
}

export function UpgradePrompt({ currentPlan = 'free', feature, source, compact = false }: UpgradePromptProps) {
  const nextPlan = getUpgradePath(currentPlan)
  if (!nextPlan) return null
  const plan = getPlan(nextPlan)
  if (!plan) return null

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(124,110,240,0.08)', border: '1px solid rgba(124,110,240,0.15)' }}>
        <IconShield className="w-4 h-4 flex-shrink-0" size={16} style={{ color: 'var(--accent)' }} />
        <p className="text-sm text-[var(--text2)] flex-1">
          <span className="font-medium text-[var(--text)]">{feature}</span> is available on {plan.name}.
        </p>
        <Link
          href={plan.href}
          onClick={() => trackUpgradeClick(source, nextPlan)}
        >
          <Button size="sm" className="flex-shrink-0 text-xs">
            Upgrade
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="surface rounded-2xl p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,110,240,0.08) 0%, rgba(52,208,182,0.05) 100%)' }}>
      <div className="accent-line-top" />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
        style={{ background: 'rgba(124,110,240,0.12)', color: 'var(--accent2)' }}
      >
        <IconZap className="w-6 h-6" size={24} />
      </div>
      <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
        Unlock {feature}
      </h3>
      <p className="text-sm text-[var(--text2)] mb-6 max-w-sm mx-auto leading-relaxed">
        Go deeper with {plan.name}. Get access to {feature.toLowerCase()} and more advanced tools
        to sharpen your predictions.
      </p>
      <Link
        href={plan.href}
        onClick={() => trackUpgradeClick(source, nextPlan)}
      >
        <Button className="gap-2">
          Upgrade to {plan.name} <IconArrows className="w-4 h-4" size={16} />
        </Button>
      </Link>
      <p className="text-xs text-[var(--text3)] mt-3" style={{ fontFamily: 'var(--mono)' }}>
        Starting at ${plan.monthlyPrice}/month · Cancel anytime
      </p>
    </div>
  )
}

interface FeatureGateProps {
  currentPlan?: PlanTier
  requiredPlan: PlanTier
  feature: string
  source: string
  children: React.ReactNode
}

export function FeatureGate({ currentPlan = 'free', requiredPlan, feature, source, children }: FeatureGateProps) {
  const planOrder: PlanTier[] = ['free', 'premium', 'creator', 'business']
  const currentIndex = planOrder.indexOf(currentPlan)
  const requiredIndex = planOrder.indexOf(requiredPlan)

  if (currentIndex >= requiredIndex) {
    return <>{children}</>
  }

  return <UpgradePrompt currentPlan={currentPlan} feature={feature} source={source} />
}
