import { format } from "date-fns";
import { Check, AlertTriangle, Tag, Database, Clock, Ban, CircleAlert, Info, RotateCcw, ShieldCheck, ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { UrlCheckResult } from "@shared/schema";

interface ResultsDisplayProps {
  result: UrlCheckResult;
  onReset: () => void;
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const formattedDate = format(new Date(result.analysisDetails.lastChecked), "PPpp");

  if (result.isPhishing) {
    return (
      <div className="space-y-6 mb-8">
        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-danger-red rounded-2xl">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-danger-red rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-800 mb-2 flex items-center" data-testid="text-phishing-detected">
                  <ShieldX className="mr-2 w-6 h-6" />
                  Phishing Detected - Dangerous!
                </h3>
                <p className="text-red-700 text-lg mb-4">
                  <strong>Warning:</strong> This URL has been identified as a phishing site. Do not enter personal information or credentials.
                </p>
                
                {result.analysisDetails.threats.length > 0 && (
                  <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <Info className="mr-1 w-4 h-4" />
                      Detected Threats:
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {result.analysisDetails.threats.map((threat, index) => (
                        <li key={index}>• {threat}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Ban className="text-danger-red w-4 h-4" />
                      <span className="font-semibold text-red-800">Security Status</span>
                    </div>
                    <p className="text-sm text-red-700">High Risk</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CircleAlert className="text-danger-red w-4 h-4" />
                      <span className="font-semibold text-red-800">Threat Level</span>
                    </div>
                    <p className="text-sm text-red-700">Critical</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="text-danger-red w-4 h-4" />
                      <span className="font-semibold text-red-800">Last Updated</span>
                    </div>
                    <p className="text-sm text-red-700" data-testid="text-last-checked">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button
            onClick={onReset}
            data-testid="button-check-another"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Check Another URL</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-safe-green rounded-2xl">
        <CardContent className="p-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-safe-green rounded-full flex items-center justify-center">
                <Check className="text-white w-8 h-8" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-800 mb-2 flex items-center" data-testid="text-safe-legitimate">
                <ShieldCheck className="mr-2 w-6 h-6" />
                Safe & Legitimate
              </h3>
              <p className="text-green-700 text-lg mb-4">
                This URL appears to be safe and legitimate. No phishing indicators were detected.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="text-safe-green w-4 h-4" />
                    <span className="font-semibold text-green-800">SSL Tag</span>
                  </div>
                  <p className="text-sm text-green-700">Valid & Secure</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database className="text-safe-green w-4 h-4" />
                    <span className="font-semibold text-green-800">Reputation</span>
                  </div>
                  <p className="text-sm text-green-700">{result.analysisDetails.reputation}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="text-safe-green w-4 h-4" />
                    <span className="font-semibold text-green-800">Last Checked</span>
                  </div>
                  <p className="text-sm text-green-700" data-testid="text-last-checked">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button
          onClick={onReset}
          data-testid="button-check-another"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Check Another URL</span>
        </Button>
      </div>
    </div>
  );
}
