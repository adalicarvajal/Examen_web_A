import { supabase } from "../supabase/client";

export const getSales = async () => {
  const { data, error } = await supabase.from("sales").select("*");
  if (error) {
    throw new Error(error);
  }
  return data;
};


export const createSale = async (sale) => {
  const { data, error } = await supabase.from("sales").insert(sale).select()
    .single();
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const createSaleDetail = async (saleDetail) => {
  const { data, error } = await supabase.from("sales_details").insert(saleDetail).select();
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const deleteSale = async (id) => {
  const { error } = await supabase.from("sales").delete().eq("id", id);
  if (error) {
    throw new Error(error);
  }
  return true;
};

export const getSalesDetailsBySaleId = async (id) => {
  const { data, error } = await supabase.from("sales_details_with_product_name").select("*").eq("sale_id", id);
  if (error) {
    throw new Error(error);
  }
  return data;
}

export const getTotalSales = async () => {
  const { data, error } = await supabase.from("sales").select("*");

  const totalSales = data.reduce((acc, sale) => {
    return acc + sale.total_price;
  }, 0);

  if (error) {
    throw new Error(error);
  }
  return totalSales;
}