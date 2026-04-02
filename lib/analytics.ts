import type { PlanTier, AnalyticsEvent, ConversionEvent } from '@/types'

// ─── Plausible integration ───

function plausible(event: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  const w = window as any // eslint-disable-line @typescript-eslint/no-explicit-any
  if (typeof w.plausible === 'function') {
    w.plausible(event, props ? { props } : undefined)
  }
}

// ─── Core tracking ───

export function trackEvent(event: string, properties?: Record<string, string | number | boolean>) {
  // Send to Plausible
  plausible(event, properties)

  // Dev logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties)
  }
}

// ─── Page & navigation ───

export function trackPageView(page: string) {
  trackEvent('pageview', { page })
}

// ─── Auth & onboarding ───

export function trackSignupStarted(source: string) {
  trackEvent('signup_started', { source })
}

export function trackSignupCompleted() {
  trackEvent('signup_completed')
}

export function trackLoginCompleted() {
  trackEvent('login_completed')
}

export function trackOnboardingStep(step: number, action: string) {
  trackEvent('onboarding_step', { step, action })
}

// ─── Predictions ───

export function trackPredictionCreated(category: string) {
  trackEvent('prediction_created', { category })
}

export function trackPredictionVoted(predictionId: string) {
  trackEvent('prediction_voted', { prediction_id: predictionId })
}

export function trackPredictionShared(predictionId: string, method: string) {
  trackEvent('prediction_shared', { prediction_id: predictionId, method })
}

// ─── Social & viral ───

export function trackProfileViewed(username: string) {
  trackEvent('profile_viewed', { username })
}

export function trackLeaderboardViewed() {
  trackEvent('leaderboard_viewed')
}

export function trackCopyLink(type: string, id: string) {
  trackEvent('copy_link', { type, id })
}

export function trackShare(type: string, platform: string) {
  trackEvent('share', { type, platform })
}

// ─── Monetization ───

export function trackPricingViewed() {
  trackEvent('pricing_viewed')
}

export function trackUpgradeClick(source: string, targetPlan: PlanTier) {
  trackEvent('upgrade_clicked', { source, target_plan: targetPlan })
}

export function trackConversion(from: PlanTier, to: PlanTier, source: string): ConversionEvent {
  trackEvent('plan_conversion', { from_plan: from, to_plan: to, source })
  return { from, to, source, timestamp: new Date().toISOString() }
}

export function trackPricingToggle(cycle: 'monthly' | 'annual') {
  trackEvent('pricing_toggle', { cycle })
}

export function trackAddOnClick(addOnSlug: string, plan: PlanTier) {
  trackEvent('addon_click', { addon: addOnSlug, plan })
}

// ─── Engagement ───

export function trackFeatureUsage(feature: string, plan: PlanTier) {
  trackEvent('feature_usage', { feature, plan })
}

export function trackSupportChatOpened() {
  trackEvent('support_chat_opened')
}

export function trackFeedbackSubmitted(type: string) {
  trackEvent('feedback_submitted', { type })
}
