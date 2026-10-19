import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { validateEmail } from "@/utils/validations";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("O e-mail é obrigatório");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido");
      return;
    }

    setIsLoading(true);

    try {
      // toast({
      //   title: "E-mail enviado",
      //   description:
      //     "Instruções para recuperação de senha foram enviadas para o seu e-mail.",
      //   variant: "success",
      // });
      setEmail("");
    } catch (error) {
      toast({
        title: "Erro ao enviar e-mail",
        description: "Ocorreu um erro ao enviar o e-mail. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <img src="/logo.svg" alt="MAIP Logo" className="h-20 w-auto" />
          <h1 className="text-2xl font-bold text-primary">
            Recuperação de senha
          </h1>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail e enviaremos instruções para redefinir sua senha.
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                placeholder="nome@exemplo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </form>

          <div className="flex justify-center text-sm">
            <Link to="/login" className="text-sm text-primary hover:underline">
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
