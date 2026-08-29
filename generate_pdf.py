import subprocess
import sys
import os

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from fpdf import FPDF
except ImportError:
    install('fpdf2')
    from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        # Header formatting
        self.set_font('Helvetica', 'B', 16)
        self.set_text_color(41, 128, 185) # Blue title
        self.cell(0, 15, 'LeadForge: Technical Architecture & Project Demo', border=False, align='C')
        self.ln(20)

    def footer(self):
        # Footer formatting
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

# Initialize PDF
pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# PDF Content Sections
sections = [
    ("1. Introduction", "LeadForge is an advanced, high-performance lead generation and management platform. It bridges the gap between fragmented marketing efforts and scalable, automated customer acquisition by providing an end-to-end ecosystem for capturing, verifying, managing, and monetizing leads."),
    
    ("2. Why was LeadForge Created?", "LeadForge was built to eliminate the friction in modern sales pipelines. Businesses often struggle with disjointed tools--using one platform for landing pages, another for a CRM, and a third for payment collection. LeadForge centralizes these operations into a single, cohesive architecture."),
    
    ("3. What Problem Does It Solve?", "- Lead Leakage: Prevents potential customers from dropping off due to slow-loading pages or complex forms.\n- Bot Spam: Eliminates fake leads that bloat the CRM and waste sales teams' time.\n- Delayed Follow-ups: Solves the issue of manual data entry by syncing leads instantly.\n- Fragmented Tooling: Consolidates frontend capture, backend processing, database storage, CRM, and payments."),
    
    ("4. How It Works", "A user lands on the Next.js frontend, interacting with dynamically rendered lead capture forms protected by reCAPTCHA. Upon submission, the Next.js application routes the data to a Python/FastAPI backend. The backend validates the payload, processes any necessary business logic, and persists the data into a Supabase PostgreSQL database. Simultaneously, the Custom CRM dashboard updates in real-time. If a transaction or deposit is required, SafePay processes the payment seamlessly."),
    
    ("5. Tech Stack Overview", "- Frontend: Next.js (React)\n- Backend: Python, FastAPI\n- Database & Auth: Supabase (PostgreSQL)\n- Payments: SafePay\n- Security: Google reCAPTCHA\n- Deployment: Vercel (Frontend & Backend)"),
    
    ("6. Core Features & Reasons", "- Dynamic Form Rendering: Increases conversion rates through tailored user experiences.\n- Real-Time CRM Synchronization: Enables sales teams to contact leads within seconds of submission.\n- Automated Workflows: Reduces manual overhead and human error in data entry.\n- Integrated Payment Gateway: Allows for immediate consultation fee or deposit collection."),
    
    ("7. Technical Decisions (Architecture Justifications)", ""),
    
    ("Why Next.js?", "Next.js provides Server-Side Rendering (SSR) and Static Site Generation (SSG), which are critical for SEO and ultra-fast page load times. This directly impacts lead conversion rates. The React ecosystem also allows for rapid, modular UI development."),
    
    ("Why Python and FastAPI for the Backend?", "FastAPI is an extremely high-performance framework based on ASGI. It provides automatic Swagger documentation and data validation via Pydantic. Python was chosen to allow seamless future integration with AI/ML libraries for predictive lead scoring and advanced data analysis."),
    
    ("Why Supabase?", "Supabase is an open-source Firebase alternative built on a robust PostgreSQL foundation. It provides out-of-the-box Row Level Security (RLS), instant RESTful APIs, and real-time database subscriptions without the limitations or vendor lock-in of a NoSQL database."),
    
    ("Why Vercel for Frontend and Backend Deployment?", "Vercel offers an unparalleled developer experience with native Next.js optimization and Edge Network delivery. By deploying both the frontend and the Python FastAPI backend (via Serverless Functions) on Vercel, we maintain a unified CI/CD pipeline, reducing DevOps complexity and ensuring zero-downtime deployments."),
    
    ("Why SafePay?", "SafePay provides a secure, reliable, and developer-friendly payment infrastructure. It ensures compliance with regional financial regulations and offers a seamless checkout experience that prevents users from bouncing during the payment step."),
    
    ("Why reCAPTCHA?", "To ensure data integrity. reCAPTCHA operates in the background, analyzing user behavior to block malicious bots and automated scripts without adding friction to legitimate users' form submissions. This keeps the CRM clean."),
    
    ("Why a Custom CRM?", "Off-the-shelf CRMs often include bloated features and high per-seat licensing costs. A custom CRM allows for perfectly tailored workflows, custom data visualization, and native integration with the LeadForge capture ecosystem, giving the sales team exactly the tools they need.")
]

for title, body in sections:
    # Title
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_text_color(44, 62, 80)
    pdf.multi_cell(0, 10, title)
    pdf.ln(2)
    
    # Body
    if body:
        pdf.set_font('Helvetica', '', 11)
        pdf.set_text_color(52, 73, 94)
        pdf.multi_cell(0, 6, body)
        pdf.ln(6)

# Export PDF
output_path = os.path.join(os.getcwd(), 'LeadForge_Project_Demo.pdf')
pdf.output(output_path)
print(f"PDF successfully created at: {output_path}")
