import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiSend, FiMessageSquare, FiMail, FiUser, FiHelpCircle, FiCheckCircle } from 'react-icons/fi'
import Breadcrumb from '../components/Breadcrumb'
import Footer from '../components/Footer'
import { addFeedback } from '../firebase/db'
import toast from 'react-hot-toast'

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.message.trim() || !formData.email.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }

    setLoading(true)
    try {
      await addFeedback(formData)
      toast.success('Thank you! Your message has been sent.')
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: 'general', message: '' })
    } catch (err) {
      toast.error('Failed to submit message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact & Support - KidsStory</title>
        <meta name="description" content="Get in touch with the KidsStory team for feedback, support, or story requests." />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        <Breadcrumb items={[
          { label: 'Home', to: '/' },
          { label: 'Support & Contact' }
        ]} />

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold font-poppins gradient-text mb-2">
            💌 Support & Contact Us
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Have a question, feedback, or story request? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="glass-card p-6 md:p-8 space-y-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <FiCheckCircle size={36} />
                  </div>
                  <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--text-primary)' }}>
                    Message Received!
                  </h2>
                  <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Thank you for contacting KidsStory. Our team will review your message and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary px-6 py-2 text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="input-float">
                    <label>Your Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" size={16} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Smith"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="input-float">
                    <label>Email Address *</label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" size={16} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="input-float">
                    <label>Subject</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="request">Suggest / Request a Story</option>
                      <option value="bug">Report an Issue / Bug</option>
                      <option value="feedback">Reader Feedback</option>
                      <option value="privacy">Privacy & Security Concern</option>
                    </select>
                  </div>

                  <div className="input-float">
                    <label>Message *</label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3.5 top-4 opacity-40" size={16} />
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your message here..."
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiSend size={16} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-poppins font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                <FiHelpCircle size={18} className="text-pink-500" />
                <span>Need Quick Help?</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Looking for guidance on using bookmarks, changing text size, or reading offline? Visit our Help Center!
              </p>
              <a href="/help" className="btn-primary block text-center py-2 text-xs font-bold">
                Visit Help Center
              </a>
            </div>

            <div className="glass-card p-6 space-y-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Direct Contact Info</p>
              <p>📧 Email: <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>support@kidsstory.com</span></p>
              <p>⏱️ Response Time: Within 24-48 hours</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
