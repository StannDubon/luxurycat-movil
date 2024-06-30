DROP DATABASE if EXISTS luxury_cat_db;
CREATE DATABASE luxury_cat_db;
USE luxury_cat_db;
 
CREATE TABLE tb_tipos_admin(
tipo_admin_id INT PRIMARY KEY AUTO_INCREMENT,
tipo_admin_nombre VARCHAR(100) NOT NULL 
);

CREATE TABLE tb_administradores(
admin_id INT PRIMARY KEY AUTO_INCREMENT,
admin_nombre VARCHAR(100) NOT NULL,
admin_apellido VARCHAR(100) NOT NULL,
admin_usuario VARCHAR(100) NOT NULL,
admin_contraseña VARCHAR(100) NOT NULL, 
admin_correo VARCHAR(100) NOT NULL, 
admin_estado  boolean NOT NULL DEFAULT 1,
tipo_admin_id INT DEFAULT 1
);

CREATE TABLE tb_usuarios(
usuario_id INT PRIMARY KEY AUTO_INCREMENT,
usuario_nombre VARCHAR(100) NOT NULL,
usuario_apellido VARCHAR(100) NOT NULL,
usuario_usuario VARCHAR(100) NOT NULL,
usuario_contraseña VARCHAR(100) NOT NULL,
usuario_correo VARCHAR(100) NOT NULL,
usuario_estado boolean NOT NULL DEFAULT 1
);

CREATE TABLE tb_pedidos(
pedido_id INT PRIMARY KEY AUTO_INCREMENT, 
usuario_id INT NOT NULL,
pedido_fechaEntrega DATE DEFAULT NOW(),
pedido_fechaSolicitud DATE DEFAULT NOW(),
pedido_direccion VARCHAR(200) NOT NULL,
pedido_estado ENUM('Pendiente', 'Entregado', 'Finalizado', 'Anulado') NULL DEFAULT 'Pendiente'
);

CREATE TABLE tb_categorias(
categoria_id INT PRIMARY KEY AUTO_INCREMENT, 
categoria_nombre VARCHAR(200) NOT NULL,
categoria_descripcion VARCHAR(200) NOT NULL,
categoria_estado BOOLEAN DEFAULT 1
);

CREATE TABLE tb_marcas(
marca_id INT PRIMARY KEY AUTO_INCREMENT, 
marca_nombre VARCHAR(200) NOT NULL,
marca_estado BOOLEAN DEFAULT 1
);

CREATE TABLE tb_productos(
producto_id INT PRIMARY KEY AUTO_INCREMENT, 
categoria_id INT,
marca_id INT,
producto_descripcion VARCHAR(200) NOT NULL,
producto_nombre VARCHAR(100) NOT NULL,
producto_precio NUMERIC(5, 2) CHECK (producto_precio >= 0),
producto_imagen VARCHAR(100) DEFAULT 'default.png',
producto_cantidad INT NOT NULL CHECK (producto_cantidad >= 0),
producto_estado BOOLEAN DEFAULT 1
);

CREATE TABLE tb_detalles_pedidos (
detalle_pedido_id INT PRIMARY KEY AUTO_INCREMENT,
producto_id INT NOT NULL,
pedido_id INT NOT NULL,
detalle_precio NUMERIC(5, 2) NOT NULL CHECK (detalle_precio >= 0), 
detalle_cantidad INT NOT NULL CHECK (detalle_cantidad >= 0)
);

CREATE TABLE tb_comentarios (
comentario_id INT PRIMARY KEY AUTO_INCREMENT,
detalle_pedido_id INT NOT NULL,
comentario_fecha DATE DEFAULT NOW() NOT NULL,
comentario_texto VARCHAR (250) NOT NULL,
comentario_estado boolean NOT NULL DEFAULT 0,
usuario_id INT
);

-- Creamos las restrincciones 
ALTER TABLE tb_administradores 
ADD CONSTRAINT admin_usuario UNIQUE (admin_usuario);

ALTER TABLE tb_administradores
ADD CONSTRAINT admin_correo UNIQUE(admin_correo);

ALTER TABLE tb_usuarios 
ADD CONSTRAINT usuario_correo UNIQUE (usuario_correo);

ALTER TABLE tb_usuarios
ADD CONSTRAINT usuario_usuario UNIQUE(usuario_usuario);

-- Creamos las llaves foraneas
ALTER TABLE tb_administradores 
ADD CONSTRAINT fk_admin_tipo 
FOREIGN KEY (tipo_admin_id) REFERENCES tb_tipos_admin (tipo_admin_id);

ALTER TABLE tb_pedidos 
ADD CONSTRAINT fk_usuario_pedidos 
FOREIGN KEY (usuario_id) REFERENCES tb_usuarios (usuario_id);

ALTER TABLE tb_productos 
ADD CONSTRAINT fk_producto_categoria 
FOREIGN KEY (categoria_id) REFERENCES tb_categorias(categoria_id);

ALTER TABLE tb_productos 
ADD CONSTRAINT fk_producto_marca 
FOREIGN KEY (marca_id) REFERENCES tb_marcas(marca_id);

ALTER TABLE tb_detalles_pedidos 
ADD CONSTRAINT fk_detalle_producto 
FOREIGN KEY (producto_id) REFERENCES tb_productos(producto_id);
	
ALTER TABLE tb_detalles_pedidos 
ADD CONSTRAINT fk_detalle_pedido 
FOREIGN KEY (pedido_id) REFERENCES tb_pedidos(pedido_id);

ALTER TABLE tb_comentarios 
ADD CONSTRAINT fk_comentario_detalle 
FOREIGN KEY (detalle_pedido_id) REFERENCES tb_detalles_pedidos(detalle_pedido_id);

ALTER TABLE tb_comentarios 
ADD CONSTRAINT fk_comentarios_usuarios 
FOREIGN KEY (usuario_id) REFERENCES tb_usuarios(usuario_id);

INSERT INTO tb_tipos_admin(tipo_admin_nombre)
VALUES('root');

/* UTILITIES */

DELIMITER //

CREATE PROCEDURE eliminarCategoria(IN p_categoria_id INT)
BEGIN
    UPDATE tb_productos SET categoria_id = 1 WHERE categoria_id = p_categoria_id;
    DELETE FROM tb_categorias WHERE categoria_id = p_categoria_id;
END //

DELIMITER ;		

/* USUARIO DE PRUEBA */
INSERT INTO tb_usuarios(usuario_nombre, usuario_apellido, usuario_correo, usuario_usuario, usuario_contraseña, usuario_estado)
VALUES("test", "test", "test@root.com", "root", "$2y$10$206w69kUY.mTFj.j7dyd8u70JiIOsF79fWWf2goRL97ifEVIviiYu", 1)

/*  
usuario: root
contraseña: 123123123
*/