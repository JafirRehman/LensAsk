# LensAsk E-Commerce Platform

**LensAsk** is a comprehensive e-commerce platform built with the **MERN stack**. The platform enables users to browse and purchase products, with features like product search and filtering, secure payments via Stripe, order management, and email subscriptions for updates on new products.

---

## 🚀 Features

### User Features
- **Product Listings & Detail Pages**  
  Browse a variety of products with detailed descriptions, prices, and images.
  
- **Search & Filter**  
  Search for products and refine results by price, brand, and category.

- **Secure Payments with Stripe**  
  Complete purchases securely, with orders automatically created via Stripe webhooks.

- **Subscription Feature**  
  Subscribe to receive email notifications about new product launches.

### Admin Features
- **Admin Dashboard**  
  Manage orders, create new products, and oversee the e-commerce workflow.

### Image Management
- **Cloudinary Integration**  
  Efficiently handle product image uploads and storage.

---

## 🛠️ Technologies Used

### Frontend
- **React.js** (as part of the MERN stack)
- **Tailwind CSS** for styling

### Backend
- **Node.js** and **Express.js**
- **MongoDB** for database management
- **Stripe** for payment processing
- **Cloudinary** for image uploads
- **Nodemailer** for email notifications

---

## 📚 Installation and Setup

### Prerequisites
- Node.js (>= 14.x)
- MongoDB (local or cloud instance)
- Stripe account for API keys
- Cloudinary account for image management

### Steps to Set Up Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/JafirRehman/LensAsk.git
   cd LensAsk
   ```

2. **Install dependencies**
   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**  
   Create `.env` files in both `backend` and `frontend` directories with the following variables:

   **Backend `.env`**
   ```
    MONGODB_URL=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_SIGNING_SECRET=your_stripe_signing_secret

    CLOUD_NAME=your_cloudinary_cloud_name
    FOLDER_NAME=your_media_folder_name
    API_KEY=your_cloudinary_api_key
    API_SECRET=your_cloudinary_api_secret

    MAIL_HOST=your_email_service
    MAIL_USER=your_email_address
    MAIL_PASS=your_email_password

    PORT=your_backend_server_port
    FRONTEND_BASE_URL=your_frontend_base_url
   ```

   **Frontend `.env`**
   ```
   VITE_API_BACKEND_BASE_URL=your_backend_url
   VITE_LOAD_STRIP_API=your_stripe_public_key
   ```

4. **Run the development servers**
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd ../frontend
   npm start
   ```

5. **Access the app**  
   - Frontend: [http://localhost:5173](http://localhost:5173)  
   - Backend: [http://localhost:5000](http://localhost:5000)

---

## 🌐 Deployment

### Frontend
- Deployed on **Vercel**: [LensAsk Frontend](https://asklens-three.vercel.app)

### Backend
- Deployed on **Render**: [LensAsk Backend](https://lensask-backend.onrender.com)

---

## 📜 Stripe Webhook Setup

To handle order creation after successful payments, set up a Stripe webhook:

1. Open Stripe Dashboard.
2. Navigate to Developers → Webhooks.
3. Add an endpoint:
   ```
   https://your-backend-url/webhook
   ```
4. Subscribe to `checkout.session.completed` events.

---

## 📩 Contributions

Feel free to fork the repository and submit pull requests. For significant changes, please open an issue first to discuss your ideas.

---

## 🧑‍💻 Author

**Jafir Rehman**  
[GitHub Profile](https://github.com/JafirRehman) 

---

## 📷 Screenshots

*(Add screenshots or GIFs of your project to enhance the README)*
