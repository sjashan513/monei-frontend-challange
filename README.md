# MONEI Frontend Challenge - High-Performance Dashboard 🚀

A robust and scalable dashboard application built with **React**, **TypeScript**, and **Apollo Client**, designed for efficient financial transaction management under "Enterprise" quality standards.

## 🧠 Development Philosophy: An "AI-Collaborative" Approach

I want to be transparent: **I have used AI (Gemini) as a Senior Architect partner during the development of this project.** Instead of simply asking for code, I used the AI as a debate partner to explore different frontend architectures. We analyzed various solutions (Standard MVC vs. Hexagonal, Local State vs. URL-driven management), weighed the trade-offs regarding maintainability and User Experience (UX), and collectively decided on the architecture detailed below.

**The Power of Iterative Learning:** The core benefit of this approach was an incredibly fast feedback loop. It allowed me to dive deep into advanced concepts like **Apollo Cache Normalization** and **Hexagonal Architecture** in a practical and immediate way. By rapidly prototyping and discussing trade-offs, I ensured the final solution wasn't just functional, but followed modern, highly-scalable industry best practices.

## 🛡️ Engineering Trade-offs & System Evaluation

Before writing the first component, we evaluated the technical challenges of the MONEI ecosystem. Here is the journey of how we arrived at the final design:

### 1. The State Dilemma: URL vs. Local State?

We needed to manage complex filters (date ranges and statuses). We evaluated two options:

- **React State (useState/Context):** Fast in-memory filters.
  - _Verdict:_ Rejected. State is lost on refresh and it doesn't allow sharing specific filtered views.
- **URL-Based State (useSearchParams):** The "Winner."
  - _Reason:_ It enables **Deep Linking**. It allows a user to filter failed transactions from the last week and send that exact URL to support. It is the gold standard for professional dashboards.

### 2. Paginating the "Infinite" List: Cache Merge Strategy

Implementing the offset-based pagination (`from` and `size`) required by the API presented a synchronization challenge.

- **The Problem:** By default, Apollo Client overwrites previous results with the new page received. This causes the list to "restart" and the scroll to jump to the top every time the user loads more data.
- **The Solution:** I implemented a custom **Field Policy** in `src/core/apollo/client.ts` for the `charges` field.
  - **Merge Logic:** The function detects the `from` argument. If it's `0`, it resets the list (useful for new filters). If it's greater than `0`, it intelligently concatenates the new `items` with `existingItems`.
  - **Stability:** This ensures smooth navigation where the table grows organically without losing user context or scroll position.

### 3. Resolving Roadblocks: The use of Introspection Queries

During the development of DTOs (Data Transfer Objects), we hit a "dead end" due to the lack of detailed documentation for certain schema sub-types.

- **Strategy:** Following the recommendation of my "AI Co-Pilot," I executed **Introspection Queries** directly against the GraphQL endpoint. This allowed me to reverse-engineer the schema in real-time, discovering types like `SearchableIntFilterInput` for dates, ensuring a 100% accurate and type-safe implementation.

### 4. API Key Security

- **Implementation Note:** For this test and for the sake of speed, the API Key is injected via `.env`.
- **Production Vision:** I am fully aware that exposing secrets in the client bundle is a risk. In a real-world environment, requests would be proxied through a **Backend-for-Frontend (BFF)** or an **API Gateway** that safely injects credentials outside the browser's scope.

## 🏗️ The Winning Architecture: Hybrid FSD + Hexagonal

To guarantee total decoupling and scalability, the project is structured into single-responsibility layers:

### 1. The Global Engine (`src/core/`)

Contains infrastructure that doesn't belong to any specific business rule.

- **core/apollo:** Our "Server State Manager." Centralizes cache and network policies.
- **core/router:** Manager of the global UI state via the URL.
- **core/ui:** "Dumb" base components (Design System) that ensure visual consistency.

### 2. Features Layer (`src/features/`)

We use **Feature-Sliced Design (FSD)** to encapsulate business domains (Payments, Analytics). Each feature is divided following **Hexagonal Architecture**:

- **data-access:** Total isolation of the API contract (GraphQL Queries).
- **domain:** The logical core. Contains **Mappers** that transform backend DTOs (cents, Unix timestamps) into clean domain entities (EUR, Date objects).
- **ui:** Presentation components that consume domain logic, decoupled from the infrastructure.

## 💎 Benefits & Business Value

- **Team Scalability:** Different teams can work on "Payments" and "Analytics" independently, eliminating bottlenecks and the risk of cross-side effects.
- **Extreme Maintainability:** The use of Mappers ensures that if the backend changes its schema tomorrow, we only need to edit one transformation file. The UI and business logic remain untouched.
- **Enterprise Performance:** Advanced Apollo cache configuration eliminates over-fetching and ensures the dashboard feels instantaneous.
- **Superior UX:** By delegating state to the URL, we enable fluid collaboration between users, allowing them to share exact filtering states.

## 🚀 Getting Started

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure .env
# Create a .env file in the root with the following key:
VITE_MONEI_API_KEY=api_key

# 3. Run in development
npm run dev
```
