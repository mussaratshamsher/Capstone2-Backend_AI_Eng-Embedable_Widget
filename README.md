# LeadForge

An AI-Powered Embeddable Website Widget & Lead-Capture Platform.

## 🚀 Purpose
LeadForge lets businesses embed an AI-powered chat widget on any website to engage visitors, qualify them as leads, and capture their information—all automatically, without manual follow-up. 

## 🧠 What Problem It Solves
Most website visitors leave without taking action, causing businesses to lose potential customers because:
- Static contact forms have notoriously low conversion rates.
- Sales teams cannot engage every visitor in real-time.
- There is no reliable way to know which visitors are genuinely interested.

LeadForge replaces passive forms with an intelligent AI assistant that converses with visitors, identifies their intent, and delivers only qualified leads directly to the business.

## 🌟 Present Application Features

### 🏢 Multi-Tenant Architecture
- **Organizations:** Users can create and manage multiple organizations.
- **Projects:** Each organization can have multiple projects with unique configurations and API keys.
- **Secure Isolation:** Data is securely isolated between different tenants and projects.

### 🤖 Intelligent AI Chat Widget
- **Groq LLM Integration:** Fast and responsive AI conversations powered by Groq.
- **Server-Sent Events (SSE):** Real-time streaming of AI responses for a smooth chat experience.
- **Customizable Instructions:** Configure what the AI should ask, how it responds, and what makes a lead qualified.
- **One-Line Integration:** Embed the widget on any website using a single `<script>` tag.

### 🎯 Lead Capture & Qualification
- **Automated Qualification:** The AI automatically evaluates visitor intent and scores them.
- **Contact Extraction:** Seamlessly captures visitor contact details during the conversation.
- **Lead Dashboard:** View and manage captured leads, their scores, and statuses.

### 📊 Analytics & Dashboard (Next.js)
- **Real-Time Visibility:** Monitor conversation histories and active sessions.
- **Project Management:** Configure widget settings, domains, and appearance from a centralized UI.
- **Authentication:** Secure login and registration with JWT.

### 🔌 Integrations & Security
- **Webhooks:** Push real-time lead and conversation events to external systems (CRMs, Slack, etc.).
- **Spam Protection:** Built-in ReCaptcha integration to prevent abuse.
- **Role-Based Access:** Secure API endpoints ensuring only authorized access to project data.

## ⚙️ How It Works
1. **Create an Account:** Register and log in. A personal organization is created for you automatically.
2. **Set Up an Organization & Project:** Create a project inside your organization. This project holds your widget configuration and API key.
3. **Configure the Widget:** Set the AI instructions and system prompts.
4. **Embed the Widget:** Copy a single `<script>` snippet and paste it into your website's HTML. No complex integration is needed.
5. **Monitor Leads:** Track captured leads, conversation histories, and conversion rates directly from the dashboard.

## 🛠️ Tech Stack

**Frontend:**
- Next.js (App Router, React)
- TypeScript
- Tailwind CSS

**Backend:**
- FastAPI (Python 3.11+)
- PostgreSQL 14+
- SQLAlchemy (ORM) & Alembic (Migrations)
- Groq API (LLM Integration)
- Docker & Docker Compose
