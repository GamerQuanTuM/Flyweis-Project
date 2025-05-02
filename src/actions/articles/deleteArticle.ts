"use server";
import { axiosInstanceAdmin } from "@/lib/axiosInstance";
import { revalidatePath } from "next/cache";
export async function deleteArticle(id: string) {
  try {
    const response = await axiosInstanceAdmin.delete(
      `/Article/deleteArticle/${id}`
    );
    revalidatePath('/articles');
    
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw new Error("Failed to delete article");
  }
}
