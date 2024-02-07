select * from auth.users;

CREATE TABLE public.role (
    id SERIAL PRIMARY KEY,
    role VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_before_update
BEFORE UPDATE ON public.role
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    names VARCHAR(255) NOT NULL,
    id_role INTEGER REFERENCES public.role(id),
    id_auth UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE OR REPLACE FUNCTION public.update_updated_at_column_users()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_before_update_users
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column_users();


INSERT INTO public.role (role) VALUES
('Admin'),
('Usuario');

CREATE OR REPLACE VIEW users_with_email AS
SELECT u.id, u.names, u.id_role, r.role, a.email, u.created_at
FROM public.users u
JOIN public.role r ON u.id_role = r.id
JOIN auth.users a ON u.id_auth = a.id;


CREATE TABLE public.Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public.Category (name, description) VALUES
('Tecnología', 'Productos electrónicos y dispositivos'),
('Ropa', 'Prendas de vestir para hombres, mujeres y niños'),
('Alimentos', 'Productos alimenticios y bebidas'),
('Libros', 'Literatura y material educativo');

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES public.category(id),
    stock INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, color, price, category_id, stock, active) VALUES
('Smartphone X', 'Negro', 999.99, 1, 10, TRUE),
('Laptop Pro', 'Plata', 1299.99, 1, 5, TRUE),
('Camiseta algodón', 'Blanco', 19.99, 2, 20, TRUE),
('Jeans', 'Azul', 39.99, 2, 15, TRUE),
('Pan integral', 'Marrón', 2.99, 3, 50, TRUE),
('Jugo de naranja natural', 'Naranja', 3.49, 3, 30, TRUE),
('El Señor de los Anillos', 'Verde', 10.99, 4, 7, TRUE),
('Aprendiendo Python', 'Azul', 29.99, 4, 12, TRUE);




CREATE VIEW products_with_category_name AS
SELECT 
    p.id,
    p.name AS product_name,
    p.color,
    p.price,
    c.name AS category_name,
    p.category_id,
    p.stock,
    p.active,
    p.created_at,
    p.updated_at
FROM 
    products p
JOIN 
    category c ON p.category_id = c.id;

CREATE TABLE public.sales (
    id SERIAL PRIMARY KEY,
    dni VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE public.sales_details (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    sale_price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sale_id) REFERENCES public.sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES public.products(id)
);

INSERT INTO public.sales (customer_name, total_price, dni) VALUES
('Juan Pérez', 1349.47, "1726137597"); -- Ejemplo de total, ajusta según los productos y cantidades vendidas

INSERT INTO public.sales_details (sale_id, product_id, quantity, sale_price) VALUES
(1, 1, 1, 999.99), -- 1 Smartphone X
(1, 3, 2, 19.99),  -- 2 Camisetas de algodón
(1, 6, 1, 3.49);   -- 1 Jugo de naranja natural


CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.products
    SET stock = GREATEST(stock - NEW.quantity, 0) 
    WHERE id = NEW.product_id;

    IF (SELECT stock FROM public.products WHERE id = NEW.product_id) = 0 THEN
        UPDATE public.products
        SET active = FALSE
        WHERE id = NEW.product_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_product_stock
AFTER INSERT ON public.sales_details
FOR EACH ROW
EXECUTE FUNCTION update_product_stock();

DROP TRIGGER IF EXISTS trigger_update_product_stock ON public.sales_details;

CREATE OR REPLACE VIEW sales_details_with_product_name AS
SELECT
    sd.id,
    sd.sale_id,
    sd.product_id,
    p.name AS product_name,
    sd.quantity,
    sd.sale_price,
    sd.discount,
    (sd.sale_price * sd.quantity) AS subtotal, 
    sd.created_at,
    sd.updated_at
FROM
    sales_details sd
JOIN
    products p ON sd.product_id = p.id;
