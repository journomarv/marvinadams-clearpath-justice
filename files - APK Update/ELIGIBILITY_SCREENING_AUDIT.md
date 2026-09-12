# ClearPath Justice Eligibility Screening Audit & Testing

**Objective:** Thoroughly audit and test the eligibility screening mechanism to ensure accuracy, clarity, and proper functioning.

---

## 📋 Audit Scope

This audit covers:
1. Every question and answer option
2. Conditional logic and branching
3. Decision calculations and results
4. User interface and experience
5. Data management and state
6. Error handling and edge cases
7. Legal accuracy and disclaimers

---

## 🔍 Phase 1: Code Review & Structure Analysis

### 1.1 Locate the Screening Code

**Find these files in the React app:**

```
src/
├── components/
│   ├── EligibilityChecker.jsx (or similar)
│   ├── Question.jsx
│   ├── Result.jsx
│   └── ...
├── logic/
│   ├── eligibilityLogic.js (or similar)
│   ├── questions.json
│   └── ...
└── pages/
    └── Eligibility.jsx (or similar)
```

### 1.2 Questions Audit Template

For **each question**, document:

```
Question ID: [identifier]
Question Text: "[exact wording from app]"
Question Type: [text/multiple-choice/yes-no/conditional]
Answer Options:
  - Option 1: [text] → [action/next question]
  - Option 2: [text] → [action/next question]
Conditional Display: [when does this question appear?]
Used In Calculation: [yes/no - is this answer used in final result?]
Related Questions: [other questions this affects]
Data Stored As: [variable name/state key]
```

### 1.3 Decision Logic Audit Template

```
Eligibility Pathway Name: [e.g., "CPPA Section 5(1)"]
Conditions for This Result:
  1. [Condition A] AND/OR
  2. [Condition B] AND/OR
  3. [Condition C]
Questions Used: [list all questions that feed into this]
Result Message: "[exact text shown to user]"
Is This Legal Accuracy: [yes/no - verified against CPPA]
Disclaimer Included: [yes/no]
```

---

## 🧪 Phase 2: Decision Logic Verification

### 2.1 Logic Flow Diagram

Create a flow chart showing:

```
Start
  ↓
Question 1 (e.g., "Convicted of cannabis offense?")
  ├─ Yes → Question 2
  └─ No → Result: Ineligible (Reason A)
      ↓
Question 2 (e.g., "When was conviction?")
  ├─ Before CPPA → Question 3
  ├─ After CPPA → Result: Ineligible (Reason B)
  └─ Date of CPPA → Question 3
      ↓
... (continue for all branches)
```

### 2.2 Test Matrix Setup

Create a test scenario matrix:

```
Scenario | Q1 | Q2 | Q3 | Q4 | Q5 | Expected Result | Actual Result | ✓/✗
---------|----|----|----|----|----|-----------------|---------------|----- 
Case 1   | A1 | A1 | A1 | A1 | A1 | Eligible (S5.1) |               |
Case 2   | A1 | A1 | A1 | A1 | A2 | Eligible (S5.2) |               |
Case 3   | A2 | -  | -  | -  | -  | Ineligible      |               |
... 
```

### 2.3 Logic Verification Checklist

- [ ] Every question is used in the final calculation
- [ ] No questions are unanswered (unless marked as optional)
- [ ] Question order is logical and matches legal criteria
- [ ] Conditional questions appear only when needed
- [ ] No circular logic (Question A depends on B, B depends on A)
- [ ] No unreachable branches
- [ ] No hardcoded results
- [ ] Results correctly reflect answer combinations
- [ ] Changing an answer updates downstream results

---

## 🎯 Phase 3: Test Scenarios

### Scenario Group A: Clearly Eligible Cases

#### Scenario A1: Eligible under CPPA Section 5(1) (Automatic)
```
Test Case: Person convicted of cannabis offense before CPPA
- Conviction date: [Before July 2024]
- Amount: Small (for personal consumption)
- No violent crime elements
- No aggravating factors

Expected: ELIGIBLE - Automatic Expungement (CPPA Section 5(1))
Test Steps:
  1. Start screening
  2. Answer "Yes" to cannabis conviction
  3. Provide conviction date (before CPPA)
  4. Confirm personal consumption amount
  5. Confirm no violence/aggravating factors
  6. Verify result matches expectation
```

#### Scenario A2: Eligible under CPPA Section 5(2) (By Application)
```
Test Case: Person who may qualify through application process
- Conviction date: [Before or after CPPA]
- Meeting Section 5(2) criteria
- May have additional factors

Expected: ELIGIBLE - Can Apply (CPPA Section 5(2))
Test Steps:
  1. Start screening
  2. Answer questions leading to Section 5(2) pathway
  3. Provide required information
  4. Verify result explains application process
```

#### Scenario A3: Eligible under Alternative Pathways
```
Test Case: Person meeting criteria through:
- Diversion programs
- Legal erasure provisions
- Constitutional grounds

Expected: ELIGIBLE - [Alternative pathway]
Test Steps:
  1. Follow screening questions
  2. Identify which pathway applies
  3. Verify result is specific to their case
```

---

### Scenario Group B: Clearly Ineligible Cases

#### Scenario B1: Violent Crime
```
Test Case: Conviction involved violence/harm
- Cannabis offense with assault
- Offense with injury component
- Multiple victims

Expected: INELIGIBLE - Disqualifying Factors
Test Steps:
  1. Start screening
  2. Indicate cannabis conviction
  3. Confirm violence/injury element
  4. Verify result explains why ineligible
```

#### Scenario B2: Recent Conviction
```
Test Case: Conviction after CPPA (if outside grace period)
- Conviction date: [After CPPA, outside eligibility window]
- Otherwise would qualify

Expected: INELIGIBLE - Too Recent (if applicable)
Test Steps:
  1. Start screening
  2. Indicate conviction date
  3. Verify result explains timeframe requirement
```

#### Scenario B3: No Criminal Conviction
```
Test Case: Person without criminal record
- No prior convictions
- Looking for general information

Expected: INELIGIBLE - No Record to Expunge
Test Steps:
  1. Start screening
  2. Answer "No" to conviction question
  3. Verify result explains they don't need expungement
```

---

### Scenario Group C: Borderline / Conditional Cases

#### Scenario C1: Multiple Convictions (Mixed)
```
Test Case: Mix of eligible and ineligible convictions
- Cannabis conviction (eligible)
- Other conviction (not eligible)

Expected: PARTIALLY ELIGIBLE - Explain mixed situation
Test Steps:
  1. Indicate multiple convictions
  2. Specify each conviction type
  3. Verify result addresses each separately
```

#### Scenario C2: Pending/Appeal Status
```
Test Case: Case status unclear
- Conviction pending appeal
- Case in review
- Outcome uncertain

Expected: DEFER - Advise to wait or consult lawyer
Test Steps:
  1. Indicate conviction status
  2. Explain pending status
  3. Verify result appropriately defers judgment
```

#### Scenario C3: Administrative Gaps
```
Test Case: Missing required information
- Can't remember exact conviction date
- Unclear about conviction details

Expected: FLAG FOR MANUAL REVIEW
Test Steps:
  1. Try to complete screening with gaps
  2. Verify app handles missing data appropriately
  3. Ensure user is directed to get required info
```

---

## 📝 Phase 4: User Interaction Testing

### 4.1 Question Answering

Test each question:

- [ ] Question text is clear
- [ ] Answer options are mutually exclusive
- [ ] Answer options are exhaustive (covers all possibilities)
- [ ] Users can select one answer
- [ ] Users can change their answer
- [ ] Selection is visually confirmed
- [ ] Next button is enabled after selection

### 4.2 Navigation

- [ ] Users can proceed forward
- [ ] Users can go back to previous questions
- [ ] Going back and changing answer updates results
- [ ] Users cannot skip required questions
- [ ] Progress indicator (if present) updates correctly
- [ ] Users can restart from beginning
- [ ] No dead-end screens

### 4.3 Result Display

- [ ] Result screen displays correctly
- [ ] Result matches answers provided
- [ ] Explanation is clear and understandable
- [ ] Disclaimer is visible
- [ ] Next steps are explained
- [ ] Contact information is provided (if applicable)
- [ ] Users can restart assessment
- [ ] Users can share result (if applicable)

### 4.4 Edge Cases

- [ ] App handles rapid question changes
- [ ] App handles going back/forward quickly
- [ ] App handles phone rotation (landscape/portrait)
- [ ] App handles screen size changes
- [ ] App handles connection loss (if applicable)
- [ ] App handles browser back button (if web)
- [ ] State persists during session

---

## ✅ Phase 5: Legal Accuracy Review

### 5.1 Verify Against CPPA Provisions

**Check Question Set 1: Section 5(1) (Automatic)**

```
Verified: [ ]
CPPA Provision: "Any person who was convicted of an offense under 
  the provisions of the previous legislation... shall have that 
  conviction expunged..."

Screening Questions Should Confirm:
- [ ] Person was convicted (of cannabis offense)
- [ ] Conviction was under previous legislation
- [ ] Expungement is automatic (no discretion)
- [ ] Person meets all Section 5(1) criteria

Legal Accuracy: [Correct / Incorrect / Needs Review]
Notes: [Any discrepancies noted]
```

**Check Question Set 2: Section 5(2) (By Application)**

```
Verified: [ ]
CPPA Provision: "The Minister or a competent person as designated 
  by the Minister may grant an application for expungement..."

Screening Questions Should Confirm:
- [ ] Person meets Section 5(2) criteria
- [ ] Application process is explained
- [ ] Discretionary nature is explained
- [ ] Next steps are clear

Legal Accuracy: [Correct / Incorrect / Needs Review]
Notes: [Any discrepancies noted]
```

**Check Question Set 3: Diversion Programs & Alternatives**

```
Verified: [ ]

Screening Should Include:
- [ ] Alternative expungement pathways
- [ ] Diversion program information
- [ ] Constitutional/legal challenge options
- [ ] Referral to legal professionals

Legal Accuracy: [Correct / Incorrect / Needs Review]
Notes: [Any discrepancies noted]
```

### 5.2 Disclaimer Verification

The app should display:

```
REQUIRED DISCLAIMER:
"This screening tool provides a preliminary assessment only. 
It is not legal advice. Your actual eligibility will be determined 
by the relevant government authority (DOJ, SAPS, courts) 
based on the applicable legal and administrative process.

For a definitive answer, consult with:
- A legal professional
- A community advice office
- The Department of Justice & Constitutional Development"

Present: [ ] Yes [ ] No
Wording: [ ] Accurate [ ] Needs Revision
Visibility: [ ] Always visible [ ] On results screen [ ] Hidden
Timing: [ ] Before screening [ ] During [ ] After results
```

---

## 🐛 Phase 6: Bug & Error Testing

### 6.1 Data Validation

- [ ] App handles unanswered questions (if not required)
- [ ] App validates date inputs (correct format)
- [ ] App handles empty/null responses
- [ ] App prevents invalid combinations
- [ ] App shows clear error messages
- [ ] Error messages suggest how to fix

### 6.2 State Management

- [ ] Answers persist during screening
- [ ] Changing answer updates downstream questions
- [ ] Restart clears all previous answers
- [ ] State is not lost on navigation
- [ ] Forward/back doesn't lose data
- [ ] Redirect/reload doesn't lose progress (unless restarting)

### 6.3 Performance

- [ ] Questions load quickly
- [ ] Results generate quickly (< 2 seconds)
- [ ] No lag on answer selection
- [ ] No lag on navigation
- [ ] App doesn't freeze/hang
- [ ] Restart is instant

### 6.4 Accessibility

- [ ] Questions readable by screen readers
- [ ] Answer buttons keyboard accessible
- [ ] Text contrast sufficient
- [ ] Buttons large enough (48x48 dp minimum)
- [ ] No ARIA errors
- [ ] No semantic HTML errors

---

## 📱 Phase 7: Device & Responsive Testing

### 7.1 Screen Sizes

Test on:
- [ ] Phone (320px width - iPhone SE)
- [ ] Phone (375px - iPhone 8)
- [ ] Phone (414px - iPhone 12)
- [ ] Tablet (600px - iPad mini)
- [ ] Tablet (1024px - iPad)
- [ ] Desktop (1920px+)

### 7.2 Orientations

- [ ] Portrait (normal)
- [ ] Landscape (rotated)
- [ ] Transition between orientations

### 7.3 Android Versions

Test on:
- [ ] Android 8 (API 26) - minimum
- [ ] Android 9 (API 28)
- [ ] Android 10 (API 29)
- [ ] Android 11 (API 30)
- [ ] Android 12 (API 31)
- [ ] Android 13+ (latest)

### 7.4 Browsers (if web)

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📋 Phase 8: Test Execution Log

### Test Run 1: Initial Screening

```
Date: [____]
Tester: [____]
Platform: Android [version] / iOS [version] / Web [browser]
Device: [model/size]

Test Cases Executed:
  [ ] Scenario A1 - Eligible S5(1)
  [ ] Scenario A2 - Eligible S5(2)
  [ ] Scenario B1 - Ineligible (Violence)
  [ ] Scenario B2 - Ineligible (Too Recent)
  [ ] Scenario C1 - Borderline (Multiple)

Issues Found: [list any problems]
Screenshots: [attach images of issues]

Status: [ ] Pass [ ] Fail [ ] Needs Revision
```

### Test Run 2: Cross-Device

```
Date: [____]
Tester: [____]

Devices Tested:
  [ ] Phone (small)
  [ ] Phone (medium)
  [ ] Phone (large)
  [ ] Tablet
  [ ] Desktop

Issues Found: [list any problems]
Screenshots: [attach images]

Status: [ ] Pass [ ] Fail
```

### Test Run 3: Logic Verification

```
Date: [____]
Tester: [____]

Test Scenarios: [run complete test matrix]
Expected Results: [all matched?] [ ] Yes [ ] No
Logic Issues Found: [list]
Legal Accuracy: [ ] Verified [ ] Issues Found

Status: [ ] Pass [ ] Fail
```

---

## 🚀 Phase 9: Issue Tracking

Create issues for each problem found:

```
ISSUE #001
Title: [Clear description]
Severity: [Critical / High / Medium / Low]
Category: [Logic / UI / Legal / Performance / Other]
Description: [What's wrong]
Steps to Reproduce: [How to trigger it]
Expected Behavior: [What should happen]
Actual Behavior: [What actually happens]
Affected Scenarios: [Which test cases affected]
Fix Required: [Yes / No / Defer]
Priority: [P0 / P1 / P2 / P3]
```

---

## ✅ Phase 10: Sign-Off Checklist

Before approving the updated APK:

- [ ] All test scenarios have been executed
- [ ] All critical issues have been fixed
- [ ] All high-priority issues have been fixed
- [ ] Logic has been verified against CPPA
- [ ] Disclaimers are present and accurate
- [ ] UI works on all tested devices
- [ ] App doesn't crash on any test
- [ ] Results are legally accurate
- [ ] Results match answers provided
- [ ] No existing functionality has been broken
- [ ] Performance is acceptable
- [ ] Accessibility is acceptable
- [ ] Error messages are helpful

**Final Approval:** [ ] Approved [ ] Needs More Work

---

## 📝 Quick Reference: Test Scenarios Template

Use this template for each test:

```
TEST: [Scenario Name]
Date: [Date]
Tester: [Name]

SETUP:
- Device: [Type/OS]
- App Version: [Version]
- Freshly Installed: [ ] Yes [ ] No

STEPS:
1. [Start app]
2. [Navigate to eligibility checker]
3. [Answer Q1: ___]
4. [Answer Q2: ___]
5. [Continue...]
6. [Verify result]

EXPECTED RESULT:
[What the result should show]

ACTUAL RESULT:
[What actually appeared]

MATCH:
[ ] Yes - Test Passed ✓
[ ] No - Test Failed ✗
[ ] Partial - Needs Review

ISSUES:
[Any problems encountered]

SCREENSHOTS:
[Attach relevant screenshots]

NOTES:
[Any additional observations]
```

---

## 🎯 Success Criteria

The eligibility screening is ready when:

✅ All test scenarios pass
✅ Logic matches legal requirements (CPPA)
✅ Disclaimers are present and accurate
✅ UI is responsive and works on all devices
✅ All questions and answers are clear
✅ Results match answers provided
✅ Users can navigate forward/backward
✅ No crashes or errors
✅ Performance is acceptable
✅ Accessibility meets standards
✅ App icon displays correctly
✅ No existing functionality broken

---

## 📚 Related Documentation

- CPPA 2024 (Cannabis for Private Purposes Act 7 of 2024)
- DOJ Guidance on Expungement
- South African Expungement Regulations

---

## 🔗 Next Steps

1. ✅ Complete this audit
2. ✅ Log all issues found
3. ✅ Fix critical/high-priority issues
4. ✅ Re-test fixed areas
5. ✅ Build updated APK
6. ✅ Test on physical device
7. ✅ Verify app icon displays
8. ✅ Sign off on final build

---

**Ready to audit?** Download this template, gather the team, and systematically test every aspect of the screening!
