"use server";

import { axiosInstanceAdminWithFormData } from "@/lib/axiosInstance";
import { revalidatePath } from "next/cache";

interface ArticleFormState {
  success: boolean;
  message: string;
}

export async function updateArticleAction(
  prevState: ArticleFormState,
  formData: FormData,
  _id: string
): Promise<ArticleFormState> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  try {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    if (image && image.size > 0) {
      data.append("image", image);
    }

    await axiosInstanceAdminWithFormData.put(
      `/Article/updateArticle/${_id}`,
      data
    );

    // Make sure to revalidate the path here
    revalidatePath("/articles");

    return { success: true, message: "Article updated successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update article." };
  }
}
