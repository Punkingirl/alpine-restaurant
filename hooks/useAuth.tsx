// hooks/useAuth.tsx (create this file in each app)
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

// Types
interface UserProfile {
  name?: string;
  phone?: string;
  userType: "customer" | "restaurant" | "driver";
  restaurantId?: string;
  driverId?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
  };
  createdAt: any;
}

interface AuthUser {
  uid: string;
  email: string | null;
  profile?: UserProfile;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    userType: UserProfile["userType"],
    additionalData?: Partial<UserProfile>
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          try {
            // Get user profile from Firestore
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            const profile = userDoc.data() as UserProfile;

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              profile,
            });
          } catch (error) {
            console.error("Error fetching user profile:", error);
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (
    email: string,
    password: string,
    userType: UserProfile["userType"],
    additionalData: Partial<UserProfile> = {}
  ): Promise<void> => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Create user profile in Firestore
    const profile: UserProfile = {
      userType,
      createdAt: serverTimestamp(),
      ...additionalData,
    };

    await setDoc(doc(db, "users", firebaseUser.uid), profile);
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
