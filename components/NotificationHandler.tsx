// components/NotificationHandler.tsx
'use client';

import { useEffect } from "react";
import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { saveSubscription } from "@/app/actions/notifications";

export default function NotificationHandler({ userId }: { userId: string }) {
  useEffect(() => {
    const setupNotifications = async () => {
      if (!messaging || typeof window === "undefined") return;

      // 1. ตรวจสอบสถานะสิทธิ์ปัจจุบันของเบราว์เซอร์
      if (Notification.permission === 'denied') {
        console.warn("การแจ้งเตือนถูกบล็อกโดยผู้ใช้ โปรดเปิดสิทธิ์ในการตั้งค่าเบราว์เซอร์");
        return; // หยุดการทำงานเพื่อไม่ให้เกิด Error messaging/permission-blocked
      }

      try {
        const currentToken = await getToken(messaging, {
          vapidKey: "BHuvNuLIT8NsXA8Uq7i5f3rj59-uPB9RER4lqjlgrkp-FvYPhp2-1MyTl1EXjygT5r2OJYodSkBNayiRwKv7L5E" 
        });

        if (currentToken) {
          await saveSubscription(userId, currentToken);
        }
      } catch (err: any) {
        if (err.code === 'messaging/permission-blocked') {
          // จัดการกรณีที่สิทธิ์ถูกบล็อกในระหว่างการเรียก getToken
          console.error("สิทธิ์การแจ้งเตือนถูกบล็อก:", err.message);
        } else {
          console.error("เกิดข้อผิดพลาดในการรับ Token:", err);
        }
      }
    };

    if (userId) setupNotifications();
  }, [userId]);

  return null;
}
