export interface Enquiry {
  name: string;
  email: string;
  message: string;
  projectType: string;
  timeline: string;
  budget: string;
}
export function emailDraft(email: string, enquiry: Enquiry) {
  const subject = `Website enquiry${enquiry.name ? ` from ${enquiry.name.trim().replace(/[\r\n]+/g, " ")}` : ""}`;
  const body = [
    `Hi Om,`,
    ``,
    enquiry.message.trim(),
    ``,
    `Name: ${enquiry.name.trim()}`,
    `Reply to: ${enquiry.email.trim()}`,
    ...(enquiry.projectType ? [`Project: ${enquiry.projectType}`] : []),
    ...(enquiry.timeline ? [`Timeline: ${enquiry.timeline}`] : []),
    ...(enquiry.budget ? [`Budget: ${enquiry.budget}`] : []),
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
