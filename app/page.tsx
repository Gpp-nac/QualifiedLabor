export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header - sticky, clean */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ql-gray-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">
            Qualified<span className="text-ql-green">Labor</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+15551234567"
              className="hidden sm:flex items-center gap-2 text-sm text-ql-charcoal hover:text-ql-green transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">(555) 123-4567</span>
            </a>
            <a
              href="#employers"
              className="px-4 py-2 bg-ql-green hover:bg-ql-green-hover text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero - punchier, more confident */}
      <section className="px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ql-green/10 text-ql-green text-sm font-medium rounded-full mb-6">
            <span className="w-2 h-2 bg-ql-green rounded-full animate-pulse"></span>
            Now matching in your area
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            Contractors need workers.<br />
            <span className="text-ql-green">Workers need a start.</span>
          </h1>
          <p className="text-lg md:text-xl text-ql-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            We match trade contractors with people who actually want to work.
            No Indeed spam. No ghosting. Just direct connections.
          </p>

          {/* Two CTAs - cleaner */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#employers"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-ql-green hover:bg-ql-green-hover active:bg-ql-green-active text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-ql-green/25 hover:shadow-xl hover:shadow-ql-green/30 min-h-[56px]"
            >
              I&apos;m Hiring
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#workers"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-ql-charcoal/10 hover:border-ql-green text-ql-charcoal hover:text-ql-green text-lg font-semibold rounded-xl transition-all min-h-[56px]"
            >
              I Want to Work
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-ql-gray">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-ql-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free to use
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-ql-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              2-minute signup
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-ql-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Direct contact info
            </div>
          </div>
        </div>
      </section>

      {/* The Problem - tighter, more scannable */}
      <section className="px-4 sm:px-6 py-16 md:py-20 bg-gradient-to-b from-ql-gray-bg to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
            Hiring in the trades is broken
          </h2>
          <p className="text-center text-ql-gray mb-12 max-w-2xl mx-auto">
            We&apos;ve talked to hundreds of contractors and workers. Here&apos;s what they told us.
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-ql-gray-light/50">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-ql-charcoal mb-4 pb-4 border-b border-ql-gray-light">
                <span className="w-8 h-8 rounded-full bg-ql-charcoal text-white flex items-center justify-center text-xs">HC</span>
                If you&apos;re a contractor
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs mt-0.5">✕</span>
                  <span className="text-ql-gray">&quot;I post on Indeed and get 200 applications from people who have never held a tool&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs mt-0.5">✕</span>
                  <span className="text-ql-gray">&quot;I hired someone, they worked one day and ghosted&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs mt-0.5">✕</span>
                  <span className="text-ql-gray">&quot;I don&apos;t have time to be an HR department&quot;</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-ql-gray-light/50">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-ql-charcoal mb-4 pb-4 border-b border-ql-gray-light">
                <span className="w-8 h-8 rounded-full bg-ql-green text-white flex items-center justify-center text-xs">WK</span>
                If you want to learn a trade
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs mt-0.5">✕</span>
                  <span className="text-ql-gray">&quot;Every &apos;entry level&apos; job wants 3 years of experience&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs mt-0.5">✕</span>
                  <span className="text-ql-gray">&quot;I apply to 50 jobs and hear back from zero&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs mt-0.5">✕</span>
                  <span className="text-ql-gray">&quot;Everyone says &apos;just show up at a job site&apos; — that doesn&apos;t work&quot;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - visual, scannable */}
      <section className="px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
            How it works
          </h2>
          <p className="text-center text-ql-gray mb-12">
            Three steps. Two minutes. Zero job board nonsense.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative text-center">
              <div className="w-14 h-14 bg-ql-green text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-ql-green/20">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Tell us what you need</h3>
              <p className="text-ql-gray text-sm leading-relaxed">
                Trade, experience level, location. That&apos;s it. No 15-page forms.
              </p>
              <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-ql-green/30 to-transparent"></div>
            </div>
            <div className="relative text-center">
              <div className="w-14 h-14 bg-ql-green text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-ql-green/20">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">We find your match</h3>
              <p className="text-ql-gray text-sm leading-relaxed">
                Real people who fit what you&apos;re looking for. Quality, not quantity.
              </p>
              <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-ql-green/30 to-transparent"></div>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-ql-green text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-ql-green/20">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Connect directly</h3>
              <p className="text-ql-gray text-sm leading-relaxed">
                Phone and email. Have a real conversation. Hire or get hired.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trades - compact */}
      <section className="px-4 sm:px-6 py-12 bg-ql-gray-bg/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-ql-gray mb-4 uppercase tracking-wide">Trades we cover</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Welding', 'Roofing', 'Concrete', 'General Labor'].map((trade) => (
              <span
                key={trade}
                className="px-4 py-2 bg-white border border-ql-gray-light rounded-lg text-sm font-medium hover:border-ql-green hover:text-ql-green transition-colors cursor-default"
              >
                {trade}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers - refined form */}
      <section id="employers" className="px-4 sm:px-6 py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-ql-green mb-4">
                <span className="w-6 h-6 rounded-full bg-ql-green/10 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                For contractors
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Find workers who actually want to work
              </h2>
              <p className="text-lg text-ql-gray mb-8 leading-relaxed">
                Stop wasting time on job boards. We send you pre-screened candidates who are serious about learning your trade.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ql-green/10 text-ql-green flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-ql-charcoal">Pre-screened for real interest</span>
                    <p className="text-sm text-ql-gray mt-0.5">We filter out the tire-kickers</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ql-green/10 text-ql-green flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-ql-charcoal">Local to your area</span>
                    <p className="text-sm text-ql-gray mt-0.5">No relocation complications</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ql-green/10 text-ql-green flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-ql-charcoal">Direct contact info</span>
                    <p className="text-sm text-ql-gray mt-0.5">Call or text them directly. No middleman.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-ql-charcoal/5 border border-ql-gray-light/50">
              <h3 className="font-bold text-xl mb-6">Get matched with workers</h3>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emp-name" className="block text-sm font-medium mb-2">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="emp-name"
                      name="name"
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
                    <label htmlFor="emp-phone" className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="emp-phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
                      placeholder="(555) 123-4567"
                    />
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
                </div>
                <div>
                  <label htmlFor="emp-trade" className="block text-sm font-medium mb-2">
                    What trade?
                  </label>
                  <select
                    id="emp-trade"
                    name="trade"
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
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-ql-green hover:bg-ql-green-hover active:bg-ql-green-active text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-ql-green/25 hover:shadow-xl hover:shadow-ql-green/30 min-h-[56px]"
                >
                  Find Workers
                </button>
              </form>
              <p className="text-xs text-ql-gray text-center mt-4">
                Free during early access. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Workers */}
      <section id="workers" className="px-4 sm:px-6 py-16 md:py-24 bg-gradient-to-b from-ql-gray-bg/30 to-ql-gray-bg scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-ql-charcoal/5 border border-ql-gray-light/50 order-2 lg:order-1">
              <h3 className="font-bold text-xl mb-6">Find a trade job</h3>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="worker-name" className="block text-sm font-medium mb-2">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="worker-name"
                      name="name"
                      className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
                      placeholder="Mike Johnson"
                    />
                  </div>
                  <div>
                    <label htmlFor="worker-phone" className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="worker-phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="worker-zip" className="block text-sm font-medium mb-2">
                    Zip code
                  </label>
                  <input
                    type="text"
                    id="worker-zip"
                    name="zip"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors"
                    placeholder="90210"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label htmlFor="worker-trade" className="block text-sm font-medium mb-2">
                    What trade interests you?
                  </label>
                  <select
                    id="worker-trade"
                    name="trade"
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
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="worker-experience" className="block text-sm font-medium mb-2">
                    Experience level
                  </label>
                  <select
                    id="worker-experience"
                    name="experience"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ql-green/20 focus:border-ql-green transition-colors bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23999%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
                  >
                    <option value="">Select...</option>
                    <option value="none">No experience - ready to learn</option>
                    <option value="some">Some (helped friends/family)</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3+">3+ years</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-ql-green hover:bg-ql-green-hover active:bg-ql-green-active text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-ql-green/25 hover:shadow-xl hover:shadow-ql-green/30 min-h-[56px]"
                >
                  Find Trade Jobs
                </button>
              </form>
              <p className="text-xs text-ql-gray text-center mt-4">
                100% free for workers. Always.
              </p>
            </div>
            <div className="lg:sticky lg:top-32 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-ql-green mb-4">
                <span className="w-6 h-6 rounded-full bg-ql-green/10 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                For workers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Get trained. Get paid. No degree required.
              </h2>
              <p className="text-lg text-ql-gray mb-8 leading-relaxed">
                Skip the $100k college debt. Learn a skilled trade from real contractors who want to teach you.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ql-green/10 text-ql-green flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-ql-charcoal">No experience? No problem.</span>
                    <p className="text-sm text-ql-gray mt-0.5">Contractors on here are looking to train</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ql-green/10 text-ql-green flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-ql-charcoal">Real contractors, not recruiters</span>
                    <p className="text-sm text-ql-gray mt-0.5">Talk directly to the people who will hire you</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ql-green/10 text-ql-green flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-ql-charcoal">Local opportunities</span>
                    <p className="text-sm text-ql-gray mt-0.5">Jobs in your area, not across the country</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Early Stage Notice - more polished */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-ql-gold/20 to-ql-gold/5 rounded-2xl p-8 md:p-10 border border-ql-gold/30">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ql-gold/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-ql-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">We&apos;re just getting started</h3>
                <p className="text-ql-gray mb-5 leading-relaxed">
                  Qualified Labor is a small, focused team. We&apos;re not trying to be the next billion-dollar job board. We&apos;re trying to make hiring in the trades actually work.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-ql-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Talk to real humans</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-ql-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Your feedback matters</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-ql-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No hidden fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-16 md:py-24 bg-ql-charcoal text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to stop wasting time?
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Two minutes. No payment info. No spam. Just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#employers"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-ql-green hover:bg-ql-green-hover text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-ql-green/25 min-h-[56px]"
            >
              I&apos;m Hiring
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#workers"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-ql-charcoal text-lg font-semibold rounded-xl transition-all min-h-[56px]"
            >
              I Want to Work
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-10 border-t border-ql-gray-light bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-bold text-xl">
              Qualified<span className="text-ql-green">Labor</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="mailto:hello@qualifiedlabor.net" className="text-ql-gray hover:text-ql-charcoal transition-colors">
                hello@qualifiedlabor.net
              </a>
              <a href="tel:+15551234567" className="text-ql-gray hover:text-ql-charcoal transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (555) 123-4567
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-ql-gray mt-8 pt-6 border-t border-ql-gray-light/50">
            © {new Date().getFullYear()} Qualified Labor. Plain answers. No sales scripts.
          </div>
        </div>
      </footer>
    </main>
  )
}
