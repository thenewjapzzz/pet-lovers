"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Product = {
  id: number
  nome: string
  preco: string
  descricao: string
  estoque: number
}

export const columns: ColumnDef<Product>[] = [
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
  {
    accessorKey: "estoque",
    header: "Estoque",
  },
]
