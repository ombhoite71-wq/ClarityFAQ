export interface FAQItem {
  id: string;
  category: 'Public Services' | 'Banking & Finance' | 'Healthcare' | 'Travel & Transit' | 'Consumer & Tech';
  question: string;
  answer: string;
  intentKeywords: string[];
  helpfulCount: number;
}

export const INITIAL_FAQS: FAQItem[] = [
  // Public Services
  {
    id: 'faq-1',
    category: 'Public Services',
    question: 'How do I renew my passport and how long does standard processing take?',
    answer: 'You can renew an adult passport online or by mail using Form DS-82 if your most recent passport was issued within the last 15 years. Standard processing takes 6 to 8 weeks, while expedited processing takes 2 to 3 weeks for an additional fee.',
    intentKeywords: ['passport', 'renew', 'renewal', 'travel document', 'expired passport', 'processing time', 'expedited', 'form ds-82'],
    helpfulCount: 142
  },
  {
    id: 'faq-2',
    category: 'Public Services',
    question: 'How can I check my voter registration status or update my residential address?',
    answer: 'Visit your state or municipal election portal and enter your full name, date of birth, and zip code to verify your status. Address updates must be submitted at least 15 to 30 days before an election day, either online with a valid driver license ID or by mail.',
    intentKeywords: ['vote', 'voter', 'registration', 'election', 'polling place', 'change address', 'ballot', 'register to vote'],
    helpfulCount: 98
  },
  {
    id: 'faq-3',
    category: 'Public Services',
    question: 'What documents are required to apply for a municipal public library card?',
    answer: 'To get a free public library card, bring one government-issued photo ID (such as a driver license, state ID, or passport) and one proof of current local residence (such as a utility bill, lease agreement, or bank statement dated within the last 60 days).',
    intentKeywords: ['library', 'card', 'borrow books', 'ebook', 'residence proof', 'membership', 'public library'],
    helpfulCount: 76
  },
  {
    id: 'faq-4',
    category: 'Public Services',
    question: 'When is the annual income tax filing deadline and how do I request an extension?',
    answer: 'The standard annual federal and state income tax filing deadline is April 15. You can request an automatic 6-month filing extension until October 15 by submitting Form 4868 online before the April deadline, though any estimated tax owed must still be paid on time.',
    intentKeywords: ['tax', 'taxes', 'filing', 'deadline', 'extension', 'irs', 'april 15', 'return', 'refund'],
    helpfulCount: 184
  },
  {
    id: 'faq-5',
    category: 'Public Services',
    question: 'How do I report a non-emergency civic issue like a pothole, broken streetlight, or missed trash pickup?',
    answer: 'Dial 311 or use your city 311 online portal to report non-emergency neighborhood issues including potholes, streetlight outages, graffiti, or missed garbage collection. You will receive a tracking reference number with an estimated resolution window of 3 to 5 business days.',
    intentKeywords: ['311', 'pothole', 'streetlight', 'garbage', 'trash', 'missed pickup', 'city repair', 'non-emergency', 'municipality'],
    helpfulCount: 65
  },

  // Banking & Finance
  {
    id: 'faq-6',
    category: 'Banking & Finance',
    question: 'What should I do immediately if my debit or credit card is lost or stolen?',
    answer: 'Open your mobile banking app immediately and toggle the "Freeze" or "Lock Card" switch to block new transactions. Next, call the 24/7 customer support number on the back of your statement or request a replacement card in the app; zero-liability protection covers unauthorized charges reported promptly.',
    intentKeywords: ['lost card', 'stolen', 'credit card', 'debit card', 'freeze', 'lock', 'block card', 'unauthorized charge', 'fraud'],
    helpfulCount: 215
  },
  {
    id: 'faq-7',
    category: 'Banking & Finance',
    question: 'How do I dispute an unauthorized or duplicate transaction on my bank statement?',
    answer: 'Select the specific transaction in your online statement and click "Dispute Transaction" within 60 days of the statement date. Provide a brief explanation and any supporting receipt; the bank will issue a provisional credit within 10 business days while investigating with the merchant.',
    intentKeywords: ['dispute', 'chargeback', 'double charge', 'duplicate', 'refund', 'wrong amount', 'scam', 'statement error'],
    helpfulCount: 163
  },
  {
    id: 'faq-8',
    category: 'Banking & Finance',
    question: 'How long do domestic wire transfers and ACH bank transfers take to settle?',
    answer: 'Domestic wire transfers typically settle on the same business day if submitted before 4:00 PM local cutoff time. Standard ACH bank-to-bank transfers take 1 to 3 business days, while instant payment rails (such as RTP, FedNow, or UPI) settle within seconds.',
    intentKeywords: ['wire transfer', 'ach', 'bank transfer', 'how long', 'settlement', 'send money', 'routing number', 'instant transfer'],
    helpfulCount: 119
  },
  {
    id: 'faq-9',
    category: 'Banking & Finance',
    question: 'How can I improve my credit score and check my credit report for free?',
    answer: 'You are entitled to free weekly credit reports from Equifax, Experian, and TransUnion through AnnualCreditReport.com. To raise your score, pay bills on time, keep your credit utilization ratio below 30% of your total limit, and avoid opening multiple new credit lines at once.',
    intentKeywords: ['credit score', 'credit report', 'fico', 'utilization', 'improve credit', 'equifax', 'experian', 'transunion'],
    helpfulCount: 138
  },

  // Healthcare
  {
    id: 'faq-10',
    category: 'Healthcare',
    question: 'What is the difference between a health insurance deductible, copay, and coinsurance?',
    answer: 'A deductible is the annual amount you pay out of pocket for covered medical services before your insurance starts paying. A copay is a fixed flat fee (for example, $25) paid at each doctor visit, while coinsurance is the percentage of costs (such as 20%) you share after meeting your deductible.',
    intentKeywords: ['deductible', 'copay', 'coinsurance', 'health insurance', 'out of pocket', 'medical bill', 'coverage', 'premium'],
    helpfulCount: 204
  },
  {
    id: 'faq-11',
    category: 'Healthcare',
    question: 'How do I request a prescription refill or transfer my prescription to another pharmacy?',
    answer: 'To refill a prescription, enter the Rx number on your medication label in your pharmacy portal or call the automated refill line at least 3 days before running out. To transfer pharmacies, give your new pharmacy the medication name, Rx number, and the phone number of your previous pharmacy.',
    intentKeywords: ['prescription', 'refill', 'pharmacy', 'medication', 'medicine', 'rx', 'transfer pharmacy', 'doctor renewal'],
    helpfulCount: 91
  },
  {
    id: 'faq-12',
    category: 'Healthcare',
    question: 'When should I choose an urgent care clinic instead of a hospital emergency room?',
    answer: 'Visit an urgent care clinic for non-life-threatening conditions such as sprains, minor cuts, ear infections, mild fevers, or sore throats, which costs significantly less and has shorter wait times. Go to an emergency room or call emergency services for chest pain, difficulty breathing, severe bleeding, or stroke symptoms.',
    intentKeywords: ['urgent care', 'emergency room', 'er', 'hospital', 'clinic', 'doctor visit', 'fever', 'injury', 'wait time'],
    helpfulCount: 127
  },
  {
    id: 'faq-13',
    category: 'Healthcare',
    question: 'How can I access my official vaccination records and lab test results online?',
    answer: 'Log in to your healthcare provider patient portal (such as MyChart) or your state immunization registry app. Lab results and immunization certificates can be viewed and downloaded as verifiable PDF or QR records within 24 to 48 hours of testing.',
    intentKeywords: ['vaccine', 'vaccination', 'immunization', 'lab results', 'blood test', 'medical records', 'patient portal', 'mychart'],
    helpfulCount: 83
  },

  // Travel & Transit
  {
    id: 'faq-14',
    category: 'Travel & Transit',
    question: 'What are the standard carry-on liquid rules and baggage limits for commercial flights?',
    answer: 'Passengers may bring liquids, gels, and aerosols in containers of 3.4 ounces (100 milliliters) or less, all fitting comfortably inside a single quart-sized clear zip-top bag. Most airlines allow one carry-on bag (up to 22 x 14 x 9 inches) and one personal item such as a backpack or laptop bag.',
    intentKeywords: ['carry-on', 'liquids', 'tsa', 'baggage', 'luggage', 'flight', 'airport security', '100ml', 'suitcase size'],
    helpfulCount: 192
  },
  {
    id: 'faq-15',
    category: 'Travel & Transit',
    question: 'Am I entitled to a refund or compensation if my flight is canceled or significantly delayed?',
    answer: 'If an airline cancels your flight or makes a significant schedule change (typically 3+ hours domestic or 6+ hours international) and you choose not to travel, you are legally entitled to a full cash refund for the unused ticket, even on non-refundable fares.',
    intentKeywords: ['flight delayed', 'canceled flight', 'airline refund', 'compensation', 'missed connection', 'voucher', 'overbooked'],
    helpfulCount: 175
  },
  {
    id: 'faq-16',
    category: 'Travel & Transit',
    question: 'How can I use contactless payment or a monthly transit pass on public buses and subways?',
    answer: 'Tap any contactless credit/debit card, smartphone wallet, or reloadable transit card on the turnstile or bus reader when boarding. Many metropolitan transit systems automatically cap your daily or weekly fares so you never pay more than the price of an unlimited pass.',
    intentKeywords: ['transit pass', 'subway', 'bus fare', 'contactless', 'metro card', 'commute', 'train ticket', 'fare cap'],
    helpfulCount: 69
  },

  // Consumer & Tech
  {
    id: 'faq-17',
    category: 'Consumer & Tech',
    question: 'What are my consumer rights for returning defective products or canceling a subscription?',
    answer: 'Under consumer protection regulations, defective or misrepresented goods are eligible for a full repair, replacement, or refund regardless of store "no return" policies. Recurring digital subscriptions must provide a simple online cancellation mechanism without requiring phone calls.',
    intentKeywords: ['return policy', 'refund', 'defective item', 'warranty', 'cancel subscription', 'consumer rights', 'exchange'],
    helpfulCount: 154
  },
  {
    id: 'faq-18',
    category: 'Consumer & Tech',
    question: 'How do I set up two-factor authentication (2FA) and protect my accounts from phishing?',
    answer: 'Enable Two-Factor Authentication (2FA) in your account security settings using an authenticator app (like Google Authenticator or Authy) or a hardware passkey rather than SMS codes. Always save your backup recovery codes offline and never click password-reset links from unexpected emails.',
    intentKeywords: ['2fa', 'two factor', 'authentication', 'password', 'security', 'phishing', 'hacked account', 'passkey', 'authenticator'],
    helpfulCount: 132
  },
  {
    id: 'faq-19',
    category: 'Consumer & Tech',
    question: 'Why is my home Wi-Fi connection slow and how can I boost router signal strength?',
    answer: 'Place your Wi-Fi router in an elevated, central open location away from thick concrete walls, microwaves, and cordless phones. Restart the modem and router, switch time-sensitive devices to the 5 GHz or 6 GHz band, and use a mesh repeater if your home exceeds 1,500 square feet.',
    intentKeywords: ['wifi', 'internet slow', 'router', 'signal', 'connection drop', 'bandwidth', '5ghz', 'modem', 'speed test'],
    helpfulCount: 110
  },
  {
    id: 'faq-20',
    category: 'Consumer & Tech',
    question: 'How do I back up my smartphone photos and contacts before switching to a new phone?',
    answer: 'Connect to Wi-Fi and open your device Settings > Cloud Backup (iCloud on iOS or Google One Backup on Android) and tap "Back Up Now". Ensure Photos, Contacts, and Messages are toggled on so your data restores automatically when signing into your new device.',
    intentKeywords: ['backup phone', 'transfer data', 'new phone', 'photos', 'contacts', 'icloud', 'google backup', 'restore'],
    helpfulCount: 88
  }
];
