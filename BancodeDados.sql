

DROP TABLE Cliente;
DROP TABLE Contas;
DROP TABLE Estoque;
DROP TABLE Estoque;
DROP TABLE Fornecedor;
DROP TABLE MateriaPrima;
DROP TABLE Orcamento;
DROP TABLE Pedido;
DROP TABLE Produto;
DROP TABLE ProdutoOrcamento;
DROP TABLE ProdutoPedido;

CREATE TABLE Fornecedor
(
    idFornecedor integer NOT NULL,
    nome character varying(30) COLLATE pg_catalog.default NOT NULL,
    endereco character varying(30) COLLATE pg_catalog.default,
    telefone character varying(30) COLLATE pg_catalog.default,
    site character varying(30) COLLATE pg_catalog.default,
    cnpj character varying(30) COLLATE pg_catalog.default NOT NULL,
    email character varying(30) COLLATE pg_catalog.default NOT NULL,
    CONSTRAINT Fornecedor_pkey PRIMARY KEY (idFornecedor)
);

CREATE TABLE MateriaPrima
(
    idMateriaPrima integer NOT NULL,
    descricao character varying(50) COLLATE pg_catalog.default NOT NULL,
    dimensao character(30) COLLATE pg_catalog.default,
    preco real,
    idFornecedor integer,
    CONSTRAINT MateriaPrima_pkey PRIMARY KEY (idMateriaPrima),
    CONSTRAINT materiaFornecedor FOREIGN KEY (idFornecedor)
        REFERENCES Fornecedor (idFornecedor) MATCH SIMPLE
        ON UPDATE NO ACTION
);

CREATE TABLE Contas
(
    idConta integer NOT NULL,
    tipo boolean NOT NULL,
    valor real NOT NULL,
    descricao character varying(30) COLLATE pg_catalog.default,
    dataVencimento character varying(30) COLLATE pg_catalog.default,
    dataEntrada date,
    CONSTRAINT Contas_pkey PRIMARY KEY (idConta)
);

CREATE TABLE Cliente
(
    idCliente integer NOT NULL,
    nome character varying(30) COLLATE pg_catalog.default NOT NULL,
    cpf character varying(30) COLLATE pg_catalog.default NOT NULL,
    telefone character varying(30) COLLATE pg_catalog.default,
    endereco character varying(30) COLLATE pg_catalog.default,
    email character varying(30) COLLATE pg_catalog.default,
    CONSTRAINT Cliente_pkey PRIMARY KEY (idCliente)
);

CREATE TABLE Produto
(
    idProduto integer NOT NULL,
    descricao character varying(40) COLLATE pg_catalog.default NOT NULL DEFAULT NULL::character varying,
    peso real,
    precoCusto real,
    precoRevenda real,
    precoCliente real,
    idMateriaPrima integer,
    CONSTRAINT Produto_pkey PRIMARY KEY (idProduto),
    CONSTRAINT produdoMateria FOREIGN KEY (idMateriaPrima)
        REFERENCES MateriaPrima (idMateriaPrima) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE Estoque
(
    idEstoque integer NOT NULL,
    idProduto integer NOT NULL,
    quantidade integer NOT NULL,
    CONSTRAINT Estoque_pkey PRIMARY KEY (idEstoque),
    CONSTRAINT EstoqueProd FOREIGN KEY (idProduto)
        REFERENCES Produto (idProduto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
CREATE TABLE Pedido
(
    idPedido integer NOT NULL,
    idCliente integer,
    preco real,
    desconto real,
    CONSTRAINT Pedido_pkey PRIMARY KEY (idPedido),
    CONSTRAINT PedidoCliente FOREIGN KEY (idCliente)
        REFERENCES Cliente (idCliente) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE ProdutoPedido
(
    idProduto integer,
    idPedido integer,
    quant integer,
    idProdPed integer NOT NULL,
    CONSTRAINT ProdutoPedido_pkey PRIMARY KEY (idProdPed),
    CONSTRAINT ProdPed_01 FOREIGN KEY (idProduto)
        REFERENCES Produto (idProduto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ProdPed_02 FOREIGN KEY (idPedido)
        REFERENCES Pedido (idPedido) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE Orcamento
(
    idOrcamento integer NOT NULL,
    idCliente integer,
    preco integer,
    CONSTRAINT Orcamento_pkey PRIMARY KEY (idOrcamento),
    CONSTRAINT OrcaCliente FOREIGN KEY (idCliente)
        REFERENCES Cliente (idCliente) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE ProdutoOrcamento
(
    idProdOrca integer NOT NULL,
    idProduto integer,
    idOrcamento integer,
    CONSTRAINT ProdutoOrcamento_pkey PRIMARY KEY (idProdOrca),
    CONSTRAINT ProdOrca01 FOREIGN KEY (idProduto)
        REFERENCES Produto (idProduto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ProdOrca02 FOREIGN KEY (idOrcamento)
        REFERENCES Orcamento (idOrcamento) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);






