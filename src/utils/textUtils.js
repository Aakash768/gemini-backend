export const cleanText = (text) => text.replace(/[^a-zA-Z0-9]/g, '');
export const extractSummaryFromResponse = (response) => {
  try {
    console.log("Processing API Response:", JSON.stringify(response, null, 2));

    // Check if candidates array exists and has data
    if (!response.candidates || !response.candidates.length) {
      throw new Error("No candidates found in the response");
    }

    const firstCandidate = response.candidates[0];

    // Check if 'content' and 'parts' exist
    if (!firstCandidate.content || !firstCandidate.content.parts || !firstCandidate.content.parts.length) {
      throw new Error("Unexpected response structure: Missing content parts");
    }

    return {
      text: firstCandidate.content.parts[0].text.replace(/[#*_`]/g, ''),
      tokenCount: response.usageMetadata?.totalTokenCount || 0,
      promptTokens: response.usageMetadata?.promptTokenCount || 0,
      responseTokens: response.usageMetadata?.candidatesTokenCount || 0
    };
  } catch (error) {
    console.error("Error extracting summary:", error.message);
    throw new Error(`Failed to process API response: ${error.message}`);
  }
};
