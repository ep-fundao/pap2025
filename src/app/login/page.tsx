'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulseIcon, ArrowLeftIcon, Loader2Icon } from "lucide-react"

export default function LoginPage() {
  const [isAuth0Loading, setIsAuth0Loading] = useState(false)
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard"
    }
  }, [user])

  const handleAuth0Login = () => {
    setIsAuth0Loading(true)
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
            <CardDescription className="text-center">Clique abaixo para entrar com sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleAuth0Login}
              className="w-full bg-pink-600 hover:bg-pink-700"
              disabled={isAuth0Loading || isLoading}
            >
              {isAuth0Loading || isLoading ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  A entrar...
                </>
              ) : (
                "Entrar com Auth0"
              )}
            </Button>
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
