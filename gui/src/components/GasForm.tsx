import { Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export interface Props {
  maxBaseFee: number;
  priorityFee: number;
  gasLimit: number;
}

export function GasForm({ maxBaseFee, priorityFee, gasLimit }: Props) {
  useForm({
    defaultValues: {
      maxBaseFee,
      priorityFee,
      gasLimit,
    },
  });

  return (
    <Stack>
      <Typography>{maxBaseFee}</Typography>
      <Typography>{priorityFee}</Typography>
      <Typography>{gasLimit}</Typography>
    </Stack>
  );
}
