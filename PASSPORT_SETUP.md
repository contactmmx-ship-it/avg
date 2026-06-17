# Machine Passport - Setup & Integration Guide

## 🎯 Quick Integration (5 minutes)

### 1. Update App.tsx

```tsx
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PassportPage from './pages/PassportPage';
import { Bookmark } from 'lucide-react';

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route path="/twin" element={<YourTwinComponent />} />
        
        {/* Add Passport route */}
        <Route path="/passport/:machineId" element={<PassportPage />} />
      </Routes>
    </Router>
  );
}
```

### 2. Add Navigation Entry

```tsx
// In your navigation/header component
import { getPassportLink } from './lib/passportIntegration';
import { Bookmark } from 'lucide-react';

<nav>
  <a href={getPassportLink('AVG-000001')} className="flex items-center gap-2">
    <Bookmark size={18} />
    Machine Passport
  </a>
</nav>
```

### 3. Create Links Programmatically

```tsx
import { useNavigate } from 'react-router-dom';
import { getPassportLink } from './lib/passportIntegration';

function MachineCard({ machineId }) {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(getPassportLink(machineId))}
      className="text-blue-600 hover:underline"
    >
      View Passport
    </button>
  );
}
```

---

## 🧪 Testing & Development

### Test with Mock Data

Open browser console and run:

```javascript
// Import in your browser console
import { runAllPassportTests } from './lib/passportTesting';

// Execute
runAllPassportTests();

// Expected output:
// ✅ All tests completed successfully!
```

### Test Individual Components

```javascript
// Generate mock machine
import { generateMockMachine } from './data/passportMockData';
const mockMachine = generateMockMachine();
console.log(mockMachine);

// Generate mock history
import { generateMockOwnershipHistory } from './data/passportMockData';
const owners = generateMockOwnershipHistory();
console.log(owners);
```

### Access Test Data

```javascript
// In browser console
import { testCreateMachineWithMockData } from './lib/passportTesting';
const data = await testCreateMachineWithMockData();
console.table(data.machine);
console.table(data.ownership);
console.table(data.services);
```

---

## 🔌 Firebase Setup

### Verify Firebase Config

```tsx
// src/firebase.ts (should already exist)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### Deploy Firestore Rules

```bash
# Update your firestore.rules with the provided rules
cat firestore.rules >> your-project/firestore.rules

# Deploy
firebase deploy --only firestore:rules
```

### Create Firestore Collections

No pre-creation needed. Collections auto-create on first write:

- `machines/` - Auto-created
- `passport/` - Auto-created (subcollections)
- `_counters/` - Create manually:

```javascript
// In Firebase Console
// Collection: _counters
// Document: machine_id_counter
// Field: next_id (number) = 1
```

---

## 🎨 Customization

### Change Passport Colors

```tsx
// src/components/PassportCard.tsx
const getHealthColor = (score: number) => {
  if (score >= 85) return 'from-green-50 to-green-100';  // Edit here
  if (score >= 70) return 'from-blue-50 to-blue-100';
  // ...
};
```

### Add Custom Sections

```tsx
// src/components/MachinePassport.tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    {/* Existing tabs */}
    <TabsTrigger value="custom">My Custom Tab</TabsTrigger>
  </TabsList>
  
  <TabsContent value="custom">
    <div>Custom content here</div>
  </TabsContent>
</Tabs>
```

### Modify Data Fields

```tsx
// src/types/passport.types.ts
export interface MachineRecord {
  // Add your custom fields
  customField?: string;
  customMetric?: number;
}
```

---

## 🔐 Security Setup

### Enable Firestore Authentication

```tsx
// Wrap app with Auth context
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user, loading] = useAuthState(auth);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <LoginPage />;
  
  return <MainApp />;
}
```

### Set User Roles

In Firebase Console:

```
Users → Edit user → Custom claims
{
  "admin": true,
  "role": "inspector"
}
```

### Test Permissions

```javascript
// In browser console
const user = auth.currentUser;
const idTokenResult = await user.getIdTokenResult();
console.log(idTokenResult.claims.admin); // true/false
```

---

## 📊 Monitoring

### Check Firestore Usage

```bash
# Firebase Console → Firestore → Usage
# Monitor:
# - Read operations (queries)
# - Write operations (creates/updates)
# - Stored data size
```

### Monitor Performance

```javascript
// Add to your monitoring service
import { performance } from 'web-vitals';

// Log passport page load time
console.time('passport-load');
// ... load passport
console.timeEnd('passport-load');
```

### Debug Queries

```typescript
// Enable Firestore logging
import { enableLogging } from 'firebase/firestore';
enableLogging(true);
```

---

## 🚀 Deployment

### Pre-Deployment Checklist

- [ ] Test passport locally with mock data
- [ ] Verify Firebase config is correct
- [ ] Deploy Firestore rules
- [ ] Create `_counters/machine_id_counter` document
- [ ] Test route: `/passport/AVG-000001`
- [ ] Check all tabs load
- [ ] Verify responsive design on mobile
- [ ] Check console for errors

### Deploy to Production

```bash
# 1. Commit changes
git add .
git commit -m "feat: integrate machine passport system"

# 2. Push to main (triggers Vercel deploy)
git push origin main

# 3. Monitor deployment
# Vercel Dashboard → Deployments

# 4. Verify production
# https://your-domain.com/passport/AVG-000001
```

### Rollback if Needed

```bash
# Revert to previous commit
git revert <commit-hash>
git push origin main

# Or disable route temporarily
# Comment out in App.tsx and redeploy
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'firebase'"

**Solution**:
```bash
npm install firebase
```

### Issue: "useParams is not exported"

**Solution**:
```bash
npm install react-router-dom@latest
```

### Issue: "Firestore is not initialized"

**Solution**: Check `src/firebase.ts` exports:
```typescript
export const db = getFirestore(app);
```

### Issue: "Tabs component not found"

**Solution**: Ensure `@/components/ui/tabs` is created:
```bash
# File should exist at src/components/ui/tabs.tsx
```

### Issue: "Health data not updating"

**Solution**: Verify Twin is updating machine record:
```javascript
// Check in Firestore Console
machines/AVG-000001 → machineHealthScore
// Should be a number 0-100
```

### Issue: "Documents not loading"

**Solution**: Check Cloud Storage permissions:
```
Firebase Console → Storage → Rules
// Verify authenticated users can read
```

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router Guide](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

---

## 💡 Tips & Best Practices

1. **Use Mock Data for Development**
   - Faster iteration without Firestore calls
   - No Firebase config needed initially

2. **Test on Mobile**
   - Use DevTools device emulation
   - Responsive design built-in

3. **Monitor Firestore Costs**
   - Pagination keeps reads low
   - Real-time listeners optional

4. **Optimize Images**
   - Use Cloud Storage for machine photos
   - Generate thumbnails for gallery

5. **Add Logging**
   - Log user interactions
   - Track feature usage

---

**Last Updated**: June 17, 2026
**Version**: 1.0
**Status**: Production Ready ✅
