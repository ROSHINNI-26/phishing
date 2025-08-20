import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link2, Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { urlCheckSchema, type UrlCheckRequest, type UrlCheckResult } from "@shared/schema";

interface UrlCheckerFormProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: UrlCheckResult) => void;
}

export function UrlCheckerForm({ onAnalysisStart, onAnalysisComplete }: UrlCheckerFormProps) {
  const { toast } = useToast();
  
  const form = useForm<UrlCheckRequest>({
    resolver: zodResolver(urlCheckSchema),
    defaultValues: {
      url: ""
    }
  });

  const checkUrlMutation = useMutation({
    mutationFn: async (data: UrlCheckRequest) => {
      const response = await apiRequest("POST", "/api/check-url", data);
      return response.json() as Promise<UrlCheckResult>;
    },
    onSuccess: (result) => {
      onAnalysisComplete(result);
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Unable to analyze the URL. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UrlCheckRequest) => {
    onAnalysisStart();
    checkUrlMutation.mutate(data);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8">
      <CardContent className="p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="url" className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Link2 className="text-security-blue mr-2 w-4 h-4" />
              Enter URL to Check
            </Label>
            <div className="relative">
              <Input
                id="url"
                type="text"
                placeholder="https://example.com"
                data-testid="input-url"
                className="w-full px-4 py-4 pr-12 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-security-blue focus:border-security-blue transition-all duration-200 bg-gray-50 focus:bg-white"
                {...form.register("url")}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Globe className="text-gray-400 w-5 h-5" />
              </div>
            </div>
            {form.formState.errors.url && (
              <p className="mt-2 text-sm text-danger-red flex items-center">
                <span className="mr-1">⚠️</span>
                {form.formState.errors.url.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            data-testid="button-check-url"
            disabled={checkUrlMutation.isPending}
            className="w-full bg-security-blue hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            <span>Check URL Security</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
