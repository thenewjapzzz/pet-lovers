package com.fatec.pl.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.pl.modelo.Cliente;

public interface RepositorioCliente extends JpaRepository<Cliente, Long> {
}
