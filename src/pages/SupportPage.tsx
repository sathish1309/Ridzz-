import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageSquare, Phone, Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { FAQS } from '../data/demo';

type IssueType = 'fare' | 'driver' | 'booking' | 'other' | '';

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState('');
  const [issueType, setIssueType] = useState<IssueType>('');
  const [issueDesc, setIssueDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredFaqs = FAQS.filter(
    (f) =>
      !faqSearch ||
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueType || !issueDesc.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-cyan text-xs font-semibold uppercase tracking-widest mb-2 block">Help Center</span>
          <h1 className="text-4xl font-extrabold text-white mb-2">Support &amp; FAQ</h1>
          <p className="text-white/45">Find answers or report a ride-related issue.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* FAQ */}
          <div>
            <h2 className="text-white font-bold text-xl mb-4">Frequently Asked Questions</h2>
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search questions…"
                className="input-field pl-9"
              />
            </div>
            <div className="flex flex-col gap-2">
              {filteredFaqs.length === 0 ? (
                <p className="text-white/35 text-sm py-4 text-center">No matching questions found.</p>
              ) : filteredFaqs.map((faq, i) => (
                <div key={i} className="glass rounded-xl border-glow overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left"
                  >
                    <span className="text-white font-medium text-sm">{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={16} className="text-blue shrink-0" /> : <ChevronDown size={16} className="text-white/40 shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-white/55 text-sm leading-relaxed border-t border-white/8 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact + Report */}
          <div className="flex flex-col gap-5">
            {/* Contact channels */}
            <div className="glass rounded-2xl border-glow p-5">
              <h3 className="text-white font-bold mb-4">Contact Support</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: <Mail size={16} className="text-blue" />, label: 'Email Support', value: 'support@cloudx.in', sub: 'Replies within 24 hours' },
                  { icon: <Phone size={16} className="text-cyan" />, label: 'Helpline', value: '+91 1800 XXX XXXX', sub: 'Mon–Sat, 8AM–10PM' },
                  { icon: <MessageSquare size={16} className="text-purple-400" />, label: 'Live Chat', value: 'Available in-app', sub: 'Integration-ready feature' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/4 border border-white/8">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{c.label}</p>
                      <p className="text-white/50 text-xs">{c.value}</p>
                      <p className="text-white/25 text-xs">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Issue report */}
            <div className="glass rounded-2xl border-glow p-5">
              <h3 className="text-white font-bold mb-4">Report an Issue</h3>
              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <CheckCircle size={40} className="text-cyan" />
                  <p className="text-white font-bold">Issue Submitted!</p>
                  <p className="text-white/45 text-sm">Our team will review and respond within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setIssueType(''); setIssueDesc(''); }} className="btn-secondary !py-2 !px-4 text-sm mt-2">
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Issue Type</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value as IssueType)}
                      className="input-field"
                      style={{ background: 'rgba(8,17,32,0.9)' }}
                    >
                      <option value="">Select issue type…</option>
                      <option value="fare">Fare dispute</option>
                      <option value="driver">Driver behaviour</option>
                      <option value="booking">Booking problem</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Description</label>
                    <textarea
                      value={issueDesc}
                      onChange={(e) => setIssueDesc(e.target.value)}
                      placeholder="Describe your issue in detail…"
                      rows={4}
                      className="input-field resize-none"
                    />
                  </div>
                  {(!issueType || !issueDesc.trim()) && issueDesc.length > 0 && (
                    <p className="text-amber-400 text-xs flex items-center gap-1.5">
                      <AlertTriangle size={12} /> Please select an issue type and describe the problem.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting || !issueType || !issueDesc.trim()}
                    className="btn-primary w-full justify-center !py-3"
                  >
                    {submitting ? 'Submitting…' : 'Submit Issue'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
