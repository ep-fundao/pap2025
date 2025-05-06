"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulseIcon, ArrowLeftIcon, Loader2Icon, LockIcon, MailIcon } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuth0Loading, setIsAuth0Loading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user } = useUser()

  // Redireciona se já estiver autenticado
  if (typeof window !== "undefined" && user) {
    window.location.href = "/dashboard"
    return null
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Redireciona para o login do Auth0
    window.location.href = "/api/auth/login"
  }

  const handleAuth0Login = () => {
    setIsAuth0Loading(true)
    // Redireciona para o login do Auth0
    window.location.href = "/api/auth/login"
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-auto">
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

      <main className="flex-1 container max-w-md mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Image
                src="/logo.jpg"
                alt="Clicktocare Logo"
                width={80}
                height={80}
                className="rounded-full bg-pink-50 p-3"
              />
            </div>
            <CardTitle className="text-xl text-center">Entrar na conta</CardTitle>
            <CardDescription className="text-center">Introduza os seus dados para aceder à sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <MailIcon className="h-4 w-4" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemplo@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Palavra-passe
                    </Label>
                    <Link href="/recuperar-password" className="text-xs text-pink-700 hover:underline">
                      Esqueceu a palavra-passe?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <LockIcon className="h-4 w-4" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Introduza a sua palavra-passe"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />A entrar...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center mt-2">
              <span className="text-sm text-gray-500">Ainda não tem conta?</span>{" "}
              <Link href="/registar" className="text-sm text-pink-700 hover:underline">
                Registar
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-white border-t py-4">
        <div className="container text-center text-sm text-gray-500">
          <p>© 2025 Clicktocare. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}