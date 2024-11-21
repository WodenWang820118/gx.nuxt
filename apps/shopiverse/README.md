# Shopiverse

## Table of contents

- [Prisma](#prisma)
- [Supabase](#supabase)
- [Extra Metadata when Creating a Public User Table](#extra-metadata-when-creating-a-public-user-table)
- [Relationship between products and users](#relationship-between-products-and-users)
- [Order and OrderItems](#order-and-orderitems)
- [Checkout and Payment](#checkout-and-payment)

## Prisma

To add a database, please use the following commands:

```bash
nx run shopiverse:prisma-generate
```

```bash
nx run shopiverse:prisma-migrate
```

The `migrations` directory will be created and database tables will be created.

After data insertion, run the following command to look into the database:

```bash
nx run shopiverse:prisma-studio
```

The Prisma Studio will be opened in the browser with `http://localhost:5555`.

## Supabase

### Extra Metadata when Creating a Public User Table

In the SQL editor, run the following SQL to add extra metadata to the `auth.users` table. The extra metadata will be used to store additional user information in the `users` table.

```sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user_profile();

CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id,
    address,
    full_name
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'address',
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Create the trigger if it doesn't exist
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_profile();

```

### Relationship between products and users

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())

    CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE RESTRICT
);
```

### Order and OrderItems

`orders` table:

```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'pending',
    total_amount DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
        ON DELETE RESTRICT
);
```

`order_items` table:

```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
);
```

### Checkout and Payment

- TODO: checkout, and payment functionality.
