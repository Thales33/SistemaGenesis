

DROP TABLE Cliente CASCADE;
DROP TABLE Contas CASCADE;
DROP TABLE Estoque CASCADE;
DROP TABLE Estoque CASCADE;
DROP TABLE Fornecedor CASCADE;
DROP TABLE MateriaPrima CASCADE;
DROP TABLE Orcamento CASCADE;
DROP TABLE Pedido CASCADE;
DROP TABLE Produto CASCADE;
DROP TABLE ProdutoOrcamento CASCADE;
DROP TABLE ProdutoPedido CASCADE;

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


INSERT INTO "Fornecedor" (nome, endereco, telefone, site, cnpj, email) VALUES
  ('Madereira', 'Rua Timbiras, 333', '9999-9999', 'www.madereira.com', '182.182.0001-88', 'email@teste.com.br');
INSERT INTO "MateriaPrima" (idmateriaprima,descricao, dimensao, preco, "idFornecedor") VALUES
  (1,'MDF 3MM CRU', '2000 X 1000', 32, 1),
  (2,'MDF 6MM CRU', '2000X1000', 55, 1);
INSERT INTO "produto" (idproduto,descricao, peso, "precocusto", "precorevenda", "precocliente", "idmateriaprima") VALUES
  (1,'porta copo Harry 8 peças', 300, 10, 20, 70, 2),
  (2,'jogo da memoria', 500, 30, 40, 60, 2);
INSERT INTO "estoque" (idestoque,"idproduto", quantidade) VALUES
  (1,2, 500),
  (2,1, 100);
INSERT INTO "cliente" (idcliente,nome, cpf, telefone, endereco, email) VALUES
  (1,'Maria', '900.767.456-87', '8888-8888', 'rua testando,555', 'email@email.com'),
  (2,'bruno', '427.998.767-87', '9999-9999', 'rua da mariazinha,655', 'teste@email.com'),
  (3,'dudu', '429.555.789-78', '2049-1636', 'rua das flores,999', 'testando@email.com'),
  (4,'Jose', '428.994.867-46', 'TIO JOSE', 'rua do teste, 698', 'email@gmail.com');
INSERT INTO "pedido" (idpedido,"idcliente", preco, desconto) VALUES
  (1,1, 75, 0),
  (2,2, 500, 0),
  (3,4, 600, 0);
INSERT INTO "produtopedido" (idprodped,"idproduto", "idpedido", quant) VALUES
  (1,1, 1, 17),
  (2,2, 2, 300),
  (3,1, 2, 100),
  (4,1, 3, 400),
  (5,2, 3, 500);