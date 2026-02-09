# multi-tenant-dashboard
Multi-tenant dashboard with role-based access and database isolation, using path-based tenant routing like /tenantA/admin/dashboard. Each tenant runs on its own database with secure backend routing and frontend integration supporting scalable SaaS architecture.


# Multi-Tenant User Management Dashboard

This project implements a **multi-tenant user management system** with:
- Path-based tenant routing
- Database-level isolation per tenant
- Role-based data masking
- Pagination
- Next.js frontend + Express backend
- PostgreSQL with TypeORM

Each tenant has its own independent database, and tenant identification happens via URL paths like:

/tenantA/admin/user-list  
/tenantB/super-admin/user-list  

---

# Tech Stack

# Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- TypeORM

# Frontend
- Next.js (App Router)
- TypeScript
- Fetch API

---

# Architecture

Client (Next.js) -> Backend API (Express) /api/:tenantId/users -> Master DB → Fetch tenant connection config -> Tenant DB → Query tenant-specific users table

✔ Each tenant has a separate PostgreSQL database  
✔ No cross-tenant data access  
✔ Role-based masking logic applied before returning data  

---


# Clone Repository
git clone <repo-url>
cd multi-tenant-dashboard

# PostgreSQL Setup
Create databases:
CREATE DATABASE master_db;
CREATE DATABASE tenant_a_db;
CREATE DATABASE tenant_b_db;


# Test URL

Frontend:

http://localhost:3000/tenantA/admin/user-list
http://localhost:3000/tenantA/super-admin/user-list
http://localhost:3000/tenantB/admin/user-list
http://localhost:3000/tenantB/super-admin/user-list

Backend API:

GET http://localhost:4000/api/{tenantId}/users?page=1&limit=10&role=admin
GET http://localhost:4000/api/{tenantId}/users?page=1&limit=10&role=super-admin
