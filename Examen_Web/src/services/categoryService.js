import { supabase } from '../supabase/client';

export const getCategories = async () => {
    try {
        const { data: categories, error } = await supabase
            .from('category')
            .select('*');

        if (error) throw error;

        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        return null;
    }
};

export const createCategory = async (category) => {
    try {
        const { data, error } = await supabase
            .from('category')
            .insert(category)
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error creating category:', error.message);
        return null;
    }
}

export const updateCategory = async (id, category) => {
    try {
        const { data, error } = await supabase
            .from('category')
            .update(category)
            .eq('id', id)
            .select()
            .single();


        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating category:', error.message);
        return null;
    }
}

export const deleteCategory = async (id) => {
    try {
        const { error } = await supabase
            .from('category')
            .delete()
            .match({ id });

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting category:', error.message);
    }
}

export const existsCategory = async (name) => {
    try {
        const nameWithoutTrailingSpaces = name.trim();
        const { data: categories, error } = await supabase
            .from('category')
            .select()
            .eq('name', nameWithoutTrailingSpaces)
            .limit(1);

        if (error) throw error;

        return categories.length > 0;
    } catch (error) {
        console.error('Error checking if category exists:', error.message);
        return false;
    }
}

export const getTotalCategories = async () => {
    try {
        const { data, error } = await supabase.from('category').select('id');

        if (error) throw error;

        return data.length;
    } catch (error) {
        console.error('Error fetching total categories:', error.message);
        return 0;
    }
}

