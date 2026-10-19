import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { registerZodSchema, RegisterFormData } from "@/schemas/register.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { InputMask } from "@/components/ui/input-mask";
import { cpfMask, phoneMask } from "@/utils/masks";
// import { PhoneInput } from "@/components/forms/PhoneInput";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { formatCep, formatPhoneFlexible } from "@/utils/formatters";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
// import { CEP } from "@/types/cep";

const Register: React.FC = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [enabledCep, setEnableCep] = useState(false);

  // const form = useForm<RegisterFormData>({
  //   resolver: zodResolver(registerZodSchema),
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     profession: "",
  //     password: "",
  //     confirmPassword: "",
  //     cpf: "",
  //     phone: "",
  //     zipcode: "",
  //     street: "",
  //     number: "",
  //     complement: "",
  //     neighborhood: "",
  //     city: "",
  //     state: "",
  //   },
  // });

  // const { data, isLoading } = useQuery<CEP>({
  //   queryKey: ["cep-registter", form.getValues("zipcode")],
  //   queryFn: () => validateCEP(form.getValues("zipcode")),
  //   refetchOnMount: false,
  //   enabled: enabledCep && form.getValues("zipcode").length > 5,
  // });

  // const { isSubmitting } = form.formState;

  // const handleSubmit = async (data: RegisterFormData) => {
  //   const newProfessional = {
  //     phone: formatPhoneFlexible(formatPhoneNumberIntl(data.phone)),
  //     name: data.name,
  //     email: data.email.toLowerCase(),
  //     password: data.password,
  //     profession: data.profession,
  //     cpf: data.cpf,
  //     address: {
  //       zip_code: data.zipcode,
  //       street: data.street,
  //       number: data.number,
  //       complement: data.complement,
  //       neighborhood: data.neighborhood,
  //       city: data.city,
  //       state: data.state,
  //     },
  //   };
  //   // await register(newProfessional);
  //   form.reset();
  //   setConfirmModal(true);
  // };

  // const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const formatted = formatCep(e.target.value);
  //   form.setValue("zipcode", formatted);

  //   if (formatted.length === 9) {
  //     setEnableCep(true);
  //   }
  // };

  // useEffect(() => {
  //   if (data?.cep) {
  //     const { bairro, cep, logradouro, uf, localidade } = data;
  //     form.setValue("street", logradouro);
  //     form.setValue("city", localidade);
  //     form.setValue("neighborhood", bairro);
  //     form.setValue("state", uf);
  //     form.setValue("zipcode", cep);
  //     form.clearErrors("street");
  //     form.clearErrors("city");
  //     form.clearErrors("neighborhood");
  //     form.clearErrors("state");
  //     form.clearErrors("zipcode");
  //   }
  // }, [data]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="MAIP Logo" className="w-full h-16" />
          </div>
        </div>

        {/* <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Criar conta</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <InputMask
                          placeholder="000.000.000-00"
                          mask={cpfMask}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <PhoneInput name="phone" control={form.control} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissão</FormLabel>
                      <FormControl>
                        <Input placeholder="Profissão" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="CEP"
                          disabled={isLoading}
                          {...field}
                          onChange={handleCepChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Rua"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Número"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Complemento"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Bairro"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Cidade"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Estado"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Crie uma senha forte"
                            {...field}
                            minLength={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
             
                </div>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirme a senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Digite a senha novamente"
                          {...field}
                          minLength={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registrando..." : "Registrar"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card> */}
      </div>

      {/* <Dialog open={confirmModal} onOpenChange={setConfirmModal}>
        <DialogContent className="sm:max-w-[500px] flex items-center flex-col text-center">
          <Mail className="h-12 w-12" />
          <br />
          Enviamos um e-mail de verificação.
          <br /> Acesse sua caixa de entrada e clique no link de ativação para
          confirmar sua conta.
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default Register;
