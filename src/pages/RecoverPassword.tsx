import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useAuthAPI } from "@/hooks/useAuthAPI";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const RecoverPassword: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const { useResetPasswordAPI } = useAuthAPI();
  const { toast } = useToast();

  const resetPasswordForm = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await useResetPasswordAPI.mutateAsync({
        token: code,
        password: data.password,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast({
        title: "Não foi possível atualizar sua senha",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <img src="/logo.svg" alt="MAIP Logo" className="h-20 w-auto" />
          <h1 className="text-2xl font-bold text-primary">Recuperar senha</h1>
          <p className="text-sm text-muted-foreground">
            Digite sua nova senha para recuperar o acesso à sua conta.
          </p>
        </div>
        <Form {...resetPasswordForm}>
          <form
            onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <FormField
                control={resetPasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua nova senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={resetPasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nova Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua nova senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={useResetPasswordAPI.isPending}
            >
              {useResetPasswordAPI.isPending
                ? "Alterando senha..."
                : "Alterar senha"}
            </Button>
          </form>
        </Form>

        <div className="flex justify-center text-sm">
          <a href="/login" className="text-sm text-primary hover:underline">
            Voltar para o login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
