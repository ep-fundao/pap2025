"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulseIcon, ArrowLeftIcon, Loader2Icon, CheckIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function calculatePregnancyWeek(lastPeriodDate: string): number {
  if (!lastPeriodDate) return 0;
  const lastPeriod = new Date(lastPeriodDate);
  const today = new Date();
  const diffInDays = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
  return Math.floor(diffInDays / 7);
}

export default function RegistarPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState("cuidador")
  
  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Coletar todos os dados do formulário
    const userData = {
      name: (document.getElementById('nome') as HTMLInputElement)?.value,
      email: (document.getElementById('email') as HTMLInputElement)?.value,
      phone: (document.getElementById('telefone') as HTMLInputElement)?.value,
      birthDate: (document.getElementById('data-nascimento') as HTMLInputElement)?.value,
      type: userType,
        pregnancyWeek: calculatePregnancyWeek((document.getElementById('data-ultima-menstruacao') as HTMLInputElement)?.value) || 0,
      // Dados específicos para cuidador
      ...(userType === "cuidador" && {
        lastPeriodDate: (document.getElementById('data-ultima-menstruacao') as HTMLInputElement)?.value,
        dueDate: (document.getElementById('data-prevista-parto') as HTMLInputElement)?.value,
        pregnancyNumber: (document.getElementById('numero-gravidez') as HTMLSelectElement)?.value,
        doctor: (document.getElementById('medico') as HTMLInputElement)?.value,
        hospital: (document.getElementById('hospital') as HTMLInputElement)?.value,
        pregnancyWeek: calculatePregnancyWeek((document.getElementById('data-ultima-menstruacao') as HTMLInputElement)?.value),
        interests: (document.getElementById('interesses') as HTMLSelectElement)?.value,
        tipsFrequency: (document.getElementById('frequencia') as HTMLSelectElement)?.value,
      }),

      // Dados específicos para profissional
      ...(userType === "profissional" && {
        specialty: (document.getElementById('especialidade') as HTMLSelectElement)?.value,
        professionalId: (document.getElementById('numero-cedula') as HTMLInputElement)?.value,
        workplace: (document.getElementById('local-trabalho') as HTMLInputElement)?.value,
        experience: (document.getElementById('anos-experiencia') as HTMLSelectElement)?.value,
        availability: (document.getElementById('disponibilidade') as HTMLSelectElement)?.value,
      }),

      // Preferências
      notificationPreference: (document.getElementById('notificacoes') as HTMLSelectElement)?.value,
      
      // Data de criação da conta
      createdAt: new Date().toISOString(),
    }
      //confirmação dos dados
    console.log("Dados guardados:", userData);

    // Salvar no localStorage
    localStorage.setItem('clicktocare_user', JSON.stringify(userData))

    // Simular delay e redirecionar
    setTimeout(() => {
      setLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50/50 to-white">
      <header className="bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container max-w-6xl flex items-center h-16 px-4">
          <Link href="/" className="mr-auto">
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

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-8 border-b">
              <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
              <CardDescription className="text-base mt-2">
                {step === 1 && "Escolha o seu perfil"}
                {step === 2 && "Informações pessoais"}
                {step === 3 && (userType === "cuidador" ? "Informações da gravidez" : "Informações profissionais")}
                {step === 4 && "Preferências"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              {/* Adicionar indicador de progresso */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= stepNumber ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {stepNumber}
                    </div>
                  ))}
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full">
                  <div
                    className="absolute h-2 bg-pink-600 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex justify-center mb-4">
                      <Image
                        src="/logo.jpg"
                        alt="Clicktocare Logo"
                        width={120}
                        height={120}
                        className="rounded-full bg-pink-50 p-4"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="user-type">Selecione o seu perfil</Label>
                      <RadioGroup
                        defaultValue="cuidador"
                        value={userType}
                        onValueChange={setUserType}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div
                          className={`flex flex-col items-center space-y-2 border rounded-lg p-4 ${userType === "cuidador" ? "border-pink-500 bg-pink-50" : "border-gray-200"}`}
                        >
                          <RadioGroupItem value="cuidador" id="cuidador" className="sr-only" />
                          <Label htmlFor="cuidador" className="flex flex-col items-center space-y-2 cursor-pointer">
                            <div
                              className={`p-2 rounded-full ${userType === "cuidador" ? "bg-pink-100" : "bg-gray-100"}`}
                            >
                              {userType === "cuidador" ? (
                                <CheckIcon className="h-5 w-5 text-pink-600" />
                              ) : (
                                <HeartPulseIcon className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            <span className="font-medium">Cuidador</span>
                            <span className="text-xs text-center text-gray-500">Para grávidas e familiares</span>
                          </Label>
                        </div>
                        <div
                          className={`flex flex-col items-center space-y-2 border rounded-lg p-4 ${userType === "profissional" ? "border-pink-500 bg-pink-50" : "border-gray-200"}`}
                        >
                          <RadioGroupItem value="profissional" id="profissional" className="sr-only" />
                          <Label htmlFor="profissional" className="flex flex-col items-center space-y-2 cursor-pointer">
                            <div
                              className={`p-2 rounded-full ${userType === "profissional" ? "bg-pink-100" : "bg-gray-100"}`}
                            >
                              {userType === "profissional" ? (
                                <CheckIcon className="h-5 w-5 text-pink-600" />
                              ) : (
                                <HeartPulseIcon className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            <span className="font-medium">Profissional</span>
                            <span className="text-xs text-center text-gray-500">Para médicos e enfermeiros</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input id="nome" placeholder="Introduza o seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="exemplo@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Palavra-passe</Label>
                      <Input id="password" type="password" placeholder="Crie uma palavra-passe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Número de telefone</Label>
                      <Input id="telefone" type="tel" placeholder="+351 912 345 678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="data-nascimento">Data de nascimento</Label>
                      <Input id="data-nascimento" type="date" required />
                    </div>
                  </div>
                )}

                {step === 3 && userType === "cuidador" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="data-ultima-menstruacao">Data da última menstruação</Label>
                      <Input id="data-ultima-menstruacao" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="data-prevista-parto">Data prevista para o parto (se souber)</Label>
                      <Input id="data-prevista-parto" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero-gravidez">Número da gravidez</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="numero-gravidez">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Primeira gravidez</SelectItem>
                          <SelectItem value="2">Segunda gravidez</SelectItem>
                          <SelectItem value="3">Terceira gravidez</SelectItem>
                          <SelectItem value="4">Quarta gravidez ou mais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medico">Nome do médico obstetra (se tiver)</Label>
                      <Input id="medico" placeholder="Dr./Dra." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital/Maternidade previsto</Label>
                      <Input id="hospital" placeholder="Nome do hospital ou maternidade" />
                    </div>
                  </div>
                )}

                {step === 3 && userType === "profissional" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="especialidade">Especialidade</Label>
                      <Select defaultValue="obstetra">
                        <SelectTrigger id="especialidade">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="obstetra">Obstetrícia</SelectItem>
                          <SelectItem value="ginecologista">Ginecologia</SelectItem>
                          <SelectItem value="enfermeiro">Enfermagem</SelectItem>
                          <SelectItem value="parteira">Parteira</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero-cedula">Número de cédula profissional</Label>
                      <Input id="numero-cedula" placeholder="Introduza o número" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="local-trabalho">Local de trabalho principal</Label>
                      <Input id="local-trabalho" placeholder="Hospital, clínica ou consultório" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="anos-experiencia">Anos de experiência</Label>
                      <Select defaultValue="5-10">
                        <SelectTrigger id="anos-experiencia">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-5">Menos de 5 anos</SelectItem>
                          <SelectItem value="5-10">5 a 10 anos</SelectItem>
                          <SelectItem value="10-20">10 a 20 anos</SelectItem>
                          <SelectItem value="20+">Mais de 20 anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notificacoes">Preferências de notificações</Label>
                      <Select defaultValue="todas">
                        <SelectTrigger id="notificacoes">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todas">Todas as notificações</SelectItem>
                          <SelectItem value="consultas">Apenas consultas</SelectItem>
                          <SelectItem value="importantes">Apenas informações importantes</SelectItem>
                          <SelectItem value="nenhuma">Nenhuma notificação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {userType === "cuidador" && (
                      <div className="space-y-2">
                        <Label htmlFor="frequencia">Frequência de dicas</Label>
                        <Select defaultValue="diaria">
                          <SelectTrigger id="frequencia">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diaria">Diária</SelectItem>
                            <SelectItem value="semanal">Semanal</SelectItem>
                            <SelectItem value="mensal">Mensal</SelectItem>
                            <SelectItem value="nenhuma">Não receber dicas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {userType === "cuidador" && (
                      <div className="space-y-2">
                        <Label htmlFor="interesses">Principais interesses</Label>
                        <Select defaultValue="todos">
                          <SelectTrigger id="interesses">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos os tópicos</SelectItem>
                            <SelectItem value="saude">Saúde e bem-estar</SelectItem>
                            <SelectItem value="alimentacao">Alimentação</SelectItem>
                            <SelectItem value="desenvolvimento">Desenvolvimento do bebé</SelectItem>
                            <SelectItem value="preparacao">Preparação para o parto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {userType === "profissional" && (
                      <div className="space-y-2">
                        <Label htmlFor="disponibilidade">Disponibilidade para consultas</Label>
                        <Select defaultValue="total">
                          <SelectTrigger id="disponibilidade">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="total">Disponibilidade total</SelectItem>
                            <SelectItem value="parcial">Disponibilidade parcial</SelectItem>
                            <SelectItem value="limitada">Disponibilidade limitada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-6 border-t">
              {step < 4 ? (
                <Button 
                  onClick={handleNextStep} 
                  className="w-full max-w-sm mx-auto bg-pink-600 hover:bg-pink-700 py-6 text-lg"
                >
                  Continuar
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  className="w-full max-w-sm mx-auto bg-pink-600 hover:bg-pink-700 py-6 text-lg" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />
                      A processar...
                    </>
                  ) : (
                    "Criar conta"
                  )}
                </Button>
              )}

              {step > 1 && (
                <Button 
                  variant="ghost" 
                  onClick={handlePrevStep} 
                  className="w-full max-w-sm mx-auto hover:bg-pink-50"
                >
                  Voltar
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t py-6">
        <div className="container max-w-6xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 Clicktocare. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
