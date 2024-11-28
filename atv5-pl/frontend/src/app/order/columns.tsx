"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Order = {
    tipo: string
    quantidade: number
    preco: string
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "raca",
    header: "Raça",
  },
  {
    accessorKey: "genero",
    header: "Gênero",
  },
  {
    accessorKey: "cpf",
    header: "CPF do cliente",
  },
]
