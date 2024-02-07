import { supabase } from '../supabase/client';

export const getTotalUsers = async () => {
    const { data, error } = await supabase.from('users').select('id');
    if (error) {
        throw new Error(error);
    }
    return data.length;
}
