'use server'

import { createServerClient } from '@/lib/supabase/server'

const GOOGLE_SHEET_URL = 'https://script.google.com/a/macros/studenthelpers.net/s/AKfycbwIoa2ypB5TA-ZJevd2JrP4x2Sy4BItlNnxo3wHl78QNUZsBsn5oLqpv1KGmq7b0k1w4Q/exec'

async function sendToGoogleSheet(lead: Record<string, string>) {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(lead),
    })
  } catch (err) {
    console.error('Google Sheet error:', err)
    // Don't fail the submission if Google Sheet fails
  }
}

export async function submitEmployerLead(formData: FormData) {
  const lead = {
    type: 'employer' as const,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    zip: formData.get('zip') as string,
    trade: formData.get('trade') as string,
    company: formData.get('company') as string,
  }

  if (!lead.name || !lead.trade || !lead.email || !lead.phone) {
    return { error: 'Name, email, phone, and trade are required' }
  }

  // Save to Supabase
  try {
    const supabase = createServerClient()
    const { error } = await supabase.from('leads').insert(lead)

    if (error) {
      console.error('Employer lead error:', error)
      return { error: 'Something went wrong. Please try again.' }
    }
  } catch (err) {
    console.error('Supabase client error:', err)
    return { error: 'Something went wrong. Please try again.' }
  }

  // Also send to Google Sheet (fire and forget)
  sendToGoogleSheet(lead)

  return { success: true }
}

export async function submitWorkerLead(formData: FormData) {
  const lead = {
    type: 'worker' as const,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    zip: formData.get('zip') as string,
    trade: formData.get('trade') as string,
    experience: formData.get('experience') as string,
  }

  if (!lead.name || !lead.trade || !lead.email || !lead.phone) {
    return { error: 'Name, email, phone, and trade are required' }
  }

  // Save to Supabase
  try {
    const supabase = createServerClient()
    const { error } = await supabase.from('leads').insert(lead)

    if (error) {
      console.error('Worker lead error:', error)
      return { error: 'Something went wrong. Please try again.' }
    }
  } catch (err) {
    console.error('Supabase client error:', err)
    return { error: 'Something went wrong. Please try again.' }
  }

  // Also send to Google Sheet (fire and forget)
  sendToGoogleSheet(lead)

  return { success: true }
}
