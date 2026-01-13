'use client'

import { useState } from 'react'
import { submitEmployerLead } from '@/app/actions/leads'

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10
}

export function EmployerForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [phone, setPhone] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    // Validate phone
    if (!isValidPhone(phone)) {
      setStatus('error')
      setErrorMsg('Please enter a valid 10-digit phone number')
      return
    }

    const formData = new FormData(e.currentTarget)
    const result = await submitEmployerLead(formData)

    if (result.error) {
      setStatus('error')
      setErrorMsg(result.error)
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-ql-charcoal/5 border border-ql-gray-light/50">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-ql-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-ql-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-bold text-xl mb-2">You&apos;re in!</h3>
          <p className="text-ql-gray">We&apos;ll be in touch soon with worker matches.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-ql-charcoal/5 border border-ql-gray-light/50">
      <h3 className="font-bold text-xl mb-6">Get matched with workers</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="emp-name" className="block text-sm font-medium mb-2">
              Your name
            </label>
            <input
              type="text"
              id="emp-name"
              name="name"
              required
              className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label htmlFor="emp-company" className="block text-sm font-medium mb-2">
              Company
            </label>
            <input
              type="text"
              id="emp-company"
              name="company"
              className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
              placeholder="Smith Plumbing LLC"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="emp-email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="emp-email"
              name="email"
              required
              className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
              placeholder="john@smithplumbing.com"
            />
          </div>
          <div>
            <label htmlFor="emp-phone" className="block text-sm font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="emp-phone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
              placeholder="(617) 858-5308"
            />
          </div>
        </div>
        <div>
          <label htmlFor="emp-zip" className="block text-sm font-medium mb-2">
            Zip code
          </label>
          <input
            type="text"
            id="emp-zip"
            name="zip"
            className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
            placeholder="90210"
            maxLength={5}
          />
        </div>
        <div>
          <label htmlFor="emp-trade" className="block text-sm font-medium mb-2">
            What trade?
          </label>
          <select
            id="emp-trade"
            name="trade"
            required
            className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23999%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
          >
            <option value="">Select a trade...</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="carpentry">Carpentry</option>
            <option value="welding">Welding</option>
            <option value="roofing">Roofing</option>
            <option value="concrete">Concrete</option>
            <option value="general">General Labor</option>
            <option value="other">Other</option>
          </select>
        </div>
        {status === 'error' && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-4 bg-ql-green hover:bg-ql-green-hover active:bg-ql-green-active text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-ql-green/25 hover:shadow-xl hover:shadow-ql-green/30 min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Submitting...' : 'Find Workers'}
        </button>
      </form>
      <p className="text-xs text-ql-gray text-center mt-4">
        Free during early access. No credit card required.
      </p>
    </div>
  )
}
