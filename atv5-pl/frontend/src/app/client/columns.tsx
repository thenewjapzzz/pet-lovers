"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Client = {
  id: number
  nome: string
  nomeSocial: string
  rg: string
  cpf: string
  telefone: string
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "nomeSocial",
    header: "Nome Social",
  },
  {
    accessorKey: "rg",
    header: "RG",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },
]
