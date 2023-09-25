import { Button, Stack, Typography } from "@mui/material";
import { formatEther } from "viem";

import { useDialog } from "../hooks";
import { AddressView, ContextMenu, GasForm } from "./";

export interface TxRequest {
  data: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
}

export function TxReviewDialog({ id }: { id: number }) {
  const { data, accept, reject } = useDialog<TxRequest>(id);

  if (!data) return null;

  const {
    from,
    to,
    value: valueStr,
    data: calldata,
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } = data;

  console.log(data);

  const value = BigInt(valueStr || 0);

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <Typography variant="h6" component="h1">
        Transaction review
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <AddressView address={from} /> <span>→</span>{" "}
          <AddressView address={to} />
        </Stack>
        <ContextMenu>{formatEther(BigInt(value))} Ξ</ContextMenu>
      </Stack>
      <Typography>data: {calldata}</Typography>

      <GasForm
        maxBaseFee={parseInt(maxFeePerGas, 16)}
        priorityFee={parseInt(maxPriorityFeePerGas, 16)}
        gasLimit={parseInt(gas, 16)}
      />

      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="contained" color="error" onClick={() => reject()}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" onClick={() => accept(data)}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
