import { FAQItem } from '../data/faqData';

// Standard NLTK English Stopwords set
export const ENGLISH_STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
  'below', 'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does',
  'doing', 'don', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'isn', 'it', 'its',
  'itself', 'just', 'me', 'might', 'more', 'most', 'must', 'my', 'myself',
  'need', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 're', 's', 'same',
  'shan', 'she', 'should', 'so', 'some', 'such', 't', 'than', 'that', 'the',
  'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very',
  'was', 'wasn', 'we', 'were', 'weren', 'what', 'when', 'where', 'which',
  'while', 'who', 'whom', 'why', 'will', 'with', 'won', 'would', 'you', 'your',
  'yours', 'yourself', 'yourselves', 'please', 'tell', 'know', 'want', 'get'
]);

// Irregular & Domain Lemma Dictionary (SpaCy / WordNet style lookup)
const LEMMA_DICTIONARY: Record<string, string> = {
  renewing: 'renew',
  renewed: 'renew',
  renewal: 'renew',
  renewals: 'renew',
  passports: 'passport',
  expired: 'expire',
  expiring: 'expire',
  expiration: 'expire',
  registered: 'register',
  registering: 'register',
  registration: 'register',
  voting: 'vote',
  voters: 'voter',
  voted: 'vote',
  elections: 'election',
  addresses: 'address',
  libraries: 'library',
  books: 'book',
  documents: 'document',
  taxes: 'tax',
  filing: 'file',
  filed: 'file',
  deadlines: 'deadline',
  extensions: 'extension',
  potholes: 'pothole',
  streetlights: 'streetlight',
  cards: 'card',
  stolen: 'steal',
  stealing: 'steal',
  lost: 'lose',
  losing: 'lose',
  missing: 'lose',
  freezing: 'freeze',
  frozen: 'freeze',
  locked: 'lock',
  locking: 'lock',
  blocked: 'block',
  blocking: 'block',
  disputing: 'dispute',
  disputed: 'dispute',
  disputes: 'dispute',
  charges: 'charge',
  charged: 'charge',
  charging: 'charge',
  transactions: 'transaction',
  transfers: 'transfer',
  transferring: 'transfer',
  transferred: 'transfer',
  wires: 'wire',
  scores: 'score',
  reports: 'report',
  reporting: 'report',
  deductibles: 'deductible',
  copays: 'copay',
  copayment: 'copay',
  prescriptions: 'prescription',
  medications: 'medication',
  medicines: 'medicine',
  refills: 'refill',
  refilling: 'refill',
  pharmacies: 'pharmacy',
  clinics: 'clinic',
  hospitals: 'hospital',
  emergencies: 'emergency',
  vaccines: 'vaccine',
  vaccinated: 'vaccine',
  vaccinations: 'vaccine',
  immunizations: 'vaccine',
  results: 'result',
  records: 'record',
  liquids: 'liquid',
  bags: 'bag',
  baggage: 'bag',
  luggage: 'bag',
  flights: 'flight',
  flying: 'flight',
  delayed: 'delay',
  delays: 'delay',
  canceled: 'cancel',
  cancelled: 'cancel',
  canceling: 'cancel',
  cancelling: 'cancel',
  cancellation: 'cancel',
  refunds: 'refund',
  refunded: 'refund',
  buses: 'bus',
  subways: 'subway',
  trains: 'train',
  passes: 'pass',
  fares: 'fare',
  tickets: 'ticket',
  products: 'product',
  items: 'item',
  returning: 'return',
  returned: 'return',
  returns: 'return',
  subscriptions: 'subscription',
  passwords: 'password',
  accounts: 'account',
  hacked: 'hack',
  routers: 'router',
  signals: 'signal',
  connections: 'connection',
  slower: 'slow',
  slowest: 'slow',
  phones: 'phone',
  smartphones: 'phone',
  photos: 'photo',
  pictures: 'photo',
  contacts: 'contact',
  backing: 'backup',
  backed: 'backup'
};

// Synonym mapping to unify common general-public phrasing with canonical lemmas
const INTENT_SYNONYMS: Record<string, string> = {
  // Banking
  scammed: 'fraud',
  scam: 'fraud',
  unrecognized: 'unauthorized',
  double: 'duplicate',
  twice: 'duplicate',
  plastic: 'card',
  money: 'transfer',
  fico: 'credit',
  // Public
  town: 'city',
  municipal: 'city',
  garbage: 'trash',
  rubbish: 'trash',
  id: 'document',
  // Health
  dr: 'doctor',
  physician: 'doctor',
  er: 'emergency',
  pills: 'prescription',
  drug: 'medication',
  drugs: 'medication',
  shot: 'vaccine',
  jab: 'vaccine',
  // Travel
  plane: 'flight',
  airline: 'flight',
  airport: 'flight',
  suitcase: 'bag',
  carryon: 'carry-on',
  metro: 'subway',
  underground: 'subway',
  // Tech
  internet: 'wifi',
  wireless: 'wifi',
  broken: 'defective',
  damaged: 'defective',
  faulty: 'defective',
  otp: '2fa',
  mfa: '2fa'
};

export interface NLPPreprocessingResult {
  rawText: string;
  cleanedText: string;
  tokens: string[];
  stopwordsRemoved: string[];
  filteredTokens: string[];
  lemmas: string[];
}

export interface FAQMatchResult {
  faq: FAQItem;
  cosineSimilarity: number;
  intentOverlapScore: number;
  combinedScore: number;
  matchedTerms: string[];
}

export interface ChatbotQueryAnalysis {
  queryPreprocessing: NLPPreprocessingResult;
  topMatches: FAQMatchResult[];
  bestMatch: FAQMatchResult | null;
  isConfidentMatch: boolean;
  vectorDimensionCount: number;
  queryTopTfIdfTerms: Array<{ term: string; weight: number }>;
}

/**
 * Step 1: Clean and normalize text (contractions, lowercase, punctuation removal)
 */
export function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/can't|cannot/g, 'can not')
    .replace(/won't/g, 'will not')
    .replace(/n't/g, ' not')
    .replace(/'re/g, ' are')
    .replace(/'s/g, ' is')
    .replace(/'ve/g, ' have')
    .replace(/'ll/g, ' will')
    .replace(/'d/g, ' would')
    .replace(/wi-fi/g, 'wifi')
    .replace(/carry-on/g, 'carryon')
    .replace(/two-factor/g, 'two factor')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Step 2: Word Tokenization (NLTK / SpaCy word boundary split)
 */
export function tokenize(cleanedText: string): string[] {
  if (!cleanedText) return [];
  return cleanedText.split(' ').filter(Boolean);
}

/**
 * Step 3: Lemmatization & Morphological Stemming
 */
export function lemmatizeWord(word: string): string {
  if (LEMMA_DICTIONARY[word]) {
    const mapped = LEMMA_DICTIONARY[word];
    return INTENT_SYNONYMS[mapped] || mapped;
  }
  if (INTENT_SYNONYMS[word]) {
    return INTENT_SYNONYMS[word];
  }

  let stem = word;
  if (stem.length > 5 && stem.endsWith('ies')) {
    stem = stem.slice(0, -3) + 'y';
  } else if (stem.length > 5 && stem.endsWith('ing')) {
    stem = stem.slice(0, -3);
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      stem = stem.slice(0, -1);
    }
  } else if (stem.length > 4 && stem.endsWith('ed')) {
    stem = stem.slice(0, -2);
  } else if (stem.length > 4 && stem.endsWith('es')) {
    stem = stem.slice(0, -2);
  } else if (stem.length > 3 && stem.endsWith('s') && !stem.endsWith('ss')) {
    stem = stem.slice(0, -1);
  }

  if (LEMMA_DICTIONARY[stem]) {
    stem = LEMMA_DICTIONARY[stem];
  }
  if (INTENT_SYNONYMS[stem]) {
    stem = INTENT_SYNONYMS[stem];
  }

  return stem;
}

/**
 * Complete NLP Preprocessing Pipeline
 */
export function preprocessText(rawText: string): NLPPreprocessingResult {
  const cleanedText = cleanText(rawText);
  const tokens = tokenize(cleanedText);
  const stopwordsRemoved: string[] = [];
  const filteredTokens: string[] = [];

  for (const token of tokens) {
    if (ENGLISH_STOPWORDS.has(token)) {
      stopwordsRemoved.push(token);
    } else {
      filteredTokens.push(token);
    }
  }

  const lemmas = filteredTokens.map(lemmatizeWord);

  return {
    rawText,
    cleanedText,
    tokens,
    stopwordsRemoved,
    filteredTokens,
    lemmas
  };
}

/**
 * Build TF-IDF vectors and compute Cosine Similarity across all FAQs
 */
export function matchUserQuestion(
  userQuery: string,
  faqs: FAQItem[],
  categoryFilter: string = 'All'
): ChatbotQueryAnalysis {
  const candidateFaqs =
    categoryFilter === 'All'
      ? faqs
      : faqs.filter((f) => f.category === categoryFilter);

  const queryPreprocessing = preprocessText(userQuery);
  const queryLemmas = queryPreprocessing.lemmas;

  // Preprocess each FAQ document (Question weighted 2x + Answer + Intent Keywords weighted 2x)
  const faqDocs = candidateFaqs.map((faq) => {
    const qPrep = preprocessText(faq.question);
    const aPrep = preprocessText(faq.answer);
    const kPrep = preprocessText(faq.intentKeywords.join(' '));

    // Combine lemmas with higher emphasis on question & intent terms
    const combinedLemmas = [
      ...qPrep.lemmas,
      ...qPrep.lemmas,
      ...kPrep.lemmas,
      ...kPrep.lemmas,
      ...aPrep.lemmas
    ];

    const questionAndKeywordSet = new Set([...qPrep.lemmas, ...kPrep.lemmas]);

    return {
      faq,
      lemmas: combinedLemmas,
      questionAndKeywordSet
    };
  });

  // Build vocabulary
  const vocabSet = new Set<string>(queryLemmas);
  for (const doc of faqDocs) {
    for (const lemma of doc.lemmas) {
      vocabSet.add(lemma);
    }
  }
  const vocab = Array.from(vocabSet);
  const totalDocs = faqDocs.length + 1;

  // Document Frequency (DF)
  const docFreq: Record<string, number> = {};
  for (const term of vocab) {
    let count = queryLemmas.includes(term) ? 1 : 0;
    for (const doc of faqDocs) {
      if (doc.lemmas.includes(term)) count++;
    }
    docFreq[term] = count;
  }

  // Inverse Document Frequency (Smoothed IDF: log((1 + N) / (1 + df)) + 1)
  const idf: Record<string, number> = {};
  for (const term of vocab) {
    idf[term] = Math.log((1 + totalDocs) / (1 + (docFreq[term] || 1))) + 1;
  }

  // Helper to compute normalized TF-IDF vector
  const computeTfIdfVector = (lemmas: string[]): Record<string, number> => {
    const tf: Record<string, number> = {};
    for (const l of lemmas) {
      tf[l] = (tf[l] || 0) + 1;
    }
    const vec: Record<string, number> = {};
    let normSq = 0;
    const len = lemmas.length || 1;
    for (const term of Object.keys(tf)) {
      const weight = (tf[term] / len) * (idf[term] || 1);
      vec[term] = weight;
      normSq += weight * weight;
    }
    const norm = Math.sqrt(normSq) || 1;
    for (const term of Object.keys(vec)) {
      vec[term] = vec[term] / norm;
    }
    return vec;
  };

  const queryVec = computeTfIdfVector(queryLemmas);

  const queryTopTfIdfTerms = Object.entries(queryVec)
    .map(([term, weight]) => ({ term, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 6);

  // Score each FAQ using Cosine Similarity + Intent Keyword Overlap
  const results: FAQMatchResult[] = faqDocs.map((doc) => {
    const docVec = computeTfIdfVector(doc.lemmas);

    // Dot product of L2-normalized vectors = Cosine Similarity
    let cosineSim = 0;
    const matchedTermsSet = new Set<string>();

    for (const term of Object.keys(queryVec)) {
      if (docVec[term]) {
        cosineSim += queryVec[term] * docVec[term];
        matchedTermsSet.add(term);
      }
    }

    // Also check substring / prefix match for partial words & intent overlap
    let intentHits = 0;
    for (const qLemma of queryLemmas) {
      if (doc.questionAndKeywordSet.has(qLemma)) {
        intentHits += 1;
        matchedTermsSet.add(qLemma);
      } else {
        for (const kLemma of doc.questionAndKeywordSet) {
          if (
            (qLemma.length >= 4 && kLemma.startsWith(qLemma)) ||
            (kLemma.length >= 4 && qLemma.startsWith(kLemma))
          ) {
            intentHits += 0.75;
            matchedTermsSet.add(qLemma);
            break;
          }
        }
      }
    }

    const uniqueQueryTerms = new Set(queryLemmas).size || 1;
    const intentOverlapScore = Math.min(1, intentHits / uniqueQueryTerms);

    // Combined similarity score prioritizing TF-IDF cosine similarity boosted by direct intent alignment
    const combinedScore =
      queryLemmas.length === 0
        ? 0
        : Math.min(0.99, cosineSim * 0.65 + intentOverlapScore * 0.35);

    return {
      faq: doc.faq,
      cosineSimilarity: cosineSim,
      intentOverlapScore,
      combinedScore,
      matchedTerms: Array.from(matchedTermsSet)
    };
  });

  results.sort((a, b) => b.combinedScore - a.combinedScore);

  const bestMatch = results.length > 0 ? results[0] : null;
  const isConfidentMatch = Boolean(bestMatch && bestMatch.combinedScore >= 0.16);

  return {
    queryPreprocessing,
    topMatches: results.slice(0, 5),
    bestMatch,
    isConfidentMatch,
    vectorDimensionCount: vocab.length,
    queryTopTfIdfTerms
  };
}

/**
 * Generates a complete, self-contained Python script (NLTK + SpaCy + Scikit-Learn Cosine Similarity)
 * populated with the user's current FAQ dataset so they can also run or submit the Python file directly.
 */
export function generatePythonScript(faqs: FAQItem[]): string {
  const serializedFaqs = JSON.stringify(
    faqs.map((f) => ({
      category: f.category,
      question: f.question,
      answer: f.answer,
      keywords: f.intentKeywords.join(', ')
    })),
    null,
    4
  );

  return `"""
TASK 2: Chatbot for FAQs
NLP Preprocessing (NLTK / SpaCy) + TF-IDF Cosine Similarity Matching
"""

import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Ensure required NLTK resources are downloaded
for resource in ['punkt', 'punkt_tab', 'stopwords', 'wordnet']:
    nltk.download(resource, quiet=True)

# 1. Collect FAQs related to everyday public topics
FAQ_DATASET = ${serializedFaqs}

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# 2. Preprocess the text using NLP (tokenize, clean, remove stopwords, lemmatize)
def preprocess_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9\\s]", " ", text)
    tokens = word_tokenize(text)
    cleaned_tokens = [
        lemmatizer.lemmatize(token)
        for token in tokens
        if token not in stop_words and token not in string.punctuation
    ]
    return " ".join(cleaned_tokens)

# Build corpus combining FAQ question and intent keywords
corpus = [
    preprocess_text(item["question"] + " " + item["keywords"])
    for item in FAQ_DATASET
]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(corpus)

# 3. Match user questions with the most similar FAQ using Cosine Similarity
def get_best_faq_response(user_query: str, threshold: float = 0.18):
    processed_query = preprocess_text(user_query)
    if not processed_query.strip():
        return None, 0.0

    query_vec = vectorizer.transform([processed_query])
    similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
    best_idx = int(similarities.argmax())
    best_score = float(similarities[best_idx])

    if best_score < threshold:
        return None, best_score

    return FAQ_DATASET[best_idx], best_score

# 4. Interactive CLI Chat Loop
if __name__ == "__main__":
    print("====================================================")
    print(" ClarityFAQ — NLP FAQ Chatbot (Type 'exit' to quit)")
    print("====================================================")
    while True:
        user_input = input("\\nYou: ").strip()
        if user_input.lower() in ("exit", "quit", "q"):
            print("Bot: Goodbye!")
            break
        match, score = get_best_faq_response(user_input)
        if match:
            print(f"Bot ({score * 100:.1f}% similarity): {match['answer']}")
        else:
            print("Bot: I could not find a close match. Please try rephrasing your question.")
`;
}
