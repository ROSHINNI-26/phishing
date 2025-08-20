import type { Express } from "express";
import { createServer, type Server } from "http";
import { urlCheckSchema, type UrlCheckResult } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // URL Security Check endpoint
  app.post("/api/check-url", async (req, res) => {
    try {
      const { url } = urlCheckSchema.parse(req.body);
      
      // Mock phishing detection logic
      const lowerUrl = url.toLowerCase();
      const knownPhishingPatterns = [
        'paypal-secure',
        'amazon-verify',
        'microsoft-login',
        'google-security',
        'bank-update',
        'secure-login',
        'verify-account',
        'suspicious',
        'phishing',
        'fake'
      ];

      // Simulate analysis delay (1-3 seconds)
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const isPhishing = knownPhishingPatterns.some(pattern => 
        lowerUrl.includes(pattern)
      ) || Math.random() < 0.2; // 20% chance for demo

      const result: UrlCheckResult = {
        url,
        isPhishing,
        threatLevel: isPhishing ? "dangerous" : "safe",
        analysisDetails: {
          sslValid: !isPhishing,
          reputation: isPhishing ? "High Risk" : "Clean Record",
          threats: isPhishing ? [
            "Suspicious domain registration patterns",
            "Mimics legitimate website appearance", 
            "Contains credential harvesting forms",
            "Listed in phishing databases"
          ] : [],
          lastChecked: new Date().toISOString()
        }
      };

      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Invalid request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
