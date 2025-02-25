import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signOut, 
  User, 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { app } from "../firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

interface AuthContextType {
  user: User | null;
  role: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserRole(user);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setRole(userSnap.data().role);
    } else {
      await setDoc(userRef, {
        email: user.email,
        role: "user",
        name: user.displayName,
        photoURL: user.photoURL
      });
      setRole("user");
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
  
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: "user", });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
