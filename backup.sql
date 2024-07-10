-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-07-2024 a las 19:48:19
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE if EXISTS luxury_cat_db;
CREATE DATABASE luxury_cat_db;
USE luxury_cat_db;

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarCategoria` (IN `p_categoria_id` INT)   BEGIN
    UPDATE tb_productos SET categoria_id = 1 WHERE categoria_id = p_categoria_id;
    DELETE FROM tb_categorias WHERE categoria_id = p_categoria_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_administradores`
--

CREATE TABLE `tb_administradores` (
  `admin_id` int(11) NOT NULL,
  `admin_nombre` varchar(100) NOT NULL,
  `admin_apellido` varchar(100) NOT NULL,
  `admin_usuario` varchar(100) NOT NULL,
  `admin_contraseña` varchar(100) NOT NULL,
  `admin_correo` varchar(100) NOT NULL,
  `admin_estado` tinyint(1) NOT NULL DEFAULT 1,
  `tipo_admin_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_administradores`
--

INSERT INTO `tb_administradores` (`admin_id`, `admin_nombre`, `admin_apellido`, `admin_usuario`, `admin_contraseña`, `admin_correo`, `admin_estado`, `tipo_admin_id`) VALUES
(1, 'test', 'test', 'testroot', '$2y$10$LCe8vnxDj2CYbAOS59o5yOJ9glpFbo9vHJuSGO/e0EFCoYoOsB9YW', 'test@root.com', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_categorias`
--

CREATE TABLE `tb_categorias` (
  `categoria_id` int(11) NOT NULL,
  `categoria_nombre` varchar(200) NOT NULL,
  `categoria_descripcion` varchar(200) NOT NULL,
  `categoria_estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_categorias`
--

INSERT INTO `tb_categorias` (`categoria_id`, `categoria_nombre`, `categoria_descripcion`, `categoria_estado`) VALUES
(2, 'Alimentos', 'Lo mejor para tu gato', 1),
(3, 'Ropa', 'Lo mejor para tu gato', 1),
(4, 'Juguetes', 'Lo mejor para tu gato', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_comentarios`
--

CREATE TABLE `tb_comentarios` (
  `comentario_id` int(11) NOT NULL,
  `detalle_pedido_id` int(11) NOT NULL,
  `comentario_fecha` date NOT NULL DEFAULT current_timestamp(),
  `comentario_texto` varchar(250) NOT NULL,
  `comentario_estado` tinyint(1) NOT NULL DEFAULT 0,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detalles_pedidos`
--

CREATE TABLE `tb_detalles_pedidos` (
  `detalle_pedido_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `detalle_precio` decimal(5,2) NOT NULL CHECK (`detalle_precio` >= 0),
  `detalle_cantidad` int(11) NOT NULL CHECK (`detalle_cantidad` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_detalles_pedidos`
--

INSERT INTO `tb_detalles_pedidos` (`detalle_pedido_id`, `producto_id`, `pedido_id`, `detalle_precio`, `detalle_cantidad`) VALUES
(2, 1, 1, 12.00, 1),
(3, 1, 1, 12.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_marcas`
--

CREATE TABLE `tb_marcas` (
  `marca_id` int(11) NOT NULL,
  `marca_nombre` varchar(200) NOT NULL,
  `marca_estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_marcas`
--

INSERT INTO `tb_marcas` (`marca_id`, `marca_nombre`, `marca_estado`) VALUES
(1, 'Purina', 1),
(2, 'Whiskas', 1),
(3, 'One', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_pedidos`
--

CREATE TABLE `tb_pedidos` (
  `pedido_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `pedido_fechaEntrega` date DEFAULT current_timestamp(),
  `pedido_fechaSolicitud` date DEFAULT current_timestamp(),
  `pedido_direccion` varchar(200) NOT NULL,
  `pedido_estado` enum('Pendiente','Entregado','Finalizado','Anulado') DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_pedidos`
--

INSERT INTO `tb_pedidos` (`pedido_id`, `usuario_id`, `pedido_fechaEntrega`, `pedido_fechaSolicitud`, `pedido_direccion`, `pedido_estado`) VALUES
(1, 1, '2024-07-10', '2024-07-10', 'Aun no definida', 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_productos`
--

CREATE TABLE `tb_productos` (
  `producto_id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `producto_descripcion` varchar(200) NOT NULL,
  `producto_nombre` varchar(100) NOT NULL,
  `producto_precio` decimal(5,2) DEFAULT NULL CHECK (`producto_precio` >= 0),
  `producto_imagen` varchar(100) DEFAULT 'default.png',
  `producto_cantidad` int(11) NOT NULL CHECK (`producto_cantidad` >= 0),
  `producto_estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_productos`
--

INSERT INTO `tb_productos` (`producto_id`, `categoria_id`, `marca_id`, `producto_descripcion`, `producto_nombre`, `producto_precio`, `producto_imagen`, `producto_cantidad`, `producto_estado`) VALUES
(1, 2, 1, 'Lo mejor para tu gato', 'Croquetas', 12.00, '668ec1af54543.jpg', 100, 1),
(2, 2, 2, 'Lo mejor para tu gato', 'Comida húmeda', 10.00, '668ec1f6dce25.png', 100, 1),
(3, 4, 3, 'Lo mejor para tu gato', 'Torre con pluma', 50.00, '668ec23e981d4.jpg', 200, 1),
(4, 3, 3, 'Lo mejor para tu gato', 'Traje de oficial', 100.00, '668ec2670b5f8.jpg', 200, 1),
(5, 3, 3, 'Lo mejor para tu gato', 'Suéter gris', 100.00, '668ec2add130d.jpg', 100, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipos_admin`
--

CREATE TABLE `tb_tipos_admin` (
  `tipo_admin_id` int(11) NOT NULL,
  `tipo_admin_nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_tipos_admin`
--

INSERT INTO `tb_tipos_admin` (`tipo_admin_id`, `tipo_admin_nombre`) VALUES
(1, 'root');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `usuario_id` int(11) NOT NULL,
  `usuario_nombre` varchar(100) NOT NULL,
  `usuario_apellido` varchar(100) NOT NULL,
  `usuario_usuario` varchar(100) NOT NULL,
  `usuario_contraseña` varchar(100) NOT NULL,
  `usuario_correo` varchar(100) NOT NULL,
  `usuario_estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`usuario_id`, `usuario_nombre`, `usuario_apellido`, `usuario_usuario`, `usuario_contraseña`, `usuario_correo`, `usuario_estado`) VALUES
(1, 'test', 'test', 'root', '$2y$10$206w69kUY.mTFj.j7dyd8u70JiIOsF79fWWf2goRL97ifEVIviiYu', 'test@root.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_administradores`
--
ALTER TABLE `tb_administradores`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `admin_usuario` (`admin_usuario`),
  ADD UNIQUE KEY `admin_correo` (`admin_correo`),
  ADD KEY `fk_admin_tipo` (`tipo_admin_id`);

--
-- Indices de la tabla `tb_categorias`
--
ALTER TABLE `tb_categorias`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indices de la tabla `tb_comentarios`
--
ALTER TABLE `tb_comentarios`
  ADD PRIMARY KEY (`comentario_id`),
  ADD KEY `fk_comentario_detalle` (`detalle_pedido_id`),
  ADD KEY `fk_comentarios_usuarios` (`usuario_id`);

--
-- Indices de la tabla `tb_detalles_pedidos`
--
ALTER TABLE `tb_detalles_pedidos`
  ADD PRIMARY KEY (`detalle_pedido_id`),
  ADD KEY `fk_detalle_producto` (`producto_id`),
  ADD KEY `fk_detalle_pedido` (`pedido_id`);

--
-- Indices de la tabla `tb_marcas`
--
ALTER TABLE `tb_marcas`
  ADD PRIMARY KEY (`marca_id`);

--
-- Indices de la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  ADD PRIMARY KEY (`pedido_id`),
  ADD KEY `fk_usuario_pedidos` (`usuario_id`);

--
-- Indices de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  ADD PRIMARY KEY (`producto_id`),
  ADD KEY `fk_producto_categoria` (`categoria_id`),
  ADD KEY `fk_producto_marca` (`marca_id`);

--
-- Indices de la tabla `tb_tipos_admin`
--
ALTER TABLE `tb_tipos_admin`
  ADD PRIMARY KEY (`tipo_admin_id`);

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `usuario_correo` (`usuario_correo`),
  ADD UNIQUE KEY `usuario_usuario` (`usuario_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_administradores`
--
ALTER TABLE `tb_administradores`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_categorias`
--
ALTER TABLE `tb_categorias`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_comentarios`
--
ALTER TABLE `tb_comentarios`
  MODIFY `comentario_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_detalles_pedidos`
--
ALTER TABLE `tb_detalles_pedidos`
  MODIFY `detalle_pedido_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_marcas`
--
ALTER TABLE `tb_marcas`
  MODIFY `marca_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  MODIFY `pedido_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  MODIFY `producto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_tipos_admin`
--
ALTER TABLE `tb_tipos_admin`
  MODIFY `tipo_admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_administradores`
--
ALTER TABLE `tb_administradores`
  ADD CONSTRAINT `fk_admin_tipo` FOREIGN KEY (`tipo_admin_id`) REFERENCES `tb_tipos_admin` (`tipo_admin_id`);

--
-- Filtros para la tabla `tb_comentarios`
--
ALTER TABLE `tb_comentarios`
  ADD CONSTRAINT `fk_comentario_detalle` FOREIGN KEY (`detalle_pedido_id`) REFERENCES `tb_detalles_pedidos` (`detalle_pedido_id`),
  ADD CONSTRAINT `fk_comentarios_usuarios` FOREIGN KEY (`usuario_id`) REFERENCES `tb_usuarios` (`usuario_id`);

--
-- Filtros para la tabla `tb_detalles_pedidos`
--
ALTER TABLE `tb_detalles_pedidos`
  ADD CONSTRAINT `fk_detalle_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `tb_pedidos` (`pedido_id`),
  ADD CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`producto_id`) REFERENCES `tb_productos` (`producto_id`);

--
-- Filtros para la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  ADD CONSTRAINT `fk_usuario_pedidos` FOREIGN KEY (`usuario_id`) REFERENCES `tb_usuarios` (`usuario_id`);

--
-- Filtros para la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  ADD CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `tb_categorias` (`categoria_id`),
  ADD CONSTRAINT `fk_producto_marca` FOREIGN KEY (`marca_id`) REFERENCES `tb_marcas` (`marca_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
