import Link from 'next/link'

export default function BookPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2c241b] mb-4">
          The Desert Beneath
        </h1>
        <p className="text-xl text-[#5c5046] mb-6 max-w-2xl mx-auto">
          The definitive guide to cactus cultivation, soil science, and unlocking the secrets of desert plants.
        </p>
        
        {/* Price Display */}
        <p className="text-3xl font-bold text-[#2c5631] mb-8">
          $7.99 <span className="text-lg font-normal text-[#5c5046]">USD</span>
        </p>
        
        {/* Call-to-Action Buttons with Real Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a 
            href="https://selar.com/e829s1lr46"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#c85a3a] hover:bg-[#a8482c] text-white text-lg font-semibold px-8 py-4 rounded-md transition-colors text-center flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Buy on Selar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          
          <a 
            href="https://a.co/d/00D6jXd1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2c5631] hover:bg-[#1e3d22] text-white text-lg font-semibold px-8 py-4 rounded-md transition-colors text-center flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Buy on Amazon</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
        
        <Link 
          href="/" 
          className="inline-block text-[#5c5046] hover:text-[#2c5631] font-medium transition-colors"
        >
          Or read a free chapter on the homepage &rarr;
        </Link>
      </div>

      {/* What's Inside */}
      <div className="bg-[#f0e6d8] rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-[#2c241b] mb-6 text-center">What You Will Learn</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <span className="text-2xl">🌵</span>
            <div>
              <h3 className="font-bold text-[#2c241b]">Master Soil Composition</h3>
              <p className="text-[#5c5046] text-sm">Learn the exact mineral ratios to prevent root rot and promote explosive growth.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">💧</span>
            <div>
              <h3 className="font-bold text-[#2c241b]">The Truth About Watering</h3>
              <p className="text-[#5c5046] text-sm">Ditch the &ldquo;once a week&rdquo; myth. Discover seasonal watering schedules based on dormancy.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">🔍</span>
            <div>
              <h3 className="font-bold text-[#2c241b]">Troubleshooting Guide</h3>
              <p className="text-[#5c5046] text-sm">Identify and fix common issues like etiolation, sunburn, and pest infestations.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">🌱</span>
            <div>
              <h3 className="font-bold text-[#2c241b]">Species-Specific Care</h3>
              <p className="text-[#5c5046] text-sm">Detailed profiles for over 50 popular cactus and succulent varieties.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="text-center mb-12">
        <blockquote className="text-xl italic text-[#5c5046] max-w-2xl mx-auto mb-4">
          &ldquo;This book finally explained why my golden barrel was rotting. The soil recipes alone are worth 10x the price. A must-read for any serious collector!&rdquo;
        </blockquote>
        <p className="font-semibold text-[#2c241b]">&mdash; Sarah M., Master Gardener</p>
      </div>
    </div>
  )
}     