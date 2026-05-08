# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# React-Booking_System

src/
│
├── api/                    # API request files
│   ├── authApi.js
│   ├── userApi.js
│   └── bookingApi.js
│
├── assets/                 # Static files
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── components/             # Reusable components
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Table.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── Footer.jsx
│   │
│   └── common/
│       ├── Loader.jsx
│       └── EmptyState.jsx
│
├── pages/                  # Pages / Screens
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │
│   ├── admin/
│   │   ├── DashboardPage.jsx
│   │   ├── UsersPage.jsx
│   │   └── BookingsPage.jsx
│   │
│   └── customer/
│       ├── HomePage.jsx
│       ├── RoomPage.jsx
│       └── ProfilePage.jsx
│
├── routes/                 # React Router
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
│   └── RoleRoute.jsx
│
├── services/               # Axios setup
│   └── axiosClient.js
│
├── hooks/                  # Custom hooks
│   ├── useAuth.js
│   └── useFetch.js
│
├── context/                # Context API
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── store/                  # Redux / Zustand
│   └── authStore.js
│
├── utils/                  # Helper functions
│   ├── constants.js
│   ├── formatDate.js
│   └── localStorage.js
│
├── layouts/                # Layout wrappers
│   ├── AdminLayout.jsx
│   └── CustomerLayout.jsx
│
├── styles/
│   ├── global.css
│   └── variables.css
│
├── App.jsx
├── main.jsx
└── vite.config.js