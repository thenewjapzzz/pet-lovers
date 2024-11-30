package com.fatec.pl.atualizador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fatec.pl.modelo.Cliente;
import com.fatec.pl.modelo.Telefone;
import com.fatec.pl.verificador.VerificadorEnderecoNulo;
import com.fatec.pl.verificador.VerificadorStringNula;
import com.fatec.pl.verificador.VerificadorTelefoneNulo;

@Component
public class AtualizadorCliente implements Atualizador<Cliente> {
	@Autowired
	private VerificadorStringNula verificadorString;
	@Autowired
	private VerificadorEnderecoNulo verificadorEndereco;
	@Autowired
	private AtualizadorEndereco atualizadorEndereco;
	@Autowired
	private VerificadorTelefoneNulo verificadorTelefone;

	@Override
	public void atualizar(Cliente alvo, Cliente atualizacao) {
		if (!verificadorString.verificar(atualizacao.getNome())) {
			alvo.setNome(atualizacao.getNome());
		}
		if (!verificadorString.verificar(atualizacao.getEmail())) {
			alvo.setEmail(atualizacao.getEmail());
		}
		if (!verificadorString.verificar(atualizacao.getNomeSocial())) {
			alvo.setNomeSocial(atualizacao.getNomeSocial());
		}
		if (!verificadorEndereco.verificar(atualizacao.getEndereco())) {
			if (alvo.getEndereco() != null) {
				atualizadorEndereco.atualizar(alvo.getEndereco(), atualizacao.getEndereco());
			} else {
				alvo.setEndereco(atualizacao.getEndereco());
			}
		}
		if (atualizacao.getTelefones().size() > 0) {
			alvo.getTelefones().clear();
			for (Telefone telefone : atualizacao.getTelefones()) {
				if (!verificadorTelefone.verificar(telefone)) {
					Telefone telefoneNovo = new Telefone();
					telefoneNovo.setDdd(telefone.getDdd());
					telefoneNovo.setNumero(telefone.getNumero());
					alvo.getTelefones().add(telefoneNovo);
				}
			}
		}
	}
}