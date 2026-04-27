import { useState } from "react";

const phases = [
  {
    id: 1,
    phase: "Phase 1",
    title: "Setup & เครื่องมือพื้นฐาน",
    color: "#00D4FF",
    icon: "⚙️",
    tasks: [
      {
        id: "1-1",
        title: "เปิดบัญชีและเชื่อมต่อ Platform",
        subtasks: [
          "สมัคร ManyChat หรือ UChat (เลือก 1 ตัว)",
          "สมัคร Make.com หรือ Zapier (เลือก 1 ตัว)",
          "เตรียม OpenAI API Key (หรือ Claude / Gemini)",
          "เตรียม Google Sheet ต้นแบบสำหรับรับข้อมูลออเดอร์",
          "เชื่อมต่อ IG Business Account กับ ManyChat/UChat",
        ],
      },
      {
        id: "1-2",
        title: "เตรียม Knowledge Base",
        subtasks: [
          "รวบรวม URL สินค้าจากเว็บไซต์/IG ทั้งหมด",
          "จัดทำไฟล์ข้อมูลสินค้า (สเปก, ราคา, ระยะเวลา Pre-order แต่ละรุ่น)",
          "Upload ข้อมูลเข้า OpenAI Assistant หรือสร้าง Vector Store",
          "ทดสอบ AI ตอบคำถามสินค้าเบื้องต้น",
        ],
      },
    ],
  },
  {
    id: 2,
    phase: "Phase 2",
    title: "AI Chatbot สำหรับปิดการขาย",
    color: "#7C3AED",
    icon: "🤖",
    tasks: [
      {
        id: "2-1",
        title: "สร้าง Chatbot Flow หลัก",
        subtasks: [
          "ออกแบบ Flow: ลูกค้าทักมา → AI ถามความต้องการ",
          "เชื่อม ManyChat/UChat → OpenAI API (ผ่าน Make.com)",
          "ตั้งค่า AI ดึงข้อมูลจาก Knowledge Base ตอบสเปกสินค้า",
          "สร้าง Flow: AI สรุปยอดเงิน + แจ้งข้อมูลการโอน",
          "ทดสอบ End-to-End: ถามสินค้า → ตัดสินใจซื้อ → แจ้งยอด",
        ],
      },
      {
        id: "2-2",
        title: "ระบบตรวจสอบสลิป (AI Vision)",
        subtasks: [
          "เชื่อม Flow รับรูปสลิปจากลูกค้า",
          "ส่งรูปสลิปให้ OpenAI Vision API ตรวจยอดเงิน/วันเวลา",
          "สร้าง Logic: ยอดถูก → ดำเนินการต่อ / ยอดผิด → แจ้งลูกค้า",
          "ทดสอบตรวจสลิปจริงหลายรูปแบบ",
        ],
      },
      {
        id: "2-3",
        title: "Pre-order: บันทึกข้อมูลลง Google Sheet",
        subtasks: [
          "สอน AI เรื่อง Pre-order และระยะเวลารอแต่ละรุ่น",
          "สร้าง Flow ดึงชื่อ-ที่อยู่ลูกค้าหลังสลิปผ่าน",
          "เชื่อม Make.com → Google Sheet (เพิ่มแถวใหม่อัตโนมัติ)",
          "กำหนด Default Status = 'Pending / Pre-ordering'",
          "ให้บอทส่งข้อความยืนยันคิวให้ลูกค้าทันที",
          "ทดสอบ Flow ครบวงจร Pre-order",
        ],
      },
    ],
  },
  {
    id: 3,
    phase: "Phase 3",
    title: "Status Tracking System",
    color: "#10B981",
    icon: "📦",
    tasks: [
      {
        id: "3-1",
        title: "ระบบแจ้งสถานะอัตโนมัติ (Trigger-based)",
        subtasks: [
          "ออกแบบคอลัมน์สถานะใน Google Sheet (กำลังผลิต / ถึงไทยแล้ว / กำลังแพ็ก / จัดส่งแล้ว)",
          "สร้าง Trigger ใน Make.com: เมื่อ Status ใน Sheet เปลี่ยน → ส่งข้อความ",
          "เขียนเทมเพลตข้อความแต่ละสถานะ (ภาษาสวย, ชื่อลูกค้า)",
          "เชื่อม Trigger → ส่งข้อความผ่าน ManyChat/UChat ไปหาลูกค้าใน IG",
          "ทดสอบเปลี่ยนสถานะแล้วลูกค้าได้รับแจ้งเตือน",
        ],
      },
      {
        id: "3-2",
        title: "Self-Service: ลูกค้าเช็กสถานะเอง",
        subtasks: [
          "ออกแบบ Rich Menu (LINE) หรือ Quick Reply (IG) ปุ่ม 'เช็กสถานะ'",
          "สร้าง Flow: ลูกค้ากด → บอทถามชื่อ/เลขออเดอร์",
          "เชื่อม Make.com ค้นหาข้อมูลใน Google Sheet",
          "บอทตอบสถานะล่าสุดให้ลูกค้า",
          "ทดสอบ Self-Service Flow",
        ],
      },
    ],
  },
  {
    id: 4,
    phase: "Phase 4",
    title: "Ads Tracking & AI Analytics",
    color: "#F59E0B",
    icon: "📊",
    tasks: [
      {
        id: "4-1",
        title: "ดึงข้อมูล Meta Ads เข้า Google Sheet",
        subtasks: [
          "เลือกวิธีดึงข้อมูล: Supermetrics หรือ Meta Ads API โดยตรง",
          "ตั้ง Automation ดึงข้อมูลทุกเช้า 08:00 น.",
          "สร้างตาราง: Spend, Reach, Clicks, ต้นทุนต่อทัก แต่ละแคมเปญ",
          "เชื่อมข้อมูลยอดจอง (Sheet ออเดอร์) กับ Sheet Ads",
        ],
      },
      {
        id: "4-2",
        title: "AI วิเคราะห์และส่งสรุปรายวัน",
        subtasks: [
          "สร้าง Automation ส่งข้อมูล Ads ให้ AI วิเคราะห์",
          "ให้ AI สรุปสั้นๆ: แอดไหนคุ้ม / ควรเพิ่ม/ลดงบ",
          "ให้ AI ระบุสินค้าที่ 'ทักเยอะแต่ไม่จอง'",
          "ส่งสรุปเข้า LINE Group ทีมบริหารอัตโนมัติทุกเช้า",
          "ทดสอบ Workflow ทั้งหมด",
        ],
      },
    ],
  },
  {
    id: 5,
    phase: "Phase 5",
    title: "ทดสอบและ Go Live",
    color: "#EF4444",
    icon: "🚀",
    tasks: [
      {
        id: "5-1",
        title: "UAT & ปรับแต่ง",
        subtasks: [
          "ทดสอบ Full Flow ทุกระบบพร้อมกัน",
          "ทดสอบ Edge Cases: ลูกค้าถามนอกเรื่อง, สลิปไม่ชัด, ยอดผิด",
          "ปรับภาษา/โทนของ AI ให้เป็นธรรมชาติ ตามสไตล์ร้าน",
          "ฝึกสอนแอดมินใช้งาน Dashboard และเปลี่ยนสถานะ Sheet",
          "จัดทำคู่มือการใช้งาน",
        ],
      },
      {
        id: "5-2",
        title: "Launch & Monitor",
        subtasks: [
          "เปิดใช้งานระบบจริง (Go Live)",
          "Monitor 7 วันแรก: Error, ลูกค้าสับสน, ช่องโหว่",
          "ปรับ Knowledge Base เพิ่มเติมตามคำถามที่พบบ่อย",
          "ตั้ง Alert เมื่อระบบ Error หรือ API หมด Quota",
        ],
      },
    ],
  },
];

export default function TaskList() {
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({ 1: true, 2: true, 3: true, 4: true, 5: true });

  const toggleTask = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePhase = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalTasks = phases.flatMap(p => p.tasks.flatMap(t => t.subtasks)).length;
  const doneTasks = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      fontFamily: "'Segoe UI', Tahoma, sans-serif",
      color: "#E2E8F0",
      padding: "32px 20px",
    }}>
      {/* Header */}
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "1px solid #2D3748",
          borderRadius: 16,
          padding: "28px 32px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 13, color: "#64748B", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
            Project Blueprint
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#F1F5F9", lineHeight: 1.3 }}>
            AI Automation Specialist
          </h1>
          <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 6 }}>
            Chatbot · Pre-order System · Status Tracking · Ads Analytics
          </div>

          {/* Progress */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#94A3B8" }}>Overall Progress</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#00D4FF" }}>{doneTasks}/{totalTasks} tasks · {pct}%</span>
            </div>
            <div style={{ background: "#1E293B", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{
                width: `${pct}%`,
                height: "100%",
                background: "linear-gradient(90deg, #00D4FF, #7C3AED)",
                borderRadius: 99,
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>
        </div>

        {/* Phases */}
        {phases.map((phase) => {
          const phaseTotal = phase.tasks.flatMap(t => t.subtasks).length;
          const phaseDone = phase.tasks.flatMap(t => t.subtasks.map((_, si) => `${t.id}-${si}`)).filter(k => checked[k]).length;
          const isOpen = expanded[phase.id];

          return (
            <div key={phase.id} style={{
              background: "#0F172A",
              border: `1px solid ${phase.color}22`,
              borderRadius: 14,
              marginBottom: 16,
              overflow: "hidden",
            }}>
              {/* Phase Header */}
              <div
                onClick={() => togglePhase(phase.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "18px 24px",
                  cursor: "pointer",
                  borderBottom: isOpen ? `1px solid ${phase.color}22` : "none",
                  background: `${phase.color}08`,
                  userSelect: "none",
                }}
              >
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 10,
                  background: `${phase.color}18`,
                  border: `1px solid ${phase.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>
                  {phase.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: phase.color, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
                    {phase.phase}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#F1F5F9", marginTop: 2 }}>
                    {phase.title}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    fontSize: 12, color: phaseDone === phaseTotal ? phase.color : "#64748B",
                    fontWeight: 600,
                  }}>
                    {phaseDone}/{phaseTotal}
                  </span>
                  <span style={{ color: "#475569", fontSize: 12, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▼</span>
                </div>
              </div>

              {/* Tasks */}
              {isOpen && (
                <div style={{ padding: "16px 24px 20px" }}>
                  {phase.tasks.map((task) => (
                    <div key={task.id} style={{ marginBottom: 20 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 600, color: "#94A3B8",
                        letterSpacing: 0.5, marginBottom: 10,
                        display: "flex", alignItems: "center", gap: 8,
                      }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: phase.color }} />
                        {task.title}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {task.subtasks.map((sub, si) => {
                          const key = `${task.id}-${si}`;
                          const done = !!checked[key];
                          return (
                            <label key={key} style={{
                              display: "flex", alignItems: "flex-start", gap: 12,
                              padding: "10px 14px",
                              borderRadius: 8,
                              background: done ? `${phase.color}10` : "#1E293B",
                              border: `1px solid ${done ? phase.color + "33" : "#2D3748"}`,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}>
                              <div
                                onClick={() => toggleTask(key)}
                                style={{
                                  width: 18, height: 18, borderRadius: 5,
                                  border: `2px solid ${done ? phase.color : "#475569"}`,
                                  background: done ? phase.color : "transparent",
                                  flexShrink: 0, marginTop: 1,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  transition: "all 0.2s",
                                  cursor: "pointer",
                                }}
                              >
                                {done && <span style={{ color: "#000", fontSize: 11, fontWeight: 900 }}>✓</span>}
                              </div>
                              <span style={{
                                fontSize: 14, color: done ? "#64748B" : "#CBD5E1",
                                textDecoration: done ? "line-through" : "none",
                                lineHeight: 1.5,
                              }}>
                                {sub}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Tools Legend */}
        <div style={{
          background: "#0F172A",
          border: "1px solid #1E293B",
          borderRadius: 14,
          padding: "20px 24px",
          marginTop: 8,
        }}>
          <div style={{ fontSize: 11, color: "#64748B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
            Tech Stack ที่ต้องใช้
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { label: "Make.com / Zapier", color: "#F59E0B" },
              { label: "ManyChat / UChat", color: "#00D4FF" },
              { label: "OpenAI / Claude / Gemini", color: "#7C3AED" },
              { label: "Google Sheets", color: "#10B981" },
              { label: "Meta Ads API / Supermetrics", color: "#EF4444" },
              { label: "LINE Notify", color: "#10B981" },
              { label: "OpenAI Vision API", color: "#7C3AED" },
            ].map((t) => (
              <span key={t.label} style={{
                fontSize: 12, padding: "5px 12px",
                borderRadius: 99,
                background: `${t.color}15`,
                border: `1px solid ${t.color}40`,
                color: t.color,
                fontWeight: 500,
              }}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
