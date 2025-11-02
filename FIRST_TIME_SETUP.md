# CodeCrafters AI - First Time Setup Guide

## Problem: "Invalid Login Credentials" Error

The login credentials you tried don't work because **Supabase Auth requires you to create an account first through the registration page**.

The demo account in the database tables is just for reference - it's not the same as a Supabase Auth user account.

---

## Solution: Create Your Account

### Step 1: Start the Application
```bash
npm run dev
```
The app opens at `http://localhost:5173`

### Step 2: Go to Registration Page
1. Click **"Register here"** link on the login page
2. Or navigate directly to `/register`

### Step 3: Fill Out Registration Form
```
Full Name:        Your Name (any name works)
Email:            test@example.com (or any email)
Password:         test123456 (minimum 8 characters)
Confirm Password: test123456
Branch:           CSE (or IT/ECE)
Semester:         3 (or any 1-8)
```

### Step 4: Click Register
- Account is created in Supabase Auth
- User profile is added to the database
- You're automatically logged in
- You go to the dashboard

### Step 5: You're In!
- Dashboard loads with your stats
- Browse challenges
- Start coding
- Use all features

---

## Recommended Test Accounts

Create multiple test accounts for testing:

### Account 1 (CSE Student)
```
Email:    cse.student@test.com
Password: password123
Branch:   CSE
Name:     CSE Test Student
```

### Account 2 (IT Student)
```
Email:    it.student@test.com
Password: password123
Branch:   IT
Name:     IT Test Student
```

### Account 3 (ECE Student)
```
Email:    ece.student@test.com
Password: password123
Branch:   ECE
Name:     ECE Test Student
```

---

## Why This Works

### Registration Flow
1. **Frontend** collects form data
2. **Supabase Auth** creates authenticated user
3. **Database** creates user profile
4. **Session** established automatically
5. **Login** now works with these credentials

### Database Structure
```
Supabase Auth (auth.users)
    ↓ (creates)
    ↓ (email verified)
    ↓
User Profile (public.users)
    ↓ (linked by user ID)
    ↓
Challenge Data
Progress Tracking
Achievements
Conversations
```

---

## Troubleshooting

### Registration Fails
**Problem**: Error during registration
**Solution**:
- Check password is at least 8 characters
- Use a valid email format
- Ensure no duplicate email
- Try a different email

### Still Can't Login After Registration
**Problem**: Created account but can't login
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Try a new incognito window
- Check email spelling matches exactly
- Verify password has no typos

### Want to Test with Pre-made Data
**Problem**: Want sample progress data
**Solution**:
1. Register your account
2. Manually create a challenge or two
3. Progress data is already in database (sample records)
4. You'll see it in the Progress dashboard

---

## What Happens After Registration

### Your Dashboard Shows
- Statistics from database
- Featured challenges
- Empty achievement badges (earn by completing challenges)
- Your profile information

### You Can
- Browse 15+ challenges
- Use the code editor
- Get AI debugging help
- Track progress
- Earn achievements
- Update your profile

### Sample Data Included
- 15+ challenges (already in database)
- 12 achievement badges (already defined)
- Sample progress records (from demo user)
- These will show in your dashboard

---

## For Buildathon Presenters

### During Demo
1. **Start Fresh**: Clear browser cache
2. **Register New Account**: Show registration flow
   - Email: `demo-student@buildathon.test`
   - Password: `buildathon123`
   - Name: "Demo Student"
   - Branch: "CSE"
3. **Auto-login**: After registration, goes to dashboard
4. **Show Features**: All challenges and features available

### Multiple Demo Runs
1. Register with different emails
2. Each registration creates new user account
3. Each user has separate progress data
4. Perfect for showing different branch content

### Pre-Register Before Presentation
1. Test account before going live
2. Verify all features work
3. Know the flow by heart
4. Can reset by using new email each time

---

## Alternative: Create Via Supabase Console

If you prefer, you can create users directly in Supabase:

1. Go to Supabase Dashboard
2. Navigate to Authentication → Users
3. Click "Add User"
4. Enter email and password
5. User is created in auth.users
6. Then you can login normally

But **registration page is easier** and more realistic for demo.

---

## Why This Design?

### Security Reasons
- Users control their own passwords
- Email verification ready (if enabled)
- No hardcoded demo credentials
- Safe for production

### User Experience
- Clear registration flow
- Immediate access after signup
- Personalized dashboard
- All features available

### Testing
- Create as many test accounts as needed
- Each with different branches
- Track separate progress
- Test all features independently

---

## Quick Start Summary

1. **Run**: `npm run dev`
2. **Open**: `http://localhost:5173`
3. **Click**: "Register here"
4. **Fill**: Email, password, name, branch
5. **Click**: "Register"
6. **Done**: You're in the dashboard!

---

## Questions?

- Check **QUICK_START.md** for more info
- See **BUILDATHON_GUIDE.md** for feature details
- Review **FEATURES.md** for complete list

**That's it! Create your account and start coding!** 🚀
