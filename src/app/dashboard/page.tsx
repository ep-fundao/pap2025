"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarIcon,
  BellIcon,
  HeartPulseIcon,
  ClipboardListIcon,
  MessageCircleIcon,
  UserIcon,
  ChevronRightIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  CalendarDaysIcon,
  LogOutIcon,
  SettingsIcon,
  UserCircleIcon,
  BellOffIcon,
  BabyIcon,
  ShieldIcon,
  ThermometerIcon,
  InfoIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Appointment = {
  id: string
  title: string
  doctor: string
  specialty: string
  date: string
  time: string
  location: string
  address: string
  phone: string
  notes: string
  type: string
  status: "confirmada" | "pendente" | "cancelada"
}

type Notification = {
  id: string
  title: string
  message: string
  date: string
  time: string
  type: "consulta" | "lembrete" | "sistema" | "exame"
  read: boolean
}

type User = {
  name: string
  email: string
  type: string
  avatar?: string
  phone?: string
  dueDate?: string
  pregnancyWeek?: number
}

export default function Dashboard() {
  const [userName, setUserName] = useState("")
  const [userInitials, setUserInitials] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  // Simular a obtenção do nome do usuário logado
  useEffect(() => {
    // Em um cenário real, isso viria de uma API ou contexto de autenticação
    const storedUser = localStorage.getItem("clicktocare_user")

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setUserName(userData.name.split(" ")[0])

        // Gerar iniciais para o avatar
        const initials = userData.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
        setUserInitials(initials)
      } catch (e) {
        // Fallback para um nome padrão se houver erro
        setUserName("Maria")
        setUserInitials("MS")
      }
    } else {
      // Simular um usuário para demonstração
      const demoUser = {
        name: "Maria Silva",
        email: "maria.silva@exemplo.pt",
        type: "cuidador",
        pregnancyWeek: 24,
        dueDate: "15 de Novembro, 2025",
      }
      setUser(demoUser)
      localStorage.setItem("clicktocare_user", JSON.stringify(demoUser))
      setUserName(demoUser.name.split(" ")[0])
      setUserInitials("MS")
    }

    // Carregar notificações simuladas
    loadNotifications()
  }, [])

  // Carregar notificações simuladas
  const loadNotifications = () => {
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
    ]

    setNotifications(demoNotifications)

    // Contar notificações não lidas
    const unread = demoNotifications.filter((notif) => !notif.read).length
    setUnreadCount(unread)
  }

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

  // Dados da próxima consulta
  const nextAppointment: Appointment = {
    id: "apt-001",
    title: "Consulta pré-natal",
    doctor: "Dra. Sofia Martins",
    specialty: "Obstetrícia",
    date: "15 de Maio",
    time: "10:00",
    location: "Hospital Santa Maria",
    address: "Av. Prof. Egas Moniz, 1649-035 Lisboa",
    phone: "+351 217 805 000",
    notes: "Trazer exames anteriores e lista de dúvidas. Jejum não é necessário.",
    type: "Rotina - 2º Trimestre",
    status: "confirmada",
  }

  const handleAppointmentDetails = () => {
    setSelectedAppointment(nextAppointment)
    setIsAppointmentDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return <Badge className="bg-green-500">Confirmada</Badge>
      case "pendente":
        return <Badge className="bg-yellow-500">Pendente</Badge>
      case "cancelada":
        return <Badge className="bg-red-500">Cancelada</Badge>
      default:
        return null
    }
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

  const handleLogout = () => {
    // Em um cenário real, você faria logout da API
    localStorage.removeItem("clicktocare_user")
    window.location.href = "/"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header com fundo suave e blur */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <HeartPulseIcon className="w-6 h-6 text-pink-500" />
            <span className="font-bold text-xl text-pink-700">Clicktocare</span>
          </Link>
          <div className="flex items-center gap-2">
            {/* Notificações - Agora com link direto */}
            <div className="flex items-center">
              <Link href="/notificacoes">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <BellIcon className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                <SheetTrigger asChild>
                  <span className="sr-only">Abrir notificações</span>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BellIcon className="w-5 h-5 text-pink-500" />
                        Notificações
                      </div>
                      {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                          Marcar todas como lidas
                        </Button>
                      )}
                    </SheetTitle>
                    <SheetDescription>
                      {unreadCount > 0
                        ? `Você tem ${unreadCount} notificações não lidas`
                        : "Não há notificações não lidas"}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${
                            !notification.read ? "bg-pink-50 border-pink-200" : "bg-white"
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                {!notification.read && <div className="w-2 h-2 rounded-full bg-pink-500"></div>}
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
                  <SheetFooter className="mt-4">
                    <SheetClose asChild>
                      <Button className="w-full bg-pink-600 hover:bg-pink-700">Fechar</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

            {/* Menu de perfil - Agora com link direto */}
            <div className="flex items-center">
              <Link href="/perfil">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatar || ""} alt={userName} />
                    <AvatarFallback className="bg-pink-100 text-pink-700">{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/perfil">
                    <DropdownMenuItem className="cursor-pointer">
                      <UserCircleIcon className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/configuracoes">
                    <DropdownMenuItem className="cursor-pointer">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main content com cards em fundo branco para contraste */}
      <main className="flex-1 container px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Greeting and Progress */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Olá, {userName}!</CardTitle>
                <CardDescription>Semana {user?.pregnancyWeek || 24} de gravidez</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso da gravidez</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2 bg-pink-100 [&>div]:bg-pink-600" />

                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Semana 1</span>
                    <span>Semana 40</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Próxima consulta</CardTitle>
                <CardDescription>Consulta pré-natal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <CalendarIcon className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {nextAppointment.date}, {nextAppointment.time}
                    </p>
                    <p className="text-sm text-gray-500">{nextAppointment.doctor}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto" onClick={handleAppointmentDetails}>
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Baby Development */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Desenvolvimento do bebé</CardTitle>
              <CardDescription>
                Semana {user?.pregnancyWeek || 24}: O seu bebé está a crescer rapidamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Nesta semana, o seu bebé tem aproximadamente o tamanho de uma papaia. Os seus pulmões estão a
                    desenvolver-se e já consegue ouvir sons do exterior.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tamanho</span>
                      <span className="font-medium">30 cm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Peso</span>
                      <span className="font-medium">600 g</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-pink-700">
                    Ver mais detalhes
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/bebé.jpg"
                    alt="Ilustração do bebé na semana 24"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saúde do Bebé Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BabyIcon className="w-5 h-5 text-pink-600" />
                Saúde do Bebé
              </CardTitle>
              <CardDescription>Informações importantes sobre vacinas, doenças comuns e desenvolvimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Acompanhe o desenvolvimento do seu bebé, calendário de vacinação e informações sobre cuidados após o
                  nascimento.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-2 rounded-full mb-2">
                      <ShieldIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">Calendário de Vacinação</h3>
                    <p className="text-xs text-gray-600">Todas as vacinas recomendadas para o seu bebé</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-2 rounded-full mb-2">
                      <ThermometerIcon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">Doenças Comuns</h3>
                    <p className="text-xs text-gray-600">Sintomas, prevenção e quando consultar o médico</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
                    <div className="bg-green-100 p-2 rounded-full mb-2">
                      <InfoIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">Marcos de Desenvolvimento</h3>
                    <p className="text-xs text-gray-600">Acompanhe o desenvolvimento do seu bebé mês a mês</p>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <Link href="/saude-bebe">
                    <Button className="bg-pink-600 hover:bg-pink-700">
                      <BabyIcon className="w-4 h-4 mr-2" />
                      Ver Saúde do Bebé
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="saude" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="saude">Saúde</TabsTrigger>
              <TabsTrigger value="alimentacao">Alimentação</TabsTrigger>
              <TabsTrigger value="exercicios">Exercícios</TabsTrigger>
            </TabsList>
            <TabsContent value="saude" className="space-y-4">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dicas para esta semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">Mantenha-se hidratada bebendo pelo menos 2 litros de água por dia.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">
                        Descanse sempre que sentir necessidade. O seu corpo está a trabalhar arduamente.
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">
                        Preste atenção aos movimentos do bebé. Qualquer alteração deve ser comunicada ao médico.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="alimentacao" className="space-y-4">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Alimentação recomendada</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">
                        Aumente o consumo de alimentos ricos em ferro, como carnes magras e vegetais de folha verde.
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">Consuma alimentos ricos em cálcio, como leite, iogurte e queijo.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">Evite alimentos crus ou mal cozinhados, como carnes, peixes e ovos.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="exercicios" className="space-y-4">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Exercícios recomendados</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">
                        Caminhadas leves de 20-30 minutos diários ajudam a manter a circulação sanguínea.
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">Exercícios de alongamento suaves ajudam a aliviar dores nas costas.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-pink-100 p-1 rounded-full mt-0.5">
                        <HeartPulseIcon className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm">Yoga pré-natal pode ajudar a relaxar e a preparar-se para o parto.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer com fundo suave */}
      <div className="sticky bottom-0 border-t bg-white/80 backdrop-blur-md">
        <div className="container">
          <div className="grid grid-cols-4 py-2">
            <Link href="/dashboard" className="flex flex-col items-center justify-center py-1 text-pink-700">
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

      {/* Dialog para detalhes da consulta */}
      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border rounded-lg shadow-lg">
          <DialogHeader className="bg-pink-50 p-4 rounded-t-lg">
            <DialogTitle className="flex items-center gap-2">
              <CalendarDaysIcon className="w-5 h-5 text-pink-600" />
              Detalhes da Consulta
            </DialogTitle>
            <DialogDescription>Informações completas sobre a sua próxima consulta</DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 p-4 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{selectedAppointment.title}</h3>
                {getStatusBadge(selectedAppointment.status)}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {selectedAppointment.date}, {selectedAppointment.time}
                    </p>
                    <p className="text-sm text-gray-500">{selectedAppointment.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UserIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{selectedAppointment.doctor}</p>
                    <p className="text-sm text-gray-500">{selectedAppointment.specialty}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{selectedAppointment.location}</p>
                    <p className="text-sm text-gray-500">{selectedAppointment.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                  <p>{selectedAppointment.phone}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-1">Notas</h4>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedAppointment.notes}</p>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2 p-4 bg-gray-50 rounded-b-lg">
            <Button variant="outline" className=" flex-1 bg-pink-600 hover:bg-pink-700" onClick={() => setIsAppointmentDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
