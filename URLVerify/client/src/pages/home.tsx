import { useState } from "react";
import { UrlCheckerForm } from "@/components/url-checker-form";
import { LoadingState } from "@/components/loading-state";
import { ResultsDisplay } from "@/components/results-display";
import { SecurityTips } from "@/components/security-tips";
import { Shield, CheckCircle } from "lucide-react";
import type { UrlCheckResult } from "@shared/schema";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UrlCheckResult | null>(null);

  const handleAnalysisStart = () => {
    setIsLoading(true);
    setResult(null);
  };

  const handleAnalysisComplete = (result: UrlCheckResult) => {
    setIsLoading(false);
    setResult(result);
  };

  const handleReset = () => {
    setIsLoading(false);
    setResult(null);
  };

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-security-blue rounded-lg flex items-center justify-center">
                <Shield className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PhishGuard</h1>
                <p className="text-sm text-gray-500">Advanced URL Security Detection</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="text-safe-green w-4 h-4" />
              <span>Real-time Protection</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Protect Yourself from Phishing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter any URL below to instantly check if it's safe or potentially dangerous. Our advanced detection system analyzes thousands of security indicators.
          </p>
        </div>

        {/* URL Checker Form */}
        {!isLoading && !result && (
          <UrlCheckerForm 
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Results */}
        {result && (
          <ResultsDisplay 
            result={result} 
            onReset={handleReset}
          />
        )}

        {/* Security Tips */}
        <SecurityTips />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-security-blue rounded-lg flex items-center justify-center">
                <Shield className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-semibold">PhishGuard</span>
            </div>
            <p className="text-gray-400 text-sm">Protecting users from phishing attacks with advanced URL detection technology.</p>
            <div className="mt-4 text-xs text-gray-500">
              © 2024 PhishGuard. Built for security and peace of mind.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
