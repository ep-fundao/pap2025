import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BabyIcon, CalendarIcon, BellIcon, HeartPulseIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-pink-50 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <HeartPulseIcon className="w-6 h-6 text-pink-500" />
            <span className="font-bold text-xl text-pink-700">Clicktocare</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/registar">
              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                Registar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pink-700">
                    Acompanhamento completo da sua gravidez e desenvolvimento do seu bebé
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    A Clicktocare está consigo em cada momento desta jornada especial, desde o primeiro dia até ao
                    nascimento do seu bebé.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/registar">
                    <Button className="bg-pink-600 hover:bg-pink-700">Começar agora</Button>
                  </Link>
                  <Link href="/como-funciona">
                    <Button variant="outline">Saber mais</Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/mulher.jpg"
                  alt="Mulher grávida a usar a aplicação Clicktocare"
                  width={450}
                  height={550}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-pink-100 py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-pink-700">
                  Tudo o que precisa num só lugar
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Acompanhe a sua gravidez e a saúde do seu bebé com ferramentas intuitivas e personalizadas.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 bg-pink-100 rounded-full">
                  <CalendarIcon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-pink-700">Consultas</h3>
                <p className="text-gray-500 text-center">
                  Agende e receba lembretes para todas as suas consultas pré-natais.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 bg-pink-100 rounded-full">
                  <BabyIcon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-pink-700">Desenvolvimento</h3>
                <p className="text-gray-500 text-center">Acompanhe o desenvolvimento do seu bebé semana a semana.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 bg-pink-100 rounded-full">
                  <BellIcon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-pink-700">Avisos</h3>
                <p className="text-gray-500 text-center">
                  Receba notificações importantes sobre a sua gravidez e cuidados a ter após o parto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Assistant Preview */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="w-full max-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="bg-pink-600 p-4 text-white">
                    <h3 className="font-semibold">Assistente Virtual</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-sm">Olá Maria! Como posso ajudar-te hoje?</p>
                    </div>
                    <div className="bg-pink-100 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                      <p className="text-sm">Depois da gravidez tenho estado insegura,não estou satisfeta comigo mesma.</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-sm">
                        Não te sintas assim,estarei aqui para te dar apoio e auxiliar no que precisares.
                      </p>
                    </div>
                  </div>
                  <div className="p-3 border-t flex">
                    <input
                      type="text"
                      placeholder="Escreve a tua mensagem..."
                      className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-pink-700">
                    Assistente virtual inteligente
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Tire dúvidas, receba lembretes e obtenha informações personalizadas sobre a sua gravidez e a saúde do seu bebé a qualquer
                    momento.
                  </p>
                </div>
                <div>
                  {/* <Link href="/assistente">
                    <Button variant="outline" className="border-pink-200 text-pink-700 hover:bg-pink-50">
                      Experimentar assistente
                    </Button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="container px-4 py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2">
                <HeartPulseIcon className="w-5 h-5 text-pink-500" />
                <span className="font-bold text-pink-700">Clicktocare</span>
              </Link>
              <p className="text-sm text-gray-500">A sua companhia durante toda a gravidez.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-pink-700">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/funcionalidades" className="text-gray-500 hover:text-pink-600">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="/como-funciona" className="text-gray-500 hover:text-pink-600">
                    Como funciona
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-pink-700">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/ajuda" className="text-gray-500 hover:text-pink-600">
                    Centro de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-500 hover:text-pink-600">
                    Perguntas Frequentes
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-pink-700">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacidade" className="text-gray-500 hover:text-pink-600">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="text-gray-500 hover:text-pink-600">
                    Termos de Utilização
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            <p>© 2025 Clicktocare. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
