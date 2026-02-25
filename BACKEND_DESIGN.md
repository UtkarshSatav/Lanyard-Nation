# FastLanyard Backend System Design

This document outlines the architecture, data models, and API specifications for the FastLanyard-style custom lanyard ordering backend. The system is designed as a modular suite of services to ensure scalability, maintainability, and clear separation of concerns.

## 1. System Architecture Overview

The backend is structured as a **Modular Monolith** initially (to minimize deployment complexity) but designed with clear domain boundaries to allow for easy transition to **Microservices** as volume scales.

### Core Modules:
1. **Catalog & Pricing Engine**: Manages products, configuration rules, and complex pricing logic.
2. **Order Management System (OMS)**: Orchestrates the order lifecycle from draft to completion.
3. **Digital Proof Service**: Handles design assets and proof generation/approval workflows.
4. **Customer & Auth Service**: Manages user accounts, guest records, and profiles.
5. **Payment Gateway**: Pluggable interface for Stripe, Crypto, and other providers.
6. **Notification & Communication**: Manages automated alerts and admin/customer chats.
7. **Reviews & Social Proof**: Handles product ratings and store-wide trust metrics.
8. **Admin Operations**: Internal APIs for management, overrides, and exports.

---

## 2. Catalog & Pricing Engine

### Data Model

#### `Product`
- `id`: UUID (PK)
- `family`: Enum (Wristbands, Lanyards, ID Cards, Drinkware, etc.)
- `name`: String
- `slug`: String (unique)
- `base_attributes`: JSON (e.g., standard lengths, typical widths)
- `status`: Enum (Active, Archived, Draft)
- `badges`: Array (POPULAR, PREMIUM, NEW)

#### `PriceChart`
- `id`: UUID (PK)
- `product_id`: UUID (FK)
- `attribute_key`: String (e.g., "width")
- `attribute_value`: String (e.g., "3/4 inch")
- `ranges`: JSONB Array
  - `[{ "min": 1, "max": 49, "price": 5.50 }, { "min": 50, "max": 99, "price": 4.25 }, ...]`
- `setup_fee`: Decimal
- `is_active`: Boolean

#### `Promotion`
- `id`: UUID (PK)
- `code`: String (e.g., "SAVE10")
- `type`: Enum (PERCENTAGE, FIXED_AMOUNT)
- `value`: Decimal
- `min_order_value`: Decimal
- `start_date`: DateTime
- `end_date`: DateTime
- `usage_limit`: Integer
- `used_count`: Integer

### Logic: Price Calculation
1. **Fetch unit price** from `PriceChart` based on product, width, and quantity.
2. **Apply add-on costs**: Attachments (Safety Breakaway, Lobster Claw) have flat or per-unit costs stored in a `ProductOptions` table.
3. **Calculate Subtotal**: `(Unit_Price * Qty) + SUM(Option_Prices * Qty) + Setup_Fees`.
4. **Apply Coupons**: Validate code (expiry, usage) and subtract from subtotal.
5. **Tax & Shipping**: Estimate based on shipping address (integration with UPS/FedEx/TaxJar).

---

## 3. Order Management System (OMS)

### Order Lifecycle States
1. **DRAFT**: Initial configuration in cart.
2. **PROOF_PENDING**: Payment received or "Bill Me Later" selected. Designer is notified.
3. **PROOF_SENT**: Designer uploads digital mockup. Customer notified.
4. **CUSTOMER_APPROVED**: Customer clicks "Approve". Production begins.
5. **IN_PRODUCTION**: Manufacturing phase. Status updates available to customer.
6. **SHIPPED**: Tracking number attached. Final email sent.
7. **COMPLETED**: Delivered and successfully closed.
8. **CANCELLED**: Terminated at any point before production.

### Configuration Validation Rules
*   **Logical Constraints**: "Binary style" only allows 1-color imprint. "Sublimation" requires "Polyester" material.
*   **Min/Max Constraints**: Certain attachments only work with >= 3/4 inch widths.
*   **Rule Engine**: A small rule set stored as JSON or evaluated via code:
    ```javascript
    if (config.style === 'Binary' && config.colors > 1) {
      throw Error("Binary style only supports single color imprint.");
    }
    ```

---

## 4. Digital Proof Service

### Proof Request Structure
- `id`: UUID
- `order_id`: UUID
- `imprint_text`: String
- `logo_url`: String (S3 path)
- `designer_notes`: Text
- `sla_deadline`: DateTime (`Order_Created_At + 1 hour`)
- `status`: Enum (PENDING, UPLOADED, APPROVED, REVISIONS_REQUESTED)

### SLA Tracking API
`GET /api/admin/sla/risks`
- Returns orders in `PROOF_PENDING` where `now() > (sla_deadline - 15 minutes)`.
- Use for dashboard color-coding: Green (< 30 min old), Yellow (> 45 min old), Red (> 1 hr).

---

## 5. Payments & Discounts

### Pluggable Interface
- `POST /api/payments/charge`
  - `provider`: "stripe" | "crypto" | "internal_credit"
  - `order_id`: UUID
  - `metadata`: Token or Transaction ID

### Crypto Implementation
- Support for BTC, ETH, USDT via a custom gateway or BitPay integration.
- Store `crypto_wallet_address` and `tx_hash` on the order record.

---

## 6. Reviews & Analytics

### Reviews Service
- `GET /api/reviews/product/{id}`: Returns paginated reviews + aggregate `avg_rating`.
- `GET /api/reviews/summary`: Returns global stats ("100,000+ reviews", "4.9/5 stars").

### Event Tracking (Analytics)
- Middleware intercepts requests to emit events to a message bus (Redis/RabbitMQ) for:
  - `PRODUCT_VIEW`
  - `CART_ADD`
  - `CHECKOUT_START`
  - `ORDER_PLACED`
- Downstream workers ingest events into BigQuery or Mixpanel.

---

## 7. Communication & Dashboard

### Notification Pipeline
- **Trigger**: Order state change.
- **Provider**: SendGrid (Email), Twilio (SMS).
- **Templates**: Dynamic MJML templates for "Your Proof is Ready!", "Order Shipped", etc.

### Admin Dashboard Capabilities
1. **Price Override**: Explicit field `price_override_reason` required.
2. **State Management**: Manual move to `IN_PRODUCTION` after physical check.
3. **Proof Upload**: Dropzone integration for designer to upload PNG/PDF mockups.
4. **Bulk CSV Export**: Data formatted for quick import into shipping software (ShipStation) or accounting (QuickBooks).

---

## 8. Content & Legal

### CMS Capabilities
- **banners**: `[{ "id": 1, "text": "Spring Sale! 20% Off", "active": true }]`
- **legal**: Versioned `Terms of Service` and `Privacy Policy`. 
- **consent**: User records store `consent_version` and `consent_timestamp` during checkout/signup.

---

## 9. API Reference (Partial)

### Orders
- `POST /api/orders`: Create draft.
- `PATCH /api/orders/{id}`: Update config/quantity.
- `GET /api/orders/{id}/tracking`: Detailed public status.

### Admin
- `GET /api/admin/orders`: List with filters.
- `POST /api/admin/proofs`: Upload mockup.
- `POST /api/admin/settings`: Tweak site content (banners, phone numbers).
