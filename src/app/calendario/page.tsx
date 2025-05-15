"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  HeartPulseIcon,
  CalendarIcon,
  ClipboardListIcon,
  MessageCircleIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

type Appointment = {
  id: number
  title: string
  date: Date
  time: string
  doctor: string
  location: string
  type: "consulta" | "exame" | "outro"
}

export default function CalendarioPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Exemplo de consultas
  const appointments: Appointment[] = [
    {
      id: 1,
      title: "Consulta pré-natal",
      date: new Date(2025, 4, 15), // 15 de Maio de 2025
      time: "10:00",
      doctor: "Dra. Sofia Martins",
      location: "Hospital Santa Maria",
      type: "consulta",
    },
    {
      id: 2,
      title: "Ecografia morfológica",
      date: new Date(2025, 4, 22), // 22 de Maio de 2025
      time: "14:30",
      doctor: "Dr. António Silva",
      location: "Clínica da Luz",
      type: "exame",
    },
    {
      id: 3,
      title: "Análises ao sangue",
      date: new Date(2025, 5, 5), // 5 de Junho de 2025
      time: "09:00",
      doctor: "",
      location: "Laboratório Central",
      type: "exame",
    },
  ]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Adicionar dias vazios para o início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-14"></div>)
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
  const hasAppointment = appointments.some(
    (app) => app.date.getDate() === day && app.date.getMonth() === month && app.date.getFullYear() === year,
  )

      days.push(
        <div
          key={`day-${day}`}
          className={`h-10 md:h-14 flex flex-col items-center justify-center relative rounded-full hover:bg-gray-100 cursor-pointer ${
            hasAppointment ? "font-bold" : ""
          }`}
        >
          {day}
          {hasAppointment && <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-pink-500"></div>}
        </div>,
      )
    }

    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("pt-PT", { month: "long", year: "numeric" })
  }

  const getAppointmentsForCurrentMonth = () => {
    return appointments
      .filter(
        (app) =>
          app.date.getMonth() === currentMonth.getMonth() && app.date.getFullYear() === currentMonth.getFullYear(),
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  return (
    <div className="flex flex-col min-h-screen  bg-white/100">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-pink-600" />
            <h1 className="font-semibold">Calendário</h1>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <PlusIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                  <ChevronLeftIcon className="w-5 h-5" />
                </Button>
                <CardTitle className="text-lg capitalize">{formatMonth(currentMonth)}</CardTitle>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRightIcon className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                <div className="text-gray-500">Dom</div>
                <div className="text-gray-500">Seg</div>
                <div className="text-gray-500">Ter</div>
                <div className="text-gray-500">Qua</div>
                <div className="text-gray-500">Qui</div>
                <div className="text-gray-500">Sex</div>
                <div className="text-gray-500">Sáb</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">{renderCalendar()}</div>
            </CardContent>
          </Card>

          {/* Appointments */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Próximas consultas e exames</h2>

            {getAppointmentsForCurrentMonth().length > 0 ? (
              getAppointmentsForCurrentMonth().map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          appointment.type === "consulta"
                            ? "bg-pink-100"
                            : appointment.type === "exame"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-medium">{appointment.date.getDate()}</div>
                          <div className="text-xs capitalize">
                            {appointment.date.toLocaleDateString("pt-PT", { month: "short" })}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{appointment.title}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                          <div>{appointment.time}</div>
                          {appointment.doctor && <div>{appointment.doctor}</div>}
                          <div>{appointment.location}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Não existem consultas ou exames agendados para este mês.</p>
                <Button variant="outline" className="mt-4">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Adicionar consulta
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 border-t bg-white">
        <div className="container">
          <div className="grid grid-cols-4 py-2">
            <Link href="/dashboard" className="flex flex-col items-center justify-center py-1 text-gray-500">
              <HeartPulseIcon className="w-5 h-5" />
              <span className="text-xs mt-1">Início</span>
            </Link>
            <Link href="/calendario" className="flex flex-col items-center justify-center py-1 text-pink-700">
              <CalendarIcon className="w-5 h-5" />
              <span className="text-xs mt-1">Calendário</span>
            </Link>
            <Link href="/registos" className="flex flex-col items-center justify-center py-1 text-gray-500">
              <ClipboardListIcon className="w-5 h-5" />
              <span className="text-xs mt-1">Registos</span>
            </Link>
            <Link href="/assistente" className="flex flex-col items-center justify-center py-1 text-gray-500">
              <MessageCircleIcon className="w-5 h-5" />
              <span className="text-xs mt-1">Assistente</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
