"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Service = {
  id: number
  nome: string
  preco: string
  descricao: string
}

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "preco",
    header: "Preço",
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
]
