

DROP TABLE cliente CASCADE;
DROP TABLE contas CASCADE;
DROP TABLE estoque CASCADE;
DROP TABLE estoque CASCADE;
DROP TABLE fornecedor CASCADE;
DROP TABLE materiaPrima CASCADE;
DROP TABLE orcamento CASCADE;
DROP TABLE pedido CASCADE;
DROP TABLE produto CASCADE;
DROP TABLE produtoorcamento CASCADE;
DROP TABLE produtopedido CASCADE;
DROP TABLE status CASCADE;

CREATE TABLE Fornecedor
(
    idFornecedor serial NOT NULL,
    nome varchar NOT NULL,
    endereco varchar,
    telefone varchar,
    site varchar,
    cnpj varchar NOT NULL,
    email varchar NOT NULL,
    CONSTRAINT Fornecedor_pkey PRIMARY KEY (idFornecedor)
);


CREATE TABLE Contas
(
    idConta serial NOT NULL,
    tipo boolean NOT NULL,
    valor real NOT NULL,
    descricao varchar,
    dataVencimento varchar,
    CONSTRAINT Contas_pkey PRIMARY KEY (idConta)
);

CREATE TABLE Cliente
(
    idCliente serial NOT NULL,
    nome varchar NOT NULL,
    cpf varchar NOT NULL,
    telefone varchar,
    endereco varchar,
    email varchar,
    CONSTRAINT Cliente_pkey PRIMARY KEY (idCliente)
);

CREATE TABLE Produto
(
    idProduto serial NOT NULL,
    descricao varchar NOT NULL,
    precoCusto real,
    precoRevenda real,
    precoCliente real,
    CONSTRAINT Produto_pkey PRIMARY KEY (idProduto)
    );

CREATE TABLE Estoque
(
    idEstoque serial NOT NULL,
    idProduto integer NOT NULL,
    quantidade integer NOT NULL,
    CONSTRAINT Estoque_pkey PRIMARY KEY (idEstoque),
    CONSTRAINT EstoqueProd FOREIGN KEY (idProduto)
        REFERENCES Produto (idProduto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE status (
  idstatus serial NOT NULL,
  descricao  varchar NOT NULL,
  CONSTRAINT status_pkey PRIMARY KEY (idstatus)
  );

CREATE TABLE Pedido
(
    idPedido serial NOT NULL,
    idCliente integer,
    preco real,
    desconto real,
    idstatus integer, 
    CONSTRAINT Pedido_pkey PRIMARY KEY (idPedido),
    CONSTRAINT PedidoCliente FOREIGN KEY (idCliente)
        REFERENCES Cliente (idCliente) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION);
ALTER TABLE "pedido"
  ADD CONSTRAINT pedstatus
  FOREIGN KEY (idstatus)
    REFERENCES status(idstatus)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

CREATE TABLE ProdutoPedido
(
    idProduto integer,
    idPedido integer,
    quant integer,
    idProdPed serial NOT NULL,
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
    idOrcamento serial NOT NULL,
    idCliente integer,
    preco integer,
    idstatus integer,
    CONSTRAINT Orcamento_pkey PRIMARY KEY (idOrcamento),
    CONSTRAINT OrcaCliente FOREIGN KEY (idCliente)
        REFERENCES Cliente (idCliente) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE Orcamento
  ADD CONSTRAINT orcastatus
  FOREIGN KEY (idstatus)
    REFERENCES public.status(idstatus);


CREATE TABLE ProdutoOrcamento
(
    idProdOrca serial NOT NULL,
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

INSERT INTO status (idstatus, descricao) VALUES
  (1, 'Em Fabrica��o'),
  (2, 'Cancelado'),
  (3, 'Finalizado');

INSERT INTO fornecedor (idfornecedor,nome, endereco, telefone, site, cnpj, email) VALUES
  (1,'Madereira', 'Rua Timbiras, 333', '9999-9999', 'www.madereira.com', '182.182.0001-88', 'email@teste.com.br');
INSERT INTO produto (idproduto,descricao, peso, "precocusto", "precorevenda", "precocliente") VALUES
  (1,'porta copo Harry 8 pe�as', 300, 10, 20, 70),
  (2,'jogo da memoria', 500, 30, 40, 60);
INSERT INTO "estoque" (idestoque,"idproduto", quantidade) VALUES
  (1,2, 500),
  (2,1, 100);
INSERT INTO cliente (idcliente,nome, cpf, telefone, endereco, email) VALUES
  (1,'Maria', '900.767.456-87', '8888-8888', 'rua testando,555', 'email@email.com'),
  (2,'bruno', '427.998.767-87', '9999-9999', 'rua da mariazinha,655', 'teste@email.com'),
  (3,'dudu', '429.555.789-78', '2049-1636', 'rua das flores,999', 'testando@email.com'),
  (4,'Jose', '428.994.867-46', 'TIO JOSE', 'rua do teste, 698', 'email@gmail.com');
INSERT INTO orcamento ("idorcamento", "idcliente", preco, idstatus) VALUES
  (3, 4, 100, 3),
  (2, 3, 600, 2),
  (1, 2, 300, 1);

INSERT INTO "pedido" (idpedido,"idcliente", preco, desconto,idstatus) VALUES
  (1,1, 75, 0,1),
  (2,2, 500, 0,2),
  (3,4, 600, 0,3);
INSERT INTO "produtopedido" (idprodped,"idproduto", "idpedido", quant) VALUES
  (1,1, 1, 17),
  (2,2, 2, 300),
  (3,1, 2, 100),
  (4,1, 3, 400),
  (5,2, 3, 500);