import type { PlanTier, AnalyticsEvent, ConversionEvent } from '@/types'

// Analytics event queue (ready for any analytics provider)
const eventQueue: AnalyticsEvent[] = []

export function trackEvent(event: string, properties?: Record<string, string | number | boolean>) {
  const analyticsEvent: AnalyticsEvent = {
    event,
    properties,
    timestamp: new Date().toISOString(),
  }
  eventQueue.push(analyticsEvent)

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties)
  }

  // Ready for integration with any provider:
  // - PostHog, Mixpanel, Amplitude, GA4, etc.
}

export function trackPageView(page: string) {
  trackEvent('page_view', { page })
}

export function trackUpgradeClick(source: string, targetPlan: PlanTier) {
  trackEvent('upgrade_click', { source, target_plan: targetPlan })
}

export function trackConversion(from: PlanTier, to: PlanTier, source: string) {
  const conversion: ConversionEvent = {
    from,
    to,
    source,
    timestamp: new Date().toISOString(),
  }
  trackEvent('plan_conversion', {
    from_plan: from,
    to_plan: to,
    source,
  })
  return conversion
}

export function trackFeatureUsage(feature: string, plan: PlanTier) {
  trackEvent('feature_usage', { feature, plan })
}

export function trackAddOnClick(addOnSlug: string, plan: PlanTier) {
  trackEvent('addon_click', { addon: addOnSlug, plan })
}

export function trackPricingToggle(cycle: 'monthly' | 'annual') {
  trackEvent('pricing_toggle', { cycle })
}

export function trackOnboardingStep(step: number, action: string) {
  trackEvent('onboarding_step', { step, action })
}

export function getEventQueue(): AnalyticsEvent[] {
  return [...eventQueue]
}
