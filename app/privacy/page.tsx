export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#2c241b] mb-6">Privacy Policy</h1>
      <div className="prose prose-stone max-w-none text-[#5c5046]">
        <p className="mb-4"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        <p className="mb-4">At The Desert Beneath, we respect your privacy. This policy outlines how we collect, use, and protect your information.</p>
        
        <h2 className="text-xl font-bold text-[#2c241b] mt-8 mb-3">1. Information We Collect</h2>
        <p className="mb-4">We only collect information you voluntarily provide, such as your email address when subscribing to our newsletter or purchasing our book.</p>
        
        <h2 className="text-xl font-bold text-[#2c241b] mt-8 mb-3">2. How We Use Your Information</h2>
        <p className="mb-4">Your email is used solely to send you the content you requested (e.g., newsletters, book updates). We do not sell or share your data with third parties.</p>
        
        <h2 className="text-xl font-bold text-[#2c241b] mt-8 mb-3">3. Contact Us</h2>
        <p>If you have questions about this policy, please contact us at hello@desertbeneath.com.</p>
      </div>
    </div>
  )
}