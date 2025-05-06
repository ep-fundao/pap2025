"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  HeartPulseIcon,
  CalendarIcon,
  ClipboardListIcon,
  MessageCircleIcon,
  ArrowLeftIcon,
  BellIcon,
  BellOffIcon,
  CheckIcon,
  FilterIcon,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Notification = {
  id: string
  title: string
  message: string
  date: string
  time: string
  type: "consulta" | "lembrete" | "sistema" | "exame"
  read: boolean
}

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [activeTab, setActiveTab] = useState("todas")

  // Carregar notificações simuladas
  useEffect(() => {
    const demoNotifications: Notification[] = [
      {
        id: "notif-1",
        title: "Lembrete de consulta",
        message: "A sua consulta com Dra. Sofia Martins está marcada para amanhã às 10:00.",
        date: "Hoje",
        time: "09:15",
        type: "consulta",
        read: false,
      },
      {
        id: "notif-2",
        title: "Novo artigo disponível",
        message: "Novo artigo sobre alimentação no segundo trimestre foi publicado.",
        date: "Ontem",
        time: "14:30",
        type: "sistema",
        read: false,
      },
      {
        id: "notif-3",
        title: "Resultado de exame",
        message: "Os resultados do seu exame de sangue já estão disponíveis.",
        date: "22/04/2025",
        time: "10:45",
        type: "exame",
        read: true,
      },
      {
        id: "notif-4",
        title: "Lembrete de medicação",
        message: "Não se esqueça de tomar o seu suplemento de ácido fólico hoje.",
        date: "21/04/2025",
        time: "08:00",
        type: "lembrete",
        read: true,
      },
      {
        id: "notif-5",
        title: "Vacina do bebé",
        message: "Lembrete: A primeira dose da vacina BCG deve ser administrada logo após o nascimento.",
        date: "20/04/2025",
        time: "10:00",
        type: "lembrete",
        read: true,
      },
      {
        id: "notif-6",
        title: "Dica de saúde",
        message: "Mantenha o ambiente do bebé limpo e arejado para prevenir doenças respiratórias.",
        date: "19/04/2025",
        time: "15:20",
        type: "sistema",
        read: true,
      },
      {
        id: "notif-7",
        title: "Consulta pediátrica",
        message: "Não se esqueça de agendar a primeira consulta pediátrica após o nascimento.",
        date: "18/04/2025",
        time: "11:30",
        type: "consulta",
        read: true,
      },
    ]

    setNotifications(demoNotifications)

    // Contar notificações não lidas
    const unread = demoNotifications.filter((notif) => !notif.read).length
    setUnreadCount(unread)
  }, [])

  // Marcar todas as notificações como lidas
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }))
    setNotifications(updatedNotifications)
    setUnreadCount(0)
  }

  // Marcar uma notificação específica como lida
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    setNotifications(updatedNotifications)
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "consulta":
        return <CalendarIcon className="w-5 h-5 text-blue-500" />
      case "lembrete":
        return <BellIcon className="w-5 h-5 text-yellow-500" />
      case "sistema":
        return <HeartPulseIcon className="w-5 h-5 text-pink-500" />
      case "exame":
        return <ClipboardListIcon className="w-5 h-5 text-green-500" />
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getFilteredNotifications = () => {
    if (activeTab === "todas") {
      return notifications
    } else if (activeTab === "nao-lidas") {
      return notifications.filter((notif) => !notif.read)
    } else {
      return notifications.filter((notif) => notif.type === activeTab)
    }
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BellIcon className="w-5 h-5 text-pink-600" />
              <h1 className="font-semibold">Notificações</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <FilterIcon className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveTab("todas")}>Todas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("nao-lidas")}>Não lidas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("consulta")}>Consultas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("lembrete")}>Lembretes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("sistema")}>Sistema</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("exame")}>Exames</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-sm">
                <CheckIcon className="w-4 h-4 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <BellIcon className="w-5 h-5 text-pink-600" />
                Notificações
              </CardTitle>
              <CardDescription>
                {unreadCount > 0
                  ? `Você tem ${unreadCount} notificações não lidas`
                  : "Todas as notificações foram lidas"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="todas">Todas</TabsTrigger>
                  <TabsTrigger value="nao-lidas">Não lidas</TabsTrigger>
                  <TabsTrigger value="consulta">Consultas</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="space-y-4">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${
                            !notification.read ? "bg-pink-50 border-pink-200" : "bg-white"
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{notification.title}</h4>
                                {!notification.read && <Badge className="bg-pink-500">Nova</Badge>}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <div className="flex justify-between mt-2">
                                <span className="text-xs text-gray-500">{notification.date}</span>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BellOffIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-500">Não há notificações para mostrar</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Configurações de Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações de consultas</h3>
                    <p className="text-sm text-gray-500">Receba lembretes sobre suas consultas</p>
                  </div>
                  <div className="flex items-center h-6 w-11 rounded-full bg-pink-600 relative cursor-pointer">
                    <div className="h-5 w-5 rounded-full bg-white absolute right-0.5"></div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações de vacinas</h3>
                    <p className="text-sm text-gray-500">Receba lembretes sobre vacinas do bebé</p>
                  </div>
                  <div className="flex items-center h-6 w-11 rounded-full bg-pink-600 relative cursor-pointer">
                    <div className="h-5 w-5 rounded-full bg-white absolute right-0.5"></div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dicas e artigos</h3>
                    <p className="text-sm text-gray-500">Receba dicas e artigos sobre gravidez e bebés</p>
                  </div>
                  <div className="flex items-center h-6 w-11 rounded-full bg-pink-600 relative cursor-pointer">
                    <div className="h-5 w-5 rounded-full bg-white absolute right-0.5"></div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por email</h3>
                    <p className="text-sm text-gray-500">Receba notificações também por email</p>
                  </div>
                  <div className="flex items-center h-6 w-11 rounded-full bg-gray-300 relative cursor-pointer">
                    <div className="h-5 w-5 rounded-full bg-white absolute left-0.5"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
