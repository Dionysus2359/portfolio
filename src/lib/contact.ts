export interface Enquiry {
  name: string;
  email: string;
  message: string;
  projectType: string;
  timeline: string;
  budget: string;
}
export function createEmailDraft(email: string, enquiry: Enquiry) {
  const name = enquiry.name.trim().replace(/[\r\n]+/g, " ");
  const subject = `Website enquiry${name ? ` from ${name}` : ""}`;
  const body = [
    `Hi Om,`,
    ``,
    enquiry.message.trim(),
    ``,
    `Name: ${name}`,
    `Reply to: ${enquiry.email.trim()}`,
    ...(enquiry.projectType ? [`Project: ${enquiry.projectType}`] : []),
    ...(enquiry.timeline ? [`Timeline: ${enquiry.timeline}`] : []),
    ...(enquiry.budget ? [`Budget: ${enquiry.budget}`] : []),
  ].join("\n");
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return {
    to: email,
    subject,
    body,
    text: `To: ${email}\nSubject: ${subject}\n\n${body}`,
    mailto,
    // Google's mailto handler also opens directly, without a default mail app.
    gmail: `https://mail.google.com/mail/?extsrc=mailto&url=${encodeURIComponent(mailto)}`,
  };
}
