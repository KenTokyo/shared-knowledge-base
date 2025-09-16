# 🏗️ User-Profile Architecture Separation

## 📋 Overview

ElevateMe 4.0 implements a **two-tier architecture** that separates authentication concerns from application data by using distinct `users` and `profiles` tables. This architectural decision provides significant benefits for security, scalability, and maintainability.

## 🎯 Core Concept

```
┌─────────────────┐    1:1    ┌─────────────────┐
│  AUTH LAYER     │◄─────────►│  APP LAYER      │
│                 │           │                 │
│  users          │           │  profiles       │
│  - id           │           │  - id           │
│  - email        │           │  - userId  ──┐  │
│  - password     │           │  - name       │  │
│  - role         │           │  - bio        │  │
│  - oauth_data   │           │  - settings   │  │
└─────────────────┘           └───────────────┼──┘
                                              │
                              ┌───────────────▼──┐
                              │  APP FEATURES    │
                              │                  │
                              │  training        │
                              │  gamification    │
                              │  social          │
                              │  analytics       │
                              │  notifications   │
                              └──────────────────┘
```

## 🔐 Architecture Layers

### **AUTH LAYER (`users` table)**
**Purpose**: Handles authentication, authorization, and security
```typescript
users: {
  id: string,           // Stable OAuth provider ID
  email: string,        // Authentication identifier
  password?: string,    // Local auth (optional)
  role: "user"|"admin", // Authorization level
  emailVerified: Date   // Security verification
}
```

**Characteristics**:
- ✅ Minimal, security-focused data only
- ✅ Stable across application changes
- ✅ NextAuth.js compatible
- ✅ OAuth provider neutral
- ✅ GDPR compliant (separable from app data)

### **APP LAYER (`profiles` table)**
**Purpose**: Stores all user-facing application data
```typescript
profiles: {
  id: uuid,              // Primary app identifier
  userId: string,        // Link to auth layer
  display_name: string,  // User-facing identity
  bio: text,             // Personal information
  settings: json,        // App preferences
  privacy_settings: json // Visibility controls
}
```

**Characteristics**:
- ✅ Rich, feature-oriented data
- ✅ Frequently evolving schema
- ✅ User-customizable information
- ✅ Performance optimized for app queries
- ✅ Flexible for future features

## 🎯 Why This Architecture?

### **1. Security Isolation**
```typescript
// ✅ Auth changes don't affect app data
// ✅ App schema changes don't touch security
// ✅ Different access patterns and permissions

// AUTH: Rare updates, high security
await updateUserPassword(userId);

// APP: Frequent updates, feature-driven  
await updateProfileSettings(profileId, newSettings);
```

### **2. Scalability Benefits**
```typescript
// ✅ Profile-based database sharding possible
// ✅ Independent performance optimization
// ✅ Clear data organization and access patterns

// Clean separation enables targeted optimizations
await optimizeProfileQueries(profileId);
await cacheUserSettings(profileId);
```

### **3. Development Flexibility**
```typescript
// ✅ Profile features developed independently
// ✅ A/B testing on profile level
// ✅ Safe schema migrations

// Profile schema can evolve without auth impact
await addNewProfileFeature(profileId, featureData);
// Auth system remains untouched
```

### **4. Data Ownership & Privacy**
```typescript
// ✅ User can delete profile while keeping auth
// ✅ Profile migration between users possible
// ✅ GDPR "right to be forgotten" implementation

// Delete profile but keep auth for re-onboarding
await deleteProfile(profileId); // App data gone
// User can still log in and create new profile
```

## 📊 Foreign Key Strategy

### **CORRECT Pattern** ✅
All app features reference `profiles.id`:
```typescript
// All app tables point to profiles
training_sessions.profileId → profiles.id
gamification_progress.profileId → profiles.id
social_follows.profileId → profiles.id
notifications.recipientId → profiles.id
```

### **INCORRECT Pattern** ❌
App features should NEVER reference `users.id` directly:
```typescript
// ❌ WRONG - Breaks architecture separation
training_sessions.userId → users.id
gamification_progress.userId → users.id
```

## 🔄 Migration Strategy

When migrating from `userId` to `profileId`:

```sql
-- 1. Add new profileId column
ALTER TABLE training_sessions 
ADD COLUMN profile_id UUID REFERENCES profiles(id);

-- 2. Populate with data migration
UPDATE training_sessions ts
SET profile_id = p.id
FROM profiles p
WHERE ts.user_id = p.user_id;

-- 3. Drop old userId column
ALTER TABLE training_sessions 
DROP COLUMN user_id;

-- 4. Rename for consistency
ALTER TABLE training_sessions 
RENAME COLUMN profile_id TO profileId;
```

## 🎯 Implementation Guidelines

### **DO's** ✅
- Use `getCurrentProfile()` for app logic
- Reference `profiles.id` in all app features
- Keep auth and app concerns separate
- Use `profileId` naming convention consistently

### **DON'Ts** ❌
- Never reference `users.id` from app features
- Don't store app data in users table
- Don't mix auth logic with app logic
- Avoid direct user table queries in app code

## 🏆 Benefits Realized

1. **Security**: Auth system isolated and stable
2. **Performance**: App queries optimized for profile data
3. **Scalability**: Profile-based data architecture
4. **Maintainability**: Clear separation of concerns
5. **Flexibility**: Easy feature additions and migrations
6. **Privacy**: Granular data control and deletion

## 📅 Historical Context

This architecture was established to support:
- Multi-provider OAuth authentication
- Rich user profiles with gamification
- Social features and public profiles
- Advanced privacy controls
- Clean separation of concerns

The separation ensures that ElevateMe 4.0 can evolve its user experience while maintaining a stable, secure authentication foundation.

---

**Status**: ✅ Architecture established and actively maintained  
**Last Updated**: 2025-08-26  
**Next Review**: When adding new user-related features

**Aufgabe**

lese refactoring\user-profile-separation-refactor.md und shared-docs\agents\global-rule-agent.md unbedingt
also zusammenfassend vorkommende Fehler:

const session = await auth();
user.id
userId

Hier musst du immer getCurrentProfile/getLoggedInProfile, profileId profile.id arbeiten, an keiner Stelle mit user arbeiten außer beim einloggen

Suche alle bereiche wo der Fehler vorkommt und behebe diese!