'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Lock, Sparkles } from 'lucide-react'
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
      <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40 rounded-xl">
        <Lock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-1">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{feature}</span> is available on {plan.name}.
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
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/40 rounded-2xl p-8 text-center">
      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
        Unlock {feature}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto leading-relaxed">
        Go deeper with {plan.name}. Get access to {feature.toLowerCase()} and more advanced tools
        to sharpen your predictions.
      </p>
      <Link
        href={plan.href}
        onClick={() => trackUpgradeClick(source, nextPlan)}
      >
        <Button className="gap-2">
          Upgrade to {plan.name} <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
      <p className="text-xs text-zinc-400 mt-3">
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
