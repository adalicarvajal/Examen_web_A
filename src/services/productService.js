import { supabase } from '../supabase/client';

export const getProducts = async () => {
    try {
        const { data: products, error } = await supabase
            .from('products_with_category_name')
            .select('*');

        if (error) throw error;

        return products;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return null;
    }
}

export const createProduct = async (product) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error creating product:', error.message);
        return null;
    }
}

export const updateProduct = async (id, product) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .update(product)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
    catch (error) {
        console.error('Error updating product:', error.message);
        return null;
    }
}

export const deleteProduct = async (id) => {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .match({ id });

        if (error) throw error;
    }
    catch (error) {
        console.error('Error deleting product:', error.message);
        return null;
    }
}


export const existsProduct = async (name) => {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .eq('name', name);

        if (error) throw error;

        return products.length > 0;
    } catch (error) {
        console.error('Error checking product existence:', error.message);
        return null;
    }
}

export const getTotalProducts = async () => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('id');

        if (error) throw error;

        return data.length;
    } catch (error) {
        console.error('Error fetching total products:', error.message);
        return null;
    }
}