# 🛒 BazarDor (বাজার দর) — Daily Commodity Price Tracker

A modern and user-friendly full-stack web application designed to help consumers in Bangladesh monitor daily essential commodity prices (rice, lentils, oil, vegetables, fish, meat, etc.), view market-wise price variances, and analyze price fluctuations at a glance.

---

## 🛠️ Technologies Used

* **Frontend Framework:** [Next.js 15+](https://nextjs.org/) (App Router & React 19)
* **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Authentication:** [BetterAuth](https://www.better-auth.com/) (Email & Password Authentication)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) & Mongoose
* **Notifications & Feedback:** [React Hot Toast](https://react-hot-toast.com/)
* **Language & Type Safety:** TypeScript & JavaScript
* **Deployment:** Vercel / Netlify

---

## ✨ 5 Key Features

1. **📊 Real-Time Commodity Price Tracker & Train Ticker:**
   * Comprehensive overview of daily updated food items and essentials.
   * Real-time running ticker highlighting key price increases and decreases (▲/▼).

2. **🔐 BetterAuth Session & Profile Management:**
   * Secure user authentication flow using Email and Password.
   * Interactive navbar profile dropdown popup and user profile name update capability.

3. **⚖️ Protected Detail Routes & Market Breakdown:**
   * Protected individual product detail pages (`/product/[id]`) accessible for authenticated users.
   * Detailed breakdown tables comparing minimum, maximum, and average prices across divisional markets (e.g., Karwan Bazar, Sadar Bazar, Amtoli Bazar).

4. **⚡ Robust Category Filtering & Numeric Sorting:**
   * Category-based navigation and product filtering (`/category/[slug]`).
   * Intelligent price sorting (**Price: Low to High** and **Price: High to Low**) that converts Bengali numerals into standard numeric values for accurate sorting.

5. **📱 Fully Responsive & Accessible UI Layout:**
   * Seamless layout adaptation across mobile, tablet, and desktop devices using modern Tailwind CSS grid systems.
   * Skeleton loading indicators and custom 404 (Page Not Found) fallback handling.

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/bazardor.git](https://github.com/your-username/bazardor.git)
   cd bazardor
