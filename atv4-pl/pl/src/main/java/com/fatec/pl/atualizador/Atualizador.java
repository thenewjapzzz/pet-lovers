package com.fatec.pl.atualizador;

public interface Atualizador<T> {
	public void atualizar(T alvo, T atualizacao);
}