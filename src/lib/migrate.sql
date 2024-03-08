DROP TABLE IF EXISTS BRANCH CASCADE;
DROP TABLE IF EXISTS EMPLOYEE CASCADE;
DROP TABLE IF EXISTS CUSTOMER CASCADE;
DROP TABLE IF EXISTS INVOICE CASCADE;
DROP TABLE IF EXISTS SALES CASCADE;


CREATE TABLE BRANCH (
    id varchar(8) PRIMARY KEY,
    address TEXT NOT NULL,
    owner TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE EMPLOYEE (
    id varchar(8) PRIMARY KEY,
    branch_id varchar(8) REFERENCES BRANCH(id) ON DELETE SET NULL,
    salary NUMERIC(10, 2) NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) UNIQUE,
    dob DATE NOT NULL
);


CREATE TABLE INVOICE (
    id varchar(8) PRIMARY KEY,
    customer_phone varchar(20),
    branch_id varchar(8) REFERENCES BRANCH(id) ON DELETE SET NULL,
    quantity NUMERIC NOT NULL,
    fuel_type TEXT NOT NULL,
    fuel_price NUMERIC(8, 2) NOT NULL,
    -- Automatically calculates and stores the total amount of fuel purchased
    total NUMERIC(10, 2) GENERATED ALWAYS AS (quantity * fuel_price) STORED, 
    method TEXT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE CUSTOMER (
    id varchar(8) PRIMARY KEY,
    phone VARCHAR(20),
    method TEXT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE SALES (
    id varchar(8) PRIMARY KEY,
    branch_id VARCHAR(8) REFERENCES BRANCH(id) ON DELETE SET NULL,
    total_sales NUMERIC(10, 2) NOT NULL,
    total_stock NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    date DATE NOT NULL
);

-- Inserting into BRANCH table
INSERT INTO BRANCH (id, address, owner, name) VALUES ('BRC001AB', 'Mangalore, Karnataka', 'Srinivas Rao', 'Raghavendra Fuels');
INSERT INTO BRANCH (id, address, owner, name) VALUES ('BRC002CD', 'Puttur, Karnataka', 'Ramesh Shetty', 'Shree Enterprises');
INSERT INTO BRANCH (id, address, owner, name) VALUES ('BRC003EF', 'Mulky, Karnataka', 'Priya Nayak', 'Nayak Fuels');
INSERT INTO BRANCH (id, address, owner, name) VALUES ('BRC004GH', 'Udupi, Karnataka', 'Rajesh Bhat', 'Bhat Fuels');

-- Inserting into EMPLOYEE table
INSERT INTO EMPLOYEE (id, branch_id, salary, name, address, phone, dob) VALUES ('EMP001IJ', 'BRC001AB', 30000.00, 'Arjun Rao', 'Mangalore, Karnataka', '9876543210', '1990-05-15');
INSERT INTO EMPLOYEE (id, branch_id, salary, name, address, phone, dob) VALUES ('EMP002KL', 'BRC002CD', 25000.00, 'Priya Shetty', 'Puttur, Karnataka', '8765432109', '1993-08-25');
INSERT INTO EMPLOYEE (id, branch_id, salary, name, address, phone, dob) VALUES ('EMP003MN', 'BRC003EF', 28000.00, 'Umesh Nayak', 'Mulky, Karnataka', '7654321098', '1985-11-10');
INSERT INTO EMPLOYEE (id, branch_id, salary, name, address, phone, dob) VALUES ('EMP004OP', 'BRC004GH', 32000.00, 'Vijaya Bhat', 'Udupi, Karnataka', '6543210987', '1988-03-20');

-- Inserting into CUSTOMER table
INSERT INTO CUSTOMER (id, phone, method, date) VALUES ('CST001QR', '7894561230', 'Cash', '2024-03-01');
INSERT INTO CUSTOMER (id, phone, method, date) VALUES ('CST002ST', '8561237890', 'Card', '2024-03-02');
INSERT INTO CUSTOMER (id, phone, method, date) VALUES ('CST003UV', '9876543210', 'UPI', '2024-03-03');
INSERT INTO CUSTOMER (id, phone, method, date) VALUES ('CST004WX', '9873216540' , 'Cash', '2024-03-04');

-- Inserting into INVOICE table
INSERT INTO INVOICE (id, customer_phone, branch_id, quantity, fuel_type, fuel_price, method, date) VALUES ('INV001YZ', '7894561230', 'BRC001AB', 10, 'Petrol', 85.50, 'Cash', '2024-03-01');
INSERT INTO INVOICE (id, customer_phone, branch_id, quantity, fuel_type, fuel_price, method, date) VALUES ('INV002AB', '9873216540', 'BRC002CD', 8, 'Diesel', 78.20, 'Cash', '2024-03-02');
INSERT INTO INVOICE (id, customer_phone, branch_id, quantity, fuel_type, fuel_price, method, date) VALUES ('INV003CD', '7894561230', 'BRC003EF', 12, 'Petrol', 85.50, 'Card', '2024-03-03');
INSERT INTO INVOICE (id, customer_phone, branch_id, quantity, fuel_type, fuel_price, method, date) VALUES ('INV004EF', '9876543210', 'BRC004GH', 15, 'Diesel', 78.20, 'UPI', '2024-03-04');

-- Inserting into SALES table
INSERT INTO SALES (id, branch_id, total_sales, total_stock, date) VALUES ('SAL001AB', 'BRC001AB', 2000.00, 500.00, '2024-03-01');
INSERT INTO SALES (id, branch_id, total_sales, total_stock, date) VALUES ('SAL002CD', 'BRC002CD', 1500.00, 400.00, '2024-03-02');
INSERT INTO SALES (id, branch_id, total_sales, total_stock, date) VALUES ('SAL003EF', 'BRC003EF', 1800.00, 600.00, '2024-03-03');
INSERT INTO SALES (id, branch_id, total_sales, total_stock, date) VALUES ('SAL004GH', 'BRC004GH', 2200.00, 700.00, '2024-03-04');
