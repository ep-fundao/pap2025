"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HeartPulseIcon,
  CalendarIcon,
  ClipboardListIcon,
  MessageCircleIcon,
  PlusIcon,
  ActivityIcon,
  DropletIcon,
  UtensilsIcon,
  MoonIcon,
} from "lucide-react"

type Record = {
  id: number
  type: "peso" | "sintoma" | "humor" | "alimentacao" | "sono"
  date: Date
  value: string
  notes?: string
}

export default function RegistosPage() {
  const [activeTab, setActiveTab] = useState("todos")

  // Exemplo de registos
  const records: Record[] = [
    {
      id: 1,
      type: "peso",
      date: new Date(2025, 4, 10), // 10 de Maio de 2025
      value: "68 kg",
      notes: "Aumento de 0.5 kg em relação à semana passada",
    },
    {
      id: 2,
      type: "sintoma",
      date: new Date(2025, 4, 12), // 12 de Maio de 2025
      value: "Náuseas matinais",
      notes: "Menos intensas que na semana anterior",
    },
    {
      id: 3,
      type: "humor",
      date: new Date(2025, 4, 13), // 13 de Maio de 2025
      value: "Feliz",
      notes: "Dia muito produtivo",
    },
    {
      id: 4,
      type: "alimentacao",
      date: new Date(2025, 4, 14), // 14 de Maio de 2025
      value: "Refeições equilibradas",
      notes: "Aumentei o consumo de vegetais e frutas",
    },
    {
      id: 5,
      type: "sono",
      date: new Date(2025, 4, 14), // 14 de Maio de 2025
      value: "7 horas",
      notes: "Acordei uma vez durante a noite",
    },
  ]

  const getFilteredRecords = () => {
    if (activeTab === "todos") {
      return records
    }
    return records.filter((record) => record.type === activeTab)
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "peso":
        return <ActivityIcon className="w-5 h-5 text-green-500" />
      case "sintoma":
        return <DropletIcon className="w-5 h-5 text-red-500" />
      case "humor":
        return <HeartPulseIcon className="w-5 h-5 text-pink-500" />
      case "alimentacao":
        return <UtensilsIcon className="w-5 h-5 text-orange-500" />
      case "sono":
        return <MoonIcon className="w-5 h-5 text-indigo-500" />
      default:
        return <ClipboardListIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "long",
    })
  }

  return (
    <div className="flex flex-col min-h-screen  bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <ClipboardListIcon className="w-5 h-5 text-pink-600" />
            <h1 className="font-semibold">Registos</h1>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <PlusIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="todos" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 h-auto p-1">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="peso">Peso</TabsTrigger>
              <TabsTrigger value="sintoma">Sintomas</TabsTrigger>
              <TabsTrigger value="humor">Humor</TabsTrigger>
              <TabsTrigger value="alimentacao">Alimentação</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="mt-4 space-y-4">
              {getFilteredRecords().length > 0 ? (
                getFilteredRecords().map((record) => (
                  <Card key={record.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-gray-100">{getIconForType(record.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{record.value}</h3>
                            <span className="text-xs text-gray-500">{formatDate(record.date)}</span>
                          </div>
                          {record.notes && <p className="text-sm text-gray-500 mt-1">{record.notes}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ClipboardListIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Não existem registos para mostrar.</p>
                  <Button variant="outline" className="mt-4">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Adicionar registo
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="peso" className="mt-4 space-y-4">
              {getFilteredRecords().length > 0 ? (
                getFilteredRecords().map((record) => (
                  <Card key={record.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-green-100">
                          <ActivityIcon className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{record.value}</h3>
                            <span className="text-xs text-gray-500">{formatDate(record.date)}</span>
                          </div>
                          {record.notes && <p className="text-sm text-gray-500 mt-1">{record.notes}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ActivityIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Não existem registos de peso para mostrar.</p>
                  <Button variant="outline" className="mt-4">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Adicionar registo de peso
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Conteúdo similar para os outros tabs */}
          </Tabs>
        </div>
      </main>

      <div className="sticky bottom-0 border-t bg-white">
        <div className="container">
          <div className="grid grid-cols-4 py-2">
            <Link href="/dashboard" className="flex flex-col items-center justify-center py-1 text-gray-500">
              <HeartPulseIcon className="w-5 h-5" />
              <span className="text-xs mt-1">Início</span>
            </Link>
            <Link href="/calendario" className="flex flex-col items-center justify-center py-1 text-gray-500">
              <CalendarIcon className="w-5 h-5" />
              <span className="text-xs mt-1">Calendário</span>
            </Link>
            <Link href="/registos" className="flex flex-col items-center justify-center py-1 text-pink-700">
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
