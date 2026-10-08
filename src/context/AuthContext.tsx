import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  googleAuthProvider, 
  signInWithPopup, 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  FirebaseUser,
  setupRecaptcha,
  signInWithPhoneNumber,
  ConfirmationResult
} from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: (role?: UserRole) => Promise<User | null>;
  loginWithEmail: (email: string, pass: string, role?: UserRole) => Promise<User | null>;
  signupWithEmail: (email: string, pass: string, name: string, role?: UserRole, studentClass?: string) => Promise<User | null>;
  resetPassword: (email: string) => Promise<void>;
  loginAsGuest: (role?: UserRole) => Promise<User | null>;
  sendPhoneOtp: (phoneNumber: string, containerId: string) => Promise<ConfirmationResult>;
  verifyPhoneOtp: (confirmationResult: ConfirmationResult, otp: string, role?: UserRole, name?: string) => Promise<User | null>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sync with Firestore & PostgreSQL backend
  const syncUserData = async (fbUser: FirebaseUser, defaultRole: UserRole = 'student', customName?: string, phoneNum?: string): Promise<User> => {
    const uid = fbUser.uid;
    const email = fbUser.email || (fbUser.isAnonymous ? `guest_${uid.slice(0, 5)}@nexisacademy.com` : (phoneNum ? `${phoneNum.replace(/\D/g, '')}@nexisacademy.com` : 'user@nexisacademy.com'));
    const name = customName || fbUser.displayName || (fbUser.isAnonymous ? 'Guest Student' : email.split('@')[0]);

    let role = defaultRole;
    let studentClass = 'Class 10';

    try {
      // 1. Check Firestore first
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        role = (data.role as UserRole) || defaultRole;
        if (data.studentClass) studentClass = data.studentClass;
      } else {
        // Create initial document in Firestore
        await setDoc(userDocRef, {
          id: uid,
          name,
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || phoneNum || '',
          role,
          isAnonymous: fbUser.isAnonymous,
          studentClass,
          createdAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (err) {
      console.warn('Firestore user profile sync non-fatal warning:', err);
    }

    const appUser: User = {
      id: uid,
      name,
      email,
      role,
      phone: fbUser.phoneNumber || phoneNum,
      isAnonymous: fbUser.isAnonymous,
      studentClass,
      avatarUrl: fbUser.photoURL || undefined,
      provider: fbUser.providerData[0]?.providerId || (fbUser.isAnonymous ? 'guest' : 'custom')
    };

    // 2. Sync with Cloud SQL PostgreSQL backend
    try {
      const idToken = await fbUser.getIdToken();
      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          role: appUser.role,
          name: appUser.name,
          phone: appUser.phone,
          studentClass: appUser.studentClass,
          isAnonymous: appUser.isAnonymous,
          email: fbUser.email || appUser.email
        })
      });
    } catch (backendErr) {
      console.warn('Cloud SQL user sync warning:', backendErr);
    }

    setUser(appUser);
    return appUser;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          await syncUserData(fbUser);
        } catch (err) {
          console.error('Error syncing auth state:', err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (role: UserRole = 'student'): Promise<User | null> => {
    setError(null);
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);
      const synced = await syncUserData(res.user, role);
      return synced;
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setError(err.message || 'Google sign in failed.');
      throw err;
    }
  };

  const loginWithEmail = async (email: string, pass: string, role: UserRole = 'student'): Promise<User | null> => {
    setError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const synced = await syncUserData(res.user, role);
      return synced;
    } catch (err: any) {
      console.error('Email Sign In Error:', err);
      let msg = err.message;
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (err.code === 'auth/user-not-found') {
        msg = 'No Nexis account registered with this email. Click "Create Account" below.';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const signupWithEmail = async (email: string, pass: string, name: string, role: UserRole = 'student', studentClass = 'Class 10'): Promise<User | null> => {
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const synced = await syncUserData(res.user, role, name);
      return synced;
    } catch (err: any) {
      console.error('Email Signup Error:', err);
      let msg = err.message;
      if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Please Sign In.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters long.';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to send password reset email.');
      throw err;
    }
  };

  const loginAsGuest = async (role: UserRole = 'student'): Promise<User | null> => {
    setError(null);
    try {
      const res = await signInAnonymously(auth);
      const synced = await syncUserData(res.user, role, 'Guest Student');
      return synced;
    } catch (err: any) {
      console.error('Guest Auth Error:', err);
      setError(err.message || 'Guest login failed.');
      throw err;
    }
  };

  const sendPhoneOtp = async (phoneNumber: string, containerId: string): Promise<ConfirmationResult> => {
    setError(null);
    try {
      const verifier = setupRecaptcha(containerId);
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      window.confirmationResult = confirmationResult;
      return confirmationResult;
    } catch (err: any) {
      console.error('Phone OTP Send Error:', err);
      let msg = err.message;
      if (err.code === 'auth/invalid-phone-number') {
        msg = 'Please enter a valid phone number with country code (e.g. +91 9876543210).';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const verifyPhoneOtp = async (confirmationResult: ConfirmationResult, otp: string, role: UserRole = 'student', name?: string): Promise<User | null> => {
    setError(null);
    try {
      const res = await confirmationResult.confirm(otp);
      const synced = await syncUserData(res.user, role, name, res.user.phoneNumber || undefined);
      return synced;
    } catch (err: any) {
      console.error('Phone OTP Verify Error:', err);
      let msg = err.message;
      if (err.code === 'auth/invalid-verification-code') {
        msg = 'Invalid 6-digit OTP code entered. Please re-check the SMS.';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = async (): Promise<void> => {
    setError(null);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (err: any) {
      console.error('Sign Out Error:', err);
    }
  };

  const updateUserProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);

    try {
      const userDocRef = doc(db, 'users', user.id);
      await setDoc(userDocRef, data, { merge: true });
    } catch (e) {
      console.warn('Firestore profile update warning:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        error,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        resetPassword,
        loginAsGuest,
        sendPhoneOtp,
        verifyPhoneOtp,
        logout,
        updateUserProfile,
        clearError: () => setError(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
