'use server';

import { db, messaging } from "@/lib/firebaseAdmin";
import { revalidatePath } from "next/cache";
import { Message } from "firebase-admin/messaging";

export async function sendAnnouncement(formData: FormData) {
  // ดึงค่าจากฟอร์มตาม 'name' ใน UI (title และ message)
  const title = formData.get("title")?.toString() || ""; // Line 10: title
  const messageText = formData.get("message")?.toString() || ""; // Line 11: body (ข้อความจากฟอร์ม)

  if (!title || !messageText) {
    return { success: false, error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    // บันทึกลง Firestore
    const announcementRef = await db.collection("announcements").add({
      title: title,
      body: messageText,
      createdAt: new Date(),
    });

    // เตรียม Payload สำหรับการแจ้งเตือน
    const payload: Message = {
      notification: {
        title: `ประกาศใหม่: ${title}`, // Line 19: ตรวจสอบการปิด Backtick (`)
        body: messageText.length > 100 ? messageText.substring(0, 97) + "..." : messageText, // Line 19/20
      },
      data: {
        // ข้อมูลเสริมที่ส่งไปพร้อม Notification
        announcementId: announcementRef.id, // Line 23: announcementRef
      },
      topic: "announcements",
    };

    // ส่งการแจ้งเตือนผ่าน FCM
    await messaging.send(payload); // Line 28: payload (หรือ message)

    // อัปเดตหน้าจอฝั่งนักเรียน
    revalidatePath("/student"); 

    return { success: true, error: null };
  } catch (error) { // Line 34: catch block
    console.error("Error sending announcement:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการส่ง" };
  }
} // Line 38: จบฟังก์ชัน