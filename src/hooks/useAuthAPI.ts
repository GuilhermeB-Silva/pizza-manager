import { useMutation } from "@tanstack/react-query";

type ResetPasswordPayload = {
  token?: string;
  password: string;
};

export const useAuthAPI = () => {
  const useResetPasswordAPI = useMutation({
    mutationFn: async (_payload: ResetPasswordPayload): Promise<void> => {
      throw new Error("A redefinição de senha ainda não está integrada a uma API");
    },
  });

  return { useResetPasswordAPI };
};
