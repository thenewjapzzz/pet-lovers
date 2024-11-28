"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Pet = {
  id: number
  nome: string
  tipo: string
  raca: string
  genero: number
  cliente_nome: string
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
    accessorKey: "cliente_nome",
    header: "Nome do Cliente",
  },
]
