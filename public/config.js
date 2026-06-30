// Runtime config — loaded optionally for Helping Agent API key
// Never commit API keys. Set GROK_API_KEY via deploy injection or local override.
if (typeof window !== "undefined") {
  window.GROK_API_KEY = window.GROK_API_KEY || undefined;
}