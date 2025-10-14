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
    git clone https://github.com/Taboada40/PinoyHiratage.git
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

### 1. Branch Naming Convention

Use the following three-part naming structure: `<Main Task Type>/<Module>/<short_description>`

| Main Task Type | Prefix | Description | Example Branch Name |
| :--- | :--- | :--- | :--- |
| **Feature** | `feature/` | For adding new user-facing functionality. | `feature/user-accounts/create_profile_page` |
| **Bug Fix** | `fix/` | For fixing a bug or unexpected behavior. | `fix/login/color_of_the_button` |
| **Technical** | `tech/` | For non-functional changes (e.g., refactoring, optimizing). | `tech/login/change_validation_library` |
| **Setup** | `setup/` | For configuration, dependencies, or environment changes. | `setup/login/add_authentication_library` |

### 2. Standard Workflow Steps

#### **Step A: Start & Update**

```bash
# 1. Check Current Status
git status

# 2. Update Local Main
git checkout main
git pull origin main

# 3. Create a New Branch
git checkout -b feature/your-feature-name 

# 4. Stage & Commit Changes
git add .
git commit -m "feature(login): create login UI" 
# Example: git commit -m "tech(homepage): improve image loading"

# 5. Push Branch to GitHub
git push origin feature/your-feature-name

# 6. Open Pull Request (PR) on GitHub
# PRs must be reviewed and approved before merging into main.

# 7. Sync After Merge
git checkout main
git pull origin main

# 8. Clean Up Old Branches (Optional but Recommended)
git branch -d feature/your-feature-name               # Delete locally
git push origin --delete feature/your-feature-name    # Delete on GitHub
