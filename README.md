<div align="center">

<img src="./assets/pulsefit-banner.gif" alt="PulseFit animated banner" width="100%">

<br/>

<img src="./assets/pulsefit-logo.svg" alt="PulseFit logo" width="420">

🏋️ PULSEFIT

Premium Gym Management System

A modern, production-oriented gym management platform for owners and members.

<br/>







</div>

✨ What is PulseFit?

PulseFit is a single-gym management platform designed around the real workflow of a gym owner.

It combines:

Members + Membership Plans + Payments + Attendance + Dashboard + Reports

into one consistent application instead of making the owner jump between disconnected tools.

The product is being built as a commercial-quality SaaS-style application, with a premium dark visual identity, smooth motion, responsive layouts, practical business metrics, and a backend-ready architecture.

🎯 Product Goals

🧑‍💼 Make daily gym administration faster

👥 Manage members from one place

💳 Track payments and renewals

🏋️ Record daily attendance

📊 Give owners a useful business overview

🔔 Surface upcoming renewal information

🧠 Keep metrics practical instead of filling the UI with useless analytics

⚡ Keep data synchronized with the backend/database once connected

📱 Work across desktop, tablet and mobile

🧩 Modules

Module

Purpose

Current State

🔐 Login

Admin authentication entry point

✅ Frontend complete

📊 Dashboard

Gym overview and key metrics

✅ Frontend complete

👥 Members

Add, view, edit, renew and manage members

✅ Frontend complete

🏷️ Membership Plans

Duration-based membership pricing

✅ Frontend complete

💳 Payments

Payment history, status and renewals

✅ Frontend complete

🏋️ Attendance

Daily Present/Absent management

✅ Frontend complete

📈 Reports

Overall gym performance and business reports

✅ Frontend complete

⚙️ Settings

Application configuration UI

✅ Frontend complete

🗄️ Backend

API + business logic + persistence

🔄 Integration phase

🛢️ SQL Server

Local persistent database

🔄 Integration phase

Important: "Frontend complete" means the UI/UX and module flows are already built. Backend/database integration is the next phase.

🎨 Design Philosophy

PulseFit follows one visual language across the entire application.

🌑 Dark-first UI

The approved application uses Dark Theme only.

The rejected Light Theme and appearance switching are not part of the final product.

✨ Premium Motion

Animations are used to communicate:

page transitions

drawers

card interactions

hover states

loading states

feedback

micro-interactions

The goal is premium and controlled, not cartoonish.

🎯 Consistency

Members, Payments, Membership Plans, Attendance and Reports use the same:

cards

drawers

tables

buttons

badges

typography

spacing

radius

interaction patterns

👥 Members

The Members module is designed around actual gym-owner workflows.

Core capabilities

Add member

View member

Edit member

Update membership

Renew membership

Delete member

Search

Pagination / existing loading pattern

Mobile-friendly cards

Desktop table

Right-side drawer interactions

Membership durations

PulseFit supports:

1 Month
2 Months
3 Months
4 Months
6 Months
12 Months
Custom

The owner controls pricing.

Longer durations can have discounted pricing.

🏷️ Membership Plans

Plans are based on duration, not artificial labels such as:

Gold
Silver
Platinum

The product intentionally uses practical durations:

1M
2M
3M
4M
6M
12M
Custom

The plan UI focuses on:

Duration

Price

Description

Member usage

Plan performance

💳 Payments

Payment system supports:

Status

Paid
Pending
Overdue

Payment methods

UPI
Cash
Card

The system supports:

payment records

renewal payments

pending/overdue visibility

member identification

membership duration context

payment history

Historical payment records should remain separate rather than being overwritten during renewals.

🏋️ Attendance

Attendance is intentionally simple and practical.

Rules

Present
Absent

Attendance is:

Daily

Manual

One member at a time

One record per member per day

Supported

Mark attendance

Edit attendance

View

Undo

Today filter

This Month filter

Search by member/mobile

Last-month history

Monthly report UI

Expired membership

An expired member receives a warning:

⚠️ Membership Expired

but attendance is still allowed.

Not included

❌ QR
❌ Barcode
❌ Face recognition
❌ Biometrics
❌ NFC
❌ Attendance calendar
❌ Multiple-member bulk attendance

📊 Reports

Reports are designed as a business reporting system, not a generic analytics playground.

Overall Gym Report

The owner can see:

Total Members

New Members

Revenue

Paid Payments

Pending Payments

Overdue Payments

Attendance summary

Renewals

Expiring memberships

Reporting periods

This Month
Last Month
This Year
Custom Month-to-Month / Date Range

Revenue

Includes:

Total Revenue

Paid Payments

Pending Payments

Overdue Payments

Number of Payments

Average Payment

Daily revenue trend

Monthly revenue trend

Membership plan performance

Shows factual metrics such as:

Members per plan

Revenue per plan

Most Used

Highest Revenue

No artificial scoring system.

Renewals

Shows useful information such as:

Member

Mobile

Current Plan

Expiry Date

Amount

🔄 Live Data Architecture

PulseFit is designed so that normal application changes do not require the user to repeatedly refresh the browser.

Target flow:

User Action
    ↓
React UI
    ↓
API Request
    ↓
ASP.NET Core
    ↓
Business Logic
    ↓
Entity Framework Core
    ↓
SQL Server
    ↓
Updated Data
    ↓
Application State / Query Update
    ↓
Dashboard / Members / Payments / Reports

The final persistent source of truth will be:

SQL Server

Business rules and validation will live in:

ASP.NET Core API

🏗️ Target Architecture

                 ┌───────────────────────┐
                 │     PULSEFIT UI       │
                 │     React + Vite      │
                 │                       │
                 │ Dashboard             │
                 │ Members               │
                 │ Plans                 │
                 │ Payments              │
                 │ Attendance            │
                 │ Reports               │
                 │ Settings              │
                 └───────────┬───────────┘
                             │
                         HTTP / JSON
                             │
                             ▼
                 ┌───────────────────────┐
                 │   ASP.NET Core API    │
                 │                       │
                 │ Controllers           │
                 │ DTOs                  │
                 │ Services              │
                 │ Validation            │
                 │ JWT Auth              │
                 └───────────┬───────────┘
                             │
                       Entity Framework
                             │
                             ▼
                 ┌───────────────────────┐
                 │      SQL SERVER       │
                 │   GymManagementDB     │
                 │                       │
                 │ Members               │
                 │ Plans                 │
                 │ Payments              │
                 │ Attendance            │
                 │ Users                 │
                 └───────────────────────┘

🛠️ Technology Stack

Frontend

React

Vite

Tailwind CSS

Framer Motion

Axios / existing API client architecture

Responsive UI

Component-based architecture

Backend

ASP.NET Core Web API

Entity Framework Core

JWT Authentication

REST APIs

DTO-based API contracts

Server-side validation

Database

Microsoft SQL Server

SQL Server Management Studio (SSMS)

Entity Framework Core migrations

🔐 Authentication

The final architecture uses JWT authentication.

Login
  ↓
POST /api/auth/login
  ↓
Validate credentials
  ↓
JWT
  ↓
Authenticated frontend
  ↓
Protected API requests

Passwords must be stored securely on the backend and never returned to the frontend.

🗄️ Database

Initial local database:

GymManagementDB

The preferred schema workflow is:

C# Models
    ↓
DbContext
    ↓
EF Core Migration
    ↓
SQL Server

Example migration commands:

dotnet ef migrations add InitialCreate
dotnet ef database update

🔌 API Areas

The backend is planned around:

/api/auth
/api/members
/api/membership-plans
/api/payments
/api/attendance
/api/reports

Existing project conventions should take precedence over blindly copying these route names.

📁 Suggested Project Structure

PulseFit/
│
├── ClientApp/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── ...
│   └── package.json
│
├── GymManagement.API/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── DTOs/
│   ├── Services/
│   ├── Repositories/
│   ├── Migrations/
│   ├── Program.cs
│   └── appsettings.json
│
└── README.md

Use the project's actual existing structure if it differs. Do not duplicate or rename working components just to match this diagram.

🧪 Development Roadmap

Phase 1 — Database

Create GymManagementDB

Configure SQL Server

Configure DbContext

Create migrations

Apply migrations

Verify tables in SSMS

Phase 2 — Authentication

Connect Login

JWT generation

JWT validation

Protected endpoints

Phase 3 — Membership Plans

API integration

SQL persistence

Frontend data binding

Phase 4 — Members

List

Add

Edit

View

Update membership

Renew

Delete

Search/pagination

Phase 5 — Payments

List

Add

Payment status

Renewal payment

Search

Filters

Phase 6 — Attendance

List

Mark

Duplicate prevention

Edit

Undo

Expired membership warning

Phase 7 — Dashboard

Replace mock statistics

Connect live API data

Validate calculations

Phase 8 — Reports

Overview

Revenue

Members

Membership plans

Renewals

Attendance summary

Date filters

Live database data

Phase 9 — Final QA

Frontend build

Backend build

API testing

SQL verification

End-to-end testing

Responsive testing

📱 Responsive Design

PulseFit is designed for:

🖥️ Desktop

💻 Laptop

📱 Mobile

📟 Tablet

The desktop experience remains the primary workspace for gym owners while mobile layouts keep common actions accessible.

⚡ UX Principles

PulseFit intentionally avoids:

unnecessary metrics

fake data

meaningless scoring

excessive dashboards

cartoonish UI

excessive gradients

excessive glow

duplicate functionality

unnecessary notifications

unnecessary exports

Instead:

Clean → Fast → Premium → Practical

🧠 Business Rules

Attendance

Member + Date = maximum one attendance record

Payment

Paid → contributes to received revenue
Pending → not received revenue
Overdue → not received revenue

Membership

Duration + Price + Start Date
             ↓
         Expiry Date

Reports

Reports should be calculated from actual:

Members
Payments
Membership Plans
Attendance
Renewals

No hardcoded report totals.

👨‍💻 Creator

<div align="center">

Built & Designed by

Abhishek Karande

Developer • Product Builder • Full-Stack Project

The product is being developed with a focus on practical gym operations, polished UX, maintainable architecture, and production-ready backend integration.

<br/>

PULSEFIT

Train Better. Manage Smarter.

</div>

🚀 Project Status

Frontend UI
████████████████████ 100%

Backend
██████░░░░░░░░░░░░░░  Integration Phase

SQL Server
████░░░░░░░░░░░░░░░░  Setup / Integration Phase

End-to-End Product
████████████░░░░░░░░  In Progress

📌 Important Development Rule

The existing frontend is considered the approved UI.

Backend integration must adapt to the existing frontend.

Do not redesign the completed PulseFit interface simply to make API integration easier.

Maintain the same:

Theme

Components

Drawers

Cards

Tables

Typography

Animations

Spacing

Interactions

Responsive behavior

<div align="center">

🏋️ PULSEFIT

Premium Gym Management • Built with React • Powered by ASP.NET Core • SQL Server

<br/>

⭐ If this project is useful, consider giving it a star.

<br/>

Made with ❤️, code, and a lot of gym sessions by Abhishek Karande.

</div>
