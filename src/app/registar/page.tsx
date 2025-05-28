'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrarPage() {
  // Estados declarados corretamente
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [numeroGravidez, setNumeroGravidez] = useState("");
  const [preferenciasNotificacao, setPreferenciasNotificacao] = useState("");
  const [frequenciaDicas, setFrequenciaDicas] = useState("");
  const [interesses, setInteresses] = useState("");

  const router = useRouter();

  // Função handleSubmit declarada corretamente
  const handleSubmit = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const response = await fetch("/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          numero_gravidez: Number(numeroGravidez),
          preferencias_notificacao: preferenciasNotificacao,
          frequencia_dicas: frequenciaDicas,
          principais_interesses: [interesses],
        }),
      });

      if (response.ok) {
        alert("Usuário registrado com sucesso!");
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao registrar usuário");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center">Criar Conta</h2>
          
          {/* Campos de texto */}
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmar-senha">Confirmar Senha</Label>
            <Input
              id="confirmar-senha"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          {/* Selects corrigidos */}
         <div className="space-y-2">
  <Label>Número de gravidez</Label>
  <Select 
    defaultValue={numeroGravidez}
    onValueChange={setNumeroGravidez}
  >
    <SelectTrigger>
      <SelectValue placeholder="Selecione o número de gravidez" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">Primeira gravidez</SelectItem>
      <SelectItem value="2">Segunda gravidez</SelectItem>
      <SelectItem value="3">Terceira gravidez</SelectItem>
      <SelectItem value="4">Quarta gravidez</SelectItem>
      <SelectItem value="5">Quinta gravidez ou mais</SelectItem>
    </SelectContent>
  </Select>
</div>

          <div className="space-y-2">
            <Label>Preferências de notificação</Label>
            <Select
              value={preferenciasNotificacao}
              onValueChange={setPreferenciasNotificacao}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Push</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Frequência das dicas</Label>
            <Select
              value={frequenciaDicas}
              onValueChange={setFrequenciaDicas}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma frequência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diaria">Diária</SelectItem>
                <SelectItem value="semanal">Semanal</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Principais interesses</Label>
            <Select
              value={interesses}
              onValueChange={setInteresses}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um interesse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alimentacao">Alimentação</SelectItem>
                <SelectItem value="exercicio">Exercício</SelectItem>
                <SelectItem value="sono">Sono</SelectItem>
                <SelectItem value="bem-estar">Bem-estar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSubmit}
            type="button"
          >
            Registrar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}