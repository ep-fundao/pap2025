"use client";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {HeartPulseIcon,CalendarIcon,ClipboardListIcon,MessageCircleIcon,ArrowLeftIcon,ShieldIcon,ThermometerIcon,InfoIcon,SearchIcon,CheckCircleIcon,AlertCircleIcon,} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type Vaccine = {
  id: string
  name: string
  age: string
  description: string
  doses: string
  importance: string
  sideEffects: string
}

type Disease = {
  id: string
  name: string
  symptoms: string[]
  causes: string
  prevention: string[]
  treatment: string
  whenToSeeDoctor: string
  ageGroup: string
}

type Milestone = {
  id: string
  age: string
  physical: string[]
  cognitive: string[]
  social: string[]
}

export default function SaudeBebePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dados de vacinas
  const vaccines: Vaccine[] = [
    {
      id: "v1",
      name: "BCG",
      age: "Ao nascer",
      description: "Protege contra formas graves de tuberculose",
      doses: "Dose única",
      importance: "Essencial para prevenir formas graves de tuberculose, especialmente em crianças",
      sideEffects: "Pequena úlcera no local da aplicação que cicatriza em algumas semanas",
    },
    {
      id: "v2",
      name: "Hepatite B",
      age: "Ao nascer, 2 e 6 meses",
      description: "Protege contra a hepatite B",
      doses: "3 doses",
      importance: "Previne a infecção pelo vírus da hepatite B, que pode causar doença hepática crônica",
      sideEffects: "Dor no local da injeção, febre baixa",
    },
    {
      id: "v3",
      name: "Pentavalente",
      age: "2, 4 e 6 meses",
      description: "Protege contra difteria, tétano, coqueluche, Haemophilus influenzae tipo b e hepatite B",
      doses: "3 doses",
      importance: "Protege contra cinco doenças diferentes com uma única injeção",
      sideEffects: "Febre, irritabilidade, vermelhidão no local da injeção",
    },
    {
      id: "v4",
      name: "VIP/VOP (Poliomielite)",
      age: "2, 4, 6 meses e reforço aos 15 meses e 4 anos",
      description: "Protege contra a poliomielite (paralisia infantil)",
      doses: "3 doses + 2 reforços",
      importance: "Previne a poliomielite, doença que pode causar paralisia permanente",
      sideEffects: "Geralmente bem tolerada, pode causar febre leve",
    },
    {
      id: "v5",
      name: "Pneumocócica 10-valente",
      age: "2, 4 meses e reforço aos 12 meses",
      description: "Protege contra doenças causadas pelo pneumococo",
      doses: "2 doses + 1 reforço",
      importance: "Previne pneumonia, meningite e otite média causadas pelo pneumococo",
      sideEffects: "Dor no local da injeção, febre, irritabilidade",
    },
    {
      id: "v6",
      name: "Rotavírus",
      age: "2 e 4 meses",
      description: "Protege contra diarreia grave causada pelo rotavírus",
      doses: "2 doses",
      importance: "Previne a desidratação grave causada por diarreia por rotavírus",
      sideEffects: "Irritabilidade, febre leve, diarreia ou vômito leves",
    },
    {
      id: "v7",
      name: "Meningocócica C",
      age: "3, 5 meses e reforço aos 12 meses",
      description: "Protege contra a meningite meningocócica do sorogrupo C",
      doses: "2 doses + 1 reforço",
      importance: "Previne a meningite meningocócica, doença grave que pode ser fatal",
      sideEffects: "Dor no local da injeção, febre, irritabilidade",
    },
    {
      id: "v8",
      name: "Tríplice Viral (SRC)",
      age: "12 meses e 15 meses (ou 4 anos)",
      description: "Protege contra sarampo, rubéola e caxumba",
      doses: "2 doses",
      importance: "Previne doenças altamente contagiosas que podem causar complicações graves",
      sideEffects: "Febre, erupção cutânea leve, dor nas articulações",
    },
    {
      id: "v9",
      name: "Varicela",
      age: "15 meses",
      description: "Protege contra a varicela (catapora)",
      doses: "1 dose",
      importance: "Previne a varicela, doença altamente contagiosa",
      sideEffects: "Dor no local da injeção, febre leve, erupção cutânea leve",
    },
    {
      id: "v10",
      name: "Hepatite A",
      age: "15 meses",
      description: "Protege contra a hepatite A",
      doses: "1 dose",
      importance: "Previne a infecção pelo vírus da hepatite A, que afeta o fígado",
      sideEffects: "Dor no local da injeção, febre leve, mal-estar",
    },
  ]

  // Dados de doenças comuns
  const diseases: Disease[] = [
    {
      id: "d1",
      name: "Gripe (Influenza)",
      symptoms: ["Febre alta", "Tosse", "Dor de garganta", "Congestão nasal", "Dores musculares", "Fadiga"],
      causes: "Vírus influenza, altamente contagioso e transmitido por gotículas respiratórias",
      prevention: [
        "Vacinação anual contra a gripe",
        "Lavagem frequente das mãos",
        "Evitar contato com pessoas doentes",
        "Manter ambientes ventilados",
      ],
      treatment: "Repouso, hidratação adequada, medicamentos para febre e dor conforme orientação médica",
      whenToSeeDoctor: "Se a febre for muito alta, persistir por mais de 3 dias, ou se houver dificuldade respiratória",
      ageGroup: "Todas as idades, mais grave em bebês menores de 6 meses",
    },
    {
      id: "d2",
      name: "Otite Média",
      symptoms: ["Dor de ouvido", "Irritabilidade", "Febre", "Dificuldade para dormir", "Puxar ou tocar na orelha"],
      causes: "Infecção bacteriana ou viral no ouvido médio, frequentemente após um resfriado",
      prevention: [
        "Amamentação exclusiva até os 6 meses",
        "Evitar exposição ao fumo",
        "Manter as vacinas em dia",
        "Não usar cotonetes dentro do ouvido",
      ],
      treatment: "Antibióticos se for de origem bacteriana, analgésicos para dor",
      whenToSeeDoctor: "Se houver dor intensa, febre alta, ou secreção do ouvido",
      ageGroup: "Comum em crianças de 6 meses a 3 anos",
    },
    {
      id: "d3",
      name: "Bronquiolite",
      symptoms: [
        "Tosse",
        "Respiração rápida ou difícil",
        "Chiado no peito",
        "Febre baixa",
        "Congestão nasal",
        "Dificuldade para se alimentar",
      ],
      causes: "Geralmente causada pelo vírus sincicial respiratório (VSR)",
      prevention: [
        "Lavagem frequente das mãos",
        "Evitar contato com pessoas doentes",
        "Amamentação",
        "Evitar exposição ao fumo",
      ],
      treatment: "Hidratação, umidificação do ar, aspiração de secreções nasais, oxigenoterapia se necessário",
      whenToSeeDoctor:
        "Se houver dificuldade respiratória, respiração rápida, retração intercostal ou recusa alimentar",
      ageGroup: "Mais comum e grave em bebês menores de 12 meses",
    },
    {
      id: "d4",
      name: "Gastroenterite",
      symptoms: ["Diarreia", "Vômitos", "Dor abdominal", "Febre", "Desidratação", "Irritabilidade"],
      causes: "Infecção viral (rotavírus, norovírus) ou bacteriana (E. coli, Salmonella)",
      prevention: [
        "Lavagem frequente das mãos",
        "Vacinação contra rotavírus",
        "Higiene adequada na preparação de alimentos",
        "Água potável",
      ],
      treatment: "Hidratação oral, soro de reidratação, alimentação leve quando tolerada",
      whenToSeeDoctor:
        "Se houver sinais de desidratação (boca seca, choro sem lágrimas, diminuição da urina), sangue nas fezes ou vômitos persistentes",
      ageGroup: "Todas as idades, mais grave em bebês e crianças pequenas",
    },
    {
      id: "d5",
      name: "Dermatite Atópica (Eczema)",
      symptoms: ["Pele seca e com coceira", "Manchas vermelhas", "Descamação", "Pequenas bolhas com líquido"],
      causes: "Condição inflamatória crônica da pele, com componente genético e ambiental",
      prevention: [
        "Banhos curtos com água morna",
        "Uso de sabonetes neutros",
        "Hidratação da pele diariamente",
        "Evitar alérgenos conhecidos",
      ],
      treatment: "Hidratantes, corticoides tópicos conforme prescrição médica, controle da coceira",
      whenToSeeDoctor: "Se houver piora dos sintomas, sinais de infecção ou se o tratamento habitual não funcionar",
      ageGroup: "Geralmente começa nos primeiros meses de vida",
    },
    {
      id: "d6",
      name: "Bronquiolite",
      symptoms: [
        "Tosse",
        "Respiração rápida",
        "Chiado no peito",
        "Febre baixa",
        "Congestão nasal",
        "Dificuldade para se alimentar",
      ],
      causes: "Geralmente causada pelo vírus sincicial respiratório (VSR)",
      prevention: [
        "Lavagem frequente das mãos",
        "Evitar contato com pessoas doentes",
        "Amamentação",
        "Evitar exposição ao fumo",
      ],
      treatment: "Hidratação, umidificação do ar, aspiração de secreções nasais, oxigenoterapia se necessário",
      whenToSeeDoctor:
        "Se houver dificuldade respiratória, respiração rápida, retração intercostal ou recusa alimentar",
      ageGroup: "Mais comum e grave em bebês menores de 12 meses",
    },
  ]

  // Dados de marcos de desenvolvimento
  const milestones: Milestone[] = [
    {
      id: "m1",
      age: "1 mês",
      physical: [
        "Levanta brevemente a cabeça quando está de bruços",
        "Movimentos reflexos",
        "Fecha a mão quando algo toca a palma",
      ],
      cognitive: ["Foca objetos próximos", "Presta atenção a rostos", "Reconhece alguns sons"],
      social: ["Acalma-se quando pego no colo", "Começa a sorrir socialmente", "Reconhece a voz dos pais"],
    },
    {
      id: "m2",
      age: "3 meses",
      physical: ["Sustenta a cabeça", "Abre e fecha as mãos", "Empurra com as pernas quando os pés estão apoiados"],
      cognitive: [
        "Segue objetos com os olhos",
        "Reconhece pessoas familiares à distância",
        "Começa a usar as mãos e os olhos em coordenação",
      ],
      social: ["Sorri espontaneamente", "Gosta de brincar com pessoas", "Imita alguns movimentos e expressões faciais"],
    },
    {
      id: "m3",
      age: "6 meses",
      physical: [
        "Senta-se sem apoio",
        "Rola em ambas direções",
        "Começa a se arrastar",
        "Transfere objetos de uma mão para outra",
      ],
      cognitive: [
        "Responde ao próprio nome",
        "Encontra objetos parcialmente escondidos",
        "Explora objetos de diferentes maneiras",
      ],
      social: ["Gosta de brincar com os outros", "Responde às emoções dos outros", "Gosta de se olhar no espelho"],
    },
    {
      id: "m4",
      age: "9 meses",
      physical: [
        "Fica em pé segurando-se em algo",
        "Pode ficar sentado sem apoio por longos períodos",
        "Puxa para ficar em pé",
        "Engatinha",
      ],
      cognitive: ["Entende 'não'", "Faz gestos como apontar", "Imita sons e gestos", "Procura objetos escondidos"],
      social: ["Pode ter medo de estranhos", "Tem brinquedos favoritos", "Responde quando chamado pelo nome"],
    },
    {
      id: "m5",
      age: "12 meses",
      physical: [
        "Fica em pé sozinho",
        "Pode dar alguns passos sem apoio",
        "Pega objetos pequenos com o polegar e o indicador",
      ],
      cognitive: [
        "Segue instruções simples",
        "Responde a pedidos verbais simples",
        "Usa objetos corretamente (copo, escova)",
      ],
      social: [
        "Repete sons ou ações para chamar atenção",
        "Ajuda a se vestir estendendo braço ou perna",
        "Demonstra afeto",
      ],
    },
    {
      id: "m6",
      age: "18 meses",
      physical: ["Anda sozinho", "Sobe escadas com ajuda", "Corre", "Constrói torre com blocos"],
      cognitive: [
        "Sabe para que servem objetos comuns",
        "Segue instruções com 2 passos",
        "Aponta para objetos quando nomeados",
      ],
      social: ["Imita comportamentos", "Mostra independência", "Começa a incluir outras crianças em brincadeiras"],
    },
    {
      id: "m7",
      age: "24 meses",
      physical: [
        "Sobe e desce escadas segurando no corrimão",
        "Chuta bola",
        "Corre com facilidade",
        "Vira páginas de livros",
      ],
      cognitive: [
        "Encontra objetos mesmo quando escondidos sob duas ou três coberturas",
        "Completa frases em livros conhecidos",
        "Segue instruções com 2 ou 3 passos",
      ],
      social: [
        "Imita adultos e amigos",
        "Mostra cada vez mais independência",
        "Mostra comportamento desafiador",
        "Brinca ao lado de outras crianças",
      ],
    },
  ]

  // Filtrar vacinas com base na pesquisa
  const filteredVaccines = vaccines.filter(
    (vaccine) =>
      vaccine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vaccine.age.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filtrar doenças com base na pesquisa
  const filteredDiseases = diseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.ageGroup.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <HeartPulseIcon className="w-5 h-5 text-pink-600" />
              <h1 className="font-semibold">Saúde do Bebé</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-[200px]">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Pesquisar..."
                className="pl-8 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Saúde e Desenvolvimento do Bebé</CardTitle>
                <CardDescription>
                  Informações essenciais para acompanhar a saúde e o desenvolvimento do seu bebé após o nascimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <ShieldIcon className="w-10 h-10 text-blue-500 mb-2" />
                    <h3 className="font-medium text-center">Calendário de Vacinação</h3>
                    <p className="text-sm text-center text-gray-600">
                      Todas as vacinas recomendadas para o seu bebé, organizadas por idade
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
                    <ThermometerIcon className="w-10 h-10 text-amber-500 mb-2" />
                    <h3 className="font-medium text-center">Doenças Comuns</h3>
                    <p className="text-sm text-center text-gray-600">
                      Informações sobre doenças frequentes em bebés e como preveni-las
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                    <InfoIcon className="w-10 h-10 text-green-500 mb-2" />
                    <h3 className="font-medium text-center">Marcos de Desenvolvimento</h3>
                    <p className="text-sm text-center text-gray-600">
                      Acompanhe o desenvolvimento do seu bebé mês a mês
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="vacinas" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="vacinas">Vacinas</TabsTrigger>
              <TabsTrigger value="doencas">Doenças Comuns</TabsTrigger>
              <TabsTrigger value="desenvolvimento">Desenvolvimento</TabsTrigger>
            </TabsList>

            <TabsContent value="vacinas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldIcon className="w-5 h-5 text-blue-500" />
                    Calendário de Vacinação
                  </CardTitle>
                  <CardDescription>
                    Vacinas recomendadas para o seu bebé desde o nascimento até os 24 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <InfoIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            <strong>Importante:</strong> Este calendário é baseado no Programa Nacional de Vacinação de
                            Portugal. Consulte sempre o seu médico para orientações específicas para o seu bebé.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Table>
                      <TableCaption>Calendário de vacinação para os primeiros 24 meses</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Idade</TableHead>
                          <TableHead>Vacinas</TableHead>
                          <TableHead className="text-right">Doses</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Ao nascer</TableCell>
                          <TableCell>BCG, Hepatite B (1ª dose)</TableCell>
                          <TableCell className="text-right">2</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">2 meses</TableCell>
                          <TableCell>Pentavalente, VIP, Pneumocócica, Rotavírus</TableCell>
                          <TableCell className="text-right">4</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">3 meses</TableCell>
                          <TableCell>Meningocócica C</TableCell>
                          <TableCell className="text-right">1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">4 meses</TableCell>
                          <TableCell>Pentavalente, VIP, Pneumocócica, Rotavírus</TableCell>
                          <TableCell className="text-right">4</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">5 meses</TableCell>
                          <TableCell>Meningocócica C</TableCell>
                          <TableCell className="text-right">1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">6 meses</TableCell>
                          <TableCell>Pentavalente, VIP, Hepatite B</TableCell>
                          <TableCell className="text-right">3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">12 meses</TableCell>
                          <TableCell>Tríplice Viral, Pneumocócica (reforço), Meningocócica C (reforço)</TableCell>
                          <TableCell className="text-right">3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">15 meses</TableCell>
                          <TableCell>Tríplice Viral, VIP (reforço), Varicela, Hepatite A</TableCell>
                          <TableCell className="text-right">4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Detalhes das Vacinas</h3>

                      {searchQuery && filteredVaccines.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>Nenhuma vacina encontrada para "{searchQuery}"</p>
                        </div>
                      ) : (
                        <Accordion type="single" collapsible className="w-full">
                          {(searchQuery ? filteredVaccines : vaccines).map((vaccine) => (
                            <AccordionItem key={vaccine.id} value={vaccine.id}>
                              <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                  <ShieldIcon className="w-4 h-4 text-blue-500" />
                                  <span>{vaccine.name}</span>
                                  <Badge variant="outline" className="ml-2">
                                    {vaccine.age}
                                  </Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3 pl-6">
                                  <p className="text-sm">{vaccine.description}</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <div>
                                      <h4 className="text-sm font-medium">Doses</h4>
                                      <p className="text-sm text-gray-600">{vaccine.doses}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium">Possíveis Efeitos Secundários</h4>
                                      <p className="text-sm text-gray-600">{vaccine.sideEffects}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Importância</h4>
                                    <p className="text-sm text-gray-600">{vaccine.importance}</p>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doencas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThermometerIcon className="w-5 h-5 text-amber-500" />
                    Doenças Comuns em Bebés
                  </CardTitle>
                  <CardDescription>
                    Informações sobre doenças frequentes, sintomas, prevenção e quando procurar ajuda médica
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircleIcon className="w-5 h-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            <strong>Atenção:</strong> Estas informações são apenas orientativas. Em caso de dúvida ou se
                            o seu bebé apresentar sintomas preocupantes, consulte imediatamente um médico.
                          </p>
                        </div>
                      </div>
                    </div>

                    {searchQuery && filteredDiseases.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>Nenhuma doença encontrada para "{searchQuery}"</p>
                      </div>
                    ) : (
                      <Accordion type="single" collapsible className="w-full">
                        {(searchQuery ? filteredDiseases : diseases).map((disease) => (
                          <AccordionItem key={disease.id} value={disease.id}>
                            <AccordionTrigger>
                              <div className="flex items-center gap-2">
                                <ThermometerIcon className="w-4 h-4 text-amber-500" />
                                <span>{disease.name}</span>
                                <Badge variant="outline" className="ml-2">
                                  {disease.ageGroup}
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 pl-6">
                                <div>
                                  <h4 className="text-sm font-medium">Sintomas</h4>
                                  <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {disease.symptoms.map((symptom, index) => (
                                      <li key={index}>{symptom}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Causas</h4>
                                  <p className="text-sm text-gray-600">{disease.causes}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Prevenção</h4>
                                  <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {disease.prevention.map((item, index) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Tratamento</h4>
                                  <p className="text-sm text-gray-600">{disease.treatment}</p>
                                </div>
                                <div className="bg-amber-50 p-3 rounded-md">
                                  <h4 className="text-sm font-medium">Quando Consultar o Médico</h4>
                                  <p className="text-sm text-gray-600">{disease.whenToSeeDoctor}</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="desenvolvimento" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <InfoIcon className="w-5 h-5 text-green-500" />
                    Marcos de Desenvolvimento
                  </CardTitle>
                  <CardDescription>
                    Acompanhe o desenvolvimento do seu bebé desde o nascimento até os 24 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <InfoIcon className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            <strong>Lembre-se:</strong> Cada bebé desenvolve-se no seu próprio ritmo. Estes marcos são
                            apenas orientações gerais. Se tiver preocupações sobre o desenvolvimento do seu bebé,
                            consulte o pediatra.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {milestones.map((milestone) => (
                        <div key={milestone.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-green-50 p-3 border-b">
                            <h3 className="font-medium">{milestone.age}</h3>
                          </div>
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                  Desenvolvimento Físico
                                </h4>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                  {milestone.physical.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                                  <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                                  Desenvolvimento Cognitivo
                                </h4>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                  {milestone.cognitive.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                                  <CheckCircleIcon className="w-4 h-4 text-pink-500" />
                                  Desenvolvimento Social
                                </h4>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                  {milestone.social.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
