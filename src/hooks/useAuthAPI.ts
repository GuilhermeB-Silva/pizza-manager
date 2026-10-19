import { useMutation } from "@tanstack/react-query";

// TODO: substituir pela chamada real à API quando o backend existir.

type ResetPasswordPayload = {
  token?: string;
  password: string;
};

const SIMULATED_REQUEST_DELAY_IN_MS = 500;

const waitForSimulatedRequest = (): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, SIMULATED_REQUEST_DELAY_IN_MS)
  );

const resetPassword = async (payload: ResetPasswordPayload): Promise<void> => {
  if (!payload.token) {
    throw new Error("Token de recuperação de senha não informado");
  }

  await waitForSimulatedRequest();
};

export const useAuthAPI = () => {
  const useResetPasswordAPI = useMutation({ mutationFn: resetPassword });

  return { useResetPasswordAPI };
};
