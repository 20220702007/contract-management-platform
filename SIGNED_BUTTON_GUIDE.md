# 📋 "Signed" Button Guide - Dashboard

## Overview

There are **TWO** "signed" related features in the dashboard:

1. **"Signed" Filter Checkbox** - Filters contracts to show only signed/locked ones
2. **"Change Status" Button** - Changes a contract's status to "signed"

---

## 1️⃣ "Signed" Filter Checkbox

### **Location:**
Top of the dashboard, in the filter section

### **What It Does:**
Shows only contracts with **"signed"** or **"locked"** status

### **How It Works:**

```
Filter by: [ ] Active  [ ] Pending  [✓] Signed
```

- **Checked (✓)**: Shows only signed/locked contracts
- **Unchecked**: Shows all contracts (if no other filters checked)

### **Example:**

**Before clicking:**
- Shows all contracts (created, approved, sent, signed, locked, revoked)

**After clicking "Signed" filter:**
- Shows only contracts with status: **"signed"** or **"locked"**

### **Code Behind:**

```typescript
// src/constants/lifecycle.ts
STATUS_GROUPS: {
  signed: ['signed', 'locked']  // Both statuses included
}
```

### **Visual Flow:**

```
Dashboard
├── Status Filters
│   └── [✓] Signed checkbox ← Filters contracts
└── Contract Table
    └── Shows only signed/locked contracts
```

---

## 2️⃣ "Change Status" Button → Make Contract "Signed"

### **Location:**
Each contract row in the **Actions** column

### **What It Does:**
Changes a contract's status to "signed" (or other valid statuses)

### **How It Works:**

1. **Find a contract** in the table
2. **Click "Change Status"** button (in Actions column)
3. **Modal opens** showing available statuses
4. **Select "Signed"** from dropdown
5. **Click "Change Status"** button in modal
6. **Contract status changes** to "signed"

### **Requirements:**

**Contract must be in "sent" status** to change to "signed"

```
Valid:   sent → signed ✓
Invalid: created → signed ✗ (skips steps)
```

### **Status Lifecycle:**

```
created → approved → sent → [SIGNED] → locked
```

### **Code Behind:**

```typescript
// Valid transitions
sent: ['signed', 'revoked']  // Can become signed OR revoked
```

### **Visual Flow:**

```
Contract Row
├── Actions Column
│   ├── [View] button
│   └── [Change Status] button ← Click this
│       └── Modal opens
│           ├── Current Status: "Sent"
│           ├── Select: "Signed" ✓
│           └── [Change Status] button
│               └── Status updated!
```

---

## 🎯 Complete Example Workflow

### **Scenario: Filter and Mark Contract as Signed**

**Step 1: Filter for "Sent" Contracts**
- Use filter to find contracts ready to be signed
- Or just look through the table

**Step 2: Change Status to "Signed"**
1. Find a contract with status **"Sent"**
2. Click **"Change Status"** button (in Actions column)
3. Modal opens
4. Select **"Signed"** from dropdown
5. Click **"Change Status"** in modal
6. Status changes to "Signed"

**Step 3: Use "Signed" Filter**
- Check **"Signed"** filter checkbox
- Table now shows only signed/locked contracts
- Your newly signed contract appears in the list

---

## 📊 Filter Combinations

You can combine filters:

**Example 1: Only Active Contracts**
- [✓] Active
- [ ] Pending
- [ ] Signed

**Example 2: Only Signed Contracts**
- [ ] Active
- [ ] Pending
- [✓] Signed

**Example 3: Active AND Signed (if any exist)**
- [✓] Active
- [ ] Pending
- [✓] Signed

---

## 🔍 Status Groups Explained

### **Active Group:**
- `created`, `approved`, `sent`
- Contracts in progress

### **Pending Group:**
- `created`, `approved`, `sent`
- Same as active (contracts not yet completed)

### **Signed Group:**
- `signed`, `locked`
- Completed contracts (signed or locked/final)

---

## ❓ Common Questions

### **Q: Why can't I change a "created" contract to "signed"?**
A: You must follow the lifecycle: `created → approved → sent → signed`. You can't skip steps.

### **Q: What's the difference between "signed" and "locked"?**
A: 
- **Signed**: Contract is signed, but can still become locked
- **Locked**: Final status, cannot be changed

### **Q: Can I uncheck the "Signed" filter after checking it?**
A: Yes! Uncheck it to show all contracts again.

### **Q: Can I change a "locked" contract?**
A: No, locked contracts are final and cannot be changed.

---

## 💡 Tips

1. **Use Filters**: Use the "Signed" filter to quickly find completed contracts
2. **Status Workflow**: Always follow: created → approved → sent → signed → locked
3. **Check Status Badge**: Look at the colored status badge in the table to see current status
4. **Available Actions**: "Change Status" button only appears if transitions are available

---

## 🎨 Visual Indicators

### **Status Badges in Table:**
- 🔵 **Created** - Blue
- 🟡 **Approved** - Yellow
- 🟣 **Sent** - Purple
- 🟢 **Signed** - Green
- ⚫ **Locked** - Gray
- 🔴 **Revoked** - Red

### **Filter Checkbox States:**
- **Unchecked**: Shows all contracts
- **Checked**: Filters to show only matching contracts

---

## 🔧 Technical Details

### **Filter Logic:**

```typescript
const filteredContracts = contracts.filter((contract) => {
  if (!filters.active && !filters.pending && !filters.signed) {
    return true; // Show all if no filters checked
  }

  const isSigned = STATUS_GROUPS.signed.includes(contract.status);
  // Checks if contract status is 'signed' or 'locked'

  return filters.signed && isSigned;
});
```

### **Status Transition Logic:**

```typescript
// Valid transitions
sent → signed ✓
sent → revoked ✓

// Invalid transitions
created → signed ✗ (must go: created → approved → sent → signed)
locked → signed ✗ (locked is final)
```

---

## 📝 Summary

### **"Signed" Filter Checkbox:**
- ✅ Filters table to show signed/locked contracts
- ✅ Can be combined with other filters
- ✅ Easy to toggle on/off

### **"Change Status" Button:**
- ✅ Changes contract status (including to "signed")
- ✅ Only available if valid transitions exist
- ✅ Must follow lifecycle flow (sent → signed)

---

**Both features work together to help you manage contracts efficiently!** 🚀
