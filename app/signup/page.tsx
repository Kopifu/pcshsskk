"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase"; // ตรวจสอบว่าได้ export auth และ db ไว้แล้ว
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // ค่าเริ่มต้นเป็นนักเรียน
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. สร้างบัญชีผู้ใช้ใน Firebase Auth [1]
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. บันทึกข้อมูล Role และโปรไฟล์ลงใน Firestore โดยใช้ UID เป็น ID ของเอกสาร [2]
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: role, // 'teacher' หรือ 'student'
        createdAt: new Date().toISOString(),
      });

      // 3. สมัครสำเร็จแล้ว นำทางไปยังหน้า Dashboard ตามบทบาท [4]
      if (role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }

    } catch (err: any) {
      // จัดการข้อผิดพลาด เช่น อีเมลซ้ำ หรือรหัสผ่านสั้นเกินไป [1]
      if (err.code === "auth/email-already-in-use") {
        setError("อีเมลนี้ถูกใช้งานแล้ว");
      } else if (err.code === "auth/weak-password") {
        setError("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      } else {
        setError("เกิดข้อผิดพลาด: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container"> {/* ใช้คลาสเดิมจากหน้า Login ได้ */}
      <div className="login-card">
        <h1 className="login-title">สร้างบัญชีผู้ใช้งาน</h1>
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSignUp} className="login-form">
          <div className="input-group">
            <label>ชื่อ-นามสกุล</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>อีเมล</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>รหัสผ่าน</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>บทบาท</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded">
              <option value="student">นักเรียน</option>
              <option value="teacher">ครู</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? "กำลังสร้างบัญชี..." : "ลงทะเบียน"}
          </button>
        </form>
      </div>
    </main>
  );
}

