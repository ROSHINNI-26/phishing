import { Eye, Lock, ShieldQuestion, Bookmark, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SecurityTips() {
  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-200">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Lightbulb className="text-yellow-500 mr-3 w-5 h-5" />
          Security Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Eye className="text-security-blue w-5 h-5 mt-1" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Check the URL carefully</h4>
              <p className="text-gray-600 text-sm">Look for spelling errors, unusual domains, or suspicious characters in URLs.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Lock className="text-security-blue w-5 h-5 mt-1" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Verify HTTPS</h4>
              <p className="text-gray-600 text-sm">Legitimate sites use HTTPS encryption. Look for the padlock icon.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <ShieldQuestion className="text-security-blue w-5 h-5 mt-1" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Never share credentials</h4>
              <p className="text-gray-600 text-sm">Don't enter passwords or personal information on suspicious sites.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Bookmark className="text-security-blue w-5 h-5 mt-1" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Use bookmarks</h4>
              <p className="text-gray-600 text-sm">Access important sites through bookmarks rather than clicking links.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
