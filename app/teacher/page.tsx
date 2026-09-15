'use client'

import { sendAnnouncement } from '../actions'

export default function TeacherPage() {
  const handleSubmit = async (formData: FormData) => {
    await sendAnnouncement(formData)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">หน้าสำหรับครู: ส่งประกาศ</h1>
      <form action={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">หัวข้อประกาศ</label>
          <input
            name="title" // ตรงกับ formData.get("title")
            type="text"
            placeholder="เช่น แจ้งหยุดเรียน"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">ข้อความ</label>
          <textarea
            name="message" // ตรงกับ formData.get("message")
            rows={4}
            placeholder="รายละเอียดประกาศ..."
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200"
        >
          ส่งประกาศถึงนักเรียน
        </button>
      </form>
    </div>
  )
}
