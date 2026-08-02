       import Link from 'next/link'

export default function BookPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2c241b] mb-4">
          The Desert Beneath
        </h1>
        <p className="text-xl text-[#5c5046] mb-8 max-w-2xl mx-auto">
          The definitive guide to cactus cultivation, soil science, and unlocking the secrets of desert plants.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#" 
            className="bg-[#c85a3a] hover:bg-[#a8482c] text-white text-lg font-semibold px-8 py-4 rounded-md transition-colors text-center"
          >
            Get Your Copy &ndash; $19.99
          </a>
          <Link 
            href="/" 
            className="border-2 border-[#2c5631] text-[#2c5631] hover:bg-[#2c5631] hover:text-white text-lg font-semibold px-8 py-4 rounded-md transition-colors text-center"
          >
            Read Free Chapter
          </Link>
        </div>
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