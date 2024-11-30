package com.fatec.pl.atualizador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fatec.pl.modelo.Endereco;
import com.fatec.pl.verificador.VerificadorStringNula;

@Component
public class AtualizadorEndereco implements Atualizador<Endereco> {
	@Autowired
	private VerificadorStringNula verificadorString;

	@Override
	public void atualizar(Endereco alvo, Endereco atualizacao) {
		if (!verificadorString.verificar(atualizacao.getEstado())) {
			alvo.setEstado(atualizacao.getEstado());
		}
		if (!verificadorString.verificar(atualizacao.getCidade())) {
			alvo.setCidade(atualizacao.getCidade());
		}
		if (!verificadorString.verificar(atualizacao.getBairro())) {
			alvo.setBairro(atualizacao.getBairro());
		}
		if (!verificadorString.verificar(atualizacao.getRua())) {
			alvo.setRua(atualizacao.getRua());
		}
		if (!verificadorString.verificar(atualizacao.getNumero())) {
			alvo.setNumero(atualizacao.getNumero());
		}
		if (!verificadorString.verificar(atualizacao.getCodigoPostal())) {
			alvo.setCodigoPostal(atualizacao.getCodigoPostal());
		}
		if (!verificadorString.verificar(atualizacao.getInformacoesAdicionais())) {
			alvo.setInformacoesAdicionais(atualizacao.getInformacoesAdicionais());
		}
	}
}