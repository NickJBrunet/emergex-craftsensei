# emergex-crafty-chat-bot

## Project Setup Guide (VS Code / Local Development Environment)

This guide explains how to set up the project on your machine from scratch.
This is **NOT** about plugin development — only how to properly clone, open, and prepare the repository for development.

---

# 1. Prerequisites (Install First)

Before cloning the project, ensure you have the following installed:

### Required Software

* Git (for cloning the repository)
* Java JDK 21 (recommended for Paper 1.21.x)
* VS Code (recommended editor)

Optional:

* Eclipse IDE (supported, but VS Code is simpler for setup)

---

# 2. Clone the Repository (Beginner Friendly)

## Step 1 — Open Terminal

You can use:

* VS Code Terminal
* Windows PowerShell
* Command Prompt

## Step 2 — Navigate to your development folder

Example:

```bash
cd C:\dev
```

(Create the folder if it does not exist.)

## Step 3 — Clone the repository

Run:

```bash
git clone https://github.com/NickJBrunet/emergex-crafty-chat-bot
```

This will create:

```text
emergex-crafty-chat-bot/
```

## Step 4 — Open the project folder

Navigate into the project:

```bash
cd emergex-crafty-chat-bot
```

---

# 3. Open the Project in VS Code (Recommended)

## Step 1 — Open VS Code

Launch VS Code normally.

## Step 2 — Open the repository folder

1. Click **File → Open Folder**
2. Select:

   ```
   emergex-crafty-chat-bot
   ```
3. Click **Select Folder**

IMPORTANT:
Open the **root repository folder**, not a subfolder.

---

# 4. Recommended VS Code Extensions (Quality of Life)

Install these extensions:

* Java Extension Pack (Microsoft)
* Gradle for Java
* GitLens (optional)

To install:

1. Go to Extensions tab (left sidebar)
2. Search the extension name
3. Click Install

---

# 5. Project Structure Overview (Important)

After opening the repository, you will see a structure similar to:

```text
emergex-crafty-chat-bot/
├── server/                  # Development Paper server directory
	└── build-plugin.bat
├── crafty_bot/              # Main Minecraft plugin project
├── README.md
├── server_setup.md
```

Key notes:

* `server/` → Local development server
* `crafty_bot/` → Actual plugin source code (Gradle project)
* `build-plugin.bat` → Builds and deploys the plugin automatically

---

# 6. Initial Server Setup (Required Before Development)

Follow the instructions in:

```text
server_setup README
```

This will:

* Generate server files
* Accept EULA
* Prepare the development environment

Do NOT skip this step.

---

# 7. How the Project is Intended to be Used

High-level workflow:

1. Clone repository
2. Open project in VS Code
3. Setup development server (via server_setup README)
4. Make code changes inside the plugin project
5. Use `build-plugin.bat` to rebuild and deploy

---

# 8. Opening the Plugin Project (Context Only)

Inside the repository:

```text
crafty_bot/
```

This directory contains:

* Gradle build files
* Source code
* Plugin resources

You do NOT need to manually configure dependencies.
Gradle handles all required libraries automatically.

---

# 9. Branching Rule (Team Development)

IMPORTANT:

* Do NOT develop directly on `main`
* Always create a new branch for your work

Example:

```bash
git checkout -b feature/your-feature-name
```

This prevents conflicts and protects the stable codebase.

---

# 10. Common Setup Mistakes (Avoid These)

Do NOT:

* Open only the plugin subfolder as the main workspace (unless instructed)
* Modify files directly in the server `/plugins` folder
* Commit build output (`/build` folder)
* Run build scripts while the server is online

---

# 11. Summary (Quick Start Checklist)

* Clone the repository
* Open the root folder in VS Code
* Install Java + Git
* Follow server_setup README
* Begin development using the provided structure

Once setup is complete, your environment will match the team’s development standard and allow consistent builds across all machines.
