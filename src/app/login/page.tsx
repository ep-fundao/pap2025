"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulseIcon, ArrowLeftIcon, Loader2Icon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  interface User {
    name: string
    email: string
    type: string
  }

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const response = await fetch("/api/registar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Credenciais inválidas")
    }

    const data = await response.json()

    // Aqui podes guardar o token se for necessário
    // Exemplo: document.cookie = `token=${data.token}`

    // Redirecionar após login bem-sucedido
    window.location.href = "/dashboard"
  } catch (error: any) {
    alert(error.message || "Erro ao fazer login. Tente novamente.")
  } finally {
    setIsLoading(false)
  }
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
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-8 border-b">
              <div className="flex justify-center mb-6">
                <Image
                  src="/logo.jpg"
                  alt="Clicktocare Logo"
                  width={120}
                  height={120}
                  className="rounded-full bg-pink-50 p-4"
                />
              </div>
              <CardTitle className="text-2xl font-bold">Bem-vindo/a</CardTitle>
              <CardDescription className="text-base mt-2">
                Introduza os seus dados para aceder à sua conta
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <MailIcon className="h-5 w-5" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemplo@email.com"
                        className="pl-10 h-12"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Palavra-passe</Label>
                      <Link 
                        href="/recuperar-password" 
                        className="text-sm text-pink-600 hover:text-pink-700"
                      >
                        Esqueceu a palavra-passe?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <LockIcon className="h-5 w-5" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Introduza a sua palavra-passe"
                        className="pl-10 pr-10 h-12"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-pink-600 hover:bg-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                      <span>A entrar...</span>
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-6 border-t text-center">
              <p className="text-gray-600">
                Ainda não tem conta?{" "}
                <Link href="/registar" className="font-medium text-pink-600 hover:text-pink-700">
                  Registar
                </Link>
              </p>
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