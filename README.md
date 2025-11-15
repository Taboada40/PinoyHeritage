# 🇵🇭 PinoyHeritage

**PinoyHeritage** is a cultural e-commerce platform dedicated to showcasing, preserving, and promoting the rich heritage of Filipino **clothings, crafts, textiles, souvenirs, and accessories**. Our mission is to seamlessly connect customers with local artisans across the Philippines.

---

## 🎯 Our Core Mission & Objectives

The PinoyHeritage platform aims to achieve the following:

### 1. **Cultural Preservation & Empowerment**
* **Promote Heritage:** Actively increase global and local awareness of Filipino traditional **textiles, designs, and craftsmanship**.
* **Support Artisans:** Directly empower local artisans and weavers from **Luzon, Visayas, and Mindanao** by providing a sustainable, wide-reaching market for their authentic work.

### 2. **Product Accessibility & Diversity**
* **Curated Variety:** Offer customers easy, centralized access to a wide and authentic variety of **traditional crafts, textiles, and accessories** that reflect the diversity of the Philippines.

### 3. **Seamless Customer Experience**
* **Secure Shopping:** Guarantee a secure and seamless online shopping experience through reliable payment methods and efficient delivery options.
* **Enhanced Service:** Elevate the customer journey with personalized product recommendations and responsive, excellent customer service.

---

## ⚙️ Setup & Run Instructions

Follow these steps to set up and run the HabiNation frontend project on your local machine.

### Prerequisites

You need the following software installed on your system:

* **Node.js** (LTS version recommended)
* **npm** (Node Package Manager, installed with Node.js)
* **Git**

### Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Taboada40/PinoyHeritage.git
    ```

2.  **Navigate to the Project Directory**
    ```bash
    cd PinoyHiratage/Frontend  
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Run the Project**
    The application will usually open in your browser at `http://localhost:5173`.
    ```bash
    npm run dev
    # OR
    # npm start
    ```

---

## 🛠 Git Workflow (Best Practices)

To ensure a clean, traceable, and collaborative repository, all team members must follow these standardized Git workflow practices.

### 1. Branch Naming Convention (Frontend & Backend)

All branch names must clearly identify the **Type**, the **Scope** (where the change is happening), and a short, descriptive name.

The format is: `<type>/<scope>/<description>` (Use hyphens or underscores for spaces)

| Main Task Type | Prefix | Scope Options | Description | Example Branch Name |
| :--- | :--- | :--- | :--- | :--- |
| **Feature** | `feature/` | `frontend/` or `backend/` | For adding new user-facing functionality. | `feature/frontend/user-profile-ui` |
| **Bug Fix** | `fix/` | `frontend/` or `backend/` | For fixing a bug or unexpected behavior. | `fix/backend/auth-endpoint-bug` |
| **Technical** | `tech/` | `frontend/` or `backend/` | For non-functional changes (refactoring, optimizing, etc.). | `tech/frontend/optimize-image-loading` |
| **Setup** | `setup/` | `infra/` or `deps/` | For configuration, dependencies, or environment changes. | `setup/backend/add-flyway-migration` |

### 2. Standard Workflow Steps 

#### **Step A: Start & Update**

```bash
# 1. Check Current Status
git status

# 2. Update Local Main
git checkout main
git pull origin main
```

#### **Step B: Create & Work**

```bash
# 3. Create a New Branch
git checkout -b feature/your-feature-name 
```

#### Step C: Commit Changes

```bash
# 4. Stage & Commit Changes (Use the Conventional Commit Format: Main task(scope): short description)
git add .
git commit -m "feature(frontend): create login UI" 
# Example: git commit -m "fix(backend): correct inventory deduction logic"
```

#### **Step D: Push & Submit**

```bash
# 5. Push Branch to GitHub
git push origin feature/your-feature-name

# 6. Open Pull Request (PR) on GitHub
# PRs must be reviewed and approved before merging into main.
```

#### **Step E: Sync & Cleanup (After Merge)**

```bash
# 7. Sync After Merge
git checkout main
git pull origin main

# 8. Clean Up Old Branches (Optional but Recommended)
git branch -d feature/your-feature-name               # Delete locally
git push origin --delete feature/your-feature-name    # Delete on GitHub
```
