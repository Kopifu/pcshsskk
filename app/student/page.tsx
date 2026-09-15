"use client";

import NotificationHandler from "@/components/NotificationHandler";
import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ForegroundNotification from "@/components/ForegroundNotification";
import { Toaster } from "react-hot-toast";

export default function StudentPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));

        getDocs(q)
          .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              date: doc.data().createdAt?.toDate().toLocaleDateString() || "Just now",
            }));
            setAnnouncements(data);
          })
          .catch((err) => {
            console.error("Firestore Error:", err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUserId(null);
        setAnnouncements([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">กำลังโหลดประกาศ...</div>;
  }

  return (
    <main className="p-8">
      <Toaster position="top-right" />
      {userId ? <NotificationHandler userId={userId} /> : null}
      <ForegroundNotification />

      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6 text-green-700">Student Announcements</h1>
        <div className="space-y-4">
          {announcements.map((item: any) => (
            <div key={item.id} className="p-6 bg-white rounded-lg shadow border border-green-100">
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-600 mt-2">{item.body}</p>
              <div className="text-xs text-gray-400 mt-4 text-right">Sent: {item.date}</div>
            </div>
          ))}
          {announcements.length === 0 && (
            <p className="text-center text-gray-500 italic">No announcements yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}