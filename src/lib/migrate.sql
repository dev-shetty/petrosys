DROP TABLE IF EXISTS BRANCH;
DROP TABLE IF EXISTS EMPLOYEE;
DROP TABLE IF EXISTS CUSTOMER;
DROP TABLE IF EXISTS INVOICE;
DROP TABLE IF EXISTS SALES;


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

CREATE TABLE CUSTOMER (
    id varchar(8) PRIMARY KEY,
    method TEXT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE INVOICE (
    id varchar(8) PRIMARY KEY,
    customer_id varchar(8) REFERENCES CUSTOMER(id) ON DELETE SET NULL,
    branch_id varchar(8) REFERENCES BRANCH(id) ON DELETE SET NULL,
    quantity NUMERIC NOT NULL,
    fuel_type TEXT NOT NULL,
    fuel_price NUMERIC(8, 2) NOT NULL
    date DATE NOT NULL,
);

CREATE TABLE SALES(
    id SERIAL PRIMARY KEY,
    branch_id VARCHAR(8) REFERENCES BRANCH(id) ON DELETE SET NULL,
    total_sales NUMERIC(10, 2) NOT NULL,
    total_stock NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL,
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
INSERT INTO CUSTOMER (id, method, date) VALUES ('CST001QR', 'Cash', '2024-03-01');
INSERT INTO CUSTOMER (id, method, date) VALUES ('CST002ST', 'Credit Card', '2024-03-02');
INSERT INTO CUSTOMER (id, method, date) VALUES ('CST003UV', 'Debit Card', '2024-03-03');
INSERT INTO CUSTOMER (id, method, date) VALUES ('CST004WX', 'Cash', '2024-03-04');

-- Inserting into INVOICE table
INSERT INTO INVOICE (id, customer_id, branch_id, quantity, fuel_type, fuel_price, date) VALUES ('INV001YZ', 'CST001QR', 'BRC001AB', 10, 'Petrol', 85.50, '2024-03-01');
INSERT INTO INVOICE (id, customer_id, branch_id, quantity, fuel_type, fuel_price, date) VALUES ('INV002AB', 'CST002ST', 'BRC002CD', 8, 'Diesel', 78.20, '2024-03-02');
INSERT INTO INVOICE (id, customer_id, branch_id, quantity, fuel_type, fuel_price, date) VALUES ('INV003CD', 'CST003UV', 'BRC003EF', 12, 'Petrol', 85.50, '2024-03-03');
INSERT INTO INVOICE (id, customer_id, branch_id, quantity, fuel_type, fuel_price, date) VALUES ('INV004EF', 'CST004WX', 'BRC004GH', 15, 'Diesel', 78.20, '2024-03-04');

-- Inserting into SALES table
INSERT INTO SALES (branch_id, total_sales, total_stock, date) VALUES ('BRC001AB', 2000.00, 500.00, '2024-03-01');
INSERT INTO SALES (branch_id, total_sales, total_stock, date) VALUES ('BRC002CD', 1500.00, 400.00, '2024-03-02');
INSERT INTO SALES (branch_id, total_sales, total_stock, date) VALUES ('BRC003EF', 1800.00, 600.00, '2024-03-03');
INSERT INTO SALES (branch_id, total_sales, total_stock, date) VALUES ('BRC004GH', 2200.00, 700.00, '2024-03-04');
