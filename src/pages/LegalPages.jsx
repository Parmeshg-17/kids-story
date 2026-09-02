import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'

function LegalPage({ title, lastUpdated, breadcrumbLabel, children }) {
  return (
    <>
      <Helmet>
        <title>{title} - KidsStory</title>
        <meta name="description" content={`${title} for KidsStory platform`} />
      </Helmet>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        <Breadcrumb items={[
          { label: 'Home', to: '/' },
          { label: breadcrumbLabel || title }
        ]} />

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold font-poppins gradient-text mb-2">{title}</h1>
          {lastUpdated && (
            <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Effective Date: {lastUpdated}
            </p>
          )}
        </div>

        <div className="glass-card p-6 md:p-10 space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage title="📜 Privacy Policy" lastUpdated="September 2, 2026" breadcrumbLabel="Privacy Policy">
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">1. Overview</h2>
        <p>
          KidsStory ("we", "our", or "us") is dedicated to protecting the privacy of our readers, particularly children and their parents or guardians. This Privacy Policy explains what information we collect, how it is stored, and your rights when visiting our website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">2. Local Storage & Data Collection</h2>
        <p>
          KidsStory does not require user account registration for readers. We collect minimal non-personal technical data strictly to provide personalized reading functionality.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Bookmarks:</strong> Saved locally in your browser's <code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-xs">localStorage</code> (<code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-xs">kidsstory_bookmarks</code>).</li>
          <li><strong>Theme Preferences:</strong> Saved locally (<code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-xs">kidsstory_theme</code>) to remember dark/light mode and theme styles.</li>
          <li><strong>Font Size:</strong> Saved locally (<code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-xs">kidsstory_fontsize</code>) for reading comfort.</li>
          <li><strong>Cookie Consent Choices:</strong> Saved locally (<code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-xs">kidsstory_cookie_consent</code>).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">3. Firebase Realtime Database & Analytics</h2>
        <p>
          We use Firebase Realtime Database to store published story content, public view counts (incremented anonymously per story read), categories, and site settings. If you send feedback via our Support form, your message details (name, email, subject, content) are sent securely to our Firebase RTDB.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">4. Advertisements (Google AdSense)</h2>
        <p>
          KidsStory may display third-party advertisements served through Google AdSense. Google AdSense uses cookies to serve ads based on user visits to this and other websites. You may opt out of personalized advertising by visiting Google's Ads Settings or using our Cookie Consent Banner.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">5. Children's Privacy (COPPA Compliance)</h2>
        <p>
          We do not knowingly solicit or collect personal identifiable information from children under 13 years of age. All reading functionality is accessible anonymously without requiring personal user profiles.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">6. Privacy Inquiries</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy, please reach out through our <a href="/support" className="underline font-bold text-pink-500">Support Page</a> or email <code className="font-bold">privacy@kidsstory.com</code>.
        </p>
      </section>
    </LegalPage>
  )
}

export function TermsPage() {
  return (
    <LegalPage title="📋 Terms of Use" lastUpdated="September 2, 2026" breadcrumbLabel="Terms of Use">
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">1. Acceptance of Terms</h2>
        <p>
          By accessing and using KidsStory, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">2. Intellectual Property Rights</h2>
        <p>
          All story titles, text, illustrations, logos, and custom code on KidsStory are the property of KidsStory or licensed to us. Content is provided solely for personal, non-commercial reading and educational purposes. You may not republish, distribute, or sell any story text without prior permission.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">3. User Conduct</h2>
        <p>
          You agree not to disrupt the operation of KidsStory, attempt unauthorized access to our administrative dashboard or database, or perform automated scraping of our content.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">4. Disclaimer & Limitation of Liability</h2>
        <p>
          KidsStory content is provided "as is" without express or implied warranties. We are not liable for any direct or indirect damages arising from your use of our platform.
        </p>
      </section>
    </LegalPage>
  )
}

export function DisclaimerPage() {
  return (
    <LegalPage title="⚠️ Disclaimer" lastUpdated="September 2, 2026" breadcrumbLabel="Disclaimer">
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">1. Fictional Content & Moral Purpose</h2>
        <p>
          The stories, fairy tales, and moral fables published on KidsStory are works of fiction intended for entertainment and educational reading for children. Any resemblance to real persons, living or dead, or real places is purely coincidental.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">2. Parental Guidance</h2>
        <p>
          While we carefully curate and categorize all stories (including moral tales, bedtime stories, and adventure tales), parents and legal guardians are encouraged to supervise their children's online reading habits.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">3. Advertisements & External Links</h2>
        <p>
          KidsStory displays third-party advertisements via Google AdSense and may include links to external resources. We do not endorse, guarantee, or take responsibility for third-party websites or advertised products.
        </p>
      </section>
    </LegalPage>
  )
}

export function CookiePolicyPage() {
  return (
    <LegalPage title="🍪 Cookie & Storage Policy" lastUpdated="September 2, 2026" breadcrumbLabel="Cookie Policy">
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">1. What Are Cookies and Local Storage?</h2>
        <p>
          Cookies and local storage are small text data files stored in your web browser when you visit a website. They enable web applications to remember your preferences and settings over time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">2. How We Use Browser Storage</h2>
        <p>KidsStory utilizes browser storage strictly for the following purposes:</p>
        <div className="space-y-2">
          <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold text-pink-500">Essential Storage (Strictly Necessary)</p>
            <p className="text-xs">Used to retain dark mode toggles, bookmarked stories, and font scaling settings on your device.</p>
          </div>
          <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold text-pink-500">Analytics & Advertising Cookies (Optional)</p>
            <p className="text-xs">Used by third-party advertising partners (Google AdSense) to measure ad impressions and present relevant advertisements.</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">3. Managing Your Preferences</h2>
        <p>
          You can change or revoke your cookie choices at any time using our Cookie Preferences Banner or by clearing your browser cookies and local storage.
        </p>
      </section>
    </LegalPage>
  )
}

export function AccessibilityStatementPage() {
  return (
    <LegalPage title="♿ Accessibility Statement" lastUpdated="September 2, 2026" breadcrumbLabel="Accessibility">
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">1. Our Commitment</h2>
        <p>
          KidsStory is committed to making our digital reading platform accessible to all children, parents, and educators, including individuals with visual, auditory, cognitive, or motor disabilities. We strive to conform to WCAG 2.1 Level AA guidelines.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">2. Built-in Accessibility Features</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Font Resizing Controls:</strong> Instant font scaling controls on story detail pages.</li>
          <li><strong>High Contrast & Dark Mode:</strong> Built-in dark mode toggle for low-light reading comfort.</li>
          <li><strong>Keyboard Navigation:</strong> Accessible focus rings and logical tab ordering across controls.</li>
          <li><strong>Reduced Motion Support:</strong> Smooth CSS transitions that respect user reduced motion preferences.</li>
          <li><strong>Screen Reader Accessibility:</strong> Semantic HTML layout, alt descriptions on imagery, and ARIA live regions for notifications.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">3. Feedback & Assistance</h2>
        <p>
          If you encounter any accessibility barriers while browsing KidsStory, please contact us on our <a href="/support" className="underline font-bold text-pink-500">Support Page</a> so we can address your needs promptly.
        </p>
      </section>
    </LegalPage>
  )
}

export function AcceptableUsePage() {
  return (
    <LegalPage title="🛡️ Acceptable Use Policy" lastUpdated="September 2, 2026" breadcrumbLabel="Acceptable Use">
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">1. Purpose</h2>
        <p>
          This Acceptable Use Policy sets out the rules governing access to KidsStory. All users must use our website responsibly and respectfully.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">2. Prohibited Activities</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Attempting to bypass security mechanisms or gain unauthorized admin access.</li>
          <li>Submitting spam, malicious code, or abusive messages through our support channels.</li>
          <li>Scraping content using automated bots without explicit written authorization.</li>
          <li>Using the platform for any illegal purpose or violating intellectual property rights.</li>
        </ul>
      </section>
    </LegalPage>
  )
}

export function SecurityPolicyPage() {
  return (
    <LegalPage title="🔒 Security & Responsible Disclosure" lastUpdated="September 2, 2026" breadcrumbLabel="Security">
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">1. Platform Security Measures</h2>
        <p>
          KidsStory implements modern web security practices to protect our service and users:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Encrypted Transport:</strong> All data is served over HTTPS / TLS encryption.</li>
          <li><strong>Firebase Authentication:</strong> Secure token-based authentication for administrative dashboard access.</li>
          <li><strong>Database Security Rules:</strong> Database write permissions restricted strictly to authenticated administrators.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">2. Responsible Disclosure Policy</h2>
        <p>
          If you are a security researcher and believe you have discovered a security vulnerability in KidsStory, we appreciate your assistance in disclosing it to us responsibly.
        </p>
        <p>
          Please email security reports to <code className="font-bold">security@kidsstory.com</code> with details and steps to reproduce. We promise to investigate reports promptly.
        </p>
      </section>
    </LegalPage>
  )
}

export function CommunityGuidelinesPage() {
  return (
    <LegalPage title="🌈 Community & Content Guidelines" lastUpdated="September 2, 2026" breadcrumbLabel="Community Guidelines">
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">1. Our Content Standard</h2>
        <p>
          KidsStory is dedicated to fostering a safe, uplifting, inspiring, and age-appropriate environment for young readers around the world.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold font-poppins text-pink-500">2. Core Principles</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Child Safety First:</strong> Zero tolerance for inappropriate, explicit, or harmful themes.</li>
          <li><strong>Positive Values:</strong> Stories emphasize kindness, friendship, honesty, bravery, and curiosity.</li>
          <li><strong>Inclusive & Respectful:</strong> Stories celebrate diversity, cultural stories (Hindi & English), and mutual respect.</li>
        </ul>
      </section>
    </LegalPage>
  )
}
