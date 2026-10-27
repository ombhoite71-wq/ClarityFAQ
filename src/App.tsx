/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Send,
  Search,
  Plus,
  RotateCcw,
  Trash2,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { INITIAL_FAQS, FAQItem } from './data/faqData';
import {
  matchUserQuestion,
  preprocessText,
  ChatbotQueryAnalysis
} from './utils/nlpEngine';

type ActiveView = 'chat' | 'faqs';
type CategoryFilter =
  | 'All'
  | 'Public Services'
  | 'Banking & Finance'
  | 'Healthcare'
  | 'Travel & Transit'
  | 'Consumer & Tech';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  analysis?: ChatbotQueryAnalysis;
}

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Public Services',
  'Banking & Finance',
  'Healthcare',
  'Travel & Transit',
  'Consumer & Tech'
];

const SAMPLE_QUESTIONS = [
  'My credit card was stolen, how do I freeze it?',
  'How long does passport renewal take?',
  'Difference between a copay and a deductible?',
  'My flight was canceled, can I get a refund?'
];

const STORAGE_KEY = 'clarity_faq_custom_dataset_v1';

export default function App() {
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to default dataset
    }
    return INITIAL_FAQS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(faqs));
    } catch {
      // Ignore storage errors
    }
  }, [faqs]);

  const [activeView, setActiveView] = useState<ActiveView>('chat');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNlpId, setExpandedNlpId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! Ask me any question about public services, banking, healthcare, travel, or consumer rights.'
    }
  ]);

  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Add FAQ Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<FAQItem['category']>('Public Services');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [formError, setFormError] = useState('');

  const handleSendQuestion = (queryText?: string) => {
    const raw = (queryText ?? chatInput).trim();
    if (!raw) return;

    const analysis = matchUserQuestion(raw, faqs, selectedCategory);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: raw
    };

    const botResponseText =
      analysis.isConfidentMatch && analysis.bestMatch
        ? analysis.bestMatch.faq.answer
        : 'I could not find a matching answer for that question. Try rephrasing with simpler keywords or browse the FAQs list.';

    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: botResponseText,
      analysis
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    if (!queryText) {
      setChatInput('');
    }
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  const handleClearChat = () => {
    setExpandedNlpId(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Hello! Ask me any question about public services, banking, healthcare, travel, or consumer rights.'
      }
    ]);
  };

  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim().length < 5 || newAnswer.trim().length < 5) {
      setFormError('Please enter both a question and an answer.');
      return;
    }

    const autoKeywords = preprocessText(newQuestion).lemmas;
    const createdFaq: FAQItem = {
      id: `faq-custom-${Date.now()}`,
      category: newCategory,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      intentKeywords: autoKeywords,
      helpfulCount: 1
    };

    setFaqs((prev) => [createdFaq, ...prev]);
    setNewQuestion('');
    setNewAnswer('');
    setFormError('');
    setIsAddModalOpen(false);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCat =
        selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      );
    });
  }, [faqs, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Minimal Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('chat');
            }}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            ClarityFAQ
          </a>

          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveView('chat')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'chat'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Chat
            </button>
            <button
              type="button"
              onClick={() => setActiveView('faqs')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'faqs'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Browse FAQs ({faqs.length})
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add FAQ
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Simple Topic Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {category === 'All' ? 'All Topics' : category}
            </button>
          ))}
        </div>

        {/* CHAT VIEW */}
        {activeView === 'chat' && (
          <div className="flex-1 bg-white border border-slate-200 rounded-xl flex flex-col min-h-[540px] max-h-[72vh]">
            {/* Top Bar inside Chat */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">
                {selectedCategory === 'All'
                  ? 'Searching across all public topics'
                  : `Topic: ${selectedCategory}`}
              </span>
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                const best = msg.analysis?.bestMatch;
                const isExpanded = expandedNlpId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-800 border border-slate-200/80'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Minimal Match Footer on Bot Replies */}
                      {!isUser && msg.analysis && best && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200/70">
                          <div className="flex items-center justify-between gap-4 text-xs text-slate-500 tabular-nums">
                            <span className="truncate">
                              {msg.analysis.isConfidentMatch
                                ? `Matched: “${best.faq.question}”`
                                : 'Low similarity match'}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedNlpId(isExpanded ? null : msg.id)
                              }
                              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium whitespace-nowrap shrink-0"
                            >
                              <span>
                                {(best.combinedScore * 100).toFixed(0)}% match
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {/* Optional Collapsible NLP Preprocessing Details */}
                          {isExpanded && (
                            <div className="mt-2.5 p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1 font-mono tabular-nums">
                              <div>
                                <span className="text-slate-400">Tokens: </span>
                                {msg.analysis.queryPreprocessing.tokens.join(', ') || '—'}
                              </div>
                              <div>
                                <span className="text-slate-400">Lemmas: </span>
                                {msg.analysis.queryPreprocessing.lemmas.join(', ') || '—'}
                              </div>
                              <div>
                                <span className="text-slate-400">Cosine similarity: </span>
                                {(best.combinedScore * 100).toFixed(1)}%
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Sample Prompts */}
            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2 overflow-x-auto">
              {SAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendQuestion(q)}
                  className="px-2.5 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-slate-400 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuestion();
              }}
              className="p-3 bg-white border-t border-slate-200 rounded-b-xl flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-slate-900 transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                Send
              </button>
            </form>
          </div>
        )}

        {/* BROWSE FAQS VIEW */}
        {activeView === 'faqs' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
              />
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
                No matching FAQs found.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1">
                      <span>{faq.category}</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            handleSendQuestion(faq.question);
                            setActiveView('chat');
                          }}
                          className="text-slate-600 hover:text-slate-900 font-medium"
                        >
                          Ask in Chat
                        </button>
                        {faq.id.startsWith('faq-custom-') && (
                          <button
                            type="button"
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="text-slate-400 hover:text-red-600"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add FAQ Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Add New FAQ</h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFaqSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Topic
                </label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as FAQItem['category'])
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900"
                >
                  <option value="Public Services">Public Services</option>
                  <option value="Banking & Finance">Banking &amp; Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Travel & Transit">Travel &amp; Transit</option>
                  <option value="Consumer & Tech">Consumer &amp; Tech</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g., How do I replace a lost driver license?"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Answer
                </label>
                <textarea
                  rows={3}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Enter a clear, concise answer..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-slate-900"
                />
              </div>

              {formError && (
                <p className="text-xs text-red-600">{formError}</p>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
