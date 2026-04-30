import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer'

function LegalPage({ title, children }) {
  return (
    <>
      <Helmet>
        <title>{title} - KidsStory</title>
      </Helmet>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16">
        <h1 className="text-3xl font-extrabold font-poppins gradient-text mb-8">{title}</h1>
        <div className="glass-card p-8 prose" style={{ color: 'var(--text-primary)' }}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage title="📜 Privacy Policy">
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Last updated: {new Date().toLocaleDateString()}</p>
      <h2 className="text-xl font-bold mb-3">Information We Collect</h2>
      <p className="mb-4">KidsStory collects minimal information to provide a great reading experience. We use localStorage to save your bookmarks and reading preferences. No personal data is transmitted to our servers without your consent.</p>
      <h2 className="text-xl font-bold mb-3">Cookies & Analytics</h2>
      <p className="mb-4">We may use Google Analytics and Google AdSense, which use cookies to display relevant ads and analyze traffic. You can opt-out through your browser settings.</p>
      <h2 className="text-xl font-bold mb-3">Children's Privacy</h2>
      <p className="mb-4">KidsStory is designed for children. We do not knowingly collect personal information from children under 13 without parental consent.</p>
      <h2 className="text-xl font-bold mb-3">Contact</h2>
      <p>For privacy concerns, contact us at privacy@kidsstory.com</p>
    </LegalPage>
  )
}

export function TermsPage() {
  return (
    <LegalPage title="📋 Terms of Use">
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Last updated: {new Date().toLocaleDateString()}</p>
      <h2 className="text-xl font-bold mb-3">Acceptance of Terms</h2>
      <p className="mb-4">By using KidsStory, you agree to these terms. If you do not agree, please do not use the service.</p>
      <h2 className="text-xl font-bold mb-3">Content Usage</h2>
      <p className="mb-4">All stories on KidsStory are for personal, non-commercial use only. Reproduction without permission is prohibited.</p>
      <h2 className="text-xl font-bold mb-3">User Conduct</h2>
      <p className="mb-4">Users must not attempt to compromise the security of the platform or use it for any illegal purpose.</p>
      <h2 className="text-xl font-bold mb-3">Disclaimer</h2>
      <p>KidsStory provides content "as is" without warranties of any kind.</p>
    </LegalPage>
  )
}

export function DisclaimerPage() {
  return (
    <LegalPage title="⚠️ Disclaimer">
      <p className="mb-4">The stories on KidsStory are fictional and for entertainment purposes only. Any resemblance to real persons, events, or places is coincidental.</p>
      <h2 className="text-xl font-bold mb-3">Advertisements</h2>
      <p className="mb-4">KidsStory may display advertisements via Google AdSense. We are not responsible for the content of these advertisements.</p>
      <h2 className="text-xl font-bold mb-3">External Links</h2>
      <p>We are not responsible for the content of external websites linked from our platform.</p>
    </LegalPage>
  )
}
