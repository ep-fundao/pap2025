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
import { HeartPulseIcon, ArrowLeftIcon, Loader2Icon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

type User = {
  name: string
  email: string
  type: string
  avatar?: string
  phone?: string
  dueDate?: string
  pregnancyWeek?: number
  address?: string
  city?: string
  postalCode?: string
  doctor?: string
  hospital?: string
  bloodType?: string
  allergies?: string
  medicalNotes?: string
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
        
        // Formatar os dados para exibição
        const formattedData = {
          ...userData,
          // Formatar a data prevista para exibição amigável
          dueDate: userData.dueDate ? new Date(userData.dueDate).toLocaleDateString('pt-BR') : '',
          // Adicionar outros campos formatados conforme necessário
        }

        setUser(formattedData)
        setFormData(formattedData)

        // Gerar iniciais para o avatar
        const initials = userData.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
        setUserInitials(initials)
      } catch (e) {
        console.error("Erro ao carregar dados do usuário:", e)
      }
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

  const handleSave = () => {
    setSaving(true)

    if (formData) {
      // Mesclar os dados existentes com as atualizações
      const existingData = JSON.parse(localStorage.getItem("clicktocare_user") || "{}")
      const updatedData = {
        ...existingData,
        ...formData,
        // Adicionar campos que podem ter sido atualizados
        lastUpdated: new Date().toISOString(),
      }

      localStorage.setItem("clicktocare_user", JSON.stringify(updatedData))
      setUser(updatedData)
    }

    setTimeout(() => {
      setSaving(false)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="w-8 h-8 animate-spin text-pink-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/dashboard" className="mr-auto">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <HeartPulseIcon className="w-6 h-6 text-pink-500" />
            <span className="font-bold text-xl text-pink-700">Clicktocare</span>
          </div>
          <div className="ml-auto w-10"></div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6 max-w-4xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <Avatar className="w-20 h-20 border-2 border-pink-100">
              <AvatarImage src={user?.avatar || ""} alt={user?.name} />
              <AvatarFallback className="bg-pink-100 text-pink-700 text-xl">{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-500">
                {user?.type === "cuidador" ? "Perfil de Cuidador" : "Perfil de Profissional"}
              </p>
            </div>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-white rounded-lg shadow-sm">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="medical" >Dados Médicos</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize os seus dados pessoais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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

            <TabsContent value="medical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Médicas</CardTitle>
                  <CardDescription>Atualize os seus dados médicos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Conta</CardTitle>
                  <CardDescription>Gerencie as configurações da sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancelar</Link>
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />A guardar...
                </>
              ) : (
                "Guardar Alterações"
              )}
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-4 mt-8">
        <div className="container text-center text-sm text-gray-500">
          <p>© 2025 Clicktocare. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
