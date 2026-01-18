# 📚 Complete Guide: Contract Management Platform

## 🎯 What This Website Does

This is a **Contract Management Platform** - think of it like a digital system for creating, managing, and tracking contracts (like legal documents, agreements, etc.).

### Main Concepts:

1. **Blueprints** = Templates (like a form template)
2. **Contracts** = Actual documents created from blueprints (like filling out the form)
3. **Fields** = Individual input areas on a contract (name, date, signature, etc.)
4. **X/Y Coordinates** = Position of fields on the page (like placing text boxes on a document)

---

## 🏗️ How Everything is Connected

### File Structure Overview:

```
src/
├── App.tsx                    → Main router (connects all pages)
├── store/                     → Data storage (like a database)
│   ├── blueprintsStore.ts    → Manages all blueprints
│   └── contractsStore.ts     → Manages all contracts
├── pages/                     → Different screens/pages
│   ├── DashboardPage.tsx     → Home page (shows all contracts)
│   ├── CreateBlueprintPage.tsx → Create a template
│   ├── CreateContractPage.tsx   → Create a contract
│   └── ContractDetailPage.tsx   → View/edit a contract
└── components/                → Reusable UI pieces
    ├── BlueprintEditor/       → Tools to create/edit blueprints
    └── ContractViewer/        → Tools to view/edit contracts
```

### Data Flow:

```
1. User creates Blueprint (template)
   ↓
2. Blueprint saved in blueprintsStore
   ↓
3. User creates Contract from Blueprint
   ↓
4. Contract saved in contractsStore
   ↓
5. User can view/edit Contract
   ↓
6. User can change Contract status (lifecycle)
```

---

## 🔄 Complete Workflow: Step by Step

### STEP 1: Create a Blueprint (Template)

**What is a Blueprint?**
- A **template** that defines what fields a contract will have
- Like a form template with empty boxes

**How to Create:**

1. Go to **"Blueprints"** in the sidebar
2. Click **"Create Blueprint"**
3. Enter a name (e.g., "Employment Contract")
4. Click **"Add Field"** to add input areas:
   - **Field Type**: Choose Text, Date, Signature, or Checkbox
   - **Label**: What the field is called (e.g., "Employee Name")
   - **X Position**: Horizontal position (left to right) in pixels
   - **Y Position**: Vertical position (top to bottom) in pixels

**Example:**
- Field 1: Type="Text", Label="Employee Name", X=50, Y=100
- Field 2: Type="Date", Label="Start Date", X=50, Y=150
- Field 3: Type="Signature", Label="Signature", X=50, Y=300

5. Click **"Save Blueprint"**

**What Happens Behind the Scenes:**
- Blueprint is saved to `blueprintsStore`
- Data is stored in browser's `localStorage` (like a mini database)
- You can see it in the Blueprints list

---

### STEP 2: Create a Contract from Blueprint

**What is a Contract?**
- An **actual document** created from a blueprint
- Like filling out a form based on a template

**How to Create:**

1. Go to **Dashboard** (home page)
2. Click **"Create Contract"**
3. Enter contract name (e.g., "John Doe Employment Contract")
4. **Select a Blueprint** from dropdown
5. Fill in the fields that appear:
   - Text fields: Type text
   - Date fields: Pick a date
   - Checkbox: Check/uncheck
   - Signature: Draw signature on canvas
6. Click **"Create Contract"**

**What Happens Behind the Scenes:**
- Contract is created with status = "created"
- All field values are saved
- Contract is linked to the blueprint (blueprintId)
- Saved to `contractsStore` and `localStorage`

---

### STEP 3: View and Edit Contract

**How to View:**

1. Go to **Dashboard**
2. Click **"View"** on any contract
3. You'll see the contract with all fields displayed

**How to Edit:**

1. Click **"Edit"** button (if contract is not locked/revoked)
2. Change field values
3. Click **"Save"**

**Field Positioning:**
- Fields are displayed at their X/Y coordinates from the blueprint
- X = distance from left edge (in pixels)
- Y = distance from top edge (in pixels)
- Example: X=100, Y=200 means 100px from left, 200px from top

---

### STEP 4: Contract Lifecycle (Status Changes)

**What is Lifecycle?**
- The stages a contract goes through
- Like: Draft → Approved → Sent → Signed → Locked

**Status Flow:**

```
created → approved → sent → signed → locked
   ↓         ↓         ↓
revoked   revoked   revoked
```

**Valid Transitions:**
- `created` → can become `approved` or `revoked`
- `approved` → can become `sent` or `revoked`
- `sent` → can become `signed` or `revoked`
- `signed` → can become `locked`
- `locked` → **CANNOT CHANGE** (final state)
- `revoked` → **CANNOT CHANGE** (cancelled)

**How to Change Status:**

1. Open a contract
2. Scroll to **"Status Management"** section
3. Click **"Change Status"** button
4. Select new status from dropdown
5. Click **"Update Status"**

**Rules:**
- You **CANNOT skip steps** (e.g., can't go from "created" to "signed")
- **Locked** contracts cannot be edited
- **Revoked** contracts cannot proceed

---

## 🎨 Understanding X/Y Coordinates

### What are X and Y?

Think of the contract page like a **coordinate system**:

```
(0,0) ──────────────────────────→ X (horizontal)
  │
  │
  │
  │
  ↓
  Y (vertical)
```

- **X** = Horizontal position (left to right)
  - X = 0 → Far left
  - X = 500 → 500 pixels from left
- **Y** = Vertical position (top to bottom)
  - Y = 0 → Top
  - Y = 300 → 300 pixels from top

### Example Layout:

```
┌─────────────────────────────────┐
│ Contract Document               │
│                                 │
│ Employee Name: [_____]          │ ← X=50, Y=100
│                                 │
│ Start Date: [_____]             │ ← X=50, Y=150
│                                 │
│                                 │
│                                 │
│ Signature: [________]           │ ← X=50, Y=300
│                                 │
└─────────────────────────────────┘
```

### How to Set X/Y:

1. When creating a blueprint, click **"Add Field"**
2. In the form, you'll see:
   - **X Position**: Enter number (e.g., 50)
   - **Y Position**: Enter number (e.g., 100)
3. The field will appear at that position in the preview

**Tips:**
- Start with small numbers (X=50, Y=100)
- Increase Y to move fields down
- Increase X to move fields right
- Use the preview to see where fields appear

---

## 💾 How Data is Stored

### Storage System:

**No Database!** Everything is stored in your browser's **localStorage**:

- **Blueprints**: Stored as JSON in `localStorage` under key `contract_platform_blueprints`
- **Contracts**: Stored as JSON in `localStorage` under key `contract_platform_contracts`

**What This Means:**
- Data stays on your computer
- If you clear browser data, you lose everything
- No server/backend needed

### Data Structure:

**Blueprint:**
```json
{
  "id": "blueprint-123",
  "name": "Employment Contract",
  "fields": [
    {
      "id": "field-1",
      "type": "text",
      "label": "Employee Name",
      "position": { "x": 50, "y": 100 }
    }
  ],
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T10:00:00"
}
```

**Contract:**
```json
{
  "id": "contract-456",
  "name": "John Doe Contract",
  "blueprintId": "blueprint-123",
  "blueprintName": "Employment Contract",
  "status": "created",
  "fieldValues": [
    {
      "fieldId": "field-1",
      "value": "John Doe"
    }
  ],
  "createdAt": "2024-01-01T11:00:00",
  "updatedAt": "2024-01-01T11:00:00"
}
```

---

## 🔗 How Files Connect to Each Other

### 1. App.tsx (Main Router)

**Purpose**: Defines all routes (pages)

```typescript
/ → DashboardPage
/blueprints → BlueprintPage
/blueprints/create → CreateBlueprintPage
/contracts/create → CreateContractPage
/contracts/:id → ContractDetailPage
```

### 2. Stores (Data Management)

**blueprintsStore.ts:**
- Stores all blueprints
- Functions: `addBlueprint`, `updateBlueprint`, `deleteBlueprint`
- Auto-saves to localStorage

**contractsStore.ts:**
- Stores all contracts
- Functions: `addContract`, `updateContract`, `updateContractStatus`
- Auto-saves to localStorage
- Validates status transitions

### 3. Components

**BlueprintEditor:**
- Creates/edits blueprints
- Uses `FieldPositioner` to show fields on canvas
- Uses `FieldConfigForm` to configure fields
- Uses `BlueprintPreview` to preview

**ContractForm:**
- Creates contracts from blueprints
- Uses `BlueprintSelector` to choose blueprint
- Uses `FieldRenderer` to display fields

**ContractViewer:**
- Displays contracts
- Uses `ContractEditor` to edit
- Uses `LifecycleControls` to change status

### 4. Utilities

**lifecycle.ts:**
- Defines valid status transitions
- Validates if status change is allowed

**persistence.ts:**
- Saves/loads data from localStorage

**validation.ts:**
- Validates form inputs

---

## 🚀 Complete User Journey Example

### Scenario: Create an Employment Contract

**Step 1: Create Blueprint**
1. Click "Blueprints" → "Create Blueprint"
2. Name: "Employment Contract Template"
3. Add Field:
   - Type: Text
   - Label: "Employee Name"
   - X: 50, Y: 100
4. Add Field:
   - Type: Date
   - Label: "Start Date"
   - X: 50, Y: 150
5. Add Field:
   - Type: Signature
   - Label: "Employee Signature"
   - X: 50, Y: 300
6. Click "Save Blueprint"

**Step 2: Create Contract**
1. Go to Dashboard
2. Click "Create Contract"
3. Name: "John Doe - Employment Contract"
4. Select: "Employment Contract Template"
5. Fill fields:
   - Employee Name: "John Doe"
   - Start Date: "2024-01-15"
   - Signature: Draw signature
6. Click "Create Contract"

**Step 3: Manage Contract**
1. View contract from Dashboard
2. Change status: Created → Approved
3. Change status: Approved → Sent
4. Change status: Sent → Signed
5. Change status: Signed → Locked
6. (Now contract is locked and cannot be edited)

---

## 🎓 Key Concepts Summary

| Concept | What It Is | Example |
|---------|-----------|---------|
| **Blueprint** | Template/form design | "Employment Contract Template" |
| **Contract** | Filled-out document | "John Doe's Contract" |
| **Field** | Input area | Text box, date picker, signature |
| **X Coordinate** | Horizontal position | 50 = 50px from left |
| **Y Coordinate** | Vertical position | 100 = 100px from top |
| **Status** | Contract stage | created, approved, sent, signed, locked |
| **Lifecycle** | Status progression | created → approved → sent → signed → locked |

---

## 🛠️ Technical Details

### State Management (Zustand)

- **Why Zustand?** Lightweight, simple, no boilerplate
- **How it works:** Stores are like global variables that components can access
- **Auto-save:** Every change automatically saves to localStorage

### Routing (React Router)

- **How it works:** Different URLs show different pages
- **Navigation:** Use `navigate()` function to move between pages

### Field Positioning

- **Absolute Positioning:** Fields use CSS `position: absolute`
- **Coordinates:** X/Y are CSS `left` and `top` values
- **Preview:** Shows exactly where fields will appear

---

## ❓ Common Questions

**Q: Can I edit a locked contract?**
A: No, locked contracts are final and cannot be edited.

**Q: Can I skip status steps?**
A: No, you must follow the flow: created → approved → sent → signed → locked

**Q: What happens if I delete a blueprint?**
A: Contracts using that blueprint will still exist, but you won't be able to see the blueprint structure.

**Q: Where is my data stored?**
A: In your browser's localStorage. Clear browser data = lose all data.

**Q: How do I know what X/Y to use?**
A: Start with small numbers (50, 100) and adjust. Use the preview to see where fields appear.

---

## 🎯 Quick Reference

### To Create a Contract:
1. First create a Blueprint (template)
2. Then create a Contract from that Blueprint
3. Fill in the fields
4. Save

### To Change Contract Status:
1. Open the contract
2. Scroll to "Status Management"
3. Click "Change Status"
4. Select new status
5. Confirm

### Field Types:
- **Text**: Regular text input
- **Date**: Date picker
- **Signature**: Canvas to draw signature
- **Checkbox**: Check/uncheck box

---

This guide covers everything! If you have specific questions about any part, let me know! 🚀
