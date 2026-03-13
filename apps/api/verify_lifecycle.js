const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let token = '';
let borrowerId = '';
let lenderId = '';
let loanId = '';
let offerId = '';

const log = (msg) => console.log(`[VERIFY] ${msg}`);

async function run() {
  try {
    log('Starting Loan Lifecycle Verification...');

    // 1. Register/Login Borrower
    log('Logging in borrower...');
    const bLogin = await axios.post(`${API_URL}/auth/login`, {
      email: 'borrower@example.com',
      password: 'password123'
    }).catch(async () => {
       log('Borrower not found, registering...');
       return await axios.post(`${API_URL}/auth/register`, {
         name: 'Borrower Test',
         email: 'borrower@example.com',
         password: 'password123',
         role: 'borrower'
       });
    });
    token = bLogin.data.token;
    borrowerId = bLogin.data._id;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 2. Create Loan
    log('Creating loan...');
    const loanRes = await axios.post(`${API_URL}/loans`, {
      amount: 10000,
      purpose: 'Verification Test',
      repaymentPeriod: 6,
      borrowerId: borrowerId
    });
    loanId = loanRes.data.data._id;
    log(`Loan created with ID: ${loanId}, status: ${loanRes.data.data.status}`);

    // 3. Open for Offers
    log('Opening loan for offers...');
    const openRes = await axios.patch(`${API_URL}/loans/${loanId}/open`);
    log(`Loan status: ${openRes.data.data.status}`);

    // 3.5 Verify Marketplace visibility
    log('Verifying Marketplace visibility...');
    const marketplaceRes = await axios.get(`${API_URL}/loans?status=open_for_offers`);
    const foundInMarketplace = marketplaceRes.data.data.some(l => l._id === loanId);
    log(`Loan found in marketplace: ${foundInMarketplace}`);

    // 4. Register/Login Lender
    log('Logging in lender...');
    const lLogin = await axios.post(`${API_URL}/auth/login`, {
      email: 'lender@example.com',
      password: 'password123'
    }).catch(async () => {
       log('Lender not found, registering...');
       return await axios.post(`${API_URL}/auth/register`, {
         name: 'Lender Test',
         email: 'lender@example.com',
         password: 'password123',
         role: 'lender'
       });
    });
    const lenderToken = lLogin.data.token;
    lenderId = lLogin.data._id;
    
    // 5. Submit Offer
    log('Submitting offer...');
    const offerRes = await axios.post(`${API_URL}/offers`, {
      loanId: loanId,
      lenderId: lenderId,
      interestRate: 10,
      repaymentPeriod: 6
    }, {
      headers: { Authorization: `Bearer ${lenderToken}` }
    });
    offerId = offerRes.data.data._id;
    log(`Offer submitted with ID: ${offerId}`);

    // 6. Accept Offer
    log('Accepting offer...');
    const acceptRes = await axios.post(`${API_URL}/offers/${offerId}/accept`, {
      borrowerId: borrowerId
    });
    log(`Loan status: ${acceptRes.data.data.status || 'check loan details'}`);
    
    // Verify loan status
    const loanDetailRes = await axios.get(`${API_URL}/loans/${loanId}`);
    log(`Current loan status: ${loanDetailRes.data.data.status}`);

    // 7. Fund Loan
    log('Funding loan...');
    const fundRes = await axios.patch(`${API_URL}/loans/${loanId}/fund`);
    log(`Loan status: ${fundRes.data.data.status}`);

    // 7.5 Verify Chat integration
    log('Testing chat message...');
    await axios.post(`${API_URL}/messages`, {
      loanId: loanId,
      senderId: borrowerId,
      message: 'Hello from verification script'
    });
    const chatRes = await axios.get(`${API_URL}/loans/${loanId}/messages`);
    log(`Messages in chat: ${chatRes.data.count}`);

    // 8. Make Repayment (partial)
    log('Making partial repayment...');
    const repay1Res = await axios.post(`${API_URL}/repayments`, {
      loanId: loanId,
      amountPaid: 5000
    });
    log(`Repayment recorded. Loan status: ${repay1Res.data.data.status || 'check loan details'}`);
    
    const loanDetailRes2 = await axios.get(`${API_URL}/loans/${loanId}`);
    log(`Current loan status: ${loanDetailRes2.data.data.status}`);

    // 9. Make Repayment (full)
    log('Making full repayment...');
    const repay2Res = await axios.post(`${API_URL}/repayments`, {
      loanId: loanId,
      amountPaid: 5000,
      remainingBalance: 0
    });
    log(`Repayment recorded. Loan status: ${repay2Res.data.data.status || 'check loan details'}`);

    const finalLoanRes = await axios.get(`${API_URL}/loans/${loanId}`);
    log(`Final loan status: ${finalLoanRes.data.data.status}`);

    if (finalLoanRes.data.data.status === 'completed') {
      log('SUCCESS: Loan lifecycle fully verified!');
    } else {
      log('FAILURE: Loan status did not reach "completed"');
    }

  } catch (err) {
    log('ERROR during verification:');
    if (err.response) {
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

run();
