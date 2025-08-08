# 🏢  Computer Lab Inventory System

A comprehensive, full-stack inventory management solution built with Angular and Node.js, featuring role-based access control, real-time stock tracking, and advanced workflow management.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Role-Based Access Control](#role-based-access-control)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Team](#team)

## 🎯 Overview

The Computer Lab Inventory Management System is a sophisticated web application designed to streamline inventory operations for businesses of all sizes. Built with modern web technologies, it provides a secure, scalable, and user-friendly solution for managing inventory, tracking stock levels, and maintaining detailed audit trails.

### Key Benefits

- **Centralized Management**: Single platform for all inventory operations
- **Real-time Tracking**: Live updates on stock levels and movements
- **Role-based Security**: Granular access control for different user types
- **Audit Trail**: Complete history of all inventory transactions
- **Scalable Architecture**: Built to handle growing business needs
- **Mobile Responsive**: Works seamlessly across all devices

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication**: Secure token-based authentication
- **Role-based Access Control**: Three-tier permission system
- **Email Verification**: Account verification via email
- **Password Recovery**: Secure password reset functionality
- **Session Management**: Automatic token refresh

### 📦 Inventory Management
- **Item Management**: Add, edit, and categorize inventory items
- **Stock Tracking**: Real-time stock level monitoring
- **Brand Management**: Organize items by brands
- **Category System**: Hierarchical item categorization
- **Storage Locations**: Track items across multiple locations

### 🎨 User Interface
- **Modern Design**: Professional, responsive interface
- **Intuitive Navigation**: User-friendly menu system
- **Real-time Updates**: Live data synchronization
- **Mobile Optimized**: Responsive design for all devices
- **Accessibility**: WCAG compliant design

## 🛠 Technology Stack

### Frontend
- **Angular 10**: Modern TypeScript framework
- **Bootstrap 4**: Responsive CSS framework
- **FontAwesome**: Icon library
- **RxJS**: Reactive programming
- **Angular Material**: UI component library

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MySQL**: Relational database
- **Sequelize**: ORM for database management
- **JWT**: JSON Web Token authentication
- **Nodemailer**: Email functionality

### Development Tools
- **TypeScript**: Type-safe JavaScript
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Swagger**: API documentation
- **Git**: Version control

## 📁 Project Structure

```
capstone/
├── Computer-Lab-Inventory-Frontend/ # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── _components/        # Shared components
│   │   │   ├── _helpers/           # Utility functions
│   │   │   ├── _models/            # TypeScript interfaces
│   │   │   ├── _services/          # API services
│   │   │   ├── account/            # Authentication module
│   │   │   ├── admin/              # Admin panel
│   │   │   ├── add/                # CRUD operations
│   │   │   ├── profile/            # User profile
│   │   │   └── stocks/             # Inventory management
│   │   ├── assets/                 # Static assets
│   │   └── environments/           # Environment configs
│   ├── package.json
│   └── angular.json
│
├── Computer-Lab-Inventory-Backend/ # Node.js Backend
│   ├── _helpers/                   # Utility functions
│   ├── _middleware/                # Express middleware
│   ├── accounts/                   # User management
│   ├── brand/                      # Brand management
│   ├── category/                   # Category management
│   ├── departments/                # Department management
│   ├── employees/                  # Employee management
│   ├── items/                      # Item management
│   ├── stock/                      # Stock management
│   ├── storage-location/           # Location management
│   ├── workflows/                  # Workflow management
│   ├── requests/                   # Request management
│   ├── server.js                   # Main server file
│   └── package.json
│
└── ROLE_SYSTEM.md                  # Role system documentation
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher)
- **Git** (for version control)
- **Angular CLI** (for frontend development)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capstone/Watcha_lingan_guli_guli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure database**
   ```bash
   # Create MySQL database
   CREATE DATABASE inventory_management;
   
   # Update config.json with your database credentials
   ```

4. **Configure email settings**
   ```json
   {
     "smtpOptions": {
       "host": "smtp.gmail.com",
       "port": 587,
       "secure": false,
       "auth": {
         "user": "your-email@gmail.com",
         "pass": "your-app-password"
       }
     }
   }
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../introprogfrontt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:4000'
   };
   ```

4. **Start the development server**
   ```bash
   ng serve
   ```

5. **Open application**
   Navigate to `http://localhost:4200`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=inventory_management
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Server Configuration
PORT=4000
NODE_ENV=development
```

### Database Configuration

Update `config.json` in the backend directory:

```json
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "inventory_management",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

## 📖 Usage

### Getting Started

1. **Register an account**
   - Navigate to the registration page
   - Provide your email and password
   - Verify your email address

2. **First-time setup**
   - The first registered user becomes a SuperAdmin
   - Configure your profile information
   - Set up initial categories and brands

3. **Add inventory items**
   - Create categories and brands
   - Add items with detailed information
   - Set up storage locations

4. **Manage stock**
   - Add stock entries
   - Track stock movements
   - Monitor stock levels

### User Roles

#### SuperAdmin
- Full system access
- User account management
- Audit log access
- System configuration

#### Admin
- Inventory management
- Stock operations
- Employee management
- Workflow management

#### Viewer
- Read-only access
- View inventory data
- View reports
- No modification permissions

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/accounts/register` | Register new account |
| POST | `/accounts/authenticate` | User login |
| POST | `/accounts/verify-email` | Verify email address |
| POST | `/accounts/forgot-password` | Request password reset |
| POST | `/accounts/reset-password` | Reset password |

### Inventory Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | Get all items |
| POST | `/items` | Create new item |
| PUT | `/items/:id` | Update item |
| DELETE | `/items/:id` | Delete item |

### Stock Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stock` | Get all stock entries |
| POST | `/stock` | Add stock entry |
| PUT | `/stock/:id` | Update stock entry |
| DELETE | `/stock/:id` | Delete stock entry |

### Complete API Documentation

Access the interactive API documentation at:
```
http://localhost:4000/api-docs
```

## 🔐 Role-Based Access Control

### Three-Tier System

#### 1. SuperAdmin
**Full system control and oversight**

**Permissions:**
- ✅ Full access to all features
- ✅ Manage all user accounts
- ✅ View audit logs
- ✅ System configuration
- ✅ All inventory operations

#### 2. Admin
**Day-to-day inventory management**

**Permissions:**
- ✅ Add/dispose items
- ✅ Manage stock levels
- ✅ Create and edit inventory items
- ✅ Manage categories, brands, locations
- ✅ View employee data
- ❌ Cannot manage user accounts
- ❌ Cannot view audit logs

#### 3. Viewer
**Read-only access for assistants**

**Permissions:**
- ✅ View all inventory data
- ✅ View stock levels
- ✅ View employee information
- ❌ Cannot modify any data
- ❌ Cannot access admin functions

## 🛠 Development

### Code Style

- **Frontend**: Follow Angular style guide
- **Backend**: Use ESLint and Prettier
- **Git**: Conventional commit messages

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Follow coding standards
   - Write tests for new features
   - Update documentation

3. **Test changes**
   ```bash
   # Frontend tests
   ng test
   
   # Backend tests
   npm test
   ```

4. **Submit pull request**
   - Include detailed description
   - Reference related issues
   - Request code review

### Testing

#### Frontend Testing
```bash
# Unit tests
ng test

# E2E tests
ng e2e
```

#### Backend Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test -- --grep "test-name"
```

## 🚀 Deployment

### Production Build

#### Frontend
```bash
# Build for production
ng build --prod

# Deploy to web server
# Copy dist/ folder to web server
```

#### Backend
```bash
# Install production dependencies
npm install --production

# Start production server
npm start
```

### Environment Setup

1. **Database**
   - Set up production MySQL instance
   - Configure connection pooling
   - Set up automated backups

2. **Email Service**
   - Configure production SMTP settings
   - Set up email templates
   - Test email functionality

3. **Security**
   - Use strong JWT secrets
   - Enable HTTPS
   - Configure CORS properly
   - Set up rate limiting

## 👥 Team

### Development Team

| Role | Name | Responsibilities |
|------|------|------------------|
| **Backend Developer** | Karl Christian O. Vilar, Rommel Quiremet | API development, database design |
| **Frontend Developer** | Francis Adolfo | Angular development, UI/UX |
| **Tester** | Chrystal Ybanez | Testing, quality assurance |
| **Documentation** | Manelyn Jarumay, Cherie Mae Catubig | Documentation, user guides |
| **DevOps Lead** | Karl Christian O. Vilar | Deployment, CI/CD |

### Project Timeline

- **Phase 1**: Core functionality development
- **Phase 2**: Advanced features implementation
- **Phase 3**: Testing and bug fixes
- **Phase 4**: Documentation and deployment


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:

- **Email**: support@inventory-system.com
- **Documentation**: [Wiki](https://github.com/your-repo/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added role-based access control
- **v1.2.0** - Enhanced audit logging
- **v1.3.0** - Improved UI/UX design

---

**Built with ❤️ by the Enterprise Inventory Management Team** 




Date: August 1, 2025 📌 
Activity Log: System Development and Documentation Group Members Involved: 
Villar’s Group: -Front-End Developer -Back-End Developer -Project Manager Support Team: -Researcher -Documentarian Summary of Activities: Today, the group focused on the collaborative development and documentation of the Computer Laboratory Stock Inventory System. System Development Tasks: -Front-End Developer (Villar’s team) worked on enhancing the user interface of the system. This included: -Designing responsive layouts for key modules. -Implementing user-friendly navigation. -Applying consistent color schemes and button functionalities. Back-End Developer (Villar’s team) handled core system logic by: -Developing database connections and queries. -Implementing backend functions for inventory tracking and stock management. -Ensuring system security and data integrity. -Project Manager coordinated tasks, monitored progress, and ensured that deadlines were met and tasks were distributed efficiently. Documentation Tasks: -Researcher and Documentarian collaborated on: -Updating the system documentation with current development progress. -Writing detailed descriptions of each module, including functionality, purpose, and flow. -Organizing technical information gathered from developers and translating them into understandable documentation. Output for the Day: -Partial completion of the front-end interface (homepage, inventory list view). -Back-end functionality for adding, updating, and deleting inventory items was implemented. 
-Updated project documentation covering: -System overview -Module descriptions -User roles and responsibilities -Current progress report 

📅 Date: August 08, 2025 📌 
Activity Log: Documentation 
Capstone Project [Documentation Progress Updated] Link: ( https://docs.google.com/document/d/1iFHTXtsTzDgkrYyp-Xc61NlsM2nw_eafRBBbOqr-yPo/edit?fbclid=IwY2xjawMCbiZleHRuA2FlbQIxMABicmlkETFrOWZDTG9hR1hxOW00SjdyAR6QeCZ6R7QHAqFQB82EfAZ4XYcuV85cVdT2kwQtNlbLfrvJdGr6D8u6omED3w_aem_ctUpmA8e3lHSnem8ARp23g&tab=t.0 ) 
Chapter 1 - DONE 
Chapter 2 - DONE 
Chapter 3 - DONE 
Chapter 4 Methodology - DONE 
Work Breakdown Structure - DONE 
Existing Cost - DONE 
Development Cost - DONE 
Monthly Expenses - DONE 
Deployment Cost - DONE 
Moscow - DONE Gantt Chart - DONE 
Critical Path - NOT YET 
Data and Process Modeling - DONE 
Existing Flowchart - NOT YET 
Proposed Flowchart - NOT YET 
Use Case Diagram - NOT 
Narrative - DONE 
Activity Diagram - NOT YET 
State Chart Diagram - NOT YET 
Entity Relationship Diagram - NOT YET 
System Architecture - NOT YET S
ecurity - DONE 
Authorization - DONE
Strong Passwords: DONE 
Update and Maintenance: Done 
Development - Done 
Hardware Specification - DONE 
CHAPTER 5 SUMMARY, CONCLUSION AND RECOMMENDATION - DONE