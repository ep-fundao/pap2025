"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HeartPulseIcon, ArrowLeftIcon, Loader2Icon, PencilIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  avatar?: string // URL do avatar do usuário
  
  // Metadados
  createdAt: string
  lastUpdated?: string
}

export default function PerfilPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [userInitials, setUserInitials] = useState("")
  const [formData, setFormData] = useState<User | null>(null)

  // Carregar dados do usuário
  useEffect(() => {
    setLoading(true)
    const storedUser = localStorage.getItem("clicktocare_user")

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setFormData(userData)

        // Gerar iniciais para o avatar
        if (userData.name) {
          const initials = userData.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
          setUserInitials(initials)
        }
      } catch (e) {
        console.error("Erro ao carregar dados do usuário:", e)
        window.location.href = "/login" // Redirecionar para login se houver erro
      }
    } else {
      // Se não houver dados do usuário, redirecionar para login
      window.location.href = "/login"
    }
    setLoading(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  // Função para salvar alterações
  const handleSave = () => {
    setSaving(true)

    if (formData) {
      // Mesclar dados existentes com as atualizações
      const storedUser = localStorage.getItem("clicktocare_user")
      const existingData = storedUser ? JSON.parse(storedUser) : {}
      
      const updatedData = {
        ...existingData,
        ...formData,
        lastUpdated: new Date().toISOString()
      }

      localStorage.setItem("clicktocare_user", JSON.stringify(updatedData))
      setUser(updatedData)

      setTimeout(() => {
        setSaving(false)
      }, 1000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="w-8 h-8 animate-spin text-pink-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header melhorado */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container max-w-7xl flex items-center h-20 px-6">
          <Link href="/dashboard" className="mr-auto">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50">
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <HeartPulseIcon className="w-7 h-7 text-pink-500" />
            <span className="font-bold text-2xl text-pink-700">Clicktocare</span>
          </div>
          <div className="ml-auto w-10"></div>
        </div>
      </header>

      {/* Main content com largura máxima e padding melhorado */}
      <main className="flex-1 container max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8">
          {/* Seção do perfil melhorada */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32 border-4 border-pink-100 shadow-md">
              <AvatarImage src={user?.avatar || ""} alt={user?.name} />
              <AvatarFallback className="bg-pink-100 text-pink-700 text-3xl">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-lg text-gray-500 mt-2">
                {user?.type === "cuidador" ? "Perfil de Cuidador" : "Perfil de Profissional"}
              </p>
            </div>
          </div>

          {/* Tabs com estilo melhorado */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 gap-2 p-1 bg-gray-100/80 rounded-lg mb-6">
              <TabsTrigger value="personal" className="py-3 text-base">
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="medical" className="py-3 text-base">
                Dados Médicos
              </TabsTrigger>
              <TabsTrigger value="settings" className="py-3 text-base">
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo das tabs com cards melhorados */}
            <TabsContent value="personal" className="space-y-6">
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-gray-50/50 border-b">
                  <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                  <CardDescription className="text-base">
                    Atualize os seus dados pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" name="name" value={formData?.name || ""} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData?.email || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" name="phone" value={formData?.phone || ""} onChange={handleInputChange} />
                    </div>
                    {formData?.type === "cuidador" && (
                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Data Prevista para o Parto</Label>
                        <Input
                          id="dueDate"
                          name="dueDate"
                          value={formData?.dueDate || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Morada</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Rua</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData?.address || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" name="city" value={formData?.city || ""} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Código Postal</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData?.postalCode || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6">
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-gray-50/50 border-b">
                  <CardTitle className="text-xl">Informações Médicas</CardTitle>
                  <CardDescription className="text-base">
                    Atualize os seus dados médicos
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData?.type === "cuidador" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="pregnancyWeek">Semana de Gravidez</Label>
                          <Input
                            id="pregnancyWeek"
                            name="pregnancyWeek"
                            type="number"
                            value={formData?.pregnancyWeek || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="doctor">Médico Obstetra</Label>
                          <Input
                            id="doctor"
                            name="doctor"
                            value={formData?.doctor || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hospital">Hospital/Maternidade</Label>
                          <Input
                            id="hospital"
                            name="hospital"
                            value={formData?.hospital || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                      <Select
                        value={formData?.bloodType || ""}
                        onValueChange={(value) => handleSelectChange("bloodType", value)}
                      >
                        <SelectTrigger id="bloodType">
                          <SelectValue placeholder="Selecione o tipo sanguíneo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Alergias</Label>
                    <Textarea
                      id="allergies"
                      name="allergies"
                      placeholder="Liste as suas alergias ou escreva 'Nenhuma'"
                      value={formData?.allergies || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalNotes">Notas Médicas</Label>
                    <Textarea
                      id="medicalNotes"
                      name="medicalNotes"
                      placeholder="Informações médicas relevantes"
                      value={formData?.medicalNotes || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-gray-50/50 border-b">
                  <CardTitle className="text-xl">Configurações da Conta</CardTitle>
                  <CardDescription className="text-base">
                    Gerencie as configurações da sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-2">
                    <Label htmlFor="notifications">Notificações</Label>
                    <Select
                      defaultValue="all"
                      onValueChange={(value) => handleSelectChange("notificationPreference", value)}
                    >
                      <SelectTrigger id="notifications">
                        <SelectValue placeholder="Preferências de notificações" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as notificações</SelectItem>
                        <SelectItem value="important">Apenas importantes</SelectItem>
                        <SelectItem value="appointments">Apenas consultas</SelectItem>
                        <SelectItem value="none">Desativar notificações</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select defaultValue="pt">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Alterar Palavra-passe</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input id="current-password" type="password" placeholder="Palavra-passe atual" />
                      <Input id="new-password" type="password" placeholder="Nova palavra-passe" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Privacidade</h3>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="data-sharing" className="rounded text-pink-600" />
                      <Label htmlFor="data-sharing">Permitir partilha de dados anónimos para melhorar o serviço</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Botões de ação com estilo melhorado */}
          <div className="flex justify-end gap-4 mt-8">
            <Button 
              variant="outline" 
              asChild 
              className="px-6 py-2.5 text-base"
            >
              <Link href="/dashboard">Cancelar</Link>
            </Button>
            <Button 
              className="bg-pink-600 hover:bg-pink-700 px-6 py-2.5 text-base"
              onClick={handleSave} 
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />
                  A guardar...
                </>
              ) : (
                "Guardar Alterações"
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer melhorado */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container max-w-5xl text-center text-sm text-gray-500">
          <p>© 2025 Clicktocare. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
