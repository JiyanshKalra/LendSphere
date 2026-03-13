# Lend Sphere

Lend Sphere is a peer-to-peer lending and microloan marketplace platform. It connects borrowers seeking loans with investors looking to fund them.

## Project Architecture

The project is architected as a monorepo to seamlessly manage both frontend and backend codebases, along with shared libraries. 

### Tech Stack
- **Frontend**: Next.js (React)
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Package Management**: npm workspaces

## Modules

The workspace is divided into specific applications and shared packages:

### Applications (`apps/`)
- **`web`**: The user-facing frontend application built with Next.js. It handles the UI for borrowers and investors (pages, components, hooks, services).
- **`api`**: The core Node.js/Express backend API. It manages business logic, database interactions, and integrations. It contains directories for `controllers`, `models`, `routes`, `services`, `middleware`, `utils`, and `validators`.

### Packages (`packages/`)
- **`ai`**: A shared library for AI logic and algorithms. This is extracted into a package so it can be utilized by the API or potentially other future applications.
- **`contracts`**: A shared library containing common types, interfaces, and data structures (or potentially blockchain smart contracts) utilized across the entire monorepo.

## Loan Lifecycle

A typical loan within Lend Sphere progresses through the following stages:

1. **Application**: A prospective borrower submits a loan request, detailing the desired loan amount, term duration (in months), and the purpose of the loan.
2. **Scoring & Risk Assessment**: The system calculates a Loan Score based on the borrower's financial profile. A risk tier and recommended interest rate are assigned based on this score.
3. **Marketplace Listing**: If the application meets the platform's baseline criteria, the loan request is listed on the marketplace.
4. **Funding/Offering**: Investors browse the marketplace, review borrower profiles and risk tiers, and submit funding offers towards the loan.
5. **Origination (Active)**: Once the required loan amount is fully funded by one or more investors, the loan is formally originated, and funds are disbursed to the borrower.
6. **Repayment**: The borrower makes fixed scheduled monthly payments, which are distributed back to the investors (principal + interest).
7. **Completion**: The loan reaches maturity and is marked as closed once all scheduled payments are completed successfully.

## Loan Score System

To facilitate responsible lending, Lend Sphere employs a foundational Loan Scoring system that evaluates borrower risk. It generates a score from 0 to 100 based on three core factors:
- **Credit Score** (worth up to 40 points)
- **Debt-to-Income (DTI) Ratio** (worth up to 30 points)
- **Employment History** (worth up to 30 points)

The resulting score translates into a **Risk Tier**:
- **Tier A** (Score 85+): Lowest risk, qualifies for the lowest base interest rates.
- **Tier B** (Score 70-84): Low/Medium risk.
- **Tier C** (Score 50-69): Medium/High risk.
- **Tier D** (Score < 50): Highest risk, incurs the highest risk premium on interest rates.

## How to Run the Project

1. **Install Dependencies**
   Navigate to the root directory (`Lend Sphere/`) and install all workspace dependencies:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Set up your environment variables. In the `apps/api` directory, create a `.env` file that includes your necessary configuration (e.g., `MONGODB_URI`, `PORT`, `JWT_SECRET`).

3. **Start Development Servers**
   You can start all applications simultaneously from the root directory using the workspace script:
   ```bash
   npm run dev
   ```

   Alternatively, you can start the frontend and backend individually:
   - For the API: `cd apps/api && npm run dev`
   - For the Web App: `cd apps/web && npm run dev`
