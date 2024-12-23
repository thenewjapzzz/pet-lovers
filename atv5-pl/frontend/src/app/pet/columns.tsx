"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Pet = {
  id: number
  nome: string
  tipo: string
  raca: string
  genero: string
  cpf: string
}

export const columns: ColumnDef<Pet>[] = [
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
