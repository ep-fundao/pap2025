"use client"

import type React from "react"
import ReactMarkdown from "react-markdown";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {HeartPulseIcon,CalendarIcon,ClipboardListIcon,MessageCircleIcon,SendIcon,ArrowLeftIcon,MicIcon,} from "lucide-react"

type Message = {
  id: number
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function AssistentePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Como posso ajudar-te hoje?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])

  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
  
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
  
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage("");
  
    // Converte o histórico para o formato da API (OpenAI/OpenRouter)
    const apiMessages = updatedMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.content,
    }));
  
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });
  
      const data = await res.json();
  
      const newAssistantMessage: Message = {
        id: updatedMessages.length + 1,
        content: data.resposta || "Desculpa, não consegui gerar uma resposta.",
        sender: "assistant",
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, newAssistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: updatedMessages.length + 1,
        content: "Ocorreu um erro ao tentar responder. Por favor tenta novamente.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };
  

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/dashboard" className="mr-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Assistente" />
              <AvatarFallback className="bg-pink-100 text-pink-700">AC</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">Assistente Clicktocare</h1>
              <p className="text-xs text-gray-500">Sempre disponível para ajudar</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-4 pb-20">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" ? "bg-pink-100 rounded-tr-none" : "bg-white rounded-tl-none border"
                }`}
              >
                <ReactMarkdown
                  components={{
                    p: ({ ...props }) => <p {...props} className="text-sm prose prose-pink" />,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                  <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="sticky bottom-0 bg-white border-t p-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <MicIcon className="w-5 h-5 text-gray-500" />
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreve a tua mensagem..."
            className="flex-1 bg-gray-50 border-gray-200"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full bg-pink-600 hover:bg-pink-700"
            disabled={inputMessage.trim() === ""}
          >
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="sticky bottom-0 border-t bg-white mt-auto">
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
            <Link href="/assistente" className="flex flex-col items-center justify-center py-1 text-pink-700">
              <MessageCircleIcon className="w-5 h-5" />
              <span className="text-xs mt-1">Assistente</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
