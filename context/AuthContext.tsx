"use client"; // ต้องเป็น Client Component [2]

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

let auth: any;

try {
    ({ auth } = require("../lib/firebase"));
} catch {
    ({ auth } = require("@/lib/firebase"));
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ตรวจจับสถานะการล็อกอินแบบ Real-time [2, 3]
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // ล้างการเชื่อมต่อเมื่อเลิกใช้งาน
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {/* แสดง Loading ระหว่างรอตรวจสอบสถานะเพื่อป้องกัน UI กระพริบ [3] */}
            {loading ? <div>กำลังโหลด...</div> : children}
        </AuthContext.Provider>
    );
};

// Hook สำหรับเรียกใช้งานในหน้าอื่นๆ [2]
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};