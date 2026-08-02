export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#2c241b] mb-4">Get in Touch</h1>
      <p className="text-[#5c5046] mb-8">
        Have a question about cactus care, soil mixes, or the book? Fill out the form below or email us directly at <a href="mailto:hello@desertbeneath.com" className="text-[#c85a3a] hover:underline">hello@desertbeneath.com</a>.
      </p>
      
      <div className="bg-[#f0e6d8] p-8 rounded-xl">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#2c241b] mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-md border border-[#d4c5b0] focus:outline-none focus:ring-2 focus:ring-[#2c5631] bg-white" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#2c241b] mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-md border border-[#d4c5b0] focus:outline-none focus:ring-2 focus:ring-[#2c5631] bg-white" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#2c241b] mb-1">Message</label>
            <textarea rows={5} className="w-full px-4 py-2 rounded-md border border-[#d4c5b0] focus:outline-none focus:ring-2 focus:ring-[#2c5631] bg-white" placeholder="How can we help?"></textarea>
          </div>
          <button type="button" className="w-full bg-[#2c5631] hover:bg-[#1e3d22] text-white font-semibold py-3 rounded-md transition-colors">
            Send Message
          </button>
        </form>
        <p className="text-xs text-[#7a7068] mt-4 text-center">Note: This is a demo form. Connect it to Formspree or your email provider to make it functional.</p>
      </div>
    </div>
  )
}