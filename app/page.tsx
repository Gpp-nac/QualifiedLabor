export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="px-4 py-4 border-b border-ql-gray-light">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">
            Qualified<span className="text-ql-green">Labor</span>
          </div>
          <a
            href="mailto:hello@qualifiedlabor.net"
            className="text-sm text-ql-gray hover:text-ql-charcoal transition-colors"
          >
            hello@qualifiedlabor.net
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Contractors need help.<br />
            People want to learn trades.<br />
            <span className="text-ql-green">We connect them.</span>
          </h1>
          <p className="text-lg md:text-xl text-ql-gray max-w-2xl mx-auto mb-10">
            No job boards. No algorithms. No resume black holes.<br className="hidden md:block" />
            Just contractors who need workers and workers who want to learn.
          </p>

          {/* Two CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <a
              href="#employers"
              className="inline-flex items-center justify-center px-8 py-4 bg-ql-green hover:bg-ql-green-hover active:bg-ql-green-active text-white text-lg font-semibold rounded-lg transition-colors min-h-[56px]"
            >
              I&apos;m Hiring
            </a>
            <a
              href="#workers"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-ql-green text-ql-green hover:bg-ql-green hover:text-white text-lg font-semibold rounded-lg transition-colors min-h-[56px]"
            >
              I Want to Work
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-4 py-12 bg-ql-gray-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            The trades are broken.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">If you&apos;re a contractor:</h3>
              <ul className="space-y-3 text-ql-gray">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Can&apos;t find people who actually want to work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Indeed gives you 200 unqualified applicants</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>No time to sift through resumes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>People ghost after one day</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg">If you want to learn a trade:</h3>
              <ul className="space-y-3 text-ql-gray">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>&quot;Entry level&quot; jobs want 3 years experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>No idea where to start</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Applications go into a void</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Everyone says &quot;just show up at a job site&quot;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Simple matching. That&apos;s it.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-ql-green text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Tell us what you need</h3>
              <p className="text-ql-gray">
                Trade, role type, location. Takes 2 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-ql-green text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">We find matches</h3>
              <p className="text-ql-gray">
                Real people, not keyword spam. Quality over quantity.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-ql-green text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">You connect directly</h3>
              <p className="text-ql-gray">
                Phone number and email. Talk to each other like humans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trades We Cover */}
      <section className="px-4 py-12 bg-ql-gray-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Trades we cover
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Welding', 'Roofing', 'Concrete', 'General Construction'].map((trade) => (
              <span
                key={trade}
                className="px-4 py-2 bg-white border border-ql-gray-light rounded-full text-sm font-medium"
              >
                {trade}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section id="employers" className="px-4 py-12 md:py-16 scroll-mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                For contractors
              </h2>
              <p className="text-lg text-ql-gray mb-6">
                You need someone who will show up, work hard, and actually wants to learn the trade. We find them for you.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-ql-green mt-1">✓</span>
                  <span>Pre-screened for genuine interest</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ql-green mt-1">✓</span>
                  <span>Local to your area</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ql-green mt-1">✓</span>
                  <span>Available when you need them</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ql-green mt-1">✓</span>
                  <span>Direct contact info - no middleman</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border border-ql-gray-light rounded-lg p-6 md:p-8">
              <h3 className="font-bold text-xl mb-6">Get matched with workers</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="emp-name" className="block text-sm font-medium mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="emp-name"
                    name="name"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="emp-company" className="block text-sm font-medium mb-2">
                    Company name
                  </label>
                  <input
                    type="text"
                    id="emp-company"
                    name="company"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent"
                    placeholder="Smith Plumbing LLC"
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
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="emp-trade" className="block text-sm font-medium mb-2">
                    What trade?
                  </label>
                  <select
                    id="emp-trade"
                    name="trade"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent bg-white"
                  >
                    <option value="">Select a trade...</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="welding">Welding</option>
                    <option value="roofing">Roofing</option>
                    <option value="concrete">Concrete</option>
                    <option value="general">General Construction</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="emp-zip" className="block text-sm font-medium mb-2">
                    Zip code
                  </label>
                  <input
                    type="text"
                    id="emp-zip"
                    name="zip"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent"
                    placeholder="90210"
                    maxLength={5}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-ql-green hover:bg-ql-green-hover active:bg-ql-green-active text-white text-lg font-semibold rounded-lg transition-colors min-h-[56px]"
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
      <section id="workers" className="px-4 py-12 md:py-16 bg-ql-gray-bg scroll-mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1 bg-white border border-ql-gray-light rounded-lg p-6 md:p-8">
              <h3 className="font-bold text-xl mb-6">Get matched with jobs</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="worker-name" className="block text-sm font-medium mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="worker-name"
                    name="name"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="worker-trade" className="block text-sm font-medium mb-2">
                    What trade interests you?
                  </label>
                  <select
                    id="worker-trade"
                    name="trade"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent bg-white"
                  >
                    <option value="">Select a trade...</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="welding">Welding</option>
                    <option value="roofing">Roofing</option>
                    <option value="concrete">Concrete</option>
                    <option value="general">General Construction</option>
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
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="none">No experience - want to learn</option>
                    <option value="some">Some experience (helped friends/family)</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3+">3+ years</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="worker-zip" className="block text-sm font-medium mb-2">
                    Zip code
                  </label>
                  <input
                    type="text"
                    id="worker-zip"
                    name="zip"
                    className="w-full px-4 py-3 border border-ql-gray-light rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ql-focus focus:border-transparent"
                    placeholder="90210"
                    maxLength={5}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-ql-green hover:bg-ql-green-hover active:bg-ql-green-active text-white text-lg font-semibold rounded-lg transition-colors min-h-[56px]"
                >
                  Find Trade Jobs
                </button>
              </form>
              <p className="text-xs text-ql-gray text-center mt-4">
                100% free for workers. Always.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                For people who want to work
              </h2>
              <p className="text-lg text-ql-gray mb-6">
                Skip the degree debt. Learn a trade that pays. We connect you directly with contractors who want to train you.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-ql-green mt-1">✓</span>
                  <span>No experience required - they&apos;ll train you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ql-green mt-1">✓</span>
                  <span>Real contractors, not recruiters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ql-green mt-1">✓</span>
                  <span>Local opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ql-green mt-1">✓</span>
                  <span>Talk to humans, not algorithms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Early Stage Notice */}
      <section className="px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-ql-gold/20 border-l-4 border-ql-gold p-6 rounded-r-lg">
            <h3 className="font-bold text-lg mb-3">We&apos;re just getting started</h3>
            <p className="text-ql-gray mb-4">
              Qualified Labor is new. We&apos;re a small team building something we believe in. Right now, we&apos;re focused on making great matches, not scaling fast.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-ql-green">•</span>
                <span>You&apos;ll talk to actual humans (us)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ql-green">•</span>
                <span>Your feedback shapes what we build</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ql-green">•</span>
                <span>No hidden fees, no locked contracts</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-12 md:py-16 bg-ql-charcoal text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to stop wasting time?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Takes 2 minutes. No payment info. No spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <a
              href="#employers"
              className="inline-flex items-center justify-center px-8 py-4 bg-ql-green hover:bg-ql-green-hover text-white text-lg font-semibold rounded-lg transition-colors min-h-[56px]"
            >
              I&apos;m Hiring
            </a>
            <a
              href="#workers"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-ql-charcoal text-lg font-semibold rounded-lg transition-colors min-h-[56px]"
            >
              I Want to Work
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-ql-gray-light">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-bold text-lg">
              Qualified<span className="text-ql-green">Labor</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-ql-gray">
              <a href="mailto:hello@qualifiedlabor.net" className="hover:text-ql-charcoal transition-colors">
                hello@qualifiedlabor.net
              </a>
            </div>
          </div>
          <div className="text-center text-xs text-ql-gray mt-6">
            © {new Date().getFullYear()} Qualified Labor. Plain answers. No sales scripts.
          </div>
        </div>
      </footer>
    </main>
  )
}
