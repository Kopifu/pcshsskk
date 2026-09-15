// ../actions.ts
'use server';

import { db, messaging } from "@/lib/firebaseAdmin";
import { revalidatePath } from "next/cache";
import { Message } from "firebase-admin/messaging";

export async function sendAnnouncement(formData: FormData) {
  // 1. ดึงข้อมูลจากฟอร์ม (อ้างอิงชื่อจาก 'name' ใน <input> และ <textarea>)
  const title = formData.get("title")?.toString() || "";
  const messageContent = formData.get("message")?.toString() || "";

  // ตรวจสอบค่าว่างเพื่อความปลอดภัย
  if (!title || !messageContent) {
    return { success: false, error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    // 2. บันทึกประกาศลงใน Firestore
    const announcementRef = await db.collection("announcements").add({
      title: title,
      body: messageContent,
      createdAt: new Date(),
    });

    // 3. เตรียม Payload สำหรับการแจ้งเตือน (Push Notification)
    // ระบุชนิดข้อมูลเป็น Message เพื่อให้ TypeScript ตรวจสอบความถูกต้อง
    const payload: Message = {
      notification: {
        title: `ประกาศใหม่: ${title}`,
        body: messageContent.length > 100 
          ? messageContent.substring(0, 97) + "..." 
          : messageContent,
      },
      // ข้อมูล Data ต้องส่งค่าเป็น 'string' เท่านั้น
      data: {
        announcementId: announcementRef.id,
      },
      topic: "announcements",
    };

    // 4. ส่งคำสั่งไปยัง Firebase Cloud Messaging
    await messaging.send(payload);

    // 5. สั่งให้ Next.js อัปเดตหน้าประกาศของนักเรียน (Student Page)
    revalidatePath("/student"); 

    console.log("Announcement sent and notification triggered!");
    
    return { success: true, error: null };
  } catch (error) {
    console.error("Error in sendAnnouncement:", error);
    return { success: false, error: "ไม่สามารถส่งประกาศได้" };
  }
}
