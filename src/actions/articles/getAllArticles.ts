"use server";
import { axiosInstanceAdmin } from "@/lib/axiosInstance";
import { revalidatePath } from "next/cache";

export async function getAllArticles(page: number, limit: number) {
  try {
    const response = await axiosInstanceAdmin.get(
      `/Article/getArticle?page=${page}&limit=${limit}`
    );
    revalidatePath("/articles");
    return response.data.data.docs;
  } catch (error) {
    console.log(error);
  }
}
