// app/actions/notifications.ts
'use server';

import { db, messaging } from "@/lib/firebaseAdmin"; 
import { FieldValue } from "firebase-admin/firestore";

export async function saveSubscription(userId: string, token: string) {
  try {
    // 1. บันทึก Token ลง Firestore ตามเดิม
    const registrationRef = db.collection("fcmRegistrations").doc(userId);
    await registrationRef.set({
      token: token,
      platform: "web",
      lastUpdated: FieldValue.serverTimestamp(),
    }, { merge: true });

    // 2. --- เพิ่มส่วนนี้: Subscribe token นี้เข้ากับ Topic "announcements" ---
    // การใช้ Topic จะช่วยให้ส่งประกาศถึงนักเรียนทุกคนได้พร้อมกันโดยไม่ต้องวนลูปส่งทีละ Token [2, 6]
    await messaging.subscribeToTopic(token, "announcements");

    return { success: true };
  } catch (error) {
    console.error("Failed to save token and subscribe:", error);
    return { success: false };
  }
}
