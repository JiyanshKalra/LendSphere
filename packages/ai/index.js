/**
 * AI Helper Functions for Lend Sphere
 * 
 * In a real-world scenario, these functions would wrap calls to an AI API 
 * like OpenAI (GPT-4), Anthropic (Claude), Google (Gemini), etc.
 * 
 * For this implementation, we simulate the AI behavior.
 */

/**
 * Feature 1: Improves a loan description text written by a borrower.
 * 
 * It takes a basic description and returns a more professional, 
 * compelling, and clear description to attract lenders.
 * 
 * @param {string} rawDescription - The original text written by the borrower.
 * @returns {Promise<string>} The AI-improved description.
 */
async function improveLoanDescription(rawDescription) {
  if (!rawDescription || rawDescription.trim().length === 0) {
    throw new Error("Cannot improve an empty description.");
  }

  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log(`[AI Package] Improving description: "${rawDescription.substring(0, 30)}..."`);

  // Simulate AI output simply by adding professional framing. 
  // In reality: const response = await openai.createChatCompletion({...})
  const improvedText = `
    Business / Personal Expansion Loan:
    
    We are seeking funding to support the following initiative:
    "${rawDescription.trim()}"
    
    By securing this microloan, we believe we can achieve significant growth and stability,
    ensuring a strong return on investment and a reliable schedule of repayments. 
    Thank you for considering funding our endeavor.
  `.trim().replace(/^ {4}/gm, ''); // Remove some indentation for clean output

  return improvedText;
}

/**
 * Feature 2: Generates a loan risk insight summary for lenders.
 * 
 * It takes borrower and loan details and generates a short paragraph 
 * summarizing the risk factors and strengths of the application.
 * 
 * @param {Object} data - Data on which to base the insight.
 * @param {number} data.loanScore - The calculated loan score (0-100).
 * @param {number} data.amount - The loan amount requested.
 * @param {number} data.termMonths - The repayment term in months.
 * @param {string} data.purpose - The purpose of the loan.
 * @returns {Promise<string>} A generated summary of the loan's risk profile.
 */
async function generateRiskInsightSummary(data) {
  const { loanScore, amount, termMonths, purpose } = data;

  if (loanScore === undefined || !amount || !termMonths) {
    throw new Error("Missing required data points to generate risk insight.");
  }

  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 900));

  console.log(`[AI Package] Generating insight for Loan Score: ${loanScore}, Amount: $${amount}`);

  let sentiment = '';
  if (loanScore >= 80) {
    sentiment = "The borrower exhibits a strong financial profile with low default probability.";
  } else if (loanScore >= 60) {
    sentiment = "The borrower presents moderate risk. Steady income history balances slightly higher debt-to-income levels.";
  } else {
    sentiment = "This is a high-yield/high-risk opportunity. Lenders should review collateral details carefully.";
  }

  const insight = `
AI Risk Summary:
Based on algorithmic analysis, this loan request for $${amount} over ${termMonths} months for "${purpose.substring(0, 50)}" received a score of ${loanScore}/100.
${sentiment}

Key factors considered:
- Assessed credit viability
- Repayment term length vs amount
- Declared loan purpose alignment with typical microloan success
  `.trim();

  return insight;
}

module.exports = {
  improveLoanDescription,
  generateRiskInsightSummary
};
