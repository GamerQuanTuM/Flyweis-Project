"use server";

import { axiosInstanceAdminWithFormData } from "@/lib/axiosInstance";
import { revalidatePath } from "next/cache";

interface ArticleFormState {
  success: boolean;
  message: string;
}

export async function createArticleAction(
  prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  if (!title || !description || !image) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("image", image);

    await axiosInstanceAdminWithFormData.post(
      `/Article/createArticle`,
      data
    );
    
    // Make sure to revalidate the path here
    revalidatePath("/articles");
    
    return { success: true, message: "Article created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create article." };
  }
}