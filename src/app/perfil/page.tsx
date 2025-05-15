"use client"
//
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeartPulseIcon, ArrowLeftIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"


type User = {
  name: string
  email: string
  phone: string
  birthDate: string
  type: "cuidador" | "profissional"
  
  // Campos para cuidador
  lastPeriodDate?: string
  dueDate?: string
  pregnancyNumber?: string
  pregnancyWeek?: number
  doctor?: string
  hospital?: string
  interests?: string
  tipsFrequency?: string

  // Campos para profissional
  specialty?: string
  professionalId?: string
  workplace?: string
  experience?: string
  availability?: string

  // Campos comuns
  notificationPreference: string
  bloodType?: string
  allergies?: string
  medicalNotes?: string
  address?: string
  city?: string
  postalCode?: string
  avatar?: string
  createdAt: string
  lastUpdated?: string
}

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<User | null>(null)
  const [userInitials, setUserInitials] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("clicktocare_user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        setUser(parsed)
        setFormData(parsed)
        if (parsed.name) {
          const initials = parsed.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
          setUserInitials(initials)
        }
      } catch (err) {
        console.error("Erro ao ler dados do usuário:", err)
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
    setLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSave = () => {
    if (!formData) return
    setSaving(true)
    const updatedData = {
      ...user,
      ...formData,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem("clicktocare_user", JSON.stringify(updatedData))
    setUser(updatedData)
    toast.success("Dados atualizados com sucesso!")
    setTimeout(() => setSaving(false), 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="w-8 h-8 animate-spin text-pink-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b shadow-sm">
        <div className="container max-w-7xl flex items-center justify-between h-20 px-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50">
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <HeartPulseIcon className="w-7 h-7 text-pink-500" />
            <span className="font-bold text-2xl text-pink-700">Clicktocare</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32 border-4 border-pink-100 shadow-md">
              <AvatarImage src={user?.avatar || ""} alt={user?.name} />
              <AvatarFallback className="bg-pink-100 text-pink-700 text-3xl">{userInitials}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-lg text-gray-500 mt-1">
                {user?.type === "cuidador" ? "Perfil de Cuidador" : "Perfil de Profissional"}
              </p>
            </div>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-lg mb-6">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="medical">Dados Médicos</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            {/* Aba - Dados Pessoais */}
            <TabsContent value="personal">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize seus dados pessoais</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" name="name" value={formData?.name || ""} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" value={formData?.email || ""} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" name="phone" value={formData?.phone || ""} onChange={handleInputChange} />
                  </div>
                  {user?.type === "cuidador" && (
                    <div>
                      <Label htmlFor="dueDate">Data do Parto</Label>
                      <Input id="dueDate" name="dueDate" type="date" value={formData?.dueDate || ""} onChange={handleInputChange} />
                    </div>
                  )}
                  <Separator className="my-4 md:col-span-2" />
                  <div>
                    <Label htmlFor="address">Rua</Label>
                    <Input id="address" name="address" value={formData?.address || ""} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" name="city" value={formData?.city || ""} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input id="postalCode" name="postalCode" value={formData?.postalCode || ""} onChange={handleInputChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba - Dados Médicos */}
            <TabsContent value="medical">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Dados Médicos</CardTitle>
                  <CardDescription>Informações médicas pessoais</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  {user?.type === "cuidador" && (
                    <>
                      <div>
                        <Label htmlFor="pregnancyWeek">Semana da Gravidez</Label>
                        <Input id="pregnancyWeek" name="pregnancyWeek" type="number" value={formData?.pregnancyWeek || ""} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="doctor">Médico Obstetra</Label>
                        <Input id="doctor" name="doctor" value={formData?.doctor || ""} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="hospital">Hospital</Label>
                        <Input id="hospital" name="hospital" value={formData?.hospital || ""} onChange={handleInputChange} />
                      </div>
                    </>
                  )}
                  <div>
                    <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                    <Select value={formData?.bloodType || ""} onValueChange={(v) => handleSelectChange("bloodType", v)}>
                      <SelectTrigger id="bloodType">
                        <SelectValue placeholder="Escolha..." />
                      </SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="allergies">Alergias</Label>
                    <Textarea id="allergies" name="allergies" value={formData?.allergies || ""} onChange={handleInputChange} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="medicalNotes">Notas Médicas</Label>
                    <Textarea id="medicalNotes" name="medicalNotes" value={formData?.medicalNotes || ""} onChange={handleInputChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba - Configurações */}
            <TabsContent value="settings">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>Gerencie preferências da conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Notificações</Label>
                    <Select value={formData?.notificationPreference || ""} onValueChange={(v) => handleSelectChange("notificationPreference", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Preferência de notificações" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="important">Importantes</SelectItem>
                        <SelectItem value="none">Desativar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Idioma e privacidade omitidos por simplicidade */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancelar</Link>
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2Icon className="w-4 h-4 animate-spin mr-2" /> Salvando...</> : "Guardar Alterações"}
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-6 mt-12">
        <div className="container text-center text-sm text-gray-500">
          © 2025 Clicktocare. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
